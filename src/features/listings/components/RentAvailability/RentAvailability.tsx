import { useSearch } from '@tanstack/react-router';
import { SelectCard } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { rentAvailabilityItems, RentAvailabilityTypes } from '../../constants';
import { useRentAvailability } from '../../hooks';
import { ListingTitle, NavigateButtons } from '../shared';

type RentAvailabilityProps = {
  onPrev: (() => void) | undefined;
  onNext: (() => void) | undefined;
};
export const RentAvailability = ({ onPrev, onNext }: RentAvailabilityProps) => {
  const { listingId } = useSearch({ strict: false }) as { listingId?: number };
  const rentAvailabilityHook = useRentAvailability(listingId as number, onNext);
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-6 xl:w-3/5">
        <ListingTitle
          description={`${
            rentAvailabilityHook.selectedRentAvailabilityType ===
            'AVAILABLE_NOW'
              ? 'You can change this later'
              : 'Let us know if you would like renters to pay now or join a waitlist'
          }`}
          title="When will this listing be available for rent?"
        />
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-3">
            {rentAvailabilityItems.map((rent) => (
              <SelectCard
                key={rent.value}
                type={rent}
                isSelected={rentAvailabilityHook.isSelected(rent.value)}
                isHovered={rentAvailabilityHook.isHovered(rent.value)}
                onSelect={() =>
                  rentAvailabilityHook.handleSelectRentAvailabilityTypeChange(
                    rent.value
                  )
                }
                onMouseEnter={() =>
                  rentAvailabilityHook.handleMouseEnter(rent.value)
                }
                onMouseLeave={rentAvailabilityHook.handleMouseLeave}
              />
            ))}
          </div>
          {rentAvailabilityHook.selectedRentAvailabilityType ===
          RentAvailabilityTypes.AVAILABLE_NOW ? (
            <p className="text-body-small text-icons-black">
              Renters will be able to book tours and make payment for this
              property once your listing is live
            </p>
          ) : (
            <Form
              form={rentAvailabilityHook.form}
              onSubmit={rentAvailabilityHook.onSubmit}
            >
              <FormInput
                control={rentAvailabilityHook.form.control}
                name="listingDate"
                label="Schedule a listing date"
                size="sm"
                type="date"
                showErrorMessage
                description="At the beginning of this date, Renters will be able to book for viewings and make payments. You can edit this before the listing date"
              />
            </Form>
          )}
        </div>
      </div>
      <NavigateButtons
        isButtonDisabled={rentAvailabilityHook.isButtonDisabled}
        isLoading={rentAvailabilityHook.isUpdateLoading}
        onBack={() => onPrev?.()}
        onContinue={rentAvailabilityHook.form.handleSubmit(
          rentAvailabilityHook.onSubmit
        )}
      />
    </div>
  );
};
