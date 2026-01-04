import type { PublicListingDTO } from '../../types';

export type ListingFlow = 'waitlist' | 'rent' | 'bidding';

export type ListingActionProps = {
  property: PublicListingDTO;
};
