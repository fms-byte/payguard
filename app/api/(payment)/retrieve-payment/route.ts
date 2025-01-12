import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    return NextResponse.json({ error: "Failed to retrieve payment intent" }, { status: 500 });
  }
}
