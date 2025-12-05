import { convertUnderscoreToSpace } from '@/shared/utils';
import { useState } from 'react';
import { useAdditionalFee, useDiscount } from '../../hooks';
import { AdditionalPriceSetting } from './AdditinalPriceSettings';
import { AdditionalFeeCard } from './AdditionalFeeCard';
import { DiscountCard } from './Discount';

export const AdditionalPrice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDiscount, setIsOpenDiscount] = useState(false);
  const { form, onSubmit, isButtonDisabled, additionalFees } =
    useAdditionalFee(setIsOpen);
  const { formDiscount, isButtonDisabledDiscount, onSubmitDiscount } =
    useDiscount(setIsOpenDiscount);
  return (
    <>
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col">
          <h1 className="text-heading-3-semibold text-black-500 leading-snug">
            Additional price settings
          </h1>
          <p className="text-body-base-normal text-black-400">
            Add additional cost. These details help renters know the real cost
            of renting your property before they apply.
          </p>
        </div>
        <AdditionalFeeCard setIsOpen={setIsOpen} />
        <DiscountCard
          isButtonDisabled={isButtonDisabledDiscount}
          form={formDiscount}
          isOpen={isOpenDiscount}
          onSubmit={onSubmitDiscount}
          setIsOpen={setIsOpenDiscount}
        />
      </div>
      <div className="flex flex-col gap-6">
        <AdditionalPriceSetting
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          form={form}
          onSubmit={onSubmit}
          isButtonDisabled={isButtonDisabled}
        />
        <div className="w-full h-[1px] bg-custom-gray-600" />
        <div className="flex flex-col gap-3">
          {additionalFees.map((fee) => (
            <div className="flex flex-col gap-1">
              <p className="text-heading-4 text-neutral-600">{fee.feeName}</p>
              <p className="text-body-medium text-black-500">
                N${fee.amount}
                <span className="text-black-400">
                  , paid {convertUnderscoreToSpace(fee.paymentFrequency)}
                </span>
                <span className="text-black-500">
                  <b /> {convertUnderscoreToSpace(fee.feeRequirement)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
