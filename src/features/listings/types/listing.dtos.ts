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
  id?: number;
  name: string;
  description?: string;
  created_at?: string;
  property_id?: number;
  property_name?: string;
  listing_count?:number;
  listings?:ListingDescriptionDTO[]
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

export type MediaDTO = {
  id?: number;
  created_at?:string;
  file_url?:string;
  signed_url?:string;
  thumb_large?:string;
  thumb_medium?:string;
  thumb_small?:string;
  file_name: string;
  file_id?:string;
  mime_type: string;
  file_size?:number;
  media_type?:string;
  order?:number;
  is_primary?:string; // Backend expects string 'true' or 'false', not boolean
}

export type RentalPricingDTO = {
  id?: number;
  payment_method: 'FIXED_PRICE' | 'TIMED_AUCTION';
  rent_duration: number;
  rent_period: 'YEAR' | 'MONTH';
  security_deposit: number | string; // Backend may return string, convert to number
  fixed_config?: {
    rental_price: number | string; // Backend may return string, convert to number
  };
  auction_config?: {
    minimum_bid: number | string; // Backend may return string, convert to number
    bid_start: string;
    bid_end: string;
  };
  bidding_rules?: {
    auto_accept_highest: boolean;
    extend_if_bid_in_last_24h: boolean;
  };
  current_step?: string;
}

export type AdditionalFeeDTO = {
  id?: number;
  name: string;
  amount: string;
  frequency: string;
  condition: string;
};

// DTO type for discount from backend
export type DiscountDTO = {
  id?: number;
  percent: string;
  end_date: string;
};

// DTO type for viewing from backend
export type ViewingDTO = {
  id?: number;
  is_available: boolean;
  time_zone: string;
  viewing_fee: number | string; // Backend may return string, convert to number
  booking_mode: 'review' | 'instant';
  availability: Array<{
    day: string;
    start_time: string; // ISO format time string
    end_time: string;   // ISO format time string
  }>;
  current_step?: string;
};
