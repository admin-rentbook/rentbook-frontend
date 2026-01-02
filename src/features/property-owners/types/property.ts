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
  id?: number;
  place_id?: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
  street_number?: string | null;
  street_name?: string | null;
  city?: string;
  state?: string;
  state_code?: string | null;
  country?: string;
  country_code?: string | null;
  postal_code?: string;
  created_at?: string;
  updated_at?: string;
};

export type UserDTO = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
};

export type PropertyDTO = {
  id?: number;
  property_name: string;
  address: AddressDTO;
  listed_by: ListingTypes;
  listed_by_display?: string;
  approval_status?: PropertyStatusType;
  approval_status_display?: string;
  owner?: UserDTO;
  owner_email?: string;
  owner_phone?: string;
  is_owner_verified?: boolean;
  created_by?: UserDTO;
  created_at?: string;
  updated_at?: string;
  listings_count?: number;
};
