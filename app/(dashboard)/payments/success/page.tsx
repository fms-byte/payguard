"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <div className="container max-w-md min-h-screen flex flex-col items-center justify-center p-8">
      <Card className="w-full">
        <CardContent className="pt-6 text-center">
          <div className="mb-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Payment Successful!
            </h1>
            <p className="text-sm text-muted-foreground">
              Your payment has been processed successfully
            </p>
          </div>

          <div className="bg-muted p-6 rounded-lg mb-6">
            <div className="text-sm text-muted-foreground mb-1">Amount paid</div>
            <div className="text-3xl font-bold">
              ${parseFloat(amount).toFixed(2)}
            </div>
          </div>

          <Link href="/payments" className="block">
            <Button className="w-full" size="lg">
              Return to Payments
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}