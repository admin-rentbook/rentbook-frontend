import propertyImage from '@/assets/images/property-image.jpg';
import type { ListingSummaryDTO, MediaDTO } from '@/features/listings/types';
import type { ImageWithThumbnail, ListingDTO } from '@/shared/types';

type TransformListingOptions = {
  summary: ListingSummaryDTO;
  media?: MediaDTO[];
  propertyName?: string;
  location?: string;
};

/**
 * Transforms API listing summary data into the application's ListingDTO format
 */
export const transformListingSummaryToDTO = ({
  summary,
  media = [],
  // propertyName,
  location,
}: TransformListingOptions): ListingDTO => {
  const pricing = summary.pricing;

  // Get images from media array or fallback to primary_media
  // Include thumbnails for optimized loading
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

  // Calculate amount from pricing config
  const amount = pricing?.fixed_config?.rental_price
    ? Number(pricing.fixed_config.rental_price)
    : pricing?.auction_config?.minimum_bid
      ? Number(pricing.auction_config.minimum_bid)
      : 0;

  // Get rent period from pricing
  const rent_period = pricing?.rent_period;

  // Get viewing settings
  const viewing_settings = summary.viewing_settings;
  const viewing_fee = viewing_settings?.viewing_fee
    ? Number(viewing_settings.viewing_fee)
    : undefined;
  const booking_mode = viewing_settings?.booking_mode;

  // Get availability data
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