import { useGetListsByPropsId } from '@/features/listings/apis';
import { useSearch } from '@tanstack/react-router';
import { PropertyDetailsLinks } from '../../constants';
import { useListing } from '../../hooks';
import { ListingsHeader } from './LIstingsHeader';
import { ListingTable } from './ListingTable';

export const Listings = () => {
  const listing = useListing();
  const { propertyId } = useSearch({
    from: PropertyDetailsLinks.PROPERTY_DETAILS,
  });
  const {
    data: listingDescription,
    isPending,
    isFetching,
    error,
    isError,
  } = useGetListsByPropsId(propertyId as number);
  console.log('allListings', listingDescription);

  return (
    <div className="flex flex-col gap-4">
      <ListingsHeader
        {...listing}
        isFetching={isFetching}
        isLoading={isPending}
      />
      <ListingTable
        {...listing}
        listingDescription={listingDescription?.data || []}
        isLoading={isPending}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
    </div>
  );
};
