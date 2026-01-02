import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import { Edit01Icon } from 'hugeicons-react';
import React from 'react';

type PropertyOwnerProps = {
  owner_full_name?: string;
  owner_email?: string;
  owner_phone?: string;
  onEdit?: () => void;
};

const PropertyOwnerTrigger = ({ onEdit }: { onEdit?: () => void }) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit?.();
  };

  return (
    <div className="flex items-center justify-between w-full">
      <h5 className="text-heading-4 text-icons-black">Property owner</h5>
      <Edit01Icon
        className="size-6 text-black-400 cursor-pointer"
        onClick={handleEditClick}
      />
    </div>
  );
};

export const PropertyOwner = ({
  owner_full_name,
  owner_email,
  owner_phone,
  onEdit,
}: PropertyOwnerProps) => {
  const items = [
    {
      name: 'Name',
      value: owner_full_name || '-',
    },
    {
      name: 'Email',
      value: owner_email || '-',
    },
    {
      name: 'Phone number',
      value: owner_phone || '-',
    },
  ];

  const accordionItems: AccordionItemType = {
    trigger: <PropertyOwnerTrigger onEdit={onEdit} />,
    value: 'propertyOwner',
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
        defaultValue="propertyOwner"
        items={[accordionItems]}
      />
    </div>
  );
};
