import {
  axios,
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
    onSuccess: () => {
      toast.success('Amenities added successfully', { id: 'amenities-suc' });
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

export const useGetAmenities = (
  listingId: number,
  config?: UseGetAmenitiesOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getAmenities(listingId),
    queryKey: queryKey.amenities(listingId),
    staleTime: 5 * 60 * 1000,
    enabled: !!listingId,
  });
};
