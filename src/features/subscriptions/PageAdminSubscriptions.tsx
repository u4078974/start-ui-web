import React from 'react';

import { HStack, Heading, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Page, PageContent } from '@/components/Page';

import { AdminNav } from '../admin/AdminNav';

export default function PageAdminSubscriptions() {
  const { t } = useTranslation(['subscriptions']);
  return (
    <Page containerSize="xl" nav={<AdminNav />}>
      <PageContent>
        <Stack spacing={4}>
          <HStack spacing={4}>
            <Heading size="md" flex="1">
              {t('subscriptions:title')}
            </Heading>
          </HStack>
        </Stack>
      </PageContent>
    </Page>
  );
}
