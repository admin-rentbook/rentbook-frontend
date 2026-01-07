import type { ListingDTO } from '@/shared/types';
import type { ApiListingSummary, WaitlistItem, WishlistItem } from '../types';


export const transformToListingDTO = (
  summary: ApiListingSummary
): ListingDTO => {
  // Use primary_image.file_url or thumbnail
  const images = summary.primary_image?.file_url
    ? [summary.primary_image.file_url]
    : [];

  return {
    id: summary.id,
    images,
    title: summary.title,
    location: summary.property?.property_name || 'N/A',
    amenities: [],
    amount: parseFloat(summary.price || '0'),
    rent_period: undefined,
    beds: summary.beds,
    bathrooms: summary.bathrooms,
    size_sqft: parseFloat(summary.size_sqft) || 0,
    description: summary.description,
    listing_type: summary.listing_type,
    is_available: summary.is_available,
    availability_date: summary.availability_date,
  };
};


export const transformWishlistItemToListingDTO = (
  item: WishlistItem
): ListingDTO => {
  const images = item.primary_image?.file_url
    ? [item.primary_image.file_url]
    : [];

  return {
    id: item.id,
    images,
    title: item.title,
    location: item.property_address?.formatted_address || 'N/A',
    amenities: [],
    amount: 0, // Price not included in wishlist response
    beds: item.beds,
    bathrooms: item.bathrooms,
    size_sqft: parseFloat(item.size_sqft) || 0,
    listing_type: item.listing_type,
    is_available: item.is_available,
    availability_date: item.availability_date,
  };
};

export const transformWaitlistItemToListingDTO = (
  item: WaitlistItem
): ListingDTO => {
  const images = item.primary_image?.file_url
    ? [item.primary_image.file_url]
    : [];

  return {
    id: item.id,
    images,
    title: item.title,
    location: item.property_address?.formatted_address || 'N/A',
    amenities: [],
    amount: 0, // Price not included in waitlist response
    beds: item.beds,
    bathrooms: item.bathrooms,
    size_sqft: parseFloat(item.size_sqft) || 0,
    listing_type: item.listing_type,
    is_available: item.is_available,
    availability_date: item.availability_date,
  };
};
