import { ErrorState } from '@/shared/components';
import {
  PropertyInfo,
  PropertyInfoSkeleton,
} from '@/shared/components/PropertyInfo';
import { usePropertyInfo } from '@/shared/hooks';
import { useLocation, useSearch } from '@tanstack/react-router';
import { JoinWaitlist } from './JoinWaitlist';
import { RequestViewing } from './RequestViewing';

export const ListingDetails = () => {
  const location = useLocation();
  const searchParams = useSearch({ strict: false }) as {
    listingId?: number;
    propertyName?: string;
    location?: string;
  };
  // const isTokenExpired = useAppStore((s) => s.isTokenExpired);

  // Support both old state-based navigation and new search-based navigation
  const listingId = searchParams.listingId || location.state?.property?.id || 0;

  const { propertyData, isLoading, error, isError, refetch } = usePropertyInfo({
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

  if (!propertyData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-body text-black-400">No property data found</p>
      </div>
    );
  }

  // Determine which action component to show based on availability
  const ActionComponent = propertyData.is_available
    ? RequestViewing
    : JoinWaitlist;

  return (
    <PropertyInfo
      property={propertyData}
      actionItem={<ActionComponent property={propertyData} />}
    />
  );
};
