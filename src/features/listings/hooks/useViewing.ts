import { useEffect } from 'react';
import { useGetViewing, useUpdateViewing } from '../apis/requests/viewing';
import { useListingDraft } from '../providers';
import type { ViewTimesData } from '../types';
import type { ViewingDTO } from '../types/listing.dtos';
import { transformViewingDTOToFormValues } from '../types/mappedTypes';

export type UseViewing = {
  onSubmit: (data: ViewTimesData) => void;
  isUpdateLoading: boolean;
  isPending: boolean;
  isFetching: boolean;
  viewingData: ViewingDTO | undefined;
};

export const useViewing = (
  listingId: number,
  onNext: (() => void) | undefined
): UseViewing => {
  const { updateStepData } = useListingDraft();

  const {
    data: viewingData,
    isPending,
    isFetching,
  } = useGetViewing(listingId);
  const viewing = viewingData?.data;

  const updateViewingMutation = useUpdateViewing();

  useEffect(() => {
    if (viewing) {
      const formValues = transformViewingDTOToFormValues(viewing);

      // Update draft with API data
      updateStepData('viewingTimes', formValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewing]);

  function onSubmit(data: ViewTimesData) {
    updateViewingMutation.mutate(
      {
        data,
        listingId: listingId as number,
      },
      {
        onSuccess: (_res) => {
          // Update draft with saved data
          updateStepData('viewingTimes', data);

          // Update stepper from API response
          // if (res.data.current_step) {
          //   updateFromApiResponse({
          //     listing_id: listingId,
          //     current_step: res?.data.current_step || '',
          //     status: 'viewing',
          //   });
          // }

          onNext?.();
        },
      }
    );
  }

  return {
    onSubmit,
    isUpdateLoading: updateViewingMutation.isPending,
    isPending: isPending && !viewing,
    isFetching,
    viewingData: viewing,
  };
};