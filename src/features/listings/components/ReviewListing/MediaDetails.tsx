import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import React from 'react';
import type { MediaDTO } from '../../types';
import { ReviewTrigger } from '../shared';

type MediaDetailsProps = {
  images?: MediaDTO[];
  onEdit?: () => void;
};
export const MediaDetails = ({ images, onEdit }: MediaDetailsProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  const items = [
    {
      name: 'Media',
      value: images,
    },
  ];

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Media" onEdit={onEdit} />,
    value: 'media',
    content: (
      <div className="grid grid-cols-[35%_1fr] gap-4 pt-6">
        {items.map((item) => (
          <React.Fragment key={item.name}>
            <div className="text-body-small text-black-400 min-w-0">
              {item.name}
            </div>
            <div className="flex gap-2 flex-wrap min-w-0">
              {item.value.map((image, idx) => (
                <div key={image.id || idx} className="h-auto w-[100px] rounded-[1.25em] border-none min-w-0">
                  <img
                    src={image.signed_url || image.file_url || ''}
                    alt={'Upload ' + (idx + 1)}
                    className="w-full h-full object-contain"
                  />
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
