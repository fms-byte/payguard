"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/utils/convertToSubcurrency";
import LoadingSpinner from "../shared/loading-spinner";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const CheckoutPage = ({
  amount,
  paymentId,
  onSuccess,
}: {
  amount: number;
  paymentId: string;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   fetch("/api/create-payment", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ amount: convertToSubcurrency(amount), paymentId: paymentId }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, [amount, paymentId]);


  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: convertToSubcurrency(amount),
          paymentId, // Pass unique payment ID
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        console.error("Error creating payment intent:", error);
        setErrorMessage("Failed to initialize payment.");
        return;
      }

      const data = await response.json();
      setClientSecret(data.clientSecret); // Store clientSecret
    };

    fetchClientSecret();
  }, [amount, paymentId]);
  

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const { error: submitError } = await elements.submit();

  //   if (submitError) {
  //     setErrorMessage(submitError.message);
  //     setLoading(false);
  //     return;
  //   }

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     clientSecret,
  //     confirmParams: {
  //       return_url: `http://localhost:3000/payments/success?amount=${amount}`,
  //     },
  //   });

  //   if (error) {
  //     // This point is only reached if there's an immediate error when
  //     // confirming the payment. Show the error to your customer (for example, payment details incomplete)
  //     setErrorMessage(error.message);
  //   } else {
  //     // The payment UI automatically closes with a success animation.
  //     // Your customer is redirected to your `return_url`.
  //     onSuccess();
  //     router.push("/payments");
  //   }

  //   setLoading(false);
  // };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe is not initialized properly.");
      setLoading(false);
      return;
    }
  
    // Step 1: Submit the payment form (collect payment details)
    const { error: submitError } = await elements.submit();
  
    if (submitError) {
      // Handle validation errors from `elements.submit()`
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
  
    // Step 2: Confirm the payment intent
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret, // Use the retrieved clientSecret
      confirmParams: {
        return_url: `http://localhost:3000/payments/success`,
      },
      redirect: "if_required", // Prevent automatic redirect for testing
    });
  
    if (error) {
      // Handle immediate errors when confirming the payment
      setErrorMessage(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      // Payment succeeded, trigger success callback
      onSuccess();
    }
  
    setLoading(false);
  };
  
  

  if (!clientSecret || !stripe || !elements) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount.toFixed(2)}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
