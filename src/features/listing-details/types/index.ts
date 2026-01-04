export type PublicListingDTO = {
  id: number;
  title: string;
  listing_type: string;
  description: string;
  beds: number;
  bathrooms: number;
  size_sqft: string;
  is_available: boolean;
  availability_date: string;
  property_name: string;
  property_address: {
    formatted_address: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  media: Array<{
    id: number;
    file_url: string;
    signed_url: string;
    thumb_small?: string;
    thumb_medium?: string;
    thumb_large?: string;
  }>;
  pricing: {
    payment_method: 'fixed' | 'timed_auction';
    rent_period: 'month' | 'year';
    rent_duration: number;
    security_deposit: string;
    rental_price?: string;
    minimum_bid?: string;
    bid_start?: string;
    bid_end?: string;
    bidding_rules?: {
      auto_accept_highest: boolean;
      extend_if_bid_in_last_24h: boolean;
      extend_by_hours: number;
    };
  };
  discounts: Array<{
    percent: string;
    end_date: string;
  }>;
  additional_details?: Array<{
    title: string;
    description: string;
  }>;
  viewing: {
    is_available: boolean;
    time_zone: string;
    viewing_fee: string;
    booking_mode: 'instant' | 'review';
    availabilities: Array<{
      day: string;
      start_time: string;
      end_time: string;
    }>;
  };
};
