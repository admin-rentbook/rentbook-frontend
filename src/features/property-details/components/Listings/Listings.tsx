import { useListing } from '../../hooks';
import { ComplexView } from './ComplexView';
import { ListingsHeader } from './LIstingsHeader';
import { ListingTable } from './ListingTable';

export const Listings = () => {
  const listing = useListing();

  return (
    <div className="flex flex-col gap-4">
      <ListingsHeader {...listing} isFetching={listing.isFetching} isLoading={listing.isLoading} />

      {listing.displayOptions.grouping === 'complex' ? (
        <ComplexView
          complexData={listing.complexData?.data || []}
          isLoading={listing.isLoading}
          isFetching={listing.isFetching}
          isError={listing.isError}
          error={listing.error}
          searchTerm={listing.searchTerm}
          reset={listing.reset}
        />
      ) : (
        <ListingTable
          {...listing}
          listingDescription={listing.listingData?.data || []}
          isLoading={listing.isLoading}
          isFetching={listing.isFetching}
          isError={listing.isError}
          error={listing.error}
        />
      )}
    </div>
  );
};
