import { axios, useMutation, type MutationConfig, useQueryClient } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { url } from '../url-query';

type AddToWaitlistResponse = {
  id: number;
  listing_id: number;
  user_id: number;
  created_at: string;
};

const addToWaitlist = async (listingId: number) => {
  try {
    const response = await axios.post<ApiResponse<AddToWaitlistResponse>>(
      url.waitlist(listingId),
      {}
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseAddToWaitlistOptions = {
  config?: MutationConfig<typeof addToWaitlist>;
};

export const useAddToWaitlist = ({ config }: UseAddToWaitlistOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      toast.success('Property added to waitlist');
      queryClient.invalidateQueries({ queryKey: ['waitlist'] });
    },
    onError: (error: any) => {
      // Check if it's a 401 error
      if (error?.response?.status === 401) {
        toast.error('Please log in to add items to your waitlist');
      } else {
        toast.error(error?.message ?? 'Failed to add to waitlist');
      }
    },
    mutationFn: addToWaitlist,
    ...config,
  });
};