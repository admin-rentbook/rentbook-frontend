import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import { formatDateLong } from '@/shared/utils';
import { Edit01Icon } from 'hugeicons-react';
import React from 'react';

type AboutPropertyProps = {
  displayName?: string;
  displayAddress?: string;
  listed_by?: 'owner' | 'agent';
  created_at?: string;
  onEdit?: () => void;
};

const AboutPropertyTrigger = ({ onEdit }: { onEdit?: () => void }) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit?.();
  };

  return (
    <div className="flex items-center justify-between w-full">
      <h5 className="text-heading-4 text-icons-black">About property</h5>
      <Edit01Icon
        className="size-6 text-black-400 cursor-pointer"
        onClick={handleEditClick}
      />
    </div>
  );
};

export const AboutProperty = ({
  displayName,
  displayAddress,
  listed_by,
  created_at,
  onEdit,
}: AboutPropertyProps) => {
  const items = [
    {
      name: 'Name',
      value: displayName || '-',
    },
    {
      name: 'Address',
      value: displayAddress || '-',
    },
    {
      name: 'Created by',
      value: listed_by === 'owner' ? 'Property Owner' : 'Agent',
    },
    {
      name: 'Date created',
      value: created_at ? formatDateLong(created_at) : '-',
    },
  ];

  const accordionItems: AccordionItemType = {
    trigger: <AboutPropertyTrigger onEdit={onEdit} />,
    value: 'aboutProperty',
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
        defaultValue="aboutProperty"
        items={[accordionItems]}
      />
    </div>
  );
};