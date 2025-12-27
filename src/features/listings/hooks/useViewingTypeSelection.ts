import { useEffect, useState } from 'react';
import { type ViewingType, ViewingTypes } from '../constants';
import { useListingDraft } from '../providers';
import type { ViewingDTO } from '../types/listing.dtos';
import { transformViewingDTOToFormValues } from '../types/mappedTypes';

export type SelectCardSelection = {
  selectedType: ViewingType;
  hoveredType: string | null;
  selectType: (value: ViewingType) => void;
  isSelected: (value: string) => boolean;
  isHovered: (value: string) => boolean;
  handleMouseEnter: (value: string) => void;
  handleMouseLeave: () => void;
  handleSelectViewingTypeChange: (viewingType: ViewingType) => void;
};

export const useViewingTypeSelection = (
  viewingData?: ViewingDTO
): SelectCardSelection => {
  const { updateStepData, draft } = useListingDraft();

  const [selectedType, setSelectedType] = useState<ViewingType>(
    draft?.viewingTimes?.viewingType || ViewingTypes.VIEWING_AVAILABLE
  );
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  useEffect(() => {
    if (viewingData) {
      const formValues = transformViewingDTOToFormValues(viewingData);
      if (formValues.viewingType) {
        setSelectedType(formValues.viewingType);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewingData]);

  const selectType = (value: ViewingType) => {
    setSelectedType(value);
  };

  const isSelected = (value: string) => selectedType === value;
  const isHovered = (value: string) => hoveredType === value;

  const handleMouseEnter = (value: string) => setHoveredType(value);
  const handleMouseLeave = () => setHoveredType(null);

  const handleSelectViewingTypeChange = (viewingType: ViewingType) => {
    const currentDraft = draft?.viewingTimes;
    selectType(viewingType);
    updateStepData('viewingTimes', {
      ...currentDraft,
      viewingType: viewingType,
    });
  };

  return {
    selectedType,
    hoveredType,
    selectType,
    isSelected,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleSelectViewingTypeChange,
  };
};
