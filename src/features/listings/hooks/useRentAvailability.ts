import { formatForDateInput, isAvailableLater } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import {
  useGetFinalDetails,
  useUpdateFinalDetails,
} from '../apis/requests/finalDetails';
import {
  rentAvailabilitySchema,
  RentAvailabilityTypes,
  type RentAvailabilityType,
} from '../constants';
import { useListingDraft } from '../providers';
import type { RentAvailabilityFormValues } from '../types';
import { transformFinalDetailsDTOToFormValues } from '../types/mappedTypes';
import { useAutoSave } from './useAutoSave';

export type UseRentAvailability = {
  isButtonDisabled: boolean;
  form: UseFormReturn<RentAvailabilityFormValues>;
  handleSelectRentAvailabilityTypeChange: (
    newBookViewType: RentAvailabilityType
  ) => void;
  onSubmit: (data: RentAvailabilityFormValues) => void;
  selectedRentAvailabilityType: RentAvailabilityType;
  hoveredType: string | null;
  selectRentAvailabilityType: (value: RentAvailabilityType) => void;
  isSelected: (value: string) => boolean;
  isHovered: (value: string) => boolean;
  handleMouseEnter: (value: string) => void;
  handleMouseLeave: () => void;
  isUpdateLoading: boolean;
  isPending: boolean;
  isFetching: boolean;
};

export const useRentAvailability = (
  listingId: number,
  onNext: (() => void) | undefined
): UseRentAvailability => {
  const { updateStepData, markStepComplete, draft } = useListingDraft();
  const [selectedRentAvailabilityType, setSelectedRentAvailabilityType] =
    useState<RentAvailabilityType>(
      draft?.finalDetails?.rentAvailability?.rentAvailability ||
        RentAvailabilityTypes.AVAILABLE_NOW
    );
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const {
    data: finalDetailsData,
    isPending,
    isFetching,
  } = useGetFinalDetails(listingId);
  const finalDetails = finalDetailsData?.data;

  const updateFinalDetailsMutation = useUpdateFinalDetails();

  useEffect(() => {
    if (finalDetails) {
      const formValues = transformFinalDetailsDTOToFormValues(finalDetails);

      const currentDraft = draft?.finalDetails || {};
      updateStepData('finalDetails', {
        ...currentDraft,
        rentAvailability: formValues,
      });

      form.reset(formValues);
      setSelectedRentAvailabilityType(formValues.rentAvailability);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalDetails]);

  const selectRentAvailabilityType = (value: RentAvailabilityType) => {
    setSelectedRentAvailabilityType(value);
  };

  const isSelected = (value: string) => selectedRentAvailabilityType === value;
  const isHovered = (value: string) => hoveredType === value;

  const handleMouseEnter = (value: string) => setHoveredType(value);
  const handleMouseLeave = () => setHoveredType(null);

  const form = useForm<RentAvailabilityFormValues>({
    resolver: zodResolver(rentAvailabilitySchema),
    mode: 'onChange',
    defaultValues:
      draft?.finalDetails?.rentAvailability ||
      ({
        rentAvailability: selectedRentAvailabilityType,
        ...(selectedRentAvailabilityType ===
          RentAvailabilityTypes.AVAILABLE_LATER && {
          listingDate: undefined,
        }),
      } as RentAvailabilityFormValues),
  });

  useAutoSave(form, (value) => {
    const currentDraft = draft?.finalDetails || {};
    updateStepData('finalDetails', {
      ...currentDraft,
      rentAvailability: value,
    });
  });

  const handleSelectRentAvailabilityTypeChange = (
    newType: RentAvailabilityType
  ) => {
    selectRentAvailabilityType(newType);

    const currentDraft = draft?.finalDetails || {};
    const savedAvailability = currentDraft.rentAvailability;

    let savedListingDate = '';
    if (savedAvailability && isAvailableLater(savedAvailability)) {
      savedListingDate = savedAvailability.listingDate;
    }

    let newFormData: RentAvailabilityFormValues;

    if (newType === RentAvailabilityTypes.AVAILABLE_NOW) {
      newFormData = {
        rentAvailability: newType,
      };
    } else {
      newFormData = {
        rentAvailability: newType,
        listingDate: formatForDateInput(savedListingDate),
      } as RentAvailabilityFormValues;
    }
    form.reset(newFormData);

    updateStepData('finalDetails', {
      ...currentDraft,
      rentAvailability: newFormData,
    });
  };

  function onSubmit(data: z.infer<typeof rentAvailabilitySchema>) {
    updateFinalDetailsMutation.mutate(
      {
        data,
        listingId: listingId as number,
      },
      {
        onSuccess: () => {
          // Update draft with saved data
          const currentDraft = draft?.finalDetails || {};
          updateStepData('finalDetails', {
            ...currentDraft,
            rentAvailability: data,
          });

          markStepComplete(3, 0);
          onNext?.();
        },
      }
    );
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    onSubmit,
    form,
    handleSelectRentAvailabilityTypeChange,
    selectedRentAvailabilityType,
    selectRentAvailabilityType,
    isSelected,
    isHovered,
    hoveredType,
    handleMouseEnter,
    handleMouseLeave,
    isButtonDisabled,
    isUpdateLoading: updateFinalDetailsMutation.isPending,
    isPending: isPending && !finalDetails,
    isFetching,
  };
};