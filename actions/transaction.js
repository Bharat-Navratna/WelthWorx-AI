"use server";

import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const serializeAmount = (obj) => ({
    ...obj,
    amount: obj.amount.toNumber(),
});

function calculateNextRecurringDate(startDate, interval) {
    const date = new Date(startDate);
    switch (interval) {
        case "DAILY":   date.setDate(date.getDate() + 1); break;
        case "WEEKLY":  date.setDate(date.getDate() + 7); break;
        case "MONTHLY": date.setMonth(date.getMonth() + 1); break;
        case "YEARLY":  date.setFullYear(date.getFullYear() + 1); break;
    }
    return date;
}

export async function createTransaction(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const req = await request();
        const decision = await aj.protect(req, { userId, requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                throw Object.assign(new Error("Too many requests. Please try again later."), { code: "RATE_LIMIT_EXCEEDED" });
            }
            throw Object.assign(new Error("Request blocked"), { code: "FORBIDDEN" });
        }

        const user = await db.user.findUnique({ where: { clerkUserId: userId } });
        if (!user) throw new Error("User not found");

        const account = await db.account.findUnique({
            where: { id: data.accountId, userId: user.id },
        });
        if (!account) throw new Error("Account not found");

        const balanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;
        const newBalance = account.balance.toNumber() + balanceChange;

        const transaction = await db.$transaction(async (tx) => {
            const newTx = await tx.transaction.create({
                data: {
                    ...data,
                    userId: user.id,
                    nextRecurringDate:
                        data.isRecurring && data.recurringInterval
                            ? calculateNextRecurringDate(data.date, data.recurringInterval)
                            : null,
                },
            });
            await tx.account.update({
                where: { id: data.accountId },
                data: { balance: newBalance },
            });
            return newTx;
        });

        revalidatePath("/dashboard");
        revalidatePath(`/account/${transaction.accountId}`);
        return { success: true, data: serializeAmount(transaction) };

    } catch (error) {
        return {
            success: false,
            error: error.message,
            code: error.code ?? (
                error.message === "Unauthorized" ? "UNAUTHORIZED"
                : error.message === "User not found" ? "USER_NOT_FOUND"
                : error.message === "Account not found" ? "ACCOUNT_NOT_FOUND"
                : "INTERNAL_ERROR"
            ),
        };
    }
}

export async function scanReceipt(file) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const arrayBuffer = await file.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");

        const prompt = `
            Analyze this receipt image and extract the following information in JSON format:
            - Total amount (just the number)
            - Date (in ISO format)
            - Description or items purchased (brief summary)
            - Merchant/store name
            - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,other-expense)

            Only respond with valid JSON in this exact format:
            {
                "amount": number,
                "date": "ISO date string",
                "description": "string",
                "merchantName": "string",
                "category": "string"
            }

            If it is not a receipt, return an empty object.
        `;

        const result = await model.generateContent([
            { inlineData: { data: base64String, mimeType: file.type } },
            prompt,
        ]);

        const text = result.response.text();
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

        const parsed = JSON.parse(cleanedText);
        return {
            amount: parseFloat(parsed.amount),
            date: new Date(parsed.date),
            description: parsed.description,
            category: parsed.category,
            merchantName: parsed.merchantName,
        };
    } catch (error) {
        console.error("Error scanning receipt:", error.message);
        throw new Error("Failed to scan receipt");
    }
}

export async function getTransaction(id) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) throw new Error("User not found");

    const transaction = await db.transaction.findUnique({
        where: { id, userId: user.id },
    });
    if (!transaction) throw new Error("Transaction not found");

    return serializeAmount(transaction);
}

export async function updateTransaction(id, data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({ where: { clerkUserId: userId } });
        if (!user) throw new Error("User not found");

        const originalTransaction = await db.transaction.findUnique({
            where: { id, userId: user.id },
            include: { account: true },
        });
        if (!originalTransaction) throw new Error("Transaction not found");

        const oldBalanceChange =
            originalTransaction.type === "EXPENSE"
                ? -originalTransaction.amount.toNumber()
                : originalTransaction.amount.toNumber();

        const newBalanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;
        const netBalanceChange = newBalanceChange - oldBalanceChange;

        const transaction = await db.$transaction(async (tx) => {
            const updated = await tx.transaction.update({
                where: { id, userId: user.id },
                data: {
                    ...data,
                    nextRecurringDate:
                        data.isRecurring && data.recurringInterval
                            ? calculateNextRecurringDate(data.date, data.recurringInterval)
                            : null,
                },
            });
            await tx.account.update({
                where: { id: data.accountId },
                data: { balance: { increment: netBalanceChange } },
            });
            return updated;
        });

        revalidatePath("/dashboard");
        revalidatePath(`/account/${data.accountId}`);
        return { success: true, data: serializeAmount(transaction) };

    } catch (error) {
        return {
            success: false,
            error: error.message,
            code: error.message === "Unauthorized" ? "UNAUTHORIZED"
                : error.message === "User not found" ? "USER_NOT_FOUND"
                : error.message === "Transaction not found" ? "NOT_FOUND"
                : "INTERNAL_ERROR",
        };
    }
}
