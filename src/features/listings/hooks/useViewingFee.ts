import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import {
  BookViewingTypes,
  viewFeeSchema,
  type BookViewingType,
} from '../constants';
import type { ViewFeeFormValues } from '../types';

export type UseViewingFee = {
  isButtonDisabled: boolean;
  form: UseFormReturn<ViewFeeFormValues>;
  handleSelectBookViewTypeChange: (newBookViewType: BookViewingType) => void;
  onSubmit: (data: ViewFeeFormValues) => void;
  selectedBookViewingType: BookViewingType;
  hoveredType: string | null;
  selectBookViewType: (value: BookViewingType) => void;
  isSelected: (value: string) => boolean;
  isHovered: (value: string) => boolean;
  handleMouseEnter: (value: string) => void;
  handleMouseLeave: () => void;
};

export const useViewingFee = (): UseViewingFee => {
  const [selectedBookViewingType, setSelectedBookViewingType] =
    useState<BookViewingType>(BookViewingTypes.BOOK_INSTANTLY);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const selectBookViewType = (value: BookViewingType) => {
    setSelectedBookViewingType(value);
  };

  const isSelected = (value: string) => selectedBookViewingType === value;
  const isHovered = (value: string) => hoveredType === value;

  const handleMouseEnter = (value: string) => setHoveredType(value);
  const handleMouseLeave = () => setHoveredType(null);

  const form = useForm<ViewFeeFormValues>({
    resolver: zodResolver(viewFeeSchema),
    mode: 'onChange',
    defaultValues: {
      bookViewingType: selectedBookViewingType,
      viewingFee: undefined,
    },
  });

  const handleSelectBookViewTypeChange = (newBookViewType: BookViewingType) => {
    selectBookViewType(newBookViewType);
    const currentValues = form.getValues();
    form.reset({
      bookViewingType: newBookViewType,
      viewingFee: currentValues.viewingFee ?? undefined,
    });
  };
  function onSubmit(data: z.infer<typeof viewFeeSchema>) {
    console.log(data);
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    isButtonDisabled,
    form,
    handleSelectBookViewTypeChange,
    onSubmit,
    selectedBookViewingType,
    hoveredType,
    selectBookViewType,
    isSelected,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
};
