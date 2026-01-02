import { axios, useMutation, type MutationConfig, useQueryClient } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { url } from '../url-query';

type RemoveFromWaitlistResponse = {
  success: boolean;
  message: string;
};

const removeFromWaitlist = async (listingId: number) => {
  try {
    const response = await axios.delete<ApiResponse<RemoveFromWaitlistResponse>>(
      url.waitlist(listingId),
      {
        skipAuthRedirect: true,
      }
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseRemoveFromWaitlistOptions = {
  config?: MutationConfig<typeof removeFromWaitlist>;
};

export const useRemoveFromWaitlist = ({ config }: UseRemoveFromWaitlistOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      toast.info('Property removed from waitlist');
      // Invalidate waitlist queries to refetch
      queryClient.invalidateQueries({ queryKey: ['waitlist'] });
    },
    onError: (error: any) => {
      // Check if it's a 401 error
      if (error?.response?.status === 401) {
        toast.error('Please log in to remove items from your waitlist');
      } else {
        toast.error('Failed to remove from waitlist');
        console.error('Remove from waitlist error:', error);
      }
    },
    mutationFn: removeFromWaitlist,
    ...config,
  });
};