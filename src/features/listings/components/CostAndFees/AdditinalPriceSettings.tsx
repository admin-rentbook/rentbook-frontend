import { Button, DialogComponent, Sheet } from '@/shared/components';
import {
  Form,
  FormInput,
  FormRadio,
  FormSelect,
} from '@/shared/components/Form';
import { useMobile } from '@/shared/hooks';
import { currencyFormatter } from '@/shared/utils';
import { Cancel01Icon } from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';
import { feeTypes, paymentFreqOptions } from '../../constants';
import type { AdditionalFeeFormValues } from '../../types';
import { NavigateButtons } from '../shared';

type AdditionalPriceSettingProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<AdditionalFeeFormValues>;
  onSubmit: (data: AdditionalFeeFormValues) => void;
  isButtonDisabled: boolean;
};
export const AdditionalPriceSetting = ({
  isOpen,
  setIsOpen,
  form,
  onSubmit,
  isButtonDisabled,
}: AdditionalPriceSettingProps) => {
  const { isMobile } = useMobile();

  const AdditionalFee = () => {
    return (
      <div className="bg-white rounded-[1.25em] p-6 flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-6 ">
          <div className="flex items-center justify-between text-black-500">
            <h2 className="text-heading-3-semibold ">Additional fee</h2>
            {!isMobile && (
              <Cancel01Icon
                className="size-6 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            )}
          </div>

          <p className="text-body-base-normal text-black-400">
            Let renters know the fee type and amount, when it's charged, and
            whether it's included in the base rent. These details will appear on
            your listing.
          </p>
        </div>

        <Form form={form} onSubmit={onSubmit} className="h-full">
          <div className="flex flex-col h-full justify-between lg:justify-center gap-4">
            <div className="flex flex-col gap-4 h-full lg:h-auto">
              <FormInput
                control={form.control}
                name="feeName"
                label="Fee name"
                showErrorMessage
                size="sm"
              />
              <FormSelect
                control={form.control}
                options={paymentFreqOptions}
                name="paymentFrequency"
                label="Payment frequency"
                size="sm"
              />
              <FormInput
                control={form.control}
                name="amount"
                label="Amount"
                showErrorMessage
                size="sm"
                formatter={currencyFormatter}
              />
              <div className="flex flex-col gap-3">
                <p className="text-body-medium text-black-500">
                  Is this fee required?
                </p>
                <FormRadio
                  control={form.control}
                  name="feeRequirement"
                  options={feeTypes}
                />
              </div>
            </div>

            {isMobile ? (
              <Button disabled={isButtonDisabled}>Save</Button>
            ) : (
              <NavigateButtons
                onBack={() => setIsOpen(false)}
                isButtonDisabled={isButtonDisabled}
                btnText="Cancel"
              />
            )}
          </div>
        </Form>
      </div>
    );
  };

  if (isMobile) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        children={<AdditionalFee />}
      />
    );
  }

  return (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-[2em] border-0 lg:w-3/6 xl:w-1/4"
      children={<AdditionalFee />}
    />
  );
};
