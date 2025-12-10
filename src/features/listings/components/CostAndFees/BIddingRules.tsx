import { Button, DialogComponent, Sheet } from '@/shared/components';
import { FormSwitch } from '@/shared/components/Form';
import { useMobile } from '@/shared/hooks';
import { Cancel01Icon } from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';
import type { RentalPriceFormValues } from '../../types';
import { NavigateButtons } from '../shared';

type BiddingRulesProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<RentalPriceFormValues>;
};

export const BiddingRules = ({
  isOpen,
  setIsOpen,
  form,
}: BiddingRulesProps) => {
  const { isMobile } = useMobile();

  const BidRules = () => {
    return (
      <div className="bg-white rounded-[1.25em] p-6 flex flex-col gap-6">
        <div className="flex justify-between text-black-500">
          <h2 className="text-heading-3-semibold ">Bidding rules</h2>
          {!isMobile && (
            <Cancel01Icon
              className="size-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
        <p className="text-body-base-normal text-black-400">
          Toggle applicable rules for you listing
        </p>
        <div className="flex flex-col gap-10 pt-6">
          <div className="flex justify-between gap-8">
            <h5 className="text-body lg:text-body-medium text-icons-black">
              Automatically accept highest bidder when bidding ends
            </h5>

            <FormSwitch
              control={form.control}
              name="autoAcceptHighestBidder"
              className="h-8 w-12 border-none"
              thumbClassName="size-7"
            />
          </div>

          <div className="flex  gap-8">
            <h5 className="text-body lg:text-body-medium text-icons-black">
              If a bid is placed within the last 24 hours, extend the duration
              by 30 days
            </h5>
            <FormSwitch
              control={form.control}
              name="extendLastMinuteBid"
              className="h-8 w-12 border-none"
              thumbClassName="size-7"
            />
          </div>
        </div>
        <div className="flex justify-end pt-20">
          {isMobile ? (
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              Save
            </Button>
          ) : (
            <NavigateButtons
              onBack={() => setIsOpen(false)}
              onContinue={() => setIsOpen(false)}
              btnText="Cancel"
              saveBtnText="Save"
            />
          )}
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        children={<BidRules />}
        className="max-h-[70vh]"
      />
    );
  }
  return (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-[2em] border-0 lg:w-3/6 xl:w-1/4"
      children={<BidRules />}
    />
  );
};
