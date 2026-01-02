import { axios, useMutation, type MutationConfig, useQueryClient } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { url } from '../url-query';

type AddToWishlistResponse = {
  id: number;
  listing_id: number;
  user_id: number;
  created_at: string;
};

const addToWishlist = async (listingId: number) => {
  try {
    const response = await axios.post<ApiResponse<AddToWishlistResponse>>(
      url.wishlist(listingId),
      {},
      {
        skipAuthRedirect: true,
      }
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseAddToWishlistOptions = {
  config?: MutationConfig<typeof addToWishlist>;
};

export const useAddToWishlist = ({ config }: UseAddToWishlistOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      toast.success('Property added to wishlist');
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error: any) => {
      // Check if it's a 401 error
      if (error?.response?.status === 401) {
        toast.error('Please log in to add items to your wishlist');
      } else {
        toast.error(error?.message ?? 'Failed to add to wishlist');
      }
    },
    mutationFn: addToWishlist,
    ...config,
  });
};