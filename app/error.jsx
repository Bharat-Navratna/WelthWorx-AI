"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronDown, ChevronUp, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    // Log to console in dev; swap for an error reporter (Sentry, etc.) in prod
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        Something went wrong
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-sm sm:text-base">
        An unexpected error occurred. You can try again or return to the
        dashboard.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Go to dashboard
          </Button>
        </Link>
      </div>

      {isDev && error?.message && (
        <div className="w-full max-w-xl text-left">
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showDetails ? "Hide" : "Show"} error details
          </button>
          {showDetails && (
            <pre className="text-xs bg-muted rounded-md p-4 overflow-x-auto border border-border whitespace-pre-wrap break-all text-left">
              <strong>{error.name}: </strong>{error.message}
              {error.stack ? `\n\n${error.stack}` : ""}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
