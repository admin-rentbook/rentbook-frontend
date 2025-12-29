import { usePropertyInfoStore } from '@/core/store';
import { Button } from '@/shared/components';
import type { PropertyDTO } from '@/shared/types';
import {
  currencyFormatter,
  formatAvailabilityDate,
  formatRentalPrice,
  getDaysUntil,
} from '@/shared/utils';
import { CalendarLock01Icon } from 'hugeicons-react';

type JoinWaitlistProps = {
  property: PropertyDTO;
};

export const JoinWaitlist = ({ property }: JoinWaitlistProps) => {
  const toggleWaitlist = usePropertyInfoStore((s) => s.toggleWaitlist);
  const isWaitlisted = usePropertyInfoStore((s) =>
    s.isWaitlisted(property?.id ?? 0)
  );

  // Calculate days until available
  const daysUntilAvailable = getDaysUntil(property.availability_date || '');

  // Format availability date
  const formattedAvailabilityDate = formatAvailabilityDate(
    property.availability_date || ''
  );

  // Check if instant booking
  const showInstantBooking = property.booking_mode === 'instant';

  // Format viewing fee
  const viewingFeeFormatted = property.viewing_fee
    ? currencyFormatter.format(property.viewing_fee, false)
    : 'N$99';

  return (
    <div className="flex flex-col gap-10 p-3 shadow-ter rounded-[1.25em] aspect-[4/3] w-full max-w-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-body text-neutral-600/50">Rental price</p>
          <p className="text-heading-4 text-black-500">
            {formatRentalPrice(property.amount, property.rent_period)}
          </p>
          <p className="text-caption underline">View price breakdown</p>
        </div>
        {daysUntilAvailable !== null && daysUntilAvailable > 0 && (
          <div className="rounded-full grid place-items-center bg-sidebar-accent p-2">
            <p className="text-caption text-black-500">
              Available in {daysUntilAvailable}{' '}
              {daysUntilAvailable === 1 ? 'day' : 'days'}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button size="lg" onClick={() => toggleWaitlist(property)}>
          {isWaitlisted ? 'Leave waitlist' : 'Join waitlist'}
        </Button>
        <Button size="lg" variant="tertiary">
          Request a viewing ({viewingFeeFormatted})
        </Button>

        {!showInstantBooking && formattedAvailabilityDate && (
          <div className="flex text-primary-500 text-body gap-2 pt-3">
            <CalendarLock01Icon />
            <p>
              Listing will be available on {formattedAvailabilityDate}.{' '}
              <span className="underline hover:cursor-pointer">Read more</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
