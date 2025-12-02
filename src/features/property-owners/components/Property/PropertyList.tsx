import { DataTable, SearchBox } from '@/shared/components';
import { useState } from 'react';
import { propertyColumns } from '../../columns';
import { usePropertyStore } from '../../store/usePropertyStore';
import type { PropertyDTO, PropertyFilters } from '../../types/property';
import { PropertyListMobile } from './Mobile';
import { PropertyFilter } from './PropertyFilter';

export const PropertyList = () => {
  const searchTerm = usePropertyStore((s) => s.searchTerm);
  const setSearchTerm = usePropertyStore((s) => s.setSearchTerm);
  const pagination = usePropertyStore((s) => s.pagination);
  const setPagination = usePropertyStore((s) => s.setPagination);

  const [filters, setFilters] = useState<PropertyFilters>({
    status: null,
  });

  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="w-2/3 lg:w-1/5">
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
      <DataTable
        columns={propertyColumns}
        data={propertyList}
        pagination={pagination}
        setPagination={setPagination}
        mobileCardRender={(row) => <PropertyListMobile row={row} />}
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
    status: 'INACTIVE',
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
    status: 'INACTIVE',
  },
  {
    name: 'Mountain Retreat',
    address: '789 Mountain Rd, Denver, CO',
    unit: 5,
    totalUnits: 20,
    status: 'INACTIVE',
  },
  {
    name: 'Oceanview Apartments',
    address: '456 Ocean Dr, Miami, FL',
    unit: 8,
    totalUnits: 30,
    status: 'INACTIVE',
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
    status: 'INACTIVE',
  },
  {
    name: 'Mountain Retreat',
    address: '789 Mountain Rd, Denver, CO',
    unit: 5,
    totalUnits: 20,
    status: 'INACTIVE',
  },
  {
    name: 'Oceanview Apartments',
    address: '456 Ocean Dr, Miami, FL',
    unit: 8,
    totalUnits: 30,
    status: 'INACTIVE',
  },
  {
    name: 'Mountain Retreat',
    address: '789 Mountain Rd, Denver, CO',
    unit: 5,
    totalUnits: 20,
    status: 'INACTIVE',
  },
];
