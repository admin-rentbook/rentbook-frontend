import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import { convertUnderscoreToSpace } from '@/shared/utils';
import React from 'react';
import type { AmenitiesData } from '../../types';
import { ReviewTrigger } from '../shared';

type AmenitiesDetailsProps = {
  amenities: AmenitiesData;
};

export const AmenitiesDetails = ({ amenities }: AmenitiesDetailsProps) => {
  const { selectedAmenities } = amenities;
  const items = [
    {
      name: 'Amenities',
      value: selectedAmenities,
    },
  ];

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Amenities" />,
    value: 'amenities',
    content: (
      <div className="grid grid-cols-[35%_1fr] gap-4 pt-6">
        {items.map((item) => (
          <React.Fragment key={item.name}>
            <div className="text-body-small text-black-400 min-w-0">
              {item.name}
            </div>
            <div className="flex gap-2 min-w-0">
              {item.value.map((amenity) => (
                <div
                  key={amenity}
                  className="flex text-body items-center justify-center p-2 text-white bg-primary-500 rounded-2xl"
                >
                  {convertUnderscoreToSpace(amenity)}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    ),
  };
  return (
    <div className="flex flex-col gap-2 border border-custom-neutral-50 rounded-[1.25em] p-4">
      <AccordionComponent
        type="single"
        defaultValue="listingDescription"
        items={[accordionItems]}
      />
    </div>
  );
};
