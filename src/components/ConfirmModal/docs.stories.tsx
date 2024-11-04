import { ConfirmModal } from '@/components/ConfirmModal';
import { Button } from '@/components/chakra-ui/button';

export default {
  title: 'ConfirmModal',
};

export const Default = () => {
  return (
    <ConfirmModal onConfirm={() => alert('Custom Action')}>
      <Button>Trigger</Button>
    </ConfirmModal>
  );
};

export const WithDisableConfirmation = () => {
  return (
    <ConfirmModal onConfirm={() => alert('Custom Action')} isEnabled={false}>
      <Button visual="@primary">Trigger</Button>
    </ConfirmModal>
  );
};
