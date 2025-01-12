"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPaymentSchema } from "@/lib/schema/payment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import convertToSubcurrency from "@/lib/utils/convertToSubcurrency";

type FormData = {
  title: string;
  amount: number;
};

export default function PaymentForm({
  onPaymentCreated,
}: {
  onPaymentCreated: (payment: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createPaymentSchema),
  });

  // const onSubmit = async (data: FormData) => {
  //   setLoading(true);
  //   const supabase = createClient();

  //   try {
  //     const response = await fetch("/api/create-payment", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         amount: convertToSubcurrency(data.amount),
  //         title: data.title,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create payment intent");
  //     }

  //     const { clientSecret, paymentIntentId } = await response.json();

  //     const { data: payment, error } = await supabase
  //       .from("payments")
  //       .insert({
  //         title: data.title,
  //         amount: data.amount,
  //         status: "pending",
  //         user_id: (await supabase.auth.getUser()).data.user?.id,
  //         stripe_payment_intent_id: paymentIntentId,
  //       })
  //       .select()
  //       .single();

  //     if (error) {
  //       // If Supabase insert fails, cancel the payment intent
  //       await fetch("/api/cancel-payment", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ paymentIntentId }),
  //       });
  //       throw error;
  //     }

  //     reset();
  //     onPaymentCreated({ ...payment, clientSecret});
  //   } catch (error) {
  //     console.error("Error creating payment:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const supabase = createClient();
  
    try {
      // Insert payment record in Supabase first to get its ID
      const { data: payment, error } = await supabase
        .from("payments")
        .insert({
          title: data.title,
          amount: data.amount,
          status: "pending",
          user_id: (await supabase.auth.getUser()).data.user?.id,
        })
        .select()
        .single();
  
      if (error) {
        throw new Error("Failed to create payment record");
      }
  
      // Send the unique Supabase payment ID to the Stripe create-payment endpoint
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: convertToSubcurrency(data.amount),
          title: data.title,
          paymentId: payment.id, // Pass unique ID from Supabase
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }
  
      const { clientSecret, paymentIntentId } = await response.json();
  
      // Update the payment record with the Stripe intent ID
      await supabase
        .from("payments")
        .update({ stripe_payment_intent_id: paymentIntentId })
        .eq("id", payment.id);
  
      reset();
      onPaymentCreated({ ...payment, clientSecret });
    } catch (error) {
      console.error("Error creating payment:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Payment Title</Label>
        <Input
          id="title"
          {...register("title")}
          disabled={loading}
          placeholder="Enter payment title"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="amount">Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
          disabled={loading}
          placeholder="Enter amount"
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Payment"}
      </Button>
    </form>
  );
}
