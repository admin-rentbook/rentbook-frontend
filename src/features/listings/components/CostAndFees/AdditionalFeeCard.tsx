import { Add01Icon, MoneyBag01Icon } from 'hugeicons-react';

type AdditionalFeeCardProps = {
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
};
export const AdditionalFeeCard = ({ setIsOpen }: AdditionalFeeCardProps) => {
  return (
    <div className="flex items-center p-4 justify-between gap-6 bg-sidebar rounded-[1.25rem]">
      <div className="flex flex-col gap-4  border-none">
        <div className="flex gap-2 items-center text-gray-600">
          <MoneyBag01Icon className="h-5 w-5" />
          <h5 className="text-body-lg">Additional fee</h5>
        </div>
        <p className="text-body-small text-black-400">
          Let renters know the fee type and amount, when it's charged, and
          whether it's included in the base rent.
        </p>
      </div>
      <div
        onClick={() => setIsOpen(true)}
        className="flex justify-center rounded-full items-center p-4 cursor-pointer  bg-white border border-sidebar-border"
      >
        <Add01Icon className="text-black-400 size-4" />
      </div>
    </div>
  );
};
