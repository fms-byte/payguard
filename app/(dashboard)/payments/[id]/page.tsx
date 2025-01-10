"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PaymentDetailsPage({ params }: { params: { id: string } }) {
  //const [payment, setPayment] = useState(null);

  // useEffect(() => {
  //   async function fetchPayment() {
  //     const { data, error } = await supabaseClient
  //       .from("payments")
  //       .select("*")
  //       .eq("id", params.id)
  //       .single();

  //     if (!error) setPayment(data);
  //   }

  //   fetchPayment();
  // }, [params.id]);

  // if (!payment) return <p>Loading...</p>;

  const payment = {
    id: params.id,
    amount: 250,
    date: "2024-01-10",
    status: "completed",
    description: "Monthly subscription",
    recipient: "John Doe"
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payment Details</h1>
        <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
          {payment.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment #{payment.id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-lg font-medium">${payment.amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-lg font-medium">{payment.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Recipient</p>
              <p className="text-lg font-medium">{payment.recipient}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-lg font-medium">{payment.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
