import { useSearch } from '@tanstack/react-router';
import { usePaymentTypeSelection, useRentalPrice } from '../../hooks';
import { ListingTitle, NavigateButtons } from '../shared';
import { AdditionalPrice } from './AdditionalPrice';
import { OptionalFees } from './OptionalFees';
import { RentalPricing } from './RentalPricing';

type CostAndFeesProps = {
  onNext: (() => void) | undefined;
  onPrev: (() => void) | undefined;
};

export const CostAndFees = ({ onNext, onPrev }: CostAndFeesProps) => {
    const { listingId } = useSearch({ strict: false }) as { listingId?: number };
  
  const paymentTypeSelection = usePaymentTypeSelection();
  const rentalPrice = useRentalPrice(
    paymentTypeSelection.selectedType,
    paymentTypeSelection.selectType,
    onNext,
    listingId as number
  );

  return (
    <div  className="flex flex-col h-full gap-10">
      <div className="flex flex-col gap-6 xl:w-3/5">
        <ListingTitle
          description="Choose how rental payments should be made , and set your payment details."
          title="How do you want to get paid?"
        />
        <RentalPricing
          paymentTypeSelection={paymentTypeSelection}
          rentalPricing={rentalPrice}
        />
        <OptionalFees listingId={listingId as number} />
        <AdditionalPrice />
      </div>
      <NavigateButtons
        isButtonDisabled={rentalPrice.isButtonDisabled}
        onBack={() => onPrev?.()}
        onContinue={rentalPrice.form.handleSubmit(rentalPrice.onSubmit)}
        isLoading={rentalPrice.isUpdateLoading}
      />
    </div>
  );
};
