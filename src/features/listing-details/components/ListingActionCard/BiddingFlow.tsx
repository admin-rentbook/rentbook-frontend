import { Button } from '@/shared/components';
import { currencyFormatter } from '@/shared/utils';
import type { ListingActionProps } from './types';

export const BiddingFlow = ({ property }: ListingActionProps) => {
  const isViewingAvailable = property.viewing.is_available;
  const hasViewingFee = property.viewing.viewing_fee && parseFloat(property.viewing.viewing_fee) > 0;
  const viewingFeeFormatted = hasViewingFee
    ? currencyFormatter.format(parseFloat(property.viewing.viewing_fee), false)
    : 'No viewing fee';

  return (
    <div className="flex flex-col gap-3">
      <Button size="lg">
        Place a bid
      </Button>

      {isViewingAvailable && (
        <Button size="lg" variant="tertiary">
          Request a viewing ({viewingFeeFormatted})
        </Button>
      )}
    </div>
  );
};