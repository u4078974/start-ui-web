import { ReactNode } from 'react';

import { Navigate } from '@tanstack/router';

import { useAuthContext } from '@/features/auth/AuthContext';

export const PublicOnlyRouteGuard = ({ children }: { children: TODO }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    // <ErrorBoundary>{children}</ErrorBoundary>
    children
  );
};
