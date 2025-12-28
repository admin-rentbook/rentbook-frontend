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
  primary_image?: MediaDTO
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
  is_primary?:string;
}

export type RentalPricingDTO = {
  id?: number;
  payment_method: 'FIXED_PRICE' | 'TIMED_AUCTION';
  rent_duration: number;
  rent_period: 'YEAR' | 'MONTH';
  security_deposit: number | string;
  fixed_config?: {
    rental_price: number | string;
  };
  auction_config?: {
    minimum_bid: number | string;
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

export type DiscountDTO = {
  id?: number;
  percent: string;
  end_date: string;
};

export type ViewingDTO = {
  id?: number;
  is_available: boolean;
  time_zone: string;
  viewing_fee: number | string; 
  booking_mode: 'review' | 'instant';
  availabilities: Array<{
    day: string;
    start_time: string;
    end_time: string;  
  }>;
  current_step?: string;
};

export type FinalDetailsDTO = {
  id?: number;
  is_available: boolean;
  is_available_now: boolean;
  availability_date: string; 
  current_step?: string;
};

export type AdditionalDetailsDTO = {
  id?: number;
  details: Array<{
    id?: number;
    title: string;
    description: string;
  }>;
  current_step?: string;
};

export type ListingSummaryDTO = {
  id: number;
  title: string;
  listing_type: string;
  description: string;
  beds: number;
  bathrooms: number;
  size_sqft: string;
  is_available: boolean;
  availability_date: string;
  status: string;
  current_step: string;
  version: number;
  last_saved_at: string;
  property_name: string;
  amenities: string[];
  media_count: number;
  primary_media?: {
    id: number;
    file_name: string;
    signed_url: string;
  };
  discounts: DiscountDTO[];
  additional_fees: AdditionalFeeDTO[];
  complex?: ComplexDTO;
  additional_details?: Array<{
    title: string;
    description: string;
  }>;
  viewing_settings?: {
    is_available: boolean;
    time_zone: string;
    viewing_fee: string;
    booking_mode: 'instant' | 'review';
    availability: Array<{
      day: string;
      start_time: string;
      end_time: string;
    }>;
  };
  pricing?: {
    payment_method: 'fixed' | 'timed_auction';
    rent_duration: number;
    rent_period: 'year' | 'month';
    security_deposit: string;
    fixed_config?: {
      rental_price: string;
    };
    auction_config?: {
      minimum_bid: string;
      bid_start: string;
      bid_end: string;
      extend_if_bid_in_last_n_hours: number;
      extend_duration_days: number;
    };
    bidding_rules?: {
      auto_accept_highest: boolean;
      extend_if_bid_in_last_24h: boolean;
      extend_by_hours: number;
    };
    calculated?: {
      base_price: string;
      effective_price: string;
      discount_percent: number;
    };
  };
};
