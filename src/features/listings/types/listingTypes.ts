import type { StepProgress } from '@/shared/types';
import type z from 'zod';
import type { listingDescriptionSchema } from '../constants';

export type ListingDescriptionFormValues = z.infer<
  typeof listingDescriptionSchema
>;

export type ListingDescriptionDTO = ListingDescriptionFormValues &
  StepProgress & {
    images: string[];
    blockName?: string;
  };
export type BlockDTO = {
  blockName: string;
  listings: ListingDescriptionDTO[];
};
