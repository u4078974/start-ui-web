import React from 'react';

import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Page, PageContent } from '@/components/Page';

import { AccountNav } from '../account/AccountNav';

export default function PageAccountSubscription() {
  const { t } = useTranslation(['subscription']);
  return (
    <Page nav={<AccountNav />}>
      <PageContent>
        <Heading size="md" flex="1">
          {t('subscription:title')}
        </Heading>
      </PageContent>
    </Page>
  );
}
