import type { ListingDescriptionDTO } from '@/features/listings/types';
import { ViewListingLinks } from '@/features/owner-listing-details';
import { DataTable } from '@/shared/components';
import { EmptyState } from '@/shared/components/EmptyState';
import { useNavigate } from '@tanstack/react-router';
import { listingColumns } from '../../columns';
import type { UseAgentListings } from '../../hooks';
import { ListingListMobile } from '../Listings/ListingListMobile';

type AgentListingTableProps = UseAgentListings & {
  listingDescription: ListingDescriptionDTO[];
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  error?: Error | null;
};

export const AgentListingTable = ({
  listingDescription,
  isLoading = false,
  isFetching = false,
  isError,
  error,
  ...listingProps
}: AgentListingTableProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <DataTable
        columns={listingColumns}
        data={listingDescription || []}
        totalItems={listingDescription.length}
        pagination={listingProps.pagination}
        setPagination={listingProps.setPagination}
        pageCount={Math.ceil(
          listingDescription.length / listingProps.pagination.pageSize
        )}
        isLoading={isLoading}
        isFetching={isFetching}
        isServerSide
        mobileCardRender={(row) => <ListingListMobile row={row} />}
        onRowAction={(listing) => {
          navigate({
            to: ViewListingLinks.VIEW_A_LISTING,
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
