import { axios, useMutation, type MutationConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
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
      url.wishlist(listingId)
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
  return useMutation({
    ...config,
    mutationFn: addToWishlist,
  });
};