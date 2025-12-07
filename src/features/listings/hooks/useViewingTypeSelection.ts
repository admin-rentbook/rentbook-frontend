import { useState } from 'react';
import { type ViewingType, ViewingTypes } from '../constants';


export type SelectCardSelection = {
    selectedType: ViewingType;
    hoveredType: string | null;
    selectType: (value: ViewingType) => void;
    isSelected: (value: string) => boolean;
    isHovered: (value: string) => boolean;
    handleMouseEnter: (value: string) => void;
    handleMouseLeave: () => void;
}

export const useViewingTypeSelection = ():SelectCardSelection => {
  const [selectedType, setSelectedType] = useState<ViewingType>(ViewingTypes.VIEWING_AVAILABLE);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const selectType = (value: ViewingType) => {
    setSelectedType(value);
  };

  const isSelected = (value: string) => selectedType === value;
  const isHovered = (value: string) => hoveredType === value;

  const handleMouseEnter = (value: string) => setHoveredType(value);
  const handleMouseLeave = () => setHoveredType(null);

  return {
    selectedType,
    hoveredType,
    selectType,
    isSelected,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
};
