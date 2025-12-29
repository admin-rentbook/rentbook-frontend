import { useGetListingSummary, useGetMedia } from '@/features/listings/apis';
import type { ListingDTO } from '@/shared/types';
import { transformListingSummaryToDTO } from '@/shared/utils';
import { useMemo } from 'react';

type UsePropertyInfoParams = {
  listingId: number;
  propertyName?: string;
  location?: string;
};

export const usePropertyInfo = ({
  listingId,
  propertyName,
  location,
}: UsePropertyInfoParams) => {
  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    error: summaryError,
  } = useGetListingSummary(listingId);

  const { data: mediaData, isLoading: isMediaLoading } = useGetMedia(listingId);

  const isLoading = isSummaryLoading || isMediaLoading;
  const error = summaryError;

  const propertyData = useMemo((): ListingDTO | null => {
    if (!summaryData?.data) {
      return null;
    }

    const summary = summaryData.data;
    const media = mediaData?.data || [];

    return transformListingSummaryToDTO({
      summary,
      media,
      propertyName: propertyName || summary.property_name,
      location,
    });
  }, [summaryData, mediaData, propertyName, location]);

  return {
    propertyData,
    isLoading,
    error,
  };
};