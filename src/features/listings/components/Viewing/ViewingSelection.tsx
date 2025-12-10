import { SelectCard } from '@/shared/components';
import { viewingTypes } from '../../constants';
import type { SelectCardSelection } from '../../hooks';
import { TimeZone } from './TimeZone';

type ViewingSelectionProps = {
  viewingTypeSelection: SelectCardSelection;
};

export const ViewingSelection = ({
  viewingTypeSelection,
}: ViewingSelectionProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3">
        {viewingTypes.map((rentalType) => (
          <SelectCard
            key={rentalType.value}
            type={rentalType}
            isSelected={viewingTypeSelection.isSelected(rentalType.value)}
            isHovered={viewingTypeSelection.isHovered(rentalType.value)}
            onSelect={() =>
              viewingTypeSelection.handleSelectViewingTypeChange(
                rentalType.value
              )
            }
            onMouseEnter={() =>
              viewingTypeSelection.handleMouseEnter(rentalType.value)
            }
            onMouseLeave={viewingTypeSelection.handleMouseLeave}
          />
        ))}
      </div>
      <TimeZone />
    </div>
  );
};
