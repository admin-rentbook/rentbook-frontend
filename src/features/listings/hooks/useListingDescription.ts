import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { listingDescriptionSchema } from '../constants';
import { useListingDraft } from '../providers';
import type { ListingDescriptionFormValues } from '../types';
import { useAutoSave } from './useAutoSave';

export const useListingDescription = (onNext: (() => void) | undefined) => {
  const { updateStepData, markStepComplete, getStepData } = useListingDraft();

  const [openBlock, setOpenBlock] = useState(false);
  const [isAddListingToBlock, setIsAddListingToBlock] = useState(false);

  const savedData = useMemo(() => getStepData('listingDescription'), []);
  const form = useForm<ListingDescriptionFormValues>({
    resolver: zodResolver(listingDescriptionSchema),
    mode: 'onChange',
    defaultValues: savedData || {
      isAddListingToBlock: isAddListingToBlock,
      listingTitle: '',
      listingType: '',
      noOfBeds: undefined,
      noOfBathrooms: undefined,
      sizeSqFt: undefined,
      listingDescription: '',
      blockId: undefined,
      blockName: undefined,
    },
  });

  // Auto-save on form change (debounced)
  useAutoSave(form, (value) => {
    updateStepData('listingDescription', value);
  });

  const handleToggleChange = (newValue: boolean) => {
    form.setValue('isAddListingToBlock', newValue, { shouldValidate: true });

    if (!newValue) {
      form.setValue('blockId', undefined);
      form.setValue('blockName', undefined);
    }
  };

  const handleBlockSelect = (blockId: number, blockName: string) => {
    form.setValue('blockId', blockId, { shouldValidate: true });
    form.setValue('blockName', blockName, { shouldValidate: true });
    setOpenBlock(false);
  };

  function onSubmit(data: z.infer<typeof listingDescriptionSchema>) {
    updateStepData('listingDescription', data);

    // Mark this step as complete (mainStep 0, subStep 0)
    markStepComplete(0, 0);
    onNext?.();
  }

  const isButtonDisabled = !form.formState.isValid;
  const selectedBlock = form.watch('blockName');

  return {
    form,
    onSubmit,
    isButtonDisabled,
    openBlock,
    setOpenBlock,
    isAddListingToBlock,
    setIsAddListingToBlock,
    handleToggleChange,
    handleBlockSelect,
    selectedBlock,
  };
};
