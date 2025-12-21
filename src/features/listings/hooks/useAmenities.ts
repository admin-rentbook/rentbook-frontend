import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAddAmenities, useGetAmenities } from '../apis';
import { ListingLinks } from '../constants';
import { useListingDraft } from '../providers';
import { useAutoSaveValue } from './useAutoSave';

export const useAmenities = (
  initialAmenities: string[],
  onNext: (() => void) | undefined,
  onPrev: (() => void) | undefined,
  listingId: number
) => {
  const navigate = useNavigate({ from: '/listings-start' });

  const {
    updateStepData,
    updateFromApiResponse,
    isStepSyncedWithApi,
    syncFromApiData,
  } = useListingDraft();

  const {
    data: amenities,
    isPending,
    isFetching,
    isError,
    error,
  } = useGetAmenities(listingId);
  const addAmenitiesMutation = useAddAmenities();

  const [availableAmenities, setAvailableAmenities] =
    useState<string[]>(initialAmenities);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    amenities?.data || []
  );

  useEffect(() => {
    if (amenities && listingId) {
      const apiStepName = amenities || 'rentals';

      if (!isStepSyncedWithApi('amenities')) {
        syncFromApiData({
          listing_id: 1,
          current_step: apiStepName,
          listingDescription: amenities,
        });
      }
    }
  }, [amenities, listingId, syncFromApiData, isStepSyncedWithApi]);

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

  const handleBack = () => {
    navigate({
      to: ListingLinks.LISTINGS,
      search: (prev) => ({
        ...prev,
        propertyId: prev.propertyId,
      }),
    });
    onPrev?.();
  };

  const handleSubmit = () => {
    addAmenitiesMutation.mutate(
      {
        data: selectedAmenities,
        listingId: listingId as number,
      },
      {
        onSuccess: (res) => {
          updateFromApiResponse(res.data);
          onNext?.();
        },
      }
    );
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
    handleBack,
    isAddAmeLoading: addAmenitiesMutation.isPending,
    isPending,
    isFetching: isFetching && !amenities,
    isError,
    error,
  };
};
