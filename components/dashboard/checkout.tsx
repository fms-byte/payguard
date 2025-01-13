"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import LoadingSpinner from "../shared/loading-spinner";

const CheckoutPage = ({
  amount,
  clientSecret,
  onSuccess,
}: {
  amount: number;
  paymentId: string;
  clientSecret: string;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe is not initialized properly.");
      setLoading(false);
      return;
    }
  
    const { error: submitError } = await elements.submit();
  
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
  
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payments`,
      },
      redirect: "if_required",
    });
  
    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
      // router.push("/payments")
    }
  
    setLoading(false);
  };

  if (!stripe || !elements) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      <PaymentElement />
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