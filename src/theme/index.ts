import { createSystem, defaultConfig } from '@chakra-ui/react';

import tokens from '@/theme/tokens';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens,
  },
});
