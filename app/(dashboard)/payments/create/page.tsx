"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PaymentForm from "@/components/dashboard/payment-form";

export default function PaymentCreatePage() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const createPayment = async () => {
    // if (!amount) return setError("Amount is required");

    // const { error } = await supabaseClient.from("payments").insert([{ amount, status: "pending" }]);

    // if (error) return setError(error.message);

    // router.push("/(dashboard)/payments");
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Payment</h1>
        <p className="text-gray-600">Set up a new payment</p>
      </div>
      <div className="max-w-md">
        <PaymentForm />
      </div>
    </div>
  )
}
