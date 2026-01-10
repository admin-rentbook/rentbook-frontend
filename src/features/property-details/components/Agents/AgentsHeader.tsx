import { SearchBox } from '@/shared/components';
import { FilterHeaderSkeleton } from '@/shared/components/Skeletons';
import type { AgentFilters } from '../../types';
import { AgentFilter } from './AgentFilter';

type AgentsHeaderProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: AgentFilters;
  setFilters: (filters: AgentFilters) => void;
  isLoading: boolean;
  isFetching: boolean;
  onAddAgent: () => void;
};

export const AgentsHeader = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  isLoading,
  isFetching,
}: AgentsHeaderProps) => {
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
              placeholder="Search by agent name"
            />
          </div>

          <div className="flex gap-2">
            <AgentFilter filters={filters} onChange={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
};
