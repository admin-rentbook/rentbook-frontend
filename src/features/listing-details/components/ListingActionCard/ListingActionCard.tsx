import { currencyFormatter, formatRentalPrice } from '@/shared/utils';
import type { PublicListingDTO } from '../../types';
import { AvailabilityBadge } from './AvailabilityBadge';
import { BiddingFlow } from './BiddingFlow';
import { RentPaymentFlow } from './RentPaymentFlow';
import { calculateDaysUntil, determineListingFlow } from './utils';
import { WaitlistFlow } from './WaitlistFlow';

type ListingActionCardProps = {
  property: PublicListingDTO;
};

export const ListingActionCard = ({ property }: ListingActionCardProps) => {
  const flow = determineListingFlow(property);

  // Determine pricing display
  const isAuction = property?.pricing?.payment_method === 'timed_auction';
  const priceLabel = isAuction ? 'Minimum bid' : 'Rental price';
  const priceValue = isAuction
    ? property?.pricing.minimum_bid
      ? currencyFormatter.format(
          parseFloat(property?.pricing.minimum_bid),
          false
        )
      : 'N/A'
    : property.pricing?.rental_price
      ? formatRentalPrice(
          parseFloat(property.pricing?.rental_price),
          property.pricing?.rent_period
        )
      : 'N/A';

  // Calculate days for badges
  const daysUntilAvailable = flow === 'waitlist'
    ? calculateDaysUntil(property.availability_date)
    : null;
  const daysUntilBidEnd = flow === 'bidding'
    ? calculateDaysUntil(property.pricing.bid_end)
    : null;

  return (
    <div className="flex flex-col gap-10 p-3 shadow-ter rounded-[1.25em] h-auto lg:w-[400px] w-full max-w-md">
      {/* Price Section with Badge */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-body text-neutral-600/50">{priceLabel}</p>
          <p className="text-heading-4 text-black-500">{priceValue}</p>
          <p className="text-caption underline hover:cursor-pointer">
            View price breakdown
          </p>
        </div>

        {/* Availability Badge */}
        {flow === 'waitlist' && daysUntilAvailable !== null && (
          <AvailabilityBadge days={daysUntilAvailable} label="Available in" />
        )}
        {flow === 'bidding' && daysUntilBidEnd !== null && (
          <AvailabilityBadge days={daysUntilBidEnd} label="Expires in" />
        )}
      </div>

      {/* Actions Section */}
      {flow === 'waitlist' && <WaitlistFlow property={property} />}
      {flow === 'bidding' && <BiddingFlow property={property} />}
      {flow === 'rent' && <RentPaymentFlow property={property} />}
    </div>
  );
};
