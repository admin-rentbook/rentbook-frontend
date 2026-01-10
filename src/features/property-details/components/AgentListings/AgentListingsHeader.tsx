import { SearchBox } from '@/shared/components';
import { FilterHeaderSkeleton } from '@/shared/components/Skeletons';
import type { UseListing } from '../../hooks';
import { ListingFilter } from '../Listings/ListingFilter';

type AgentListingsHeaderProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: UseListing['filters'];
  setFilters: UseListing['setFilters'];
  isLoading: boolean;
  isFetching: boolean;
};

export const AgentListingsHeader = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  isLoading,
  isFetching,
}: AgentListingsHeaderProps) => {
  return (
    <div>
      {isLoading || isFetching ? (
        <FilterHeaderSkeleton />
      ) : (
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="w-auto">
            <SearchBox
              inputValue={searchTerm}
              setInputValue={setSearchTerm}
              name="searchTerm"
              placeholder="search by listing name"
            />
          </div>

          <div className="flex gap-2">
            <ListingFilter filters={filters} onChange={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
};
