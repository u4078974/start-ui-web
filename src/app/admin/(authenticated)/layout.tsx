'use client';

import { ReactNode } from 'react';

import { AdminLayout } from '@/features/admin/AdminLayout';
import { ADMIN_PATH } from '@/features/admin/constants';
import { GuardAuthenticated } from '@/features/auth/GuardAuthenticated';

export default function AutenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <GuardAuthenticated roles={['ADMIN']} loginPath={`${ADMIN_PATH}/login`}>
      <AdminLayout>{children}</AdminLayout>
    </GuardAuthenticated>
  );
}
