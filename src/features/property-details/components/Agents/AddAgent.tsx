import { Button, DialogComponent, Sheet } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useMobile } from '@/shared/hooks';
import { Cancel01Icon } from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';

type AddAgentProps = {
  form: UseFormReturn<{ agentEmail: string }>;
  onSubmit: (data: { agentEmail: string }) => void;
  isDisabled: boolean;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddAgent = ({
  form,
  onSubmit,
  isDisabled,
  isLoading,
  isOpen,
  setIsOpen,
}: AddAgentProps) => {
  const { isMobile } = useMobile();
  const AddAgentContent = (
    <div className="py-6 flex gap-8 flex-col">
      <div className="border-b border-b-custom-neutral-200/60">
        <div className="flex px-6 pb-4 items-center text-black-500 justify-between">
          <h3 className="text-heading-3-semibold ">Add agent</h3>
          {!isMobile && (
            <Cancel01Icon
              className="size-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
      </div>

      <p className='text-body-base-normal text-black-300 px-6'>
        An invite will be sent to this agent. Once accepted agents will be able
        to list units under this property
      </p>
      <div className="px-6">
        <Form form={form} onSubmit={onSubmit}>
          <FormInput
            label="Email address"
            control={form.control}
            name="agentEmail"
            placeholder="Enter agent email address"
            showErrorMessage
          />

          <div className="flex items-center justify-end gap-4 pt-10">
            <Button variant="tertiary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={isDisabled}
              isLoading={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Send invite
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        children={AddAgentContent}
        className="max-h-[60vh] rounded-t-2xl"
      />
    );
  }
  return (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-[2em] border-0 lg:w-3/6 xl:w-1/3"
      children={AddAgentContent}
    />
  );
};
