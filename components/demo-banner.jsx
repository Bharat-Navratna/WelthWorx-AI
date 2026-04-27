"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative w-full bg-yellow-400 dark:bg-yellow-500 text-yellow-900 dark:text-yellow-950 px-4 py-2.5 text-center text-sm font-medium">
      <span>
        You are viewing a demo account.{" "}
        <Link
          href="/sign-up"
          className="underline underline-offset-2 font-semibold hover:text-yellow-700 dark:hover:text-yellow-800"
        >
          Sign up
        </Link>{" "}
        to track your own finances.
      </span>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss demo banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-yellow-500/40 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
