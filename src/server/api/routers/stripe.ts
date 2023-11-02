import { TRPCError } from '@trpc/server';
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
    .input(z.void())
    .output(
      z.object({
        checkoutUrl: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx }) => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      let customerId = ctx.user?.stripeCustomerId;

      if (!customerId) {
        const customer = await ctx.stripe.customers.create({
          email: ctx.user.email ?? undefined,
          name: ctx.user.name ?? undefined,
          metadata: {
            userId: ctx.user.id,
          },
        });

        await ctx.db.user.update({
          where: {
            id: ctx.user.id,
          },
          data: {
            stripeCustomerId: customer.id,
          },
        });

        customerId = customer.id;
      }

      const checkoutSession = await ctx.stripe.checkout.sessions.create({
        client_reference_id: ctx.user?.id,
        payment_method_types: ['card'],
        mode: 'subscription',
        customer: customerId,
        line_items: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/account/subscription`,
        cancel_url: `${baseUrl}/account/subscription`,
        subscription_data: {
          metadata: {
            userId: ctx.user?.id,
          },
        },
      });

      if (!checkoutSession) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }

      return { checkoutUrl: checkoutSession.url };
    }),
  cancelSubscription: protectedProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/stripe/cancelSubscription',
        tags: ['stripe'],
      },
    })
    .input(z.void())
    .output(z.void())
    .mutation(async ({ ctx }) => {
      if (!ctx.user.stripeSubscriptionId) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      const subscription = await ctx.stripe.subscriptions.update(
        ctx.user.stripeSubscriptionId,
        {
          cancel_at_period_end: true,
        }
      );

      if (!subscription.cancel_at_period_end) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
      }
    }),
});
