import { ListingDetailsLinks } from '@/features/listing-details/constants';
import { useGetListingSummary, useGetMedia } from '@/features/listings/apis';
import {
  formatRentalPrice,
  transformListingSummaryToDTO,
} from '@/shared/utils';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

export const useViewListingDetails = () => {
  const navigate = useNavigate({ from: '/properties/listing' });
  const searchParams = useSearch({ strict: false }) as {
    propertyName?: string;
    location?: string;
    listingId?: number;
  };

  const listingId = searchParams.listingId || 0;

  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    error: summaryError,
  } = useGetListingSummary(listingId);

  const { data: mediaData, isLoading: isMediaLoading } = useGetMedia(listingId);

  const isLoading = isSummaryLoading || isMediaLoading;

  const listingData = useMemo(() => {
    if (!summaryData?.data) {
      return null;
    }

    const summary = summaryData.data;
    const media = mediaData?.data || [];

    const baseData = transformListingSummaryToDTO({
      summary,
      media,
      propertyName: searchParams.propertyName,
      location: searchParams.location,
    });

    const formattedAmount = formatRentalPrice(
      baseData.amount,
      baseData.rent_period
    );

    return {
      ...baseData,
      propertyName:
        searchParams.propertyName || summary.property_name || 'Property',
      formattedAmount,
      status: summary.status,
    };
  }, [summaryData, mediaData, searchParams]);

  const handleAddToComplex = useCallback(() => {
    console.log('Add to complex', listingId);
  }, [listingId]);

  const handleEditListing = useCallback(() => {
    console.log('Edit listing', listingId);
  }, [listingId]);

  const handleShareListing = useCallback(() => {
    console.log('Share listing', listingId);
  }, [listingId]);

  const handlePreviewListing = useCallback(() => {
    navigate({
      to: ListingDetailsLinks.LISTING_DETAILS,
      search: (prev) => ({
        ...prev,
        listingId: prev.listingId,
      }),
    });
  }, [listingId]);

  const handleAssignAgent = useCallback(() => {
    console.log('Assign agent', listingId);
  }, [listingId]);

  const handleMarkUnavailable = useCallback(() => {
    console.log('Mark as unavailable', listingId);
  }, [listingId]);

  const handleCreateLease = useCallback(() => {
    console.log('Create lease', listingId);
  }, [listingId]);

  return {
    listingData,
    isLoading,
    error: summaryError,
    listingId,
    handlers: {
      handleAddToComplex,
      handleEditListing,
      handleShareListing,
      handlePreviewListing,
      handleAssignAgent,
      handleMarkUnavailable,
      handleCreateLease,
    },
  };
};
