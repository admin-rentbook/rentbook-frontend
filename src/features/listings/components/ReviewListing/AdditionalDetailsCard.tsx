import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import type { AdditionalDetailsDTO } from '../../types';
import { ReviewTrigger } from '../shared';

type AdditionalDetailsCardProps = {
  additionalDetails?: AdditionalDetailsDTO;
  onEdit?: () => void;
};

export const AdditionalDetailsCard = ({
  additionalDetails,
  onEdit,
}: AdditionalDetailsCardProps) => {
  if (
    !additionalDetails ||
    !additionalDetails.details ||
    additionalDetails.details.length === 0
  ) {
    return null;
  }

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Additional details" onEdit={onEdit} />,
    value: 'additionalDetails',
    content: (
      <div className="flex flex-col gap-4 pt-6">
        {additionalDetails.details.map((note, idx) => (
          <div
            key={note.id || idx}
            className="flex flex-col gap-2 p-4 bg-sidebar rounded-lg"
          >
            <h4 className="text-body-medium text-black-500">{note.title}</h4>
            <p className="text-body text-black-400 whitespace-normal">
              {note.description}
            </p>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="flex flex-col gap-2 border border-custom-neutral-50 rounded-[1.25em] p-4">
      <AccordionComponent
        type="single"
        defaultValue="additionalDetails"
        items={[accordionItems]}
      />
    </div>
  );
};
