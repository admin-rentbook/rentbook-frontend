import type { StepProgress } from '@/shared/types';
import type { HugeiconsProps } from 'hugeicons-react';
import type z from 'zod';
import type {
  additionalFeeValSchema,
  addNoteSchema,
  discountValidationSchema,
  listingDescriptionSchema,
  rentalPriceSchema,
  rentAvailabilitySchema,
  viewFeeSchema,
} from '../constants';

export type ListingDescriptionFormValues = z.infer<
  typeof listingDescriptionSchema
>;
export type RentalPriceFormValues = z.input<typeof rentalPriceSchema>;
export type AdditionalFeeFormValues = z.infer<typeof additionalFeeValSchema>;
export type DiscountFormValues = z.input<typeof discountValidationSchema>;
export type ViewFeeFormValues = z.infer<typeof viewFeeSchema>;
export type RentAvailabilityFormValues = z.input<typeof rentAvailabilitySchema>;
export type AddNoteFormValues = z.infer<typeof addNoteSchema>;

export type ListingDescriptionDTO = ListingDescriptionFormValues &
  StepProgress & {
    images: string[];
    blockName?: string;
  };
export type BlockDTO = {
  blockName: string;
  listings: ListingDescriptionDTO[];
};

export type RentalPaymentType = {
  icon: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  name: string;
  value: string;
  description: string;
  bgColor: string;
  color: string;
};

export type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

export type DaySchedule = {
  [key: string]: TimeSlot[];
};

export type Note = {
  id: string;
  noteTitle: string;
  noteDescription: string;
};
