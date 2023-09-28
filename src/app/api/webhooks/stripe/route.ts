import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { db } from '@/server/db';
import { stripe } from '@/server/stripe/client';

interface EventDataObject {
  metadata?: {
    userId?: string;
  };
}

export const POST = async (req: Request) => {
  let event = null;
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return new Response(undefined, { status: 401 });
  }

  try {
    const payload = await req.text();

    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      'whsec_32ac5dc26fcfab2df456ef8eed94df761e3418b0aa227ffb3ded37b6421a1300'
    );
  } catch (err) {
    return new Response(undefined, { status: 402 });
  }

  if (event.type !== 'customer.subscription.updated') {
    return new Response(undefined, { status: 404 });
  }

  const eventDataObject: EventDataObject = event.data.object;
  const userId = eventDataObject?.metadata?.userId;

  if (!userId) {
    return new Response(undefined, { status: 404 });
  }

  await db.user.update({
    where: { id: userId },
    data: { plan: 'PRO_PLAN' },
  });

  return NextResponse.json({});
};
