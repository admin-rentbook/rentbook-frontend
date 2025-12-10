import type { ListingDescriptionFormValues } from '@/features/listings/types';
import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import { convertUnderscoreToSpace } from '@/shared/utils';
import React from 'react';
import { ReviewTrigger } from '../shared';

type ListingDetailsProps = {
  listingDetails: ListingDescriptionFormValues;
};

export const ListingDescriptionDetails = ({
  listingDetails,
}: ListingDetailsProps) => {
  const {
    noOfBeds,
    noOfBathrooms,
    sizeSqFt,
    listingDescription,
    listingTitle,
    listingType,
  } = listingDetails;
  const items = [
    {
      name: 'Listing title',
      value: listingTitle,
    },
    {
      name: 'Listing type',
      value: convertUnderscoreToSpace(listingType),
    },
    {
      name: 'Bed, baths & size',
      value: `${noOfBeds}, ${noOfBathrooms}, ${sizeSqFt}`,
    },
    {
      name: 'Description',
      value: listingDescription,
    },
  ];

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Listing description" />,
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
