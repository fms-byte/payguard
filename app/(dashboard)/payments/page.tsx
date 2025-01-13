"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import PaymentForm from "@/components/dashboard/payment-form";
import PaymentList from "@/components/dashboard/payment-list";
import CheckoutForm from "@/components/dashboard/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Payment } from "@/lib/schema/payment";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setPayments(data);
  };

  const handlePaymentCreated = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  const handlePaymentSuccess = async () => {
    setOpen(false);
    setSelectedPayment(null);
    await fetchPayments();
  };

  const handleDialogClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedPayment(null);
    }
  };

  return (
    <div className="container min-h-screen p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-gray-600">Manage your payments</p>
        </div>

        <Dialog open={open} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button>New Payment</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create Payment</DialogTitle>
              <DialogDescription>Set up a new payment</DialogDescription>
            </DialogHeader>

            {!selectedPayment ? (
              <PaymentForm onPaymentCreated={handlePaymentCreated} />
            ) : selectedPayment.clientSecret ? (
              <div className="flex justify-center items-start bg-gray-100 p-2 rounded-2xl">
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: selectedPayment.clientSecret,
                    appearance: {
                      theme: "stripe",
                    },
                  }}
                >
                  <CheckoutForm
                    amount={selectedPayment.amount}
                    paymentId={selectedPayment.id}
                    clientSecret={selectedPayment.clientSecret}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </div>
            ) : (
              <div className="text-center p-4 text-red-500">
                Error initializing payment. Please try again.
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <PaymentList payments={payments} onUpdate={fetchPayments} />
    </div>
  );
}
