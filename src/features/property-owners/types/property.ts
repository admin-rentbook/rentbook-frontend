import type z from 'zod';
import {
  createPropertySchema,
  type listingTypeSchema,
  type propertyInfoSchema,
  type PropertyStatusType,
} from '../constants';

export type PropertyDTO = {
  name: string;
  address: string;
  unit: number;
  totalUnits: number;
  status: PropertyStatusType;
};

export type PropertyInfoData = z.infer<typeof propertyInfoSchema>;
export type ListingTypeData = z.infer<typeof listingTypeSchema>;
export type CreatePropertyData = z.infer<typeof createPropertySchema>;
