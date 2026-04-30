"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function DemoSignInButton({ className = "", size = "lg" }) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    if (!isLoaded || loading) return;

    const email = process.env.NEXT_PUBLIC_DEMO_EMAIL;
    const password = process.env.NEXT_PUBLIC_DEMO_PASSWORD;

    if (!email || !password) {
      toast.error("Demo credentials are not configured.");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        toast.error("Demo sign-in could not be completed.");
      }
    } catch (err) {
      const msg = err?.errors?.[0]?.message || "Demo sign-in failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size={size}
      variant="outline"
      onClick={handleDemoLogin}
      disabled={!isLoaded || loading}
      className={`border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-950/30 ${className}`}
    >
      {loading ? "Getting Demo…" : "Get Demo"}
    </Button>
  );
}
