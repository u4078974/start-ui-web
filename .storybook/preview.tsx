import React, { useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import { Preview } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from 'storybook-dark-mode';

import { Providers } from '../src/app/Providers';
import { useColorMode } from '../src/components/chakra-ui/color-mode';
import i18nGlobal from '../src/lib/i18n/client';
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE_KEY,
} from '../src/lib/i18n/constants';

const DocumentationWrapper = ({ children, context, isDarkMode }) => {
  const { i18n } = useTranslation();
  const { colorMode, setColorMode } = useColorMode();

  // Update color mode
  useEffect(() => {
    // Add timeout to prevent unsync color mode between docs and classic modes
    const timer = setTimeout(() => {
      if (isDarkMode) {
        setColorMode('dark');
      } else {
        setColorMode('light');
      }
    });
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  // Update language
  useEffect(() => {
    i18n.changeLanguage(context.globals.locale);
  }, [context.globals.locale]);

  return (
    <Box
      id="start-ui-storybook-wrapper"
      p="4"
      pb="8"
      bg={colorMode === 'dark' ? 'gray.900' : 'white'}
      flex="1"
    >
      {children}
    </Box>
  );
};

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: DEFAULT_LANGUAGE_KEY,
      toolbar: {
        icon: 'globe',
        items: AVAILABLE_LANGUAGES.map(({ key }) => ({
          value: key,
          title: i18nGlobal.t(`languages.${String(key)}`),
        })),
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: ['StyleGuide', 'Components', 'Fields', 'App Layout'],
      },
    },
    layout: 'fullscreen',
    backgrounds: { disable: true, grid: { disable: true } },
  },
  decorators: [
    (Story, context) => {
      const isDarkMode = useDarkMode();
      return (
        <Providers>
          <DocumentationWrapper context={context} isDarkMode={isDarkMode}>
            <Story />
          </DocumentationWrapper>
        </Providers>
      );
    },
  ],
};

export default preview;
