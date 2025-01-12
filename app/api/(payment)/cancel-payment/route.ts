import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();

    await stripe.paymentIntents.cancel(paymentIntentId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error canceling payment intent:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}