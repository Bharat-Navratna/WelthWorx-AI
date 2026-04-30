/**
 * Demo Data Seed Script
 *
 * Creates or resets the demo account with 6 months of realistic financial data.
 *
 * Prerequisites:
 *   1. Create a demo user in the Clerk dashboard with:
 *        Email:    demo@welthworx.com  (DEMO_EMAIL in .env)
 *        Password: Demo1234!           (DEMO_PASSWORD in .env)
 *   2. Sign in as that user once so checkUser() creates the DB row.
 *   3. Run: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seedDemoData.ts
 *      OR add a package.json script:  "seed:demo": "ts-node scripts/seedDemoData.ts"
 */

import { PrismaClient, TransactionType, AccountType, TransactionStatus } from "@prisma/client";
import { subMonths, startOfMonth, endOfMonth, addDays, format } from "date-fns";

const prisma = new PrismaClient();

const DEMO_EMAIL = process.env.DEMO_EMAIL || "demo@welthworx.com";

// ─── helpers ────────────────────────────────────────────────────────────────

function randomBetween(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── static data ─────────────────────────────────────────────────────────────

const INCOME_DESCRIPTIONS = [
  { category: "Salary",    description: "Monthly salary deposit" },
  { category: "Salary",    description: "Net pay — direct deposit" },
  { category: "Freelance", description: "Client payment — design project" },
  { category: "Freelance", description: "Consulting invoice #001" },
  { category: "Freelance", description: "Upwork earnings transfer" },
  { category: "Other",     description: "Interest payment" },
  { category: "Other",     description: "Cashback reward" },
];

const EXPENSE_ITEMS = [
  { category: "Housing",       description: "Rent payment",              min: 900,  max: 1400 },
  { category: "Housing",       description: "Electric bill",             min: 55,   max: 130  },
  { category: "Housing",       description: "Internet subscription",     min: 45,   max: 80   },
  { category: "Food",          description: "Grocery shopping",         min: 60,   max: 200  },
  { category: "Food",          description: "Restaurant dinner",         min: 20,   max: 90   },
  { category: "Food",          description: "Coffee & breakfast",        min: 5,    max: 25   },
  { category: "Food",          description: "Takeout order",             min: 15,   max: 55   },
  { category: "Transport",     description: "Monthly transit pass",      min: 70,   max: 120  },
  { category: "Transport",     description: "Uber / Lyft ride",          min: 8,    max: 40   },
  { category: "Transport",     description: "Gas station",               min: 35,   max: 90   },
  { category: "Entertainment", description: "Netflix subscription",      min: 15,   max: 20   },
  { category: "Entertainment", description: "Spotify subscription",      min: 10,   max: 10   },
  { category: "Entertainment", description: "Movie tickets",             min: 15,   max: 45   },
  { category: "Entertainment", description: "Books / Kindle",            min: 10,   max: 35   },
  { category: "Healthcare",    description: "Pharmacy",                  min: 15,   max: 80   },
  { category: "Healthcare",    description: "Gym membership",            min: 30,   max: 60   },
  { category: "Shopping",      description: "Amazon order",              min: 20,   max: 150  },
  { category: "Shopping",      description: "Clothing purchase",         min: 40,   max: 200  },
  { category: "Education",     description: "Online course subscription", min: 15,  max: 50   },
];

// ─── main seed ───────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌱  Seeding demo account for: ${DEMO_EMAIL}\n`);

  // 1. find demo user
  const user = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });
  if (!user) {
    console.error(
      "❌  Demo user not found in the database.\n" +
      "   Please sign in once through the app so the user row is created, then re-run this script."
    );
    process.exit(1);
  }
  console.log(`✅  Found user: ${user.name ?? user.email} (id: ${user.id})`);

  // 2. wipe existing demo data
  await prisma.transaction.deleteMany({ where: { userId: user.id } });
  await prisma.account.deleteMany({ where: { userId: user.id } });
  await prisma.budget.deleteMany({ where: { userId: user.id } });
  console.log("🗑   Cleared existing demo data");

  // 3. create accounts
  const checkingAccount = await prisma.account.create({
    data: {
      name: "Main Checking",
      type: AccountType.CURRENT,
      balance: 3_420.55,
      isDefault: true,
      userId: user.id,
    },
  });

  const savingsAccount = await prisma.account.create({
    data: {
      name: "Emergency Fund",
      type: AccountType.SAVINGS,
      balance: 12_000.00,
      isDefault: false,
      userId: user.id,
    },
  });
  console.log("🏦  Created 2 accounts: Main Checking, Emergency Fund");

  // 4. generate 6 months of transactions
  const now = new Date();
  const transactions: Parameters<typeof prisma.transaction.create>[0]["data"][] = [];

  for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
    const monthStart = startOfMonth(subMonths(now, monthOffset));
    const monthEnd = monthOffset === 0 ? now : endOfMonth(subMonths(now, monthOffset));

    // ── salary (1st working day of month) ──
    const salaryDate = addDays(monthStart, 1);
    transactions.push({
      type: TransactionType.INCOME,
      amount: randomBetween(4500, 5200),
      description: "Monthly salary deposit",
      category: "Salary",
      date: salaryDate,
      status: TransactionStatus.COMPLETED,
      userId: user.id,
      accountId: checkingAccount.id,
    });

    // ── freelance (mid-month, most months) ──
    if (Math.random() > 0.25) {
      transactions.push({
        type: TransactionType.INCOME,
        amount: randomBetween(400, 1800),
        description: pick(["Client payment — design project", "Consulting invoice", "Upwork earnings transfer"]),
        category: "Freelance",
        date: randomDate(addDays(monthStart, 10), addDays(monthStart, 20)),
        status: TransactionStatus.COMPLETED,
        userId: user.id,
        accountId: checkingAccount.id,
      });
    }

    // ── fixed monthly expenses ──
    // Rent (1st-3rd)
    transactions.push({
      type: TransactionType.EXPENSE,
      amount: 1_200.00,
      description: "Rent payment",
      category: "Housing",
      date: addDays(monthStart, Math.floor(Math.random() * 2)),
      status: TransactionStatus.COMPLETED,
      userId: user.id,
      accountId: checkingAccount.id,
    });

    // Internet / streaming subs
    transactions.push({
      type: TransactionType.EXPENSE,
      amount: 65.00,
      description: "Internet subscription",
      category: "Housing",
      date: addDays(monthStart, 5),
      status: TransactionStatus.COMPLETED,
      userId: user.id,
      accountId: checkingAccount.id,
    });

    transactions.push({
      type: TransactionType.EXPENSE,
      amount: 15.99,
      description: "Netflix subscription",
      category: "Entertainment",
      date: addDays(monthStart, 8),
      status: TransactionStatus.COMPLETED,
      userId: user.id,
      accountId: checkingAccount.id,
    });

    transactions.push({
      type: TransactionType.EXPENSE,
      amount: 9.99,
      description: "Spotify subscription",
      category: "Entertainment",
      date: addDays(monthStart, 8),
      status: TransactionStatus.COMPLETED,
      userId: user.id,
      accountId: checkingAccount.id,
    });

    // ── variable expenses (6–14 per month) ──
    const expenseCount = Math.floor(Math.random() * 9) + 6;
    for (let i = 0; i < expenseCount; i++) {
      const item = pick(EXPENSE_ITEMS.filter((e) => e.category !== "Housing" || e.description !== "Rent payment"));
      transactions.push({
        type: TransactionType.EXPENSE,
        amount: randomBetween(item.min, item.max),
        description: item.description,
        category: item.category,
        date: randomDate(monthStart, monthEnd),
        status: TransactionStatus.COMPLETED,
        userId: user.id,
        accountId: checkingAccount.id,
      });
    }

    // ── savings transfer (every other month) ──
    if (monthOffset % 2 === 0) {
      transactions.push({
        type: TransactionType.INCOME,
        amount: randomBetween(300, 600),
        description: "Transfer from checking",
        category: "Other",
        date: randomDate(addDays(monthStart, 15), addDays(monthStart, 25)),
        status: TransactionStatus.COMPLETED,
        userId: user.id,
        accountId: savingsAccount.id,
      });
    }
  }

  // Bulk insert
  await prisma.transaction.createMany({ data: transactions as any });
  console.log(`💳  Created ${transactions.length} transactions across 6 months`);

  // 5. set monthly budget
  await prisma.budget.create({
    data: {
      amount: 3_500.00,
      userId: user.id,
    },
  });
  console.log("📊  Set monthly budget: $3,500.00");

  console.log("\n✨  Demo seed complete!\n");
  console.log("   Email:    demo@welthworx.com");
  console.log("   Password: Demo1234!\n");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
