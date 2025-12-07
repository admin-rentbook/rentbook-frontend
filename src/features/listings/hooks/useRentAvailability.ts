import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import {
  rentAvailabilitySchema,
  RentAvailabilityTypes,
  type RentAvailabilityType,
} from '../constants';
import type { RentAvailabilityFormValues } from '../types';

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
};

export const useRentAvailability = (
  onNext: (() => void) | undefined
): UseRentAvailability => {
  const [selectedRentAvailabilityType, setSelectedRentAvailabilityType] =
    useState<RentAvailabilityType>(RentAvailabilityTypes.AVAILABLE_NOW);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

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
    defaultValues: {
      rentAvailability: selectedRentAvailabilityType,
      ...(selectedRentAvailabilityType ===
        RentAvailabilityTypes.AVAILABLE_LATER && {
        listingDate: undefined,
      }),
    } as RentAvailabilityFormValues,
  });
  const handleSelectRentAvailabilityTypeChange = (
    newType: RentAvailabilityType
  ) => {
    selectRentAvailabilityType(newType);
    if (newType === RentAvailabilityTypes.AVAILABLE_NOW) {
      form.reset({
        rentAvailability: newType,
      });
    } else {
      form.reset({
        rentAvailability: newType,
        listingDate: undefined,
      });
    }
  };
  function onSubmit(data: z.input<typeof rentAvailabilitySchema>) {
    console.log(data);
    onNext?.();
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
  };
};
