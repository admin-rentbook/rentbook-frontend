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
import type { RentAvailabilityFormValues } from '../../types';
import type { FinalDetailsDTO } from '../../types/listing.dtos';
import { transformFinalDetailsFormToDTO } from '../../types/mappedTypes';
import { queryKey, url } from '../url-query';

const getFinalDetails = async (
  listingId: number
): Promise<ApiResponse<FinalDetailsDTO>> => {
  try {
    const response = await axios.get<ApiResponse<FinalDetailsDTO>>(
      `${url.listing}/${listingId}/final-details/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<FinalDetailsDTO>>;
type UseGetFinalDetailsOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export const useGetFinalDetails = (
  listingId: number,
  config?: UseGetFinalDetailsOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getFinalDetails(listingId),
    queryKey: queryKey.finalDetails(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!listingId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

type UpdateFinalDetailsVariables = {
  data: RentAvailabilityFormValues;
  listingId: number;
};

const updateFinalDetails = async ({
  data,
  listingId,
}: UpdateFinalDetailsVariables): Promise<ApiResponse<FinalDetailsDTO>> => {
  const payload = transformFinalDetailsFormToDTO(data);

  try {
    const response = await axios.patch<ApiResponse<FinalDetailsDTO>>(
      `${url.listing}/${listingId}/final-details/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseUpdateFinalDetailsOptions = {
  config?: MutationConfig<typeof updateFinalDetails>;
};

export const useUpdateFinalDetails = ({
  config,
}: UseUpdateFinalDetailsOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'final-details-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Rent availability saved successfully', {
        id: 'final-details-succ',
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.finalDetails(variables.listingId),
      });
    },
    mutationFn: updateFinalDetails,
    ...config,
  });
};