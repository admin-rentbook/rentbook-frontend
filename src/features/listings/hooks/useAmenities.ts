import { useMemo, useState } from 'react';
import { useListingDraft } from '../providers';
import { useAutoSaveValue } from './useAutoSave';

export const useAmenities = (
  initialAmenities: string[],
  onNext: (() => void) | undefined
) => {
  const { updateStepData, markStepComplete, getStepData } = useListingDraft();
  const savedData = useMemo(() => getStepData('amenities'), []);

  const [availableAmenities, setAvailableAmenities] =
    useState<string[]>(initialAmenities);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    savedData?.selectedAmenities || []
  );
  const [inputValue, setInputValue] = useState('');

  useAutoSaveValue(selectedAmenities, (current) => {
    updateStepData('amenities', { selectedAmenities: current });
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenity)) {
        return prev.filter((a) => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const addCustomAmenity = () => {
    const trimmedValue = inputValue.trim().toUpperCase().replace(/\s+/g, '_');

    if (!trimmedValue) return;

    if (availableAmenities.some((a) => a.toUpperCase() === trimmedValue)) {
      setInputValue('');
      return;
    }

    setAvailableAmenities((prev) => [...prev, trimmedValue]);
    setSelectedAmenities((prev) => [...prev, trimmedValue]);
    setInputValue('');
  };

  const isSelected = (amenity: string) => selectedAmenities.includes(amenity);
  const isButtonDisabled = selectedAmenities.length === 0;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomAmenity();
    }
  };

  const handleSubmit = () => {
    updateStepData('amenities', { selectedAmenities: selectedAmenities });
    markStepComplete(0, 1);
    onNext?.();
  };

  return {
    availableAmenities,
    selectedAmenities,
    inputValue,
    setInputValue,
    toggleAmenity,
    addCustomAmenity,
    isSelected,
    handleKeyPress,
    isButtonDisabled,
    handleSubmit,
  };
};
