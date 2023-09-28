import { accountRouter } from '@/server/api/routers/account';
import { authRouter } from '@/server/api/routers/auth';
import { repositoriesRouter } from '@/server/api/routers/repositories';
import { usersRouter } from '@/server/api/routers/users';
import { createTRPCRouter } from '@/server/api/trpc';

import { stripeRouter } from './routers/stripe';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  account: accountRouter,
  repositories: repositoriesRouter,
  users: usersRouter,
  stripe: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
