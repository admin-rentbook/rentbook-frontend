import type z from 'zod';
import {
  createPropertySchema,
  type ListingTypes,
  type listingTypeSchema,
  type propertyInfoSchema,
  type PropertyStatusType,
} from '../constants';

export type PropertyTableDTO = {
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
  listedBy: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  agentCommission?: number;
};

export type PropertyFilters = {
  status: PropertyStatusType | null;
};

export type AddressDTO = {
  id?: string;
  place_id?: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
  street_number?: string;
  street_name?: string;
  city?: string;
  state?: string;
  state_code?: string;
  country?: string;
  country_code?: string;
  postal_code?: string;
};

export type PropertyDTO = {
  id?: number;
  property_name: string;
  address: AddressDTO;
  listed_by: ListingTypes;
  owner_email?: string;
  approval_status?: PropertyStatusType;
  created_at?: string;
  updated_at?: string;
  is_owner_verified?: boolean;
};
