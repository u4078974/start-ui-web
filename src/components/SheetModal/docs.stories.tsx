import { Button, Heading, Stack, useDisclosure } from '@chakra-ui/react';

import { SheetModal } from '@/components/SheetModal';

export default {
  title: 'SheetModal',
};

export const Default = () => {
  const sheet = useDisclosure();
  return (
    <>
      <Button onClick={() => sheet.onOpen()}>Open</Button>
      <SheetModal isOpen={sheet.open} onClose={() => sheet.onClose()}>
        <Stack gap={4}>
          <Heading size="sm">This dialog is a sheet on mobile</Heading>
          <Button onClick={() => sheet.onClose()}>Close</Button>
        </Stack>
      </SheetModal>
    </>
  );
};
