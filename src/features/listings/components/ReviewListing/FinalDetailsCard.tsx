import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import React from 'react';
import type { FinalDetailsDTO } from '../../types';
import { ReviewTrigger } from '../shared';

type FinalDetailsCardProps = {
  finalDetails?: FinalDetailsDTO;
  onEdit?: () => void;
};

export const FinalDetailsCard = ({ finalDetails, onEdit }: FinalDetailsCardProps) => {
  if (!finalDetails) return null;

  const items = [
    {
      name: 'Availability',
      value: finalDetails.is_available_now
        ? 'Available Now'
        : 'Available Later',
    },
  ];

  if (!finalDetails.is_available_now) {
    items.push({
      name: 'Available from',
      value: finalDetails.availability_date,
    });
  }

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Availability" onEdit={onEdit} />,
    value: 'finalDetails',
    content: (
      <div className="grid grid-cols-[35%_1fr] gap-4 pt-6">
        {items.map((item) => (
          <React.Fragment key={item.name}>
            <div className="text-body-small text-black-400 min-w-0">
              {item.name}
            </div>
            <div className="text-body text-black-500 break-words whitespace-normal min-w-0">
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
        defaultValue="finalDetails"
        items={[accordionItems]}
      />
    </div>
  );
};
