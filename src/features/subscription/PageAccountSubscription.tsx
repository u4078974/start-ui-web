import React from 'react';

import { Box, Button, Flex, Heading, Tag, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LuCheck, LuX } from 'react-icons/lu';

import { Icon } from '@/components/Icons';
import { Page, PageContent } from '@/components/Page';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Loader } from '@/layout/Loader';
import { trpc } from '@/lib/trpc/client';

import { AccountNav } from '../account/AccountNav';

export default function PageAccountSubscription() {
  const { t } = useTranslation(['subscription']);
  const router = useRouter();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const account = trpc.account.get.useQuery();

  const ctx = trpc.useContext();

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
          'subscription:stripe.feedbacks.createCheckoutSession.error.title'
        ),
      });
    },
  });

  const cancelSubscription = trpc.stripe.cancelSubscription.useMutation({
    onSuccess: async () => {
      await ctx.account.invalidate();
      await ctx.account.get.refetch();

      toastSuccess({
        title: t(
          'subscription:stripe.feedbacks.cancelSubscription.success.title'
        ),
      });
    },
    onError: () => {
      toastError({
        title: t(
          'subscription:stripe.feedbacks.cancelSubscription.error.title'
        ),
      });
    },
  });

  const handleUpgradeToProOrCancel = () => {
    if (account.data?.stripeSubscriptionStatus !== 'active') {
      createCheckoutSession.mutate();
    } else {
      cancelSubscription.mutate();
    }
  };

  return (
    <Page containerSize="lg" nav={<AccountNav />}>
      <PageContent>
        <Heading size="md">{t('subscription:title')}</Heading>
        {!account.isLoading ? (
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap="6">
            <Box
              minW="250"
              borderRadius="md"
              p="6"
              mt="4"
              boxShadow="sm"
              bg="white"
              _dark={{ bg: 'gray.900' }}
            >
              <Text fontSize="sm" fontWeight="bold">
                Free plan
              </Text>
              <Text mt="6" fontSize="3xl" fontWeight="bold">
                €0
              </Text>
              {account.data?.stripeSubscriptionStatus !== 'active' ? (
                <Tag size="lg" px="3" mt="2" variant="solid">
                  Your current plan
                </Tag>
              ) : (
                <Button
                  size="sm"
                  disabled={account.data?.stripeSubscriptionStatus !== 'active'}
                  mt="2"
                  onClick={handleUpgradeToProOrCancel}
                >
                  Downgrade to free
                </Button>
              )}

              <Text
                mt="4"
                fontSize="sm"
                fontWeight="medium"
                color="gray.600"
                _dark={{ color: 'gray.300' }}
              >
                Free development and figma starter
              </Text>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  50+ Components
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  8 Developed Web and Native screens
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  No copyright
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuX} mr={2} fontSize="2xl" color="gray.400" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  Premium support
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuX} mr={2} fontSize="2xl" color="gray.400" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
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
              _dark={{ bg: 'gray.900' }}
              border="2px solid"
              borderColor="brand.600"
            >
              <Text fontSize="sm" fontWeight="bold" color="brand.700">
                Pro plan
              </Text>
              <Text mt="6" fontSize="3xl" fontWeight="bold">
                €9,99
                <Text
                  as="span"
                  ml="1"
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  / month
                </Text>
              </Text>
              <Button
                variant={
                  account.data?.stripeSubscriptionStatus !== 'active'
                    ? '@primary'
                    : 'solid'
                }
                size="sm"
                mt="2"
                color={
                  account.data?.stripeSubscriptionStatus === 'active'
                    ? 'error.600'
                    : 'white'
                }
                onClick={handleUpgradeToProOrCancel}
              >
                {account.data?.stripeSubscriptionStatus === 'active'
                  ? 'Cancel my subscription'
                  : 'Upgrade to pro'}
              </Button>
              <Text
                mt="4"
                fontSize="sm"
                fontWeight="medium"
                color="gray.600"
                _dark={{ color: 'gray.300' }}
              >
                Free development and figma starter
              </Text>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  100+ Components
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  16 Developed Web and Native screens
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  No copyright
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  Premium support
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuX} mr={2} fontSize="2xl" color="gray.400" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
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
              _dark={{ bg: 'gray.900' }}
            >
              <Text fontSize="sm" fontWeight="bold">
                Enterprise
              </Text>
              <Text mt="6" fontSize="3xl" fontWeight="bold">
                Custom
              </Text>
              <Tag size="lg" px="3" mt="2" variant="solid">
                Contact us
              </Tag>
              <Text
                mt="4"
                fontSize="sm"
                fontWeight="medium"
                color="gray.600"
                _dark={{ color: 'gray.300' }}
              >
                Custom developed app
              </Text>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  As much components as needed
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  As much screens as needed
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  No copyright
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  Premium support
                </Text>
              </Flex>
              <Flex>
                <Icon icon={LuCheck} mr={2} fontSize="2xl" color="brand.500" />
                <Text
                  mt="3"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  Full custom development
                </Text>
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Loader />
        )}
      </PageContent>
    </Page>
  );
}
