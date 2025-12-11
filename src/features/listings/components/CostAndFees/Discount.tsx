import { Button } from '@/shared/components';
import { CollapsibleComponent } from '@/shared/components/Collapsible';
import { Form, FormInput } from '@/shared/components/Form';
import { cn } from '@/shared/lib/utils';
import { percentageFormatter } from '@/shared/utils';
import { Add01Icon, Delete01Icon, DiscountTag02Icon } from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';
import type { DiscountFormValues } from '../../types';

type DiscountProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<DiscountFormValues>;
  onSubmit: (data: DiscountFormValues) => void;
  isButtonDisabled: boolean;
};

export const DiscountCard = (props: DiscountProps) => {
  return (
    <CollapsibleComponent
      onOpenChange={props.setIsOpen}
      open={props.isOpen}
      className="rounded-[1.25em] bg-sidebar"
      headerTrigger={
        <div className="flex items-center p-6 justify-between gap-6  rounded-[1.25em]">
          <div className="flex flex-col gap-4 border-none">
            <div className="flex gap-2 items-center text-gray-600">
              <DiscountTag02Icon className="h-5 w-5" />
              <h5 className="text-body-lg">Discount</h5>
            </div>

            <p className="text-body-small text-black-400">
              Help your listing stand by giving property seekers a discount
            </p>
          </div>

          <div
            className={cn(
              'flex justify-center rounded-full items-center p-4 cursor-pointer bg-white border border-sidebar-border'
            )}
            onClick={() => props.setIsOpen(!props.isOpen)}
          >
            {props.isOpen ? (
              <Delete01Icon className="text-black-400 size-4" />
            ) : (
              <Add01Icon className="text-black-400 size-4" />
            )}
          </div>
        </div>
      }
      children={
        <Form form={props.form} onSubmit={props.onSubmit}>
          <div className="flex flex-col gap-4 p-6">
            <FormInput
              control={props.form.control}
              name="discount"
              label="% discount"
              formatter={percentageFormatter}
              showErrorMessage
              size="sm"
            />
            <FormInput
              control={props.form.control}
              name="duration"
              label="Duration"
              type="date"
              showErrorMessage
              size="sm"
              description="Your listing price will go back to its default price after the duration"
            />
          </div>
          <div className="flex justify-end px-6 pb-4 gap-4">
            <Button
              variant="tertiary"
              className="w-1/2 lg:w-auto"
              onClick={() => props.setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={props.isButtonDisabled}
              className="w-1/2 lg:w-auto"
            >
              Add
            </Button>
          </div>
        </Form>
      }
    />
  );
};
