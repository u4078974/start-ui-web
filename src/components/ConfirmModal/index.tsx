import React, { ComponentProps } from 'react';

import {
  Button,
  ButtonProps,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { SheetModal, SheetModalProps } from '@/components/SheetModal';

export type ConfirmModalProps = Omit<
  SheetModalProps,
  'isOpen' | 'onClose' | 'children'
> & {
  title?: React.ReactNode;
  message?: React.ReactNode;
  onConfirm: () => void;
  isEnabled?: boolean;
  children: React.ReactElement<ButtonProps>;
  confirmText?: React.ReactNode;
  confirmVariant?: ComponentProps<typeof Button>['variant'];
  cancelText?: React.ReactNode;
};

export const ConfirmModal = ({
  title,
  message,
  onConfirm,
  isEnabled = true,
  children,
  cancelText,
  confirmVariant,
  confirmText,
  ...rest
}: ConfirmModalProps) => {
  const { t } = useTranslation(['common', 'components']);
  const confirmModal = useDisclosure();

  const displayHeading =
    !title && !message ? t('components:confirmModal.heading') : title;

  if (!isEnabled) {
    const childrenWithOnClick = React.cloneElement(children, {
      onClick: onConfirm,
    });
    return <>{childrenWithOnClick}</>;
  }

  const childrenWithOnOpen = React.cloneElement(children, {
    onClick: confirmModal.onOpen,
  });

  return (
    <>
      {childrenWithOnOpen}
      <SheetModal
        isOpen={confirmModal.open}
        onClose={confirmModal.onClose}
        {...rest}
      >
        <Stack gap={4}>
          <Stack>
            {displayHeading && (
              <Heading size="sm" mb={message ? 1 : 0}>
                {displayHeading}
              </Heading>
            )}
            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
              {message}
            </Text>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            w="full"
            gap={4}
            flexDirection={{ base: 'column-reverse', sm: 'row' }}
          >
            <Button
              size={{ base: 'lg', sm: 'md' }}
              onClick={confirmModal.onClose}
            >
              {cancelText ?? t('common:actions.cancel')}
            </Button>
            <Button
              variant={confirmVariant}
              size={{ base: 'lg', sm: 'md' }}
              onClick={() => {
                onConfirm();
                confirmModal.onClose();
              }}
            >
              {confirmText ?? t('components:confirmModal.confirmText')}
            </Button>
          </Stack>
        </Stack>
      </SheetModal>
    </>
  );
};
