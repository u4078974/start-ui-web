import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/server/db';
import { stripe } from '@/server/stripe/client';

const getIdOrCreateCustomerIdForUser = async (event: Stripe.Event) => {
  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata.userId;

  console.log({ subscription });

  await db.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionStatus: subscription.cancel_at_period_end
        ? 'inative'
        : subscription.status,
    },
  });
};
export const POST = async (req: Request) => {
  let event = null;
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return new Response(undefined, { status: 400 });
  }

  try {
    const payload = await req.text();

    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(undefined, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      await getIdOrCreateCustomerIdForUser(event);
      break;
    case 'customer.subscription.updated':
      await getIdOrCreateCustomerIdForUser(event);
      break;
    case 'invoice.payment_failed':
      console.log('PAYMENT FAILED');
      break;
    default:
  }

  return NextResponse.json({});
};
