import { Button } from '@/shared/components';
import { Form, FormInput, FormSelect } from '@/shared/components/Form';
import { Add01Icon, MinusSignIcon, Settings01Icon } from 'hugeicons-react';
import { useState } from 'react';
import { rentalPaymentTypes, type RentalPay } from '../../constants';
import { type PaymentTypeSelection, type RentalPrice } from '../../hooks';
import { BiddingRules } from './BIddingRules';
import { PaymentTypeCard } from './PaymentTypeCard';
import { Pricing } from './Pricing';

type RentalPricingProps = {
  paymentTypeSelection: PaymentTypeSelection;
  rentalPricing: RentalPrice;
};
export const RentalPricing = ({
  paymentTypeSelection,
  rentalPricing,
}: RentalPricingProps) => {
  const [openPricing, setOpenPricing] = useState(false);
  const [openBidRules, setOpenBidRules] = useState(false);

  const handleSelectType = (selectedType: RentalPay) => {
    paymentTypeSelection.selectType(selectedType);
    rentalPricing.handleSelectTypeChange(selectedType);
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3">
          {rentalPaymentTypes.map((rentalType) => (
            <PaymentTypeCard
              key={rentalType.value}
              type={rentalType}
              isSelected={paymentTypeSelection.isSelected(rentalType.value)}
              isHovered={paymentTypeSelection.isHovered(rentalType.value)}
              onSelect={() => handleSelectType(rentalType.value)}
              onMouseEnter={() =>
                paymentTypeSelection.handleMouseEnter(rentalType.value)
              }
              onMouseLeave={paymentTypeSelection.handleMouseLeave}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-body text-black-400">Rental price</p>
          <div className="flex justify-center items-center border-1 border-neutral-200  h-[92px] rounded-10">
            <h1 className="text-icons-black/50  text-54px">N$35</h1>
          </div>
          <p className="text-body text-black-400">
            {paymentTypeSelection.selectedType === 'FIXED_PRICE'
              ? 'Renters pays N$36.75 (Addition of %5 service fee) '
              : `Bids lower than this amount won't be accepted. If you don't have a minimum bid, simply enter 0.  `}
            <span
              className="underline cursor-pointer"
              onClick={() => setOpenPricing(true)}
            >
              Learn about pricing
            </span>
          </p>
        </div>

        <Form form={rentalPricing.form} onSubmit={rentalPricing.onSubmit}>
          {paymentTypeSelection.selectedType === 'TIMED_AUCTION' && (
            <div className="grid grid-cols-2 gap-6 items-end">
              <FormInput
                label="Bid start date"
                control={rentalPricing.form.control}
                name="bidStartDate"
                type="date"
                size="sm"
              />
              <FormInput
                label="Bid end date"
                control={rentalPricing.form.control}
                name="bidEndDate"
                type="date"
                size="sm"
              />
              <div
                className="col-span-2 row-span-2 cursor-pointer flex justify-center gap-3 py-[10px] bg-primary-foreground"
                onClick={() => setOpenBidRules(true)}
              >
                <Settings01Icon className="size-4" />
                <p className="text-body text-black-400">Bidding rules</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-6 items-end">
            <FormInput
              label="Rent duration"
              control={rentalPricing.form.control}
              name="rentDuration"
              size="sm"
              type="number"
              min={0}
              step={1}
              trailingAddOn={
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    className="size-4 pointer-events-auto"
                    onClick={rentalPricing.decreaseDuration}
                  >
                    <MinusSignIcon className="h-3 w-3" />
                  </Button>
                  <div className="h-[20px] bg-neutral-200 w-[2px]" />
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-6 w-6 pointer-events-auto"
                    onClick={rentalPricing.increaseDuration}
                  >
                    <Add01Icon className="size-4" />
                  </Button>
                </div>
              }
            />

            <FormSelect
              options={[
                {
                  label: 'Year',
                  value: 'YEAR',
                },
                { label: 'Month', value: 'MONTH' },
              ]}
              label=""
              control={rentalPricing.form.control}
              name="year"
              size="sm"
            />

            <div className="col-span-2 row-span-2">
              <FormInput
                label="What is the security deposit"
                control={rentalPricing.form.control}
                name="securityDeposit"
                size="sm"
              />
            </div>
          </div>
          <BiddingRules
            isOpen={openBidRules}
            setIsOpen={setOpenBidRules}
            form={rentalPricing.form}
          />
        </Form>
      </div>
      <Pricing isOpen={openPricing} setIsOpen={setOpenPricing} />
    </>
  );
};
