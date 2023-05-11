import { useAuthContext } from '@/features/auth/AuthContext';

// import { useRedirectUnauthenticated } from '@/spa/router/guards/useRedirectUnauthenticated';

export const AuthenticatedGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated } = useAuthContext();

  // TODO
  // useRedirectUnauthenticated();

  // TODO Add error boundary around children
  return !isAuthenticated ? null : { children };
};
