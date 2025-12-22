import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import {
  useAddListingDescription,
  useGetListingDescription,
  useUpdateListingDescription,
} from '../apis';
import { listingDescriptionSchema } from '../constants';
import { useListingDraft } from '../providers';
import type { ListingDescriptionFormValues } from '../types';
import { useAutoSave } from './useAutoSave';

export const useListingDescription = (
  onNext: (() => void) | undefined,
  propertyId: number,
  listingId: number
) => {
  const {
    draft,
    updateFromApiResponse,
    updateStepData,
    syncFromApiData,
    isStepSyncedWithApi,
  } = useListingDraft();

  const {
    data: listingDescription,
    isPending,
    isFetching,
  } = useGetListingDescription(listingId as number);
  const listingDescriptionData = listingDescription?.data;

  // Sync stepper with API state on mount when data is fetched
  useEffect(() => {
    if (listingDescriptionData && listingId) {
      const apiStepName = listingDescriptionData.current_step || 'listings';

      if (!isStepSyncedWithApi(apiStepName)) {
        syncFromApiData({
          listing_id: listingDescriptionData.id as number,
          current_step: apiStepName,
          listingDescription: listingDescriptionData,
        });
      }
    }
  }, [
    listingDescriptionData,
    listingId,
    syncFromApiData,
    isStepSyncedWithApi,
  ]);

  const hasExistingData = !!listingDescriptionData;

  const addListingDescriptionMutation = useAddListingDescription();
  const updateListingDescriptionMutation = useUpdateListingDescription();

  console.log('hasExistingData:', hasExistingData, listingDescriptionData);
  const [openBlock, setOpenBlock] = useState(false);

  const form = useForm<ListingDescriptionFormValues>({
    resolver: zodResolver(listingDescriptionSchema),
    mode: 'onChange',
    defaultValues: draft?.listingDescription || {
      listingTitle: '',
      listingType: '',
      noOfBeds: undefined,
      noOfBathrooms: undefined,
      sizeSqFt: undefined,
      listingDescription: '',
      blockId: undefined,
      blockName: undefined,
      isAddListingToComplex: false,
    },
  });
  const isAddListingToComplex = form.watch('isAddListingToComplex') ?? false;

  useEffect(() => {
    if (listingDescriptionData) {
      form.reset({
        listingTitle: listingDescriptionData.title,
        listingType: listingDescriptionData.listing_type,
        listingDescription: listingDescriptionData.description,
        noOfBeds: listingDescriptionData.beds,
        noOfBathrooms: listingDescriptionData.bathrooms,
        sizeSqFt: listingDescriptionData.size_sqft,
        blockId: undefined,
        blockName: undefined,
        isAddListingToComplex: false,
      });
      form.trigger();
    }
  }, [listingDescriptionData, form]);

  useAutoSave(form, (value) => {
    updateStepData('listingDescription', value);
  });

  const handleToggleChange = (newValue: boolean) => {
    form.setValue('isAddListingToComplex', newValue, { shouldValidate: true });

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
    if (hasExistingData) {
      updateListingDescriptionMutation.mutate(
        { data, listingId: listingId as number },
        {
          onSuccess: (res) => {
            updateFromApiResponse({
              listing_id: res.data.id as number,
              current_step: res.data.current_step || 'amenities',
              status: 'in_progress',
            });
            onNext?.();
          },
        }
      );
    } else {
      addListingDescriptionMutation.mutate(
        { data, propertyId: propertyId as number },
        {
          onSuccess: (res) => {
            updateFromApiResponse(res.data);
            onNext?.();
          },
        }
      );
    }
  }

  const isButtonDisabled = !form.formState.isValid;
  const selectedBlock = form.watch('blockName');

  // Use whichever mutation is active
  const isListingDescLoading = hasExistingData
    ? updateListingDescriptionMutation.isPending
    : addListingDescriptionMutation.isPending;

  return {
    form,
    onSubmit,
    isButtonDisabled,
    openBlock,
    setOpenBlock,
    isAddListingToComplex,
    handleToggleChange,
    handleBlockSelect,
    selectedBlock,
    isListingDescLoading,
    isPending,
    isFetching,
  };
};
