import { ReactNode } from 'react';

import { Provider as ChakraProvider } from '@/components/chakra-ui/provider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
