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
import type { RentalPriceFormValues } from '../../types';
import type { RentalPricingDTO } from '../../types/listing.dtos';
import { transformRentalPriceFormToDTO } from '../../types/mappedTypes';
import { queryKey, url } from '../url-query';

const getRentalPricing = async (
  listingId: number
): Promise<ApiResponse<RentalPricingDTO>> => {
  try {
    const response = await axios.get<ApiResponse<RentalPricingDTO>>(
      `${url.listing}/${listingId}/pricing/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<RentalPricingDTO>>;
type UseGetRentalPricingOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export const useGetRentalPricing = (
  listingId: number,
  config?: UseGetRentalPricingOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getRentalPricing(listingId),
    queryKey: queryKey.rentalPricing(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!listingId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

type UpdateRentalPricingVariables = {
  data: RentalPriceFormValues;
  listingId: number;
};

const updateRentalPricing = async ({
  data,
  listingId,
}: UpdateRentalPricingVariables): Promise<ApiResponse<RentalPricingDTO>> => {
  const payload = transformRentalPriceFormToDTO(data);

  try {
    const response = await axios.patch<ApiResponse<RentalPricingDTO>>(
      `${url.listing}/${listingId}/pricing/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseUpdateRentalPricingOptions = {
  config?: MutationConfig<typeof updateRentalPricing>;
};

export const useUpdateRentalPricing = ({
  config,
}: UseUpdateRentalPricingOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'rental-pricing-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Rental pricing saved successfully', {
        id: 'rental-pricing-succ',
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.rentalPricing(variables.listingId),
      });
    },
    mutationFn: updateRentalPricing,
    ...config,
  });
};
