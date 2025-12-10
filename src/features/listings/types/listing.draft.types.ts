import type { StepProgress } from '@/shared/types';
import type {
  AmenitiesData,
  FinalDetailsData,
  ListingDescriptionFormValues,
  MediaData,
  RentalPriceData,
  ViewTimesData,
} from './listingTypes';

export type ListingDraft = {
  draftId: string;
  createAt: string;
  lastUpdated: string;
  progress: StepProgress;
  listingDescription?: ListingDescriptionFormValues;
  amenities?: AmenitiesData;
  media?: MediaData;
  rentalPrice?: RentalPriceData;
  viewingTimes?: ViewTimesData;
  finalDetails?: FinalDetailsData;
  isComplete: boolean;
};
