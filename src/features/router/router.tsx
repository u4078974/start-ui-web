import { Divider, HStack } from '@chakra-ui/react';
import {
  Link,
  Navigate,
  Outlet,
  RootRoute,
  Route,
  Router,
} from '@tanstack/router';

import { ErrorPage } from '@/components/ErrorPage';
import PageLogin from '@/features/auth/PageLogin';
import { PublicOnlyRouteGuard } from '@/features/router/guards/PublicOnlyGuard';

function Root() {
  return (
    <>
      <HStack>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </HStack>

      <Divider />
      <Outlet />
    </>
  );
}

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  );
}

const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => <Navigate to="/admin/users" replace />,
});

const adminUsersRouter = new Route({
  getParentRoute: () => adminRoute,
  path: '/users',
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => (
    <PublicOnlyRouteGuard>
      <PageLogin />
    </PublicOnlyRouteGuard>
  ),
});

const error404Route = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <ErrorPage errorCode={404} />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute.addChildren([adminUsersRouter]),
  loginRoute,
  error404Route,
]);

// Create the router using your route tree
export const router = new Router({
  routeTree,
  defaultErrorComponent: ErrorPage,
  defaultPreload: false,
});

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
