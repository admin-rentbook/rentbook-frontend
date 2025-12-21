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
  listingId?:number;
  apiCurrentStep?:string;
  createAt: string;
  lastUpdated: string;

  listingDescription?: ListingDescriptionFormValues;
  amenities?: AmenitiesData;
  media?: MediaData;
  rentalPrice?: RentalPriceData;
  viewingTimes?: ViewTimesData;
  finalDetails?: FinalDetailsData;
  
  progress: StepProgress;
  isComplete: boolean;
};
