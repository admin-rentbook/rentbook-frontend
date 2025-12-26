import { Button } from '@/shared/components';
import { Form, FormTextarea } from '@/shared/components/Form';
import { useMobile } from '@/shared/hooks';
import { currencyFormatter } from '@/shared/utils';
import { Cancel01Icon } from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';

type CancelContentProps = {
  onClose: () => void;
  onConfirm: () => void;
  form: UseFormReturn<{
    reason: string;
  }>;
  onSubmit: (data: { reason: string }) => void;
  isButtonDisabled: boolean;
};

export const CancelContent = ({
  onClose,
  onConfirm,
  form,
  onSubmit,
  isButtonDisabled,
}: CancelContentProps) => {
  const { isMobile } = useMobile();

  const amountPaid = 200;
  const totalRefund = 200;

  return (
    <div className="p-6 space-y-6 h-full lg:h-auto flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-heading-5 text-neutral-600">Cancel viewing</h2>
          {!isMobile && (
            <Button variant="icon" className="text-black-300" onClick={onClose}>
              <Cancel01Icon className="size-6" />
            </Button>
          )}
        </div>

        <p className="text-body-small text-black-400">
          Viewing will be cancelled immediately and all renters will receive a
          full refund to their original payment method immediately.
        </p>

        <div className="rounded-[1.25em] grid grid-cols-2 p-4">
          <div className="">
            <p className="text-body-medium text-black-300">Amount Paid</p>
            <p className="text-heading-lg text-icons-black">
              {currencyFormatter.format(amountPaid, false)}
            </p>
          </div>
          <div className="">
            <p className="text-body-medium text-black-300">Total refund</p>
            <p className="text-heading-lg text-icons-black">
              {currencyFormatter.format(totalRefund, false)}
            </p>
          </div>
        </div>

        <Form form={form} onSubmit={onSubmit}>
          <FormTextarea
            control={form.control}
            name="reason"
            label="Reason for cancellation"
            placeholder="Please provide as much details as possible"
            rows={4}
          />
        </Form>
      </div>

      <div className="flex justify-end gap-3 pt-4 lg:h-auto pb-10 lg:pb-4">
        <Button
          variant="tertiary"
          size="lg"
          className="lg:w-auto w-1/2"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="lg"
          onClick={onConfirm}
          className="lg:w-auto w-1/2"
          disabled={isButtonDisabled}
        >
          Cancel viewing
        </Button>
      </div>
    </div>
  );
};
