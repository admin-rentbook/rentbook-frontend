import {
  Badge,
  Button,
  ButtonGroup,
  DataTable,
  SearchBox,
} from '@/shared/components';
import { FilterVerticalIcon } from 'hugeicons-react';
import { propertyColumns } from '../../columns';
import { usePropertyStore } from '../../store/usePropertyStore';
import type { PropertyDTO } from '../../types/property';

export const PropertyList = () => {
  const searchTerm = usePropertyStore((s) => s.searchTerm);
  const setSearchTerm = usePropertyStore((s) => s.setSearchTerm);
  const pagination = usePropertyStore((s) => s.pagination);
  const setPagination = usePropertyStore((s) => s.setPagination);
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="w-1/4 lg:w-1/5">
          <SearchBox
            placeholder="Filter by property name"
            inputValue={searchTerm}
            setInputValue={setSearchTerm}
            name="propertySearch"
          />
        </div>
        <div>
          <ButtonGroup>
            <Button variant="tertiary" className="gap-2 pr-1 rounded-full">
              <FilterVerticalIcon className="size-4" />
              <p className="text-body">Filter</p>

              <Badge className="ml-auto rounded-full size-7 bg-white text-black-500 text-body">
                2
              </Badge>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <DataTable
        columns={propertyColumns}
        data={propertyList}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};
const propertyList: PropertyDTO[] = [
  {
    name: 'Sunset Villas',
    address: '123 Sunset Blvd, Los Angeles, CA',
    unit: 10,
    totalUnits: 50,
    status: 'ACTIVE',
  },
  {
    name: 'Oceanview Apartments',
    address: '456 Ocean Dr, Miami, FL',
    unit: 8,
    totalUnits: 30,
    status: 'PENDING',
  },
  {
    name: 'Mountain Retreat',
    address: '789 Mountain Rd, Denver, CO',
    unit: 5,
    totalUnits: 20,
    status: 'INACTIVE',
  },
   {
    name: 'Sunset Villas',
    address: '123 Sunset Blvd, Los Angeles, CA',
    unit: 10,
    totalUnits: 50,
    status: 'ACTIVE',
  },
  {
    name: 'Oceanview Apartments',
    address: '456 Ocean Dr, Miami, FL',
    unit: 8,
    totalUnits: 30,
    status: 'PENDING',
  },
  {
    name: 'Mountain Retreat',
    address: '789 Mountain Rd, Denver, CO',
    unit: 5,
    totalUnits: 20,
    status: 'INACTIVE',
  },
  
];
