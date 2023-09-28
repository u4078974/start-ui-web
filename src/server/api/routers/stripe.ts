import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/stripe/createCheckoutSession',
        tags: ['stripe'],
      },
    })
    .input(z.object({}))
    .output(
      z.object({
        checkoutUrl: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx }) => {
      const { stripe, user } = ctx;

      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : `https://${process.env.NEXT_PUBLIC_BASE_URL}`;

      const checkoutSession = await stripe.checkout.sessions.create({
        client_reference_id: user?.id,
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/account/subscription?checkoutSuccess=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/account/subscription`,
        subscription_data: {
          metadata: {
            userId: user?.id,
          },
        },
      });

      if (!checkoutSession) {
        throw new Error('Could not create checkout session');
      }

      return { checkoutUrl: checkoutSession.url };
    }),
});
