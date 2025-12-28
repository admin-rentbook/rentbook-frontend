import {
  axios,
  queryClient,
  useMutation,
  type MutationConfig,
} from '@/core/lib';
import { PropertyDetailsLinks } from '@/features/property-details';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { queryKey } from '../url-query';

type SubmitListingResponse = {
  listing_id: number;
  status: string;
  message: string;
};

type SubmitListingVariables = {
  listingId: number;
  propertyId: number;
};

const submitListing = async ({ listingId }: SubmitListingVariables) => {
  try {
    const response = await axios.patch<ApiResponse<SubmitListingResponse>>(
      `/listing/listings/${listingId}/submit/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseSubmitListingOptions = {
  config?: MutationConfig<typeof submitListing>;
};

export const useSubmitListing = ({ config }: UseSubmitListingOptions = {}) => {
  const navigate = useNavigate();

  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'submit-listing-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Listing published successfully!', {
        id: 'submit-listing-success',
      });

      queryClient.invalidateQueries({
        queryKey: queryKey.listingSummary(variables.listingId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.listingDescription(variables.listingId),
      });

      navigate({
        to: PropertyDetailsLinks.PROPERTY_DETAILS,
        search: {
          propertyId: variables.propertyId,
          showListingLiveModal: true,
          listingId: variables.listingId,
        },
      });
    },
    mutationFn: submitListing,
    ...config,
  });
};
