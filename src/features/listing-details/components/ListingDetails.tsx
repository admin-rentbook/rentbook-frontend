import { ErrorState } from '@/shared/components';
import {
  PropertyInfo,
  PropertyInfoSkeleton,
} from '@/shared/components/PropertyInfo';
import { usePropertyInfo } from '@/shared/hooks';
import { useLocation, useSearch } from '@tanstack/react-router';
import { ListingActionCard } from './ListingActionCard/ListingActionCard';

export const ListingDetails = () => {
  const location = useLocation();
  const searchParams = useSearch({ strict: false }) as {
    listingId?: number;
    propertyName?: string;
    location?: string;
  };

  // Support both old state-based navigation and new search-based navigation
  const listingId = searchParams.listingId || location.state?.property?.id || 0;

  const {
    propertyData,
    publicListingData,
    isLoading,
    error,
    isError,
    refetch,
  } = usePropertyInfo({
    listingId,
  });

  if (isLoading) {
    return <PropertyInfoSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  if (!propertyData || !publicListingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-body text-black-400">No property data found</p>
      </div>
    );
  }

  return (
    <PropertyInfo
      property={propertyData}
      actionItem={<ListingActionCard property={publicListingData} />}
    />
  );
};
