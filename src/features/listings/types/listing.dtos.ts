import type { ListingStatusTypes } from '@/features/property-details';
import type { ListingType } from '../constants';

export type ListingDescriptionDTO = {
  id?: number;
  title: string;
  listing_type: ListingType;
  description: string;
  beds: number;
  bathrooms: number;
  size_sqft: number;
  current_step?: string;
  complex?: ComplexDTO;
  status?: ListingStatusTypes;
};

export type ComplexDTO = {
  complex_id?: number;
  new_complex_name: string;
  new_complex_description?: string;
  listings?: ListingDescriptionDTO[]
};

export type AmenitiesDTO = {
  id?: number;
  amenities: string[];
  current_step?: string;
};

export type ListingStepResponse = {
  listing_id: number;
  status: string;
  current_step: string;
};
