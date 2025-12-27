import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import { convertUnderscoreToSpace } from '@/shared/utils';
import React from 'react';
import type { AmenitiesDTO } from '../../types';
import { ReviewTrigger } from '../shared';

type AmenitiesDetailsProps = {
  amenities?: AmenitiesDTO;
  onEdit?: () => void;
};

export const AmenitiesDetails = ({ amenities, onEdit }: AmenitiesDetailsProps) => {
  if (!amenities || !amenities.amenities || amenities.amenities.length === 0) {
    return null;
  }

  const items = [
    {
      name: 'Amenities',
      value: amenities.amenities,
    },
  ];

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Amenities" onEdit={onEdit} />,
    value: 'amenities',
    content: (
      <div className="grid grid-cols-[35%_1fr] gap-4 pt-6">
        {items.map((item) => (
          <React.Fragment key={item.name}>
            <div className="text-body-small text-black-400 min-w-0">
              {item.name}
            </div>
            <div className="flex gap-2 flex-wrap min-w-0">
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
