import { Button, SearchBox } from '@/shared/components';
import { FilterHeaderSkeleton } from '@/shared/components/Skeletons';
import { Add01Icon } from 'hugeicons-react';
import type { UseListing } from '../../hooks';
import { DisplayMenu } from './DisplayMenu';
import { ListingFilter } from './ListingFilter';

type ListingHeaderProps = UseListing & {
  isLoading: boolean;
  isFetching: boolean;
};
export const ListingsHeader = (props: ListingHeaderProps) => {
  return (
    <div>
      {props.isLoading || props.isFetching ? (
        <FilterHeaderSkeleton />
      ) : (
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="w-auto">
            <SearchBox
              inputValue={props.searchTerm}
              setInputValue={props.setSearchTerm}
              name="searchTerm"
              placeholder="search by listing name"
            />
          </div>

          <div className="flex gap-2">
            <ListingFilter
              filters={props.filters}
              onChange={props.setFilters}
            />
            <DisplayMenu
              displayOptions={props.displayOptions}
              onChange={props.setDisplayOptions}
            />
            <Button
              variant="outline"
              className="gap-2 shadow-custom-sm"
              size="sm"
            >
              <Add01Icon className="h-4 w-4" />
              <span className="hidden md:inline text-body">Add listing</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
