import { Button, DialogComponent, Sheet } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { Cancel01Icon } from 'hugeicons-react';

type PricingProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Pricing = ({ isOpen, setIsOpen }: PricingProps) => {
  const { isMobile } = useMobile();

  const PricingDetails = () => {
    return (
      <div className="bg-white rounded-[1.25em] p-6 flex flex-col gap-6">
        <div className="flex justify-between text-black-500">
          <h2 className="text-heading-3-semibold ">Pricing</h2>
          {!isMobile && (
            <Cancel01Icon
              className="size-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
        <p className="text-body-base-normal text-black-400">
          Rentbook applies a service fee of 5% on the first transaction
          processed through Rentbook. This fee helps maintain the quality of
          service and support that users receive. For more info, read our{' '}
          <span className="underline">Terms of Service</span>
        </p>
        <div className="flex flex-col gap-4 rounded-[1.25em] border-1 border-black/50 p-3">
          {priceDetails.map((detail) => (
            <div key={detail.name} className="flex justify-between">
              <p className="text-body-small text-black-400">{detail.name}</p>
              <p className="text-body-small text-black-400">{detail.value}</p>
            </div>
          ))}
          <div className="w-full h-[1px] bg-custom-gray-600" />
          <div className="flex justify-between">
            <p className="text-body-medium text-black-500">Renters pay</p>
            <p className="text-body-medium text-black-500">N$36.75</p>
          </div>
        </div>
        <div className="flex p-3 justify-between rounded-[1.25em] border border-custom-gray-500">
          <p className="text-body-medium text-black-500">You earn</p>
          <p className="text-body-medium text-black-500">N$35</p>
        </div>

        <div className="w-full flex justify-end pt-4">
          <Button size="sm" onClick={() => setIsOpen(!isOpen)}>
            Okay, got it
          </Button>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        children={<PricingDetails />}
      />
    );
  }
  return (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-[2em] border-0 lg:w-3/6 xl:w-1/3"
      children={<PricingDetails />}
    />
  );
};

const priceDetails = [
  {
    name: 'Rental price',
    value: 'N$35',
  },
  {
    name: `Renter's service fee (%5)`,
    value: 'N$1.65',
  },
];
