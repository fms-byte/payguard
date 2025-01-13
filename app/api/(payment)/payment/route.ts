import { NextResponse } from "next/server";
// import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2024-12-18.acacia",
// });

export async function GET() {
  try {
    // const { amount, paymentId, title, origin } = await request.json();

    // console.log(origin)

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount,
    //   currency: "usd",
    //   automatic_payment_methods: { enabled: true },
    //   metadata: {
    //     title,
    //     payment_id: paymentId,
    //   }
    // });

    return NextResponse.json({ success: true, status: 200 });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
