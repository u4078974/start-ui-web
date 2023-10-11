'use client';

import { ReactNode, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { ErrorPage } from '@/components/ErrorPage';
import { LoaderFull } from '@/components/LoaderFull';
import { useCheckAuthenticated } from '@/features/auth/hooks';

export const GuardAuthenticated = ({ children }: { children: ReactNode }) => {
  const checkAuthenticated = useCheckAuthenticated();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      checkAuthenticated.isSuccess &&
      !checkAuthenticated.data.isAuthenticated
    ) {
      router.replace(`/login?redirect=${pathname ?? '/'}`);
    }
  }, [pathname, router, checkAuthenticated.isSuccess, checkAuthenticated.data]);

  if (checkAuthenticated.isSuccess && checkAuthenticated.data.isAuthenticated) {
    return <>{children}</>;
  }

  if (checkAuthenticated.isError) {
    return <ErrorPage />;
  }

  return <LoaderFull />;
};
