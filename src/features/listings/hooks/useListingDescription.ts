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
  }, [listingDescriptionData, listingId, syncFromApiData, isStepSyncedWithApi]);

  const hasExistingData = !!listingDescriptionData;

  const addListingDescriptionMutation = useAddListingDescription();
  const updateListingDescriptionMutation = useUpdateListingDescription();

  console.log('hasExistingData:', hasExistingData, listingDescriptionData);
  const [openComplex, setOpenComplex] = useState(false);

  const form = useForm<ListingDescriptionFormValues>({
    resolver: zodResolver(listingDescriptionSchema),
    mode: 'onChange',
    defaultValues: {
      listingTitle: listingDescriptionData?.title ?? '',
      listingType: listingDescriptionData?.listing_type ?? '',
      noOfBeds: listingDescriptionData?.beds ?? undefined,
      noOfBathrooms: listingDescriptionData?.bathrooms ?? undefined,
      sizeSqFt: listingDescriptionData?.size_sqft ?? undefined,
      listingDescription: listingDescriptionData?.description ?? '',
      complexId: undefined,
      complexName: undefined,
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
        // Convert string to number (backend returns string temporarily)
        sizeSqFt: typeof listingDescriptionData.size_sqft === 'string'
          ? Number(listingDescriptionData.size_sqft)
          : listingDescriptionData.size_sqft,
        complexId: undefined,
        complexName: undefined,
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
      form.setValue('complexId', undefined);
      form.setValue('complexName', undefined);
    }
  };

  const handleComplexSelect = (complexId: number, complexName: string) => {
    form.setValue('complexId', complexId, { shouldValidate: true });
    form.setValue('complexName', complexName, { shouldValidate: true });
    setOpenComplex(false);
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
  const selectedComplex = form.watch('complexName');

  const isListingDescLoading = hasExistingData
    ? updateListingDescriptionMutation.isPending
    : addListingDescriptionMutation.isPending;

  return {
    form,
    onSubmit,
    isButtonDisabled,
    openComplex,
    setOpenComplex,
    isAddListingToComplex,
    handleToggleChange,
    handleComplexSelect,
    selectedComplex,
    isListingDescLoading,
    isPending: isPending && !!listingDescriptionData,
    isFetching,
  };
};
