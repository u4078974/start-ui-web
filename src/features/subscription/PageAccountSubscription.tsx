import React from 'react';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LuCheck, LuX } from 'react-icons/lu';

import { Icon } from '@/components/Icons';
import { Page, PageContent } from '@/components/Page';
import { useToastError } from '@/components/Toast';
import { trpc } from '@/lib/trpc/client';

import { AccountNav } from '../account/AccountNav';

export default function PageAccountSubscription() {
  const { t } = useTranslation(['subscription']);
  const router = useRouter();
  const toastError = useToastError();
  const account = trpc.account.get.useQuery();

  const isProPlan = account?.data?.plan === 'PRO_PLAN';

  const createCheckoutSession = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: async (data) => {
      if (!data.checkoutUrl) {
        return;
      }

      router.push(data.checkoutUrl);
    },
    onError: () => {
      toastError({
        title: t(
          'subscription:stripe.feedbacks.createCheckoutSessionError.title'
        ),
      });
    },
  });

  const handleUpgradeToPro = () => {
    createCheckoutSession.mutate();
  };

  return (
    <Page containerSize="lg" nav={<AccountNav />}>
      <PageContent>
        <Heading size="md">{t('subscription:title')}</Heading>
        <Flex flexDirection="row" gap="6">
          <Box
            minW="250"
            borderRadius="md"
            p="6"
            mt="4"
            boxShadow="sm"
            bg="white"
          >
            <Text fontSize="sm" fontWeight="bold" color="gray.500">
              Free plan
            </Text>
            <Text mt="6" fontSize="3xl" fontWeight="bold">
              €0
            </Text>
            <Button size="sm" disabled mt="2">
              {!isProPlan ? 'Your current plan' : 'Downgrade to free'}
            </Button>
            <Text mt="4" fontSize="sm" fontWeight="medium" color="gray.600">
              Free development and figma starter
            </Text>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                50+ Components
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                8 Developed Web and Native screens
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                No copyright
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuX} mr={2} fontSize="2xl" color="gray.400" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                Premium support
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuX} mr={2} fontSize="2xl" color="gray.400" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                Full custom development
              </Text>
            </Flex>
          </Box>
          <Box
            minW="250"
            borderRadius="md"
            p="6"
            mt="4"
            boxShadow="sm"
            bg="white"
            border="2px solid"
            borderColor="brand.600"
          >
            <Text fontSize="sm" fontWeight="bold" color="brand.700">
              Pro plan
            </Text>
            <Text mt="6" fontSize="3xl" fontWeight="bold">
              €9,99
              <Text as="span" ml="1" fontSize="sm" color="gray.600">
                / month
              </Text>
            </Text>
            <Button
              size="sm"
              mt="2"
              color={isProPlan ? 'error.600' : 'white'}
              onClick={handleUpgradeToPro}
            >
              {isProPlan ? 'Cancel my subscription' : 'Upgrade to pro'}
            </Button>
            <Text mt="4" fontSize="sm" fontWeight="medium" color="gray.600">
              Free development and figma starter
            </Text>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                100+ Components
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                16 Developed Web and Native screens
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                No copyright
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                Premium support
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuX} mr={2} fontSize="2xl" color="gray.400" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                Full custom development
              </Text>
            </Flex>
          </Box>
          <Box
            minW="250"
            borderRadius="md"
            p="6"
            mt="4"
            boxShadow="sm"
            bg="white"
          >
            <Text fontSize="sm" fontWeight="bold" color="gray.500">
              Enterprise
            </Text>
            <Text mt="6" fontSize="3xl" fontWeight="bold">
              Custom
            </Text>
            <Button mt="2">Contact us</Button>
            <Text mt="4" fontSize="sm" fontWeight="medium" color="gray.600">
              Custom developed app
            </Text>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                As much components as needed
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                As much screens as needed
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                No copyright
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                Premium support
              </Text>
            </Flex>
            <Flex>
              <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
              <Text mt="3" fontSize="sm" fontWeight="normal" color="gray.600">
                Full custom development
              </Text>
            </Flex>
          </Box>
        </Flex>
      </PageContent>
    </Page>
  );
}
