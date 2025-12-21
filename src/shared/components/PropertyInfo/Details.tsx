import { useExpandableText } from '@/shared/hooks';
import type { PropertyDTO } from '@/shared/types';
import { convertUnderscoreToSpace, squareMeterFormatter } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  Building06Icon,
  DashedLine02Icon,
} from 'hugeicons-react';
import { Button } from '../ui';

type DetailsProps = {
  property: PropertyDTO | undefined;
};

export const Details = ({ property }: DetailsProps) => {
  const { displayText, isExpanded, needsTruncation, toggle } =
    useExpandableText(property?.description ?? '');
  const propertyItems = [
    {
      name: convertUnderscoreToSpace(property?.propertyType),
      icon: Building06Icon,
    },
    {
      name: `${property?.bedrooms} bedrooms`,
      icon: BedSingle02Icon,
    },
    {
      name: `${property?.bathrooms} bathrooms`,
      icon: Bathtub01Icon,
    },
    {
      name: squareMeterFormatter.format(property?.square),
      icon: DashedLine02Icon,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-heading text-black-500">
          {property?.propertyName}
        </h2>
        <div className="flex gap-4 2xl:gap-6 flex-wrap">
          {propertyItems.map((item) => (
            <div className="flex gap-1 items-center" key={item.name}>
              <item.icon className="size-4 text-black-400" />
              <span className="text-body-small text-black-500">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-heading-3-semibold text-icons-black">
          About this property
        </h3>
        <div className="whitespace-pre-line text-body-base-normal text-black-300">
          {displayText}
        </div>
        {needsTruncation && (
          <div>
            <Button variant="tertiary" onClick={toggle} size="sm">
              {isExpanded ? 'Show less' : 'Show more'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
