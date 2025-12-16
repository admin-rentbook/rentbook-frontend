import { AddressPredictionsList } from '@/features/property-owners/components/Property/CreateProperty/AddressPredictionList';
import { InputGroupAddon, SearchBox } from '@/shared/components';
import { useGooglePlacesAutocomplete } from '@/shared/hooks';
import type { LocationResult } from '@/shared/types';
import { Search01Icon } from 'hugeicons-react';
import { useState } from 'react';
import { useSearchFilters } from '../hooks';
import { PriceRangeFilter } from './PriceRangeFilter';
import { PropertyTypeFilter } from './PropertyTypeFilter';
import { RoomsAndBedFilter } from './RoomsAndBedFilter';

export const Header = () => {
  const { filters, setPropertyType, setBathrooms, setBedrooms, setPriceRange } =
    useSearchFilters();
  const [_locationResult, setLocationResult] = useState<LocationResult | null>(
    null
  );

  const { input, setInput, predictions, loading, handleSelectPrediction } =
    useGooglePlacesAutocomplete({
      componentRestrictions: { country: 'na' },
      onLocationResult: (location) => {
        setLocationResult?.(location);
      },
    });
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-8 items-center w-full">
          <h1 className="text-heading-xl text-black-500 text-center">
            Find your dream home that
            <br /> tick all your boxes
          </h1>
          <div className="w-full flex flex-col gap-3 md:max-w-xl 2xl:max-w-2xl">
            <div className="relative">
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

              {loading ||
                (predictions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white p-2 rounded-lg  max-h-60 overflow-y-auto">
                    <AddressPredictionsList
                      onSelect={handleSelectPrediction}
                      predictions={predictions}
                    />
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full justify-evenly lg:justify-around">
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
