import { ListingLinks } from '@/features/listings/constants';
import type { ListingDescriptionDTO } from '@/features/listings/types';
import { ViewListingLinks } from '@/features/owner-listing-details';
import { DataTable } from '@/shared/components';
import { EmptyState } from '@/shared/components/EmptyState';
import { useNavigate } from '@tanstack/react-router';
import { listingColumns } from '../../columns';
import type { UseComplex } from '../../hooks';
import { ListingListMobile } from '../Listings/ListingListMobile';

type ComplexTableProps = UseComplex & {
  listings: ListingDescriptionDTO[];
};

export const ComplexTable = ({
  listings,
  ...complexProps
}: ComplexTableProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <DataTable
        columns={listingColumns}
        data={listings || []}
        totalItems={listings.length}
        pagination={complexProps.pagination}
        setPagination={complexProps.setPagination}
        pageCount={Math.ceil(
          listings.length / complexProps.pagination.pageSize
        )}
        isLoading={complexProps.isLoading}
        isFetching={complexProps.isFetching}
        isServerSide
        mobileCardRender={(row) => <ListingListMobile row={row} />}
        onRowAction={(listing) => {
          const isDraft = listing.status === 'draft';
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
              complexProps.searchTerm
                ? `No listings matching "${complexProps.searchTerm}"`
                : `No ${complexProps.filters?.status} listings in this complex at the moment`
            }
            actionLabel="Clear Search"
            onAction={complexProps.reset}
          />
        }
      />
    </div>
  );
};
