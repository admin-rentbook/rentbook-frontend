import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import { convertUnderscoreToSpace } from '@/shared/utils';
import React from 'react';
import type { ListingDescriptionDTO } from '../../types';
import { ReviewTrigger } from '../shared';

type ListingDetailsProps = {
  listingDetails?: ListingDescriptionDTO;
  onEdit?: () => void;
};

export const ListingDescriptionDetails = ({
  listingDetails,
  onEdit,
}: ListingDetailsProps) => {
  if (!listingDetails) return null;

  const {
    title,
    listing_type,
    beds,
    bathrooms,
    size_sqft,
    description,
  } = listingDetails;

  const items = [
    {
      name: 'Listing title',
      value: title,
    },
    {
      name: 'Listing type',
      value: convertUnderscoreToSpace(listing_type),
    },
    {
      name: 'Bed, baths & size',
      value: `${beds}, ${bathrooms}, ${size_sqft}`,
    },
    {
      name: 'Description',
      value: description,
    },
  ];

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Listing description" onEdit={onEdit} />,
    value: 'listingDescription',
    content: (
      <div className="grid grid-cols-[35%_1fr] gap-4 pt-6">
        {items.map((item) => (
          <React.Fragment key={item.name}>
            <div className="text-body-small text-black-400 min-w-0">
              {item.name}
            </div>
            <div className="text-body text-black-500 break-words whitespace-norma min-w-0">
              {item.value}
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
