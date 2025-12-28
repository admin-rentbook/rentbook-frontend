import propertyImage from '@/assets/images/property-image.jpg';
import type { ListingDTO } from '@/shared/types';
import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useGetListingSummary, useGetMedia, useSubmitListing } from '../apis';

export const useReviewListing = () => {
  const { listingId, propertyId } = useSearch({ from: '/listings-start' });

  const {
    data: summaryData,
    isPending: isLoadingSummary,
    isFetching: isFetchingSummary,
  } = useGetListingSummary(listingId as number);

  const {
    data: mediaData,
    isPending: isLoadingMedia,
    isFetching: isFetchingMedia,
  } = useGetMedia(listingId as number);

  const { mutate: submitListing, isPending: isSubmitting } = useSubmitListing();

  const isLoading = isLoadingSummary || isLoadingMedia;

  const isFetching = isFetchingSummary || isFetchingMedia;

  const handleReviewSubmit = () => {
    submitListing({
      listingId: listingId as number,
      propertyId: propertyId as number,
    });
  };

  const transformToListingDTO = useMemo<ListingDTO>(() => {
    const summary = summaryData?.data;
    const mediaArray = mediaData?.data;
    const pricing = summary?.pricing;

    const images =
      mediaArray && mediaArray.length > 0
        ? mediaArray.map(
            (m) =>
              m.signed_url ||
              m.thumb_medium ||
              m.thumb_large ||
              m.file_url ||
              propertyImage
          )
        : summary?.primary_media?.signed_url
          ? [summary.primary_media.signed_url]
          : [propertyImage, propertyImage, propertyImage];

    const location = summary?.complex?.name
      ? `${summary.complex.name}, Windhoek`
      : 'Windhoek, Khomas Region';

    const rentalPrice = pricing?.fixed_config?.rental_price
      ? Number(pricing.fixed_config.rental_price)
      : pricing?.auction_config?.minimum_bid
        ? Number(pricing.auction_config.minimum_bid)
        : 20000;

    return {
      id: summary?.id,
      title: summary?.title || 'The Palm Residence',
      location,
      images,
      amenities: summary?.amenities || [],
      amount: rentalPrice,
      beds: summary?.beds || 3,
      bathrooms: summary?.bathrooms || 2,
      size_sqft: summary?.size_sqft ? Number(summary.size_sqft) : 25,
      description: summary?.description || '',
      listing_type: summary?.listing_type,
      reviews: {
        id: 1,
        averageRating: 4.5,
        totalReviews: 10,
        reviews: [],
      },
      isWaitlisted: false,
    };
  }, [summaryData, mediaData]);

  const summary = summaryData?.data;

  const rentalPricing = summary?.pricing
    ? {
        payment_method:
          summary.pricing.payment_method === 'fixed'
            ? ('FIXED_PRICE' as const)
            : ('TIMED_AUCTION' as const),
        rent_duration: summary.pricing.rent_duration,
        rent_period: summary.pricing.rent_period.toUpperCase() as
          | 'YEAR'
          | 'MONTH',
        security_deposit: summary.pricing.security_deposit,
        fixed_config: summary.pricing.fixed_config
          ? {
              rental_price: summary.pricing.fixed_config.rental_price,
            }
          : undefined,
        auction_config: summary.pricing.auction_config
          ? {
              minimum_bid: summary.pricing.auction_config.minimum_bid,
              bid_start: summary.pricing.auction_config.bid_start,
              bid_end: summary.pricing.auction_config.bid_end,
            }
          : undefined,
        bidding_rules: summary.pricing.bidding_rules,
      }
    : undefined;

  const viewing = summary?.viewing_settings
    ? {
        is_available: summary.viewing_settings.is_available,
        time_zone: summary.viewing_settings.time_zone,
        viewing_fee: summary.viewing_settings.viewing_fee,
        booking_mode: summary.viewing_settings.booking_mode,
        availabilities: summary.viewing_settings.availability,
      }
    : undefined;

  const finalDetails = summary
    ? {
        is_available: summary.is_available,
        is_available_now: summary.is_available,
        availability_date: summary.availability_date,
      }
    : undefined;

  const additionalDetails = summary?.additional_details
    ? {
        details: summary.additional_details,
      }
    : undefined;

  return {
    listingDescription: summary
      ? {
          id: summary.id,
          title: summary.title,
          listing_type: summary.listing_type as any,
          description: summary.description,
          beds: summary.beds,
          bathrooms: summary.bathrooms,
          size_sqft: Number(summary.size_sqft),
          complex: summary.complex,
          status: summary.status as any,
        }
      : undefined,
    amenities: summary
      ? {
          amenities: summary.amenities,
        }
      : undefined,
    media: mediaData?.data,
    rentalPricing,
    viewing,
    additionalFees: summary?.additional_fees,
    discount:
      summary?.discounts && summary.discounts.length > 0
        ? summary.discounts[0]
        : undefined,
    finalDetails,
    additionalDetails,
    isLoading,
    isFetching,
    isSubmitting,
    handleReviewSubmit,

    propertyCardData: transformToListingDTO,

    loadingStates: {
      description: isLoadingSummary || isFetchingSummary,
      amenities: isLoadingSummary || isFetchingSummary,
      media: isLoadingMedia || isFetchingMedia,
      rentalPrice: isLoadingSummary || isFetchingSummary,
      viewing: isLoadingSummary || isFetchingSummary,
      additionalFees: isLoadingSummary || isFetchingSummary,
      discount: isLoadingSummary || isFetchingSummary,
      finalDetails: isLoadingSummary || isFetchingSummary,
      additionalDetails: isLoadingSummary || isFetchingSummary,
    },
  };
};
