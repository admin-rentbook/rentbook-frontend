import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import {
  BookViewingTypes,
  viewFeeSchema,
  type BookViewingType,
  type ViewingType,
} from '../constants';
import { useListingDraft } from '../providers';
import type { DaySchedule, ViewFeeFormValues } from '../types';
import { useAutoSave } from './useAutoSave';

export type UseViewingFee = {
  canSubmit: boolean;
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
  handleSubmit: () => void;
};

export const useViewingFee = (
  onNext: (() => void) | undefined,
  schedule: DaySchedule,
  viewingType: ViewingType,
  onApiSubmit?: (data: any) => void
): UseViewingFee => {
  const { updateStepData, markMainStepComplete, markStepComplete, draft } =
    useListingDraft();

  const [selectedBookViewingType, setSelectedBookViewingType] =
    useState<BookViewingType>(
      draft?.viewingTimes?.viewingFee?.bookViewingType ||
        BookViewingTypes.BOOK_INSTANTLY
    );
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
    defaultValues: draft?.viewingTimes?.viewingFee || {
      bookViewingType: selectedBookViewingType,
      viewingFee: undefined,
    },
  });

  // Update form when draft changes (from API)
  useEffect(() => {
    if (draft?.viewingTimes?.viewingFee) {
      form.reset(draft.viewingTimes.viewingFee);
      setSelectedBookViewingType(draft.viewingTimes.viewingFee.bookViewingType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft?.viewingTimes?.viewingFee]);

  useAutoSave(form, (value) => {
    const currentDraft = draft?.viewingTimes;
    updateStepData('viewingTimes', { ...currentDraft, viewingFee: value });
  });

  const handleSelectBookViewTypeChange = (newBookViewType: BookViewingType) => {
    selectBookViewType(newBookViewType);
    const currentValues = form.getValues();
    form.reset({
      bookViewingType: newBookViewType,
      viewingFee: currentValues.viewingFee ?? undefined,
    });
    const currentDraft = draft?.rentalPrice || {};

    updateStepData('viewingTimes', {
      ...currentDraft,
      viewingFee: currentValues,
    });
  };
  function onSubmit(data: z.infer<typeof viewFeeSchema>) {
    console.log(data);
  }

  const isButtonDisabled = !form.formState.isValid;
  const isScheduleNotEmpty = Object.values(schedule).some(
    (slots) => slots.length > 0
  );

  const canSubmit =
    !isButtonDisabled && isScheduleNotEmpty && Boolean(viewingType);

  const handleSubmit = () => {
    if (canSubmit && draft?.viewingTimes) {
      // Call the API submit function with complete viewing data
      if (onApiSubmit) {
        onApiSubmit(draft.viewingTimes);
      } else {
        // Fallback if no API submit provided (shouldn't happen in production)
        markStepComplete(2, 0);
        markMainStepComplete(2);
        onNext?.();
      }
    }
  };

  return {
    canSubmit,
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
    handleSubmit,
  };
};
