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
import type { AdditionalFeeFormValues, AdditionalFeeDTO } from '../../types';
import { queryKey, url } from '../url-query';
import { transformFormToDTO } from '../../types/mappedTypes';

const getAdditionalFees = async (
  listingId: number
): Promise<ApiResponse<AdditionalFeeDTO[]>> => {
  try {
    const response = await axios.get<ApiResponse<AdditionalFeeDTO[]>>(
      `${url.listing}/${listingId}/additional-fees/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<AdditionalFeeDTO[]>>;
type UseGetAdditionalFeesOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export const useGetAdditionalFees = (
  listingId: number,
  config?: UseGetAdditionalFeesOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getAdditionalFees(listingId),
    queryKey: queryKey.additionalFees(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!listingId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

type UpdateAdditionalFeesVariables = {
  fees: AdditionalFeeFormValues[];
  listingId: number;
};

const updateAdditionalFees = async ({
  fees,
  listingId,
}: UpdateAdditionalFeesVariables): Promise<ApiResponse<AdditionalFeeDTO[]>> => {
  const payload = transformFormToDTO(fees);

  try {
    const response = await axios.patch<ApiResponse<AdditionalFeeDTO[]>>(
      `${url.listing}/${listingId}/additional-fees/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseUpdateAdditionalFeesOptions = {
  config?: MutationConfig<typeof updateAdditionalFees>;
};

export const useUpdateAdditionalFees = ({
  config,
}: UseUpdateAdditionalFeesOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'additional-fees-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Additional fees saved successfully', {
        id: 'additional-fees-succ',
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.additionalFees(variables.listingId),
      });
    },
    mutationFn: updateAdditionalFees,
    ...config,
  });
};