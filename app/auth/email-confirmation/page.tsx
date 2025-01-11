"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ConfirmEmailPage() {
  const router = useRouter();

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirm Your Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            We&apos;ve sent a confirmation email to your inbox. Please click the link in the email to verify your account.
          </p>
          <p className="text-center text-muted-foreground">
            Once confirmed, you&apos;ll be able to access all features of your account.
          </p>
          <div className="flex flex-col gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/auth/login")}
            >
              Return to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
