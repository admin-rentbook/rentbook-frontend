import { axios, useMutation, type MutationConfig, useQueryClient } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { url } from '../url-query';

type RemoveFromWishlistResponse = {
  success: boolean;
  message: string;
};

const removeFromWishlist = async (listingId: number) => {
  try {
    const response = await axios.delete<ApiResponse<RemoveFromWishlistResponse>>(
      `${url.wishlist(listingId)}remove/`,
      {
        skipAuthRedirect: true,
      }
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseRemoveFromWishlistOptions = {
  config?: MutationConfig<typeof removeFromWishlist>;
};

export const useRemoveFromWishlist = ({ config }: UseRemoveFromWishlistOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      toast.info('Property removed from wishlist');
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error: any) => {
      // Check if it's a 401 error
      if (error?.response?.status === 401) {
        toast.error('Please log in to remove items from your wishlist');
      } else {
        toast.error('Failed to remove from wishlist');
        console.error('Remove from wishlist error:', error);
      }
    },
    mutationFn: removeFromWishlist,
    ...config,
  });
};
