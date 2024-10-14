import { useEffect } from 'react';

import {
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  StackProps,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LuArrowLeft, LuMoon, LuSun } from 'react-icons/lu';

import { useCmdkStore } from '@/components/CommandMenu/store';
import { Icon } from '@/components/Icons';
import { ROUTES_APP } from '@/features/app/routes';
import { ROUTES_REPOSITORIES } from '@/features/repositories/routes';
import { AVAILABLE_LANGUAGES } from '@/lib/i18n/constants';

export const CommandMenu = () => {
  const cmdk = useCmdkStore((store) => ({
    isOpen: store.isOpen,
    close: store.close,
    currentPage: store.currentPage,
  }));

  const toggleCmdk = useCmdkStore((store) => store.toggle);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCmdk();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleCmdk]);

  return (
    <Modal isOpen={cmdk.isOpen} onClose={cmdk.close}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Stack as={Command} spacing={6}>
            <CommandInput />
            <CommandEmpty />
            {!cmdk.currentPage && (
              <CommandList>
                <CommandGroupNavigation />
                <CommandGroupPreferences />
              </CommandList>
            )}
            {cmdk.currentPage === 'update-language' && (
              <CommandGroupPreferencesLanguage />
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const CommandGroupNavigation = () => {
  const closeCmdk = useCmdkStore.getState().close;
  const router = useRouter();

  const handleGoTo = (route: string) => {
    router.push(route);
    closeCmdk();
  };
  return (
    <CommandGroup title="Go to...">
      <CommandItem onSelect={() => handleGoTo(ROUTES_APP.root())}>
        Dashboard
      </CommandItem>
      <CommandItem onSelect={() => handleGoTo(ROUTES_REPOSITORIES.app.root())}>
        Repository
      </CommandItem>
    </CommandGroup>
  );
};

const CommandGroupPreferences = () => {
  const appendPage = useCmdkStore.getState().appendPage;
  const { colorMode, setColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <CommandGroup title="Préférences">
      <CommandItem
        label={`Set ${isDarkMode ? 'light' : 'dark'} mode`}
        icon={isDarkMode ? LuSun : LuMoon}
        onSelect={() => setColorMode(isDarkMode ? 'light' : 'dark')}
      />
      <CommandItem
        label="Change language"
        onSelect={() => {
          appendPage('update-language');
        }}
      />
    </CommandGroup>
  );
};

const CommandGroupPreferencesLanguage = () => {
  const closeCmdk = useCmdkStore.getState().close;

  const { t, i18n } = useTranslation(['common']);

  return (
    <CommandList>
      <CommandGoBack />
      {AVAILABLE_LANGUAGES.map(({ key }) => (
        <CommandItem
          key={key}
          onSelect={() => {
            i18n.changeLanguage(key);
            closeCmdk();
          }}
          label={t(`common:languages.${key}`)}
        />
      ))}
    </CommandList>
  );
};

const CommandGoBack = () => {
  const goBack = useCmdkStore.getState().goBack;

  return (
    <CommandItem
      onSelect={() => goBack()}
      icon={LuArrowLeft}
      fontWeight="bold"
      fontSize="sm"
      label="Return..."
    />
  );
};

const CommandItem: React.FC<
  Omit<StackProps, 'children'> & {
    onSelect?: (value: string) => void;
    icon?: React.FC<React.PropsWithChildren<unknown>>;
    label?: string;
    children?: string;
  }
> = ({ onSelect, icon, label, children, ...rest }) => {
  return (
    <HStack as={Command.Item} onSelect={onSelect} py={1} {...rest}>
      {icon && <Icon icon={icon} />}
      <Text>{label ?? children}</Text>
    </HStack>
  );
};

const CommandGroup: React.FC<StackProps & { title?: string }> = ({
  title,
  ...rest
}) => {
  return (
    <Stack
      as={Command.Group}
      heading={
        title ? (
          <Text fontSize="xs" fontWeight="bold">
            {title}
          </Text>
        ) : undefined
      }
      spacing={1}
      mb={6}
      _last={{ mb: 0 }}
      {...rest}
    />
  );
};

const CommandList: React.FC<StackProps> = (props) => {
  return <Stack as={Command.List} spacing={12} {...props} />;
};

const CommandInput = () => {
  // const cmdk = useCmdkStore((store) => ({
  //   search: store.search,
  //   setSearch: store.setSearch,
  // }));

  return (
    <Input
      as={Command.Input}
      placeholder="Search something"
      // value={cmdk.search}
      // onChange={(e) => cmdk.setSearch(e.target.value)}
    />
  );
};

const CommandEmpty = () => {
  const cmdk = useCmdkStore((store) => ({
    search: store.search,
  }));
  return <Command.Empty>No results found for "{cmdk.search}".</Command.Empty>;
};
