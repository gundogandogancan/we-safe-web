import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS: Record<string, string | undefined> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY,
  onetime: process.env.STRIPE_PRICE_ONETIME,
};

export async function POST(req: NextRequest) {
  try {
    const { planKey, locale } = (await req.json()) as {
      planKey: string;
      locale: string;
    };

    const priceId = PRICE_IDS[planKey];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL ?? "https://we-safe.io";

    const session = await stripe.checkout.sessions.create({
      mode: planKey === "monthly" ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/${locale}/support?paid=1`,
      cancel_url: `${baseUrl}/${locale}/support`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
