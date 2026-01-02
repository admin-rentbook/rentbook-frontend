import propertyImage from '@/assets/images/property-image.jpg';
import type { ListingSummaryDTO, MediaDTO } from '@/features/listings/types';
import type { ImageWithThumbnail, ListingDTO, LocationResult } from '@/shared/types';
import type { Note } from '@/features/listings/types';

type TransformListingOptions = {
  summary: ListingSummaryDTO;
  media?: MediaDTO[];
  propertyName?: string;
  location?: string;
};

export const transformListingSummaryToDTO = ({
  summary,
  media = [],
  // propertyName,
  location,
}: TransformListingOptions): ListingDTO => {
  const pricing = summary.pricing;

  const images: ImageWithThumbnail[] =
    media.length > 0
      ? media.map((m) => ({
          url: m.signed_url || m.file_url || propertyImage,
          thumbnail: m.thumb_small || m.thumb_medium || undefined,
        }))
      : summary.primary_media?.signed_url
        ? [
            {
              url: summary.primary_media.signed_url,
              thumbnail: undefined, // primary_media doesn't have thumbnails
            },
          ]
        : [{ url: propertyImage, thumbnail: undefined }];

  const amount = pricing?.fixed_config?.rental_price
    ? Number(pricing.fixed_config.rental_price)
    : pricing?.auction_config?.minimum_bid
      ? Number(pricing.auction_config.minimum_bid)
      : 0;

  const rent_period = pricing?.rent_period;

  const viewing_settings = summary.viewing_settings;
  const viewing_fee = viewing_settings?.viewing_fee
    ? Number(viewing_settings.viewing_fee)
    : undefined;
  const booking_mode = viewing_settings?.booking_mode;

  const is_available = summary.is_available;
  const availability_date = summary.availability_date;

  return {
    id: summary.id,
    title: summary.title,
    images,
    location: location || 'Windhoek, Khomas Region',
    amenities: summary.amenities || [],
    amount,
    rent_period,
    beds: summary.beds,
    bathrooms: summary.bathrooms,
    size_sqft: Number(summary.size_sqft),
    description: summary.description,
    listing_type: summary.listing_type,
    is_available,
    availability_date,
    viewing_fee,
    booking_mode,
  };
};

type PublicListingData = {
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
    signed_url: string;
    file_url: string;
    thumb_small?: string;
    thumb_medium?: string;
  }>;
  pricing: {
    payment_method: 'fixed' | 'timed_auction';
    rent_period: 'month' | 'year';
    rent_duration: number;
    security_deposit: string;
    rental_price?: string;
    minimum_bid?: string;
  };
  additional_details?: Array<{
    title: string;
    description: string;
  }>;
  viewing: {
    is_available: boolean;
    viewing_fee: string;
    booking_mode: 'instant' | 'review';
  };
};

export const transformPublicListingToDTO = (
  data: PublicListingData
): ListingDTO => {
  const images: ImageWithThumbnail[] =
    data.media && data.media.length > 0
      ? data.media.map((m) => ({
          url: m.signed_url || m.file_url || propertyImage,
          thumbnail: m.thumb_small || m.thumb_medium || undefined,
        }))
      : [{ url: propertyImage, thumbnail: undefined }];

  const amount = data.pricing?.rental_price
    ? Number(data.pricing.rental_price)
    : data.pricing?.minimum_bid
      ? Number(data.pricing.minimum_bid)
      : 0;

  const locationResult: LocationResult = {
    lat: data.property_address.latitude,
    lng: data.property_address.longitude,
    address: data.property_address.formatted_address,
    placeId: '',
    street: '',
    city: data.property_address.city,
    state: data.property_address.state,
    country: data.property_address.country,
    postalCode: '',
  };

  const notes: Note[] = data.additional_details
    ? data.additional_details.map((detail, index) => ({
        id: `${index}`,
        noteTitle: detail.title,
        noteDescription: detail.description,
      }))
    : [];

  return {
    id: data.id,
    title: data.title,
    images,
    location: data.property_address.formatted_address,
    amenities: data.amenities || [],
    amount,
    rent_period: data.pricing.rent_period?.toUpperCase() as 'MONTH' | 'YEAR',
    beds: data.beds,
    bathrooms: data.bathrooms,
    size_sqft: Number(data.size_sqft),
    description: data.description,
    listing_type: data.listing_type,
    is_available: data.is_available,
    availability_date: data.availability_date,
    viewing_fee: Number(data.viewing.viewing_fee),
    booking_mode: data.viewing.booking_mode,
    locationResult,
    notes,
  };
};