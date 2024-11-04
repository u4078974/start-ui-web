import {
  Box,
  DialogCloseTrigger,
  DialogRoot,
  DialogRootProps,
} from '@chakra-ui/react';
import { Sheet } from 'react-modal-sheet';

import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
} from '@/components/chakra-ui/dialog';

export type SheetModalProps = Pick<
  React.ComponentProps<typeof Sheet>,
  'isOpen' | 'onClose' | 'children'
> & { size?: DialogRootProps['size'] };

export const SheetModal = (props: SheetModalProps) => {
  return (
    <>
      <Box
        asChild
        css={{
          '& .react-modal-sheet-backdrop': {
            display: { base: 'flex', sm: 'none !important' },
            backdropFilter: 'blur(4px)',
            background: 'rgba(0,0,0,0.4) !important',
          },
          '& .react-modal-sheet-container': {
            display: { base: 'flex', sm: 'none !important' },
            background: 'white !important',
          },
          // '& .react-modal-sheet-header': {},
          // '& .react-modal-sheet-drag-indicator': {},
          '& .react-modal-sheet-content': {
            px: 4,
            pb: 12,
          },
          _dark: {
            '& .react-modal-sheet-container': {
              background: 'gray.800 !important',
            },
          },
        }}
      >
        <Sheet
          isOpen={props.isOpen}
          onClose={props.onClose}
          detent="content-height"
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>{props.children}</Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      </Box>
      <DialogRoot open={props.isOpen} size={props.size}>
        <DialogBackdrop display={{ base: 'none', sm: 'flex' }} />
        <DialogContent display={{ base: 'none', sm: 'flex' }}>
          <DialogCloseTrigger />
          <DialogBody>{props.children}</DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};
