import { ListingTypes } from '@/features/listings/constants';
import { NavigationMenuComp } from '@/shared/components/NavigationMenu';
import { convertUnderscoreToSpace } from '@/shared/utils';
import {
  Building06Icon,
  GuestHouseIcon,
  RealEstate01Icon,
} from 'hugeicons-react';
import type { PropertyType } from '../../types';
import { PropertyTypeCard } from './PropertyTypeCard';

const propertyTypes = [
  {
    value: ListingTypes.APARTMENT,
    icon: Building06Icon,
  },
  {
    value: ListingTypes.HOUSE,
    icon: GuestHouseIcon,
  },
  {
    value: ListingTypes.TOWNHOUSE,
    icon: RealEstate01Icon,
  },
];

type PropertyTypeFilterProps = {
  propertyTypeFilters: PropertyType | null;
  setPropertyTypeFilter: (type: PropertyType | null) => void;
};
export const PropertyTypeFilter = ({
  propertyTypeFilters,
  setPropertyTypeFilter,
}: PropertyTypeFilterProps) => {
  const Trigger = (
    <div className="flex gap-2 items-center text-body-medium text-black-500">
      <GuestHouseIcon className="size-5" />
      <p>Property type</p>
    </div>
  );
  return (
    <NavigationMenuComp
      trigger={Trigger}
      children={
        <div className="flex flex-col gap-6 px-4 pt-4 pb-8">
          <p className="text-body-medium text-black-500">Property type</p>
          <div className='flex gap-4'>
            {propertyTypes.map((type) => (
              <PropertyTypeCard
                key={type.value}
                IconComponent={type.icon}
                isSelected={propertyTypeFilters === type.value}
                label={convertUnderscoreToSpace(type.value) as PropertyType}
                onClick={() => {
                  setPropertyTypeFilter(
                    propertyTypeFilters === type.value
                      ? null
                      : (type.value as PropertyType)
                  );
                }}
              />
            ))}
          </div>
        </div>
      }
    />
  );
};
