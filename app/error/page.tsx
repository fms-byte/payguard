'use client'

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to your error reporting service
    if (error) {
      console.error("An error occurred:", error);
    }
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <p className="text-4xl font-bold tracking-tight">Something went wrong!</p>

        <div className="space-y-2">
          <p className="text-muted-foreground">
            {error?.message || "An unexpected error occurred"}
          </p>
          {error?.digest && (
            <p className="text-sm text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <Button 
          onClick={() => reset()}
          size="lg"
          variant="default"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
