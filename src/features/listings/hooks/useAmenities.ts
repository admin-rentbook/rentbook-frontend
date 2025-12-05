import { useState } from 'react';
import { DEFAULT_AMENITIES } from '../constants';

export const useAmenities = (initialAmenities = DEFAULT_AMENITIES) => {
  const [availableAmenities, setAvailableAmenities] =
    useState<string[]>(initialAmenities);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

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
  const isButtonDisabled = selectedAmenities.length === 0

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    addCustomAmenity();
    }
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
    isButtonDisabled
  };
};
