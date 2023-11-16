import React from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Wrap,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';
import { LuAlertCircle, LuBookOpen, LuGithub, LuX } from 'react-icons/lu';

import { Icon } from '@/components/Icons';
import { Page, PageContent } from '@/components/Page';
import { trpc } from '@/lib/trpc/client';

export default function PageDashboard() {
  const { t } = useTranslation(['dashboard']);
  const account = trpc.account.get.useQuery();

  return (
    <Page>
      {account.data?.stripeSubscriptionStatus !== 'active' && (
        <Flex
          p="2"
          flexDirection="row"
          justifyContent="space-between"
          boxShadow="md"
        >
          <Flex alignItems="center">
            <Text ml="2" fontSize="md" fontWeight="medium">
              Do you want more interesting and useful features and product?
              Upgrade to pro!
            </Text>
            <Button
              as={Link}
              href="/account/subscription"
              ml="4"
              variant="@primary"
            >
              See plans
            </Button>
          </Flex>
          <Icon fontSize="2xl" icon={LuX} />
        </Flex>
      )}
      <PageContent>
        <Heading size="md" mb="4">
          {t('dashboard:title')}
        </Heading>
        <Alert status="success" colorScheme="brand" borderRadius="md">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle fontSize="lg">
              {t('dashboard:welcome.title')}
            </AlertTitle>
            <AlertDescription display="block">
              {t('dashboard:welcome.description')}
              <br />
              <Text as="a" href="https://www.bearstudio.fr">
                <Trans t={t} i18nKey="dashboard:welcome.author" />
              </Text>
            </AlertDescription>
          </Box>
        </Alert>
        <Wrap mt="4" spacing="4">
          <Button
            variant="link"
            as="a"
            href="https://github.com/BearStudio/start-ui-web"
          >
            <Icon icon={LuGithub} me="1" /> {t('dashboard:links.github')}
          </Button>
          <Button variant="link" as="a" href="https://docs.web.start-ui.com">
            <Icon icon={LuBookOpen} me="1" />{' '}
            {t('dashboard:links.documentation')}
          </Button>
          <Button
            variant="link"
            as="a"
            href="https://github.com/BearStudio/start-ui/issues/new"
          >
            <Icon icon={LuAlertCircle} me="1" />{' '}
            {t('dashboard:links.openIssue')}
          </Button>
        </Wrap>
      </PageContent>
    </Page>
  );
}
