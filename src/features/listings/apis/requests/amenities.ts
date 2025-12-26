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
import type { AmenitiesDTO } from '../../types';
import { queryKey, url } from '../url-query';

type AddAmenitiesDataVariables = {
  data: string[];
  listingId: number;
};
const addAmenities = async ({ data, listingId }: AddAmenitiesDataVariables) => {
  const payload = {
    amenities: data,
  };
  try {
    const response = await axios.patch<ApiResponse<any>>(
      `${url.listing}/${listingId}/amenities/`,
      payload
    );
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
};

type UseAddAmenitiesOptions = {
  config?: MutationConfig<typeof addAmenities>;
};
export const useAddAmenities = ({ config }: UseAddAmenitiesOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'amenities-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Amenities added successfully', { id: 'amenities-suc' });
      queryClient.invalidateQueries({
        queryKey: queryKey.amenities(variables.listingId),
      });
    },
    mutationFn: addAmenities,
    ...config,
  });
};

const getAmenities = async (listingId: number) => {
  try {
    const response = await axios.get<ApiResponse<AmenitiesDTO>>(
      `${url.listing}/${listingId}/amenities`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};
type QueryFnType = () => Promise<ApiResponse<AmenitiesDTO>>;
type UseGetAmenitiesOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export const useGetAmenities = (
  listingId: number,
  config?: UseGetAmenitiesOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getAmenities(listingId),
    queryKey: queryKey.amenities(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!listingId,
  });
};
