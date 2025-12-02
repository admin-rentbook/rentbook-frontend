import type z from 'zod';
import {
  createPropertySchema,
  type ListingTypes,
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
export type PropertyDataDTO = PropertyInfoData & {
  listingType: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  agentCommission?: number;
};

export type PropertyFilters = {
  status: PropertyStatusType | null;
};

export type PropertyCreate = {
  propertyName: string;
  address: {
    lat: number;
    lng: number;
    address: string;
    placeId: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  listedBy: {
    type: ListingTypes;//OWNER | AGENT
    email?: string;
  };
};
