import { convertUnderscoreToSpace } from '@/shared/utils';
import { useState } from 'react';
import { Button } from '../ui';

type ExcitingFeaturesProps = {
  amenities: string[];
};

export const ExcitingFeatures = ({ amenities }: ExcitingFeaturesProps) => {
  const [showAll, setShowAll] = useState(false);
  const DISPLAY_LIMIT = 10;

  const displayedAmenities = showAll
    ? amenities
    : amenities.slice(0, DISPLAY_LIMIT);

  const hasMoreItems = amenities.length > DISPLAY_LIMIT;

  const midpoint = Math.ceil(displayedAmenities.length / 2);
  const leftColumn = displayedAmenities.slice(0, midpoint);
  const rightColumn = displayedAmenities.slice(midpoint);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-heading text-black-500">Exciting features</h2>
      <div className="grid grid-cols-2 gap-8">
        <ul className="space-y-2 list-disc pl-5">
          {leftColumn.map((amenity, index) => (
            <li
              key={`left-${convertUnderscoreToSpace(amenity)}-${index}`}
              className="text-body-small text-black-300"
            >
              {convertUnderscoreToSpace(amenity)}
            </li>
          ))}
        </ul>

        <ul className="space-y-2 list-disc pl-5">
          {rightColumn.map((amenity, index) => (
            <li
              key={`right-${convertUnderscoreToSpace(amenity)}-${index}`}
              className="text-body-small text-black-300"
            >
              {convertUnderscoreToSpace(amenity)}
            </li>
          ))}
        </ul>
      </div>

      {hasMoreItems && (
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="w-fit"
        >
          {showAll ? 'Show less' : `Show all ${amenities.length} features`}
        </Button>
      )}
    </div>
  );
};
