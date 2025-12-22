import type { ListingDescriptionDTO } from '@/features/listings';

export type ViewingStatus = 'upcoming' | 'unconfirmed' | 'past' | 'cancelled';

export type ViewingType = {
  startDate: string;
  endDate: string;
  status: ViewingStatus;
  viewer: {
    name: string;
    email: string;
    image: string;
  };
  listing: ListingDescriptionDTO;
};

export type Viewings = {
    date: string;
    viewings: ViewingType[]
}