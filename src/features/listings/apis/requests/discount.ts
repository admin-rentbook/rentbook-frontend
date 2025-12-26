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
import type { DiscountFormValues, DiscountDTO } from '../../types';
import { transformDiscountFormToDTO } from '../../types/mappedTypes';
import { queryKey, url } from '../url-query';

const getDiscount = async (
  listingId: number
): Promise<ApiResponse<DiscountDTO[]>> => {
  try {
    const response = await axios.get<ApiResponse<DiscountDTO[]>>(
      `${url.listing}/${listingId}/discounts/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<DiscountDTO[]>>;
type UseGetDiscountOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export const useGetDiscount = (
  listingId: number,
  config?: UseGetDiscountOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getDiscount(listingId),
    queryKey: queryKey.discount(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!listingId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

// PATCH discount
type UpdateDiscountVariables = {
  discount: DiscountFormValues;
  listingId: number;
};

const updateDiscount = async ({
  discount,
  listingId,
}: UpdateDiscountVariables): Promise<ApiResponse<DiscountDTO[]>> => {
  const payload = transformDiscountFormToDTO(discount);

  try {
    const response = await axios.patch<ApiResponse<DiscountDTO[]>>(
      `${url.listing}/${listingId}/discounts/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseUpdateDiscountOptions = {
  config?: MutationConfig<typeof updateDiscount>;
};

export const useUpdateDiscount = ({
  config,
}: UseUpdateDiscountOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'discount-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Discount saved successfully', {
        id: 'discount-succ',
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.discount(variables.listingId),
      });
    },
    mutationFn: updateDiscount,
    ...config,
  });
};
