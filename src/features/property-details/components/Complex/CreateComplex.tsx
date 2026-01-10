import { CreateComplexContent } from '@/features/listings/components/AboutYourListing';
import { DialogComponent, Sheet } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { Cancel01Icon } from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';

type CreateComplexProps = {
  form: UseFormReturn<{ complexName: string }>;
  onSubmit: (data: { complexName: string }) => void;
  isDisabled: boolean;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateComplex = (props: CreateComplexProps) => {
  const { isMobile } = useMobile();

  const content = (
    <div className="py-6 flex gap-8 flex-col">
      <div className='border-b border-b-custom-neutral-200/60'>
        <div className="flex px-6 pb-4 items-center text-black-500 justify-between">
          <h3 className="text-heading-3-semibold ">Create complex</h3>
          {!isMobile && (
            <Cancel01Icon
              className="size-6 cursor-pointer"
              onClick={() => props.setIsOpen(false)}
            />
          )}
        </div>
      </div>

      <div className="px-6">
        <CreateComplexContent
          form={props.form}
          onSubmit={props.onSubmit}
          isDisabled={props.isDisabled}
          isLoading={props.isLoading}
          onClose={() => props.setIsOpen(false)}
        />
      </div>
    </div>
  );
  if (isMobile) {
    return (
      <Sheet
        open={props.isOpen}
        onOpenChange={props.setIsOpen}
        children={content}
        className="max-h-[60vh] rounded-t-2xl"
      />
    );
  }
  return (
    <DialogComponent
      open={props.isOpen}
      onOpenChange={props.setIsOpen}
      className="rounded-[2em] border-0 lg:w-3/6 xl:w-1/3"
      children={content}
    />
  );
};
