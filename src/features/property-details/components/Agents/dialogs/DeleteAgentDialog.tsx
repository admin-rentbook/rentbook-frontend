import { Button, DialogComponent, Sheet } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { Cancel01Icon } from 'hugeicons-react';

type DeleteAgentDialogProps = {
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
};

export const DeleteAgentDialog = ({
  isLoading,
  isOpen,
  setIsOpen,
  handleDelete,
}: DeleteAgentDialogProps) => {
  const { isMobile } = useMobile();

  const DeleteAgentContent = (
    <div className="p-6 flex gap-4 flex-col">
      <div className="flex items-center text-black-500 justify-between">
        <h3 className="text-heading-3-semibold">Delete agent</h3>
        {!isMobile && (
          <Cancel01Icon
            className="size-6 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      <p className="text-body-base-normal text-black-300">
        Are you sure you want to delete this agent? This action cannot be
        undone
      </p>
      <div className="flex items-center justify-end gap-4 pt-10">
        <Button variant="tertiary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button isLoading={isLoading} onClick={handleDelete} variant="danger">
          Yes, delete
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        children={DeleteAgentContent}
        className="max-h-[60vh] rounded-t-2xl"
      />
    );
  }
  return (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-[2em] border-0 lg:w-3/5 xl:w-1/3"
      children={DeleteAgentContent}
    />
  );
};