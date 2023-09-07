import React, { useEffect } from 'react';

import { Center, Spinner } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAuthContext } from '@/features/auth/AuthContext';

export default function PageLogout() {
  const { updateToken } = useAuthContext();
  const router = useRouter();
  const queryCache = useQueryClient();

  useEffect(() => {
    updateToken(null);
    queryCache.clear();
    router.replace('/login');
  }, [updateToken, queryCache, router]);

  return (
    <Center flex="1">
      <Spinner />
    </Center>
  );
}
