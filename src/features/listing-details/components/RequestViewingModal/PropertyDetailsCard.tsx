import propImg from '@/assets/images/property-6.jpg';
import { currencyFormatter, squareMeterFormatter } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  DashedLine02Icon,
} from 'hugeicons-react';
import type { PublicListingDTO } from '../../types';

type PropertyDetailsCardProps = {
  property: PublicListingDTO;
};

export const PropertyDetailsCard = ({ property }: PropertyDetailsCardProps) => {
  const propItems = [
    {
      value: `${property.beds}`,
      icon: BedSingle02Icon,
    },
    {
      value: `${property.bathrooms}`,
      icon: Bathtub01Icon,
    },
    {
      value: `${squareMeterFormatter.format(parseFloat(property.size_sqft))}`,
      icon: DashedLine02Icon,
    },
  ];

  return (
    <div className="relative">
      <img
        src={propImg}
        alt={property.property_name}
        className="object-cover rounded-[1.25em] h-[200px] w-full"
      />
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 text-white p-3 bg-gradient-to-t from-black/60 to-transparent rounded-b-[1.25em]">
        <p className="text-body-medium">{property.property_name}</p>
        <p className="text-body-small">
          {property.property_address.formatted_address}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center flex-wrap">
            {propItems.map((item, index) => (
              <div key={index} className="flex gap-1 items-center text-white">
                <item.icon className="size-4 text-white" />
                <p className="text-body-small">{item.value}</p>
              </div>
            ))}
            <p>
              {currencyFormatter.format(
                parseFloat(property.pricing.rental_price || '0'),
                false
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
