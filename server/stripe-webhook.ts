import type { Request, Response } from "express";
import Stripe from "stripe";
import { getDb } from "./db";
import { users, subscriptions, payments } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-04-30.basil" as any,
});

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  console.log(`[Stripe Webhook] Received event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }
      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`[Stripe Webhook] Error processing ${event.type}:`, error);
  }

  res.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const db = await getDb();
  if (!db) return;

  const userId = session.metadata?.user_id;
  const customerId = session.customer as string;

  if (userId && customerId) {
    await db
      .update(users)
      .set({ stripeCustomerId: customerId })
      .where(eq(users.id, parseInt(userId)));
  }

  console.log(`[Stripe] Checkout completed for user ${userId}, customer ${customerId}`);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const db = await getDb();
  if (!db) return;

  const customerId = subscription.customer as string;

  // Find user by stripe customer ID
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.stripeCustomerId, customerId))
    .limit(1);

  if (!user) {
    console.warn(`[Stripe] No user found for customer ${customerId}`);
    return;
  }

  const priceId = subscription.items.data[0]?.price?.id || "";

  // Upsert subscription
  const [existing] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id))
    .limit(1);

  if (existing) {
    await db
      .update(subscriptions)
      .set({ status: subscription.status, stripePriceId: priceId })
      .where(eq(subscriptions.id, existing.id));
  } else {
    await db.insert(subscriptions).values({
      userId: user.id,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      status: subscription.status,
    });
  }

  console.log(`[Stripe] Subscription ${subscription.id} updated: ${subscription.status}`);
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const db = await getDb();
  if (!db) return;

  await db
    .update(subscriptions)
    .set({ status: "canceled" })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

  console.log(`[Stripe] Subscription ${subscription.id} canceled`);
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const db = await getDb();
  if (!db) return;

  const userId = paymentIntent.metadata?.user_id;

  await db.insert(payments).values({
    userId: userId ? parseInt(userId) : null,
    stripePaymentIntentId: paymentIntent.id,
    productName: paymentIntent.metadata?.product_name || null,
    amountCents: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: paymentIntent.status,
  });

  console.log(`[Stripe] Payment ${paymentIntent.id} succeeded: ${paymentIntent.amount} ${paymentIntent.currency}`);
}
