import { Button } from '@/shared/components';
import { useWaitlist } from '@/features/wait-wish-lists/hooks/useWaitlist';
import { currencyFormatter, formatAvailabilityDate } from '@/shared/utils';
import { CalendarLock01Icon, Loading03Icon } from 'hugeicons-react';
import type { ListingActionProps } from './types';

export const WaitlistFlow = ({ property }: ListingActionProps) => {
  const {
    toggleWaitlist,
    isWaitlisted: checkIsWaitlisted,
    isAdding,
    isRemoving,
  } = useWaitlist();

  const isWaitlisted = checkIsWaitlisted(property.id);
  const isWaitlistLoading = isAdding || isRemoving;
  const formattedAvailabilityDate = formatAvailabilityDate(property.availability_date || '');
  const hasViewingFee = property.viewing.viewing_fee && parseFloat(property.viewing.viewing_fee) > 0;
  const viewingFeeFormatted = hasViewingFee
    ? currencyFormatter.format(parseFloat(property.viewing.viewing_fee), false)
    : 'No viewing fee';

  return (
    <div className="flex flex-col gap-3">
        <Button
          size="lg"
          onClick={() => toggleWaitlist(property.id)}
          disabled={isWaitlistLoading}
        >
          {isWaitlistLoading ? (
            <div className="flex items-center gap-2">
              <Loading03Icon className="size-5 animate-spin" />
              <span>{isWaitlisted ? 'Leaving...' : 'Joining...'}</span>
            </div>
          ) : (
            <span>{isWaitlisted ? 'Leave waitlist' : 'Join waitlist'}</span>
          )}
        </Button>

        {/* Viewing Button - Disabled */}
        <Button size="lg" variant="tertiary" disabled>
          Request a viewing ({viewingFeeFormatted})
        </Button>

        {/* Availability Info */}
        {formattedAvailabilityDate && (
          <div className="flex text-primary-500 text-body gap-2 pt-3">
            <CalendarLock01Icon />
            <p>
              Listing will be available on {formattedAvailabilityDate}.{' '}
              <span className="underline hover:cursor-pointer">Read more</span>
            </p>
          </div>
        )}
      </div>
  );
};