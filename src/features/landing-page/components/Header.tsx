import { InputGroupAddon, SearchBox } from '@/shared/components';
import { Search01Icon } from 'hugeicons-react';
import { useState } from 'react';
import { useSearchFilters } from '../hooks';
import { PriceRangeFilter } from './PriceRangeFilter';
import { PropertyTypeFilter } from './PropertyTypeFilter';
import { RoomsAndBedFilter } from './RoomsAndBedFilter';

export const Header = () => {
  const [input, setInput] = useState('');
  const { filters, setPropertyType, setBathrooms, setBedrooms, setPriceRange } =
    useSearchFilters();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-heading-xl text-black-500 text-center">
            Find your dream home that
            <br /> tick all your boxes
          </h1>
          <div className="w-full flex flex-col gap-3 max-w-3xl">
            <SearchBox
              placeholder="What is your desired location?"
              inputValue={input}
              setInputValue={setInput}
              className="h-11"
              name="keyword"
              containerClassName="h-[60px] rounded-full"
              addon={
                <InputGroupAddon align="inline-end">
                  <div className="size-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <Search01Icon className="size-4 text-white" />
                  </div>
                </InputGroupAddon>
              }
            />
            <div className="flex flex-col lg:flex-row gap-5 w-full justify-around">
              <PropertyTypeFilter
                propertyTypeFilters={filters.propertyType}
                setPropertyTypeFilter={setPropertyType}
              />
              <RoomsAndBedFilter
                baths={filters.bathrooms}
                bedrooms={filters.bedrooms}
                setBathrooms={setBathrooms}
                setBedrooms={setBedrooms}
              />
              <PriceRangeFilter
                priceRange={filters.priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
