import { useGetPublicListing } from '@/features/listing-details/apis';
import type { ListingDTO } from '@/shared/types';
import { transformPublicListingToDTO } from '@/shared/utils';
import { useMemo } from 'react';

type UsePropertyInfoParams = {
  listingId: number;
  propertyName?: string;
  location?: string;
};

export const usePropertyInfo = ({
  listingId,
}: UsePropertyInfoParams) => {
  const {
    data: publicListingData,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetPublicListing(listingId);

  const propertyData = useMemo((): ListingDTO | null => {
    if (!publicListingData?.data) {
      return null;
    }

    return transformPublicListingToDTO(publicListingData.data);
  }, [publicListingData]);

  return {
    propertyData,
    publicListingData: publicListingData?.data ?? null,
    isLoading,
    error,
    isError,
    refetch,
  };
};