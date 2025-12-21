import type { ListingDescriptionDTO } from '@/features/listings';

export type ViewingType = {
  startDate: string;
  endDate: string;
  agent: {
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