import { getDaysUntil } from '@/shared/utils';
import type { PublicListingDTO } from '../../types';
import type { ListingFlow } from './types';

export const determineListingFlow = (
  property: PublicListingDTO
): ListingFlow => {
  const isAuction = property?.pricing?.payment_method === 'timed_auction';
  const isAvailable = property?.is_available;

  if (isAuction) {
    return 'bidding';
  }

  if (!isAvailable) {
    return 'waitlist';
  }

  return 'rent';
};

export const calculateDaysUntil = (dateString?: string): number | null => {
  if (!dateString) return null;
  return getDaysUntil(dateString);
};
