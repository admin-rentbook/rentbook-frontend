import { PropertyDetailsLinks } from '@/features/property-details';
import { DataTable, SearchBox } from '@/shared/components';
import { EmptyState } from '@/shared/components/EmptyState';
import { ErrorState } from '@/shared/components/ErrorState';
import { FilterHeaderSkeleton } from '@/shared/components/Skeletons';
import { useNavigate } from '@tanstack/react-router';
import { useGetProperties } from '../../apis';
import { propertyColumns } from '../../columns';
import type { PropertyStatusType } from '../../constants';
import { usePropertyList } from '../../hooks';
import { PropertyListMobile } from './Mobile';
import { PropertyFilter } from './PropertyFilter';

export const PropertyList = () => {
  const {
    searchTerm,
    setSearchTerm,
    pagination,
    setPagination,
    filters,
    setFilters,
    reset,
  } = usePropertyList();
  const {
    data: properties,
    isPending,
    isFetching,
    isError = true,
    error,
    refetch,
  } = useGetProperties(
    filters.status as PropertyStatusType,
    pagination.pageIndex,
    pagination.pageSize
  );
  const navigate = useNavigate();
  if (isError) {
    return (
      <div className="p-6">
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      {isPending || (isFetching && !properties) ? (
        <FilterHeaderSkeleton />
      ) : (
        <div className="flex items-center justify-between">
          <div className="w-2/3 lg:w-auto">
            <SearchBox
              placeholder="Filter by property name"
              inputValue={searchTerm}
              setInputValue={setSearchTerm}
              name="propertySearch"
            />
          </div>
          <div>
            <PropertyFilter filters={filters} onChange={setFilters} />
          </div>
        </div>
      )}

      <DataTable
        columns={propertyColumns}
        data={properties?.results || []}
        totalItems={properties?.count}
        pagination={pagination}
        setPagination={setPagination}
        pageCount={properties?.total_pages}
        isLoading={isPending}
        isFetching={isFetching}
        isServerSide
        mobileCardRender={(row) => <PropertyListMobile row={row} />}
        onRowAction={(property) => {
          navigate({
            to: PropertyDetailsLinks.PROPERTY_DETAILS,
            search: { propertyId: property.id },
          });
        }}
        emptyState={
          <EmptyState
            title="No properties found"
            description={
              searchTerm
                ? `No properties matching "${searchTerm}"`
                : `No ${filters?.status} properties at the moment`
            }
            actionLabel="Clear Search"
            onAction={reset}
          />
        }
      />
    </div>
  );
};
