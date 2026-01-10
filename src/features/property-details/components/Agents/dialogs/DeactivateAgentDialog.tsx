import { Button, DialogComponent, Sheet } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { Cancel01Icon } from 'hugeicons-react';

type DeactivateAgentDialogProps = {
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeactivate: () => Promise<void>;
};

export const DeactivateAgentDialog = ({
  isLoading,
  isOpen,
  setIsOpen,
  handleDeactivate,
}: DeactivateAgentDialogProps) => {
  const { isMobile } = useMobile();

  const DeactivateAgentContent = (
    <div className="p-6 flex gap-4 flex-col">
      <div className="flex items-center text-black-500 justify-between">
        <h3 className="text-heading-3-semibold">Deactivate agent</h3>
        {!isMobile && (
          <Cancel01Icon
            className="size-6 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      <p className="text-body-base-normal text-black-300">
        Are you sure you want to deactivate this agent? This agent will no
        longer be able to list units under your property
      </p>
      <div className="flex items-center justify-end gap-4 pt-10">
        <Button variant="tertiary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          onClick={handleDeactivate}
          variant="danger"
        >
          Yes, deactivate
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        children={DeactivateAgentContent}
        className="max-h-[60vh] rounded-t-2xl"
      />
    );
  }
  return (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-[2em] border-0 lg:w-3/5 xl:w-1/3"
      children={DeactivateAgentContent}
    />
  );
};