import { Button } from '@/shared/components';
import type { ListingDTO } from '@/shared/types';
import {
  currencyFormatter,
  formatAvailabilityDate,
  formatRentalPrice,
  getDaysUntil,
} from '@/shared/utils';
import { useWaitlist } from '@/features/wait-wish-lists/hooks/useWaitlist';
import { CalendarLock01Icon, Loading03Icon } from 'hugeicons-react';

type ListingActionCardProps = {
  property: ListingDTO;
  mode: 'waitlist' | 'viewing';
};

export const ListingActionCard = ({ property, mode }: ListingActionCardProps) => {
  const {
    toggleWaitlist,
    isWaitlisted: checkIsWaitlisted,
    isAdding,
    isRemoving
  } = useWaitlist();

  const isWaitlisted = checkIsWaitlisted(property?.id ?? 0);
  const isWaitlistLoading = isAdding || isRemoving;

  // Calculate days until available (only for waitlist mode)
  const daysUntilAvailable = mode === 'waitlist'
    ? getDaysUntil(property.availability_date || '')
    : null;

  // Format availability date (only for waitlist mode)
  const formattedAvailabilityDate = mode === 'waitlist'
    ? formatAvailabilityDate(property.availability_date || '')
    : null;

  // Check if instant booking
  const showInstantBooking = property.booking_mode === 'instant';

  // Format viewing fee
  const viewingFeeFormatted = property.viewing_fee
    ? currencyFormatter.format(property.viewing_fee, false)
    : 'N$99';

  // Determine button text and disabled state based on mode and availability
  // If is_available is undefined, treat as available (default behavior)
  const isAvailable = property.is_available !== false;
  const isUnavailable = property.is_available === false;

  const getActionButtonText = () => {
    if (mode === 'viewing' && isAvailable) return 'Make Payment';
    return 'Request a viewing';
  };

  const actionButtonText = getActionButtonText();

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
        {mode === 'waitlist' && daysUntilAvailable !== null && daysUntilAvailable > 0 && (
          <div className="rounded-full grid place-items-center bg-sidebar-accent p-2">
            <p className="text-caption text-black-500">
              Available in {daysUntilAvailable}{' '}
              {daysUntilAvailable === 1 ? 'day' : 'days'}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {/* Waitlist/Join button - shown for waitlist mode OR when property is unavailable */}
        {(mode === 'waitlist' || isUnavailable) && (
          <Button
            size="lg"
            onClick={() => property.id && toggleWaitlist(property.id)}
            disabled={isWaitlistLoading || isUnavailable}
          >
            {isUnavailable ? (
              'Not Available'
            ) : isWaitlistLoading ? (
              <div className="flex items-center gap-2">
                <Loading03Icon className="size-5 animate-spin" />
                <span>{isWaitlisted ? 'Leaving...' : 'Joining...'}</span>
              </div>
            ) : (
              <span>{isWaitlisted ? 'Leave waitlist' : 'Join waitlist'}</span>
            )}
          </Button>
        )}

        {/* Viewing/Payment button - only shown in viewing mode when available */}
        {mode === 'viewing' && !isUnavailable && (
          <Button size="lg" variant="tertiary">
            {actionButtonText} ({viewingFeeFormatted})
          </Button>
        )}

        {mode === 'waitlist' && !showInstantBooking && formattedAvailabilityDate && (
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