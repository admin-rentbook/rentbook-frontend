import SuccessIcon from '@/assets/icons/success-icon.svg?react';
import {
  Button,
  DialogComponent,
  NotificationModal,
  Sheet,
} from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { useReport } from '../hooks/useReport';
import { ReportDetailsContent } from './ReportDetailsContent';
import { ReportIssueContent } from './ReportIssueContent';

type ReportModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const ReportModal = ({ isOpen, setIsOpen }: ReportModalProps) => {
  const { isMobile } = useMobile();
  const {
    issueForm,
    detailsForm,
    isIssueButtonDisabled,
    isDetailsButtonDisabled,
    showDetailsModal,
    setShowDetailsModal,
    showSuccessModal,
    setShowSuccessModal,
    onIssueSubmit,
    onDetailsSubmit,
  } = useReport();

  const handleContinue = () => {
    issueForm.handleSubmit((data) => {
      onIssueSubmit(data);
    })();
  };

  const handleBack = () => {
    setShowDetailsModal(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowDetailsModal(false);
    issueForm.reset();
    detailsForm.reset();
  };

  const handleSubmitReport = (data: {
    description: string;
    evidence?: any;
  }) => {
    onDetailsSubmit(data);
    setIsOpen(false);
  };

  const IssueModalContent = () => {
    return (
      <ReportIssueContent
        onClose={handleClose}
        onContinue={handleContinue}
        form={issueForm}
        onSubmit={onIssueSubmit}
        isButtonDisabled={isIssueButtonDisabled}
      />
    );
  };

  const DetailsModalContent = () => {
    return (
      <ReportDetailsContent
        onBack={handleBack}
        onSubmit={handleSubmitReport}
        form={detailsForm}
        isButtonDisabled={isDetailsButtonDisabled}
      />
    );
  };

  const IssueModalWrapper = isMobile ? (
    <Sheet open={isOpen && !showDetailsModal} onOpenChange={setIsOpen}>
      <IssueModalContent />
    </Sheet>
  ) : (
    <DialogComponent
      open={isOpen && !showDetailsModal}
      onOpenChange={setIsOpen}
      className="w-full md:w-1/2 xl:w-1/3"
    >
      <IssueModalContent />
    </DialogComponent>
  );

  const DetailsModalWrapper = isMobile ? (
    <Sheet open={showDetailsModal} onOpenChange={setShowDetailsModal}>
      <DetailsModalContent />
    </Sheet>
  ) : (
    <DialogComponent
      open={showDetailsModal}
      onOpenChange={setShowDetailsModal}
      className="w-full md:w-1/2 xl:w-1/3"
    >
      <DetailsModalContent />
    </DialogComponent>
  );

  return (
    <>
      {IssueModalWrapper}
      {DetailsModalWrapper}
      <NotificationModal
        modalOptions={{
          open: showSuccessModal,
          onOpenChange: setShowSuccessModal,
        }}
        title="Report submitted"
        description="Your report has been successfully submitted. We will review it and take appropriate action."
        icon={SuccessIcon}
        className="w-full md:w-1/2 xl:w-1/3"
        actions={
          <div className="flex gap-2 w-full justify-center px-4">
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                handleClose();
              }}
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