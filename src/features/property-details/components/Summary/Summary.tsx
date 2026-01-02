import { useGetPropertyDetailsById } from '@/features/property-owners/apis/requests';
import { EarningsChart } from '@/features/property-owners/components/Overview/EarningsChart';
import { useSearch } from '@tanstack/react-router';
import { AboutProperty } from './AboutProperty';
import { PropertyOwner } from './PropertyOwner';

export const Summary = () => {
  const { propertyId } = useSearch({ from: '/property-details' });
  const { data: propertyData, isLoading } = useGetPropertyDetailsById(propertyId!);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] gap-6 p-3 lg:p-5">
        <div className="flex items-center justify-center h-64">Loading property details...</div>
      </div>
    );
  }

  const displayAddress = propertyData?.address?.street_name
    ? `${propertyData.address.street_name}, ${propertyData.address.city || ''}`
    : propertyData?.address?.formatted_address || '';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] gap-6 p-3 lg:p-5">
      <EarningsChart />
      <div className="flex flex-col gap-4">
        <AboutProperty
          displayName={propertyData?.property_name}
          displayAddress={displayAddress}
          listed_by={propertyData?.listed_by}
          created_at={propertyData?.created_at}
        />
        <PropertyOwner
          owner_full_name={propertyData?.owner?.full_name}
          owner_email={propertyData?.owner_email || propertyData?.owner?.email}
          owner_phone={propertyData?.owner_phone}
        />
      </div>
    </div>
  );
};
