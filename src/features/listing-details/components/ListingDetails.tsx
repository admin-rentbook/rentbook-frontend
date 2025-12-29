import {
  PropertyInfo,
  PropertyInfoSkeleton,
} from '@/shared/components/PropertyInfo';
import { usePropertyInfo } from '@/shared/hooks';
import { useLocation, useSearch } from '@tanstack/react-router';
import { JoinWaitlist } from './JoinWaitlist';

export const ListingDetails = () => {
  const location = useLocation();
  const searchParams = useSearch({ strict: false }) as {
    listingId?: number;
    propertyName?: string;
    location?: string;
  };

  // Support both old state-based navigation and new search-based navigation
  const listingId = searchParams.listingId || location.state?.property?.id || 0;
  const propertyNameFromParams =
    searchParams.propertyName || location.state?.property?.title;
  const locationFromParams =
    searchParams.location || location.state?.property?.location;

  const { propertyData, isLoading, error } = usePropertyInfo({
    listingId,
    propertyName: propertyNameFromParams,
    location: locationFromParams,
  });

  if (isLoading) {
    return <PropertyInfoSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-body text-red-500">
            Failed to load property details
          </p>
          <p className="text-body-small text-black-400 mt-2">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
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

  return (
    <PropertyInfo
      property={propertyData}
      actionItem={<JoinWaitlist property={propertyData} />}
    />
  );
};
