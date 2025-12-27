import {
  axios,
  queryClient,
  useMutation,
  useQuery,
  type ExtractFnReturnType,
  type MutationConfig,
  type QueryConfig,
} from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import type { Note } from '../../types';
import type { AdditionalDetailsDTO } from '../../types/listing.dtos';
import { transformAdditionalDetailsFormToDTO } from '../../types/mappedTypes';
import { queryKey, url } from '../url-query';

const getAdditionalDetails = async (
  listingId: number
): Promise<ApiResponse<AdditionalDetailsDTO>> => {
  try {
    const response = await axios.get<ApiResponse<AdditionalDetailsDTO>>(
      `${url.listing}/${listingId}/additional-details/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<AdditionalDetailsDTO>>;
type UseGetAdditionalDetailsOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export const useGetAdditionalDetails = (
  listingId: number,
  config?: UseGetAdditionalDetailsOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getAdditionalDetails(listingId),
    queryKey: queryKey.additionalDetails(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!listingId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

type UpdateAdditionalDetailsVariables = {
  data: Note[];
  listingId: number;
};

const updateAdditionalDetails = async ({
  data,
  listingId,
}: UpdateAdditionalDetailsVariables): Promise<ApiResponse<AdditionalDetailsDTO>> => {
  const payload = transformAdditionalDetailsFormToDTO(data);

  try {
    const response = await axios.patch<ApiResponse<AdditionalDetailsDTO>>(
      `${url.listing}/${listingId}/additional-details/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseUpdateAdditionalDetailsOptions = {
  config?: MutationConfig<typeof updateAdditionalDetails>;
};

export const useUpdateAdditionalDetails = ({
  config,
}: UseUpdateAdditionalDetailsOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'additional-details-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Additional details saved successfully', {
        id: 'additional-details-succ',
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.additionalDetails(variables.listingId),
      });
    },
    mutationFn: updateAdditionalDetails,
    ...config,
  });
};