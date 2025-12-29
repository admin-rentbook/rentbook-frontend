import { axios, useMutation, type MutationConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import {  url } from '../url-query';

type AddToWaitlistResponse = {
  id: number;
  listing_id: number;
  user_id: number;
  created_at: string;
};

const addToWaitlist = async (listingId: number) => {
  try {
    const response = await axios.post<ApiResponse<AddToWaitlistResponse>>(
      url.waitlist(listingId)
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
  return useMutation({
    ...config,
    mutationFn: addToWaitlist,
  });
};