import SuccessIcon from '@/assets/icons/success-icon.svg?react';
import {
  Button,
  DialogComponent,
  NotificationModal,
  Sheet,
} from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { useCancelViewing } from '../hooks/useCancelViewing';
import { CancelContent } from './CancelContent';

type CancelModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const CancelModal = ({ isOpen, setIsOpen }: CancelModalProps) => {
  const { isMobile } = useMobile();
  const {
    form,
    isButtonDisabled,
    showSuccessModal,
    setShowSuccessModal,
    onSubmit,
  } = useCancelViewing();

  const handleConfirmCancel = () => {
    form.handleSubmit((data) => {
      onSubmit(data);
      setIsOpen(false);
    })();
  };

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const ModalContent = () => {
    return (
      <CancelContent
        onClose={handleClose}
        onConfirm={handleConfirmCancel}
        form={form}
        onSubmit={onSubmit}
        isButtonDisabled={isButtonDisabled}
      />
    );
  };

  const CancelModalWrapper = isMobile ? (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent />
    </Sheet>
  ) : (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full md:w-1/2 xl:w-1/3"
    >
      <ModalContent />
    </DialogComponent>
  );

  return (
    <>
      {CancelModalWrapper}
      <NotificationModal
        modalOptions={{
          open: showSuccessModal,
          onOpenChange: setShowSuccessModal,
        }}
        title="Viewing cancelled"
        description="You have successfully cancelled the viewing"
        icon={SuccessIcon}
        className="w-full md:w-1/2 xl:w-1/3"
        actions={
          <div className="flex gap-2 w-full justify-center px-4">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-2/3 lg:w-1/2 h-11"
              size="lg"
            >
              Done
            </Button>
          </div>
        }
      />
    </>
  );
};