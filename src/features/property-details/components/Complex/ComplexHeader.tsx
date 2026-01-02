import { Button, SearchBox } from '@/shared/components';
import { FilterHeaderSkeleton } from '@/shared/components/Skeletons';
import { Add01Icon, Delete02Icon, Edit01Icon } from 'hugeicons-react';
import type { UseComplex } from '../../hooks';
import { ListingFilter } from '../Listings/ListingFilter';

type ComplexHeaderProps = UseComplex & {
  complexName?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const ComplexHeader = (props: ComplexHeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Complex Name and Actions Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-heading-3 text-neutral-600">{props.complexName || 'Complex'}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 shadow-custom-sm"
            size="sm"
            onClick={props.onEdit}
          >
            <Edit01Icon className="h-4 w-4" />
            <span className="hidden md:inline text-body">Edit complex</span>
          </Button>
          <Button
            variant="outline"
            className="gap-2 shadow-custom-sm"
            size="sm"
            onClick={props.onDelete}
          >
            <Delete02Icon className="h-4 w-4" />
            <span className="hidden md:inline text-body">Delete complex</span>
          </Button>
        </div>
      </div>

      {/* Search and Filters Row */}
      {props.isLoading || props.isFetching ? (
        <FilterHeaderSkeleton />
      ) : (
        <div className="flex justify-between">
          <div className="w-auto">
            <SearchBox
              inputValue={props.searchTerm}
              setInputValue={props.setSearchTerm}
              name="searchTerm"
              placeholder="search by listing name"
            />
          </div>

          <div className="flex gap-2">
            <ListingFilter filters={props.filters} onChange={props.setFilters} />
            <Button variant="outline" className="gap-2 shadow-custom-sm" size="sm">
              <Add01Icon className="h-4 w-4" />
              <span className="hidden md:inline text-body">Add listing</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};