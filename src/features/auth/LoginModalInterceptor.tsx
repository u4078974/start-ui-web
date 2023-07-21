import React, { useEffect, useRef } from 'react';

import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/features/auth/AuthContext';
import { LoginForm } from '@/features/auth/LoginForm';

export const LoginModalInterceptor = ({ reset }: { reset: () => void }) => {
  const { t } = useTranslation(['auth']);
  const { isAuthenticated, updateToken } = useAuthContext();
  const queryCache = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const handleLogin = async () => {
    await queryCache.refetchQueries();
    reset();
  };

  // Clear the token and close the modal if we click on a link (like the reset link) inside of the modal
  useEffect(
    () => () => {
      queryCache.cancelQueries();

      if (pathname !== pathnameRef.current) {
        updateToken(null);
        reset();
      }
    },
    [reset, updateToken, pathname, queryCache]
  );

  return (
    <Modal
      isOpen={isAuthenticated}
      onClose={() => navigate('/login')}
      closeOnOverlayClick={false}
      trapFocus={false}
    >
      <ModalOverlay style={{ backdropFilter: 'blur(6px)' }} />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p="6">
          <Heading size="lg">{t('auth:interceptor.title')}</Heading>
          <Text mb="2">{t('auth:interceptor.description')}</Text>
          <LoginForm onSuccess={handleLogin} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
