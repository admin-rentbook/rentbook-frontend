import { ListingLinks } from '@/features/listings/constants';
import type { ListingDescriptionDTO } from '@/features/listings/types';
import { ViewListingLinks } from '@/features/owner-listing-details';
import { DataTable } from '@/shared/components';
import { EmptyState } from '@/shared/components/EmptyState';
import { useNavigate } from '@tanstack/react-router';
import { listingColumns } from '../../columns';
import type { UseListing } from '../../hooks';
import { ListingListMobile } from './ListingListMobile';

type ListingTableProps = UseListing & {
  listingDescription: ListingDescriptionDTO[];
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  error?: Error | null;
};

export const ListingTable = ({
  listingDescription,
  isLoading = false,
  isFetching = false,
  isError,
  error,
  ...listingProps
}: ListingTableProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <DataTable
        columns={listingColumns}
        data={listingDescription || []}
        totalItems={3}
        pagination={listingProps.pagination}
        setPagination={listingProps.setPagination}
        pageCount={1}
        isLoading={isLoading}
        isFetching={isFetching}
        isServerSide
        mobileCardRender={(row) => <ListingListMobile row={row} />}
        onRowAction={(listing) => {
          const isDraft = listing.status === 'draft';
          console.log('isDrafr', isDraft);
          navigate({
            to: isDraft
              ? ListingLinks.LISTINGS
              : ViewListingLinks.VIEW_A_LISTING,
            search: (prev) => ({
              propertyId: prev.propertyId,
              listingId: listing.id,
            }),
          });
        }}
        emptyState={
          <EmptyState
            title="No Listings found"
            description={
              listingProps.searchTerm
                ? `No properties matching "${listingProps.searchTerm}"`
                : `No ${listingProps.filters?.status} properties at the moment`
            }
            actionLabel="Clear Search"
            onAction={listingProps.reset}
          />
        }
      />
    </div>
  );
};
