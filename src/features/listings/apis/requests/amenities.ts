import { axios, useMutation, useQuery, type ExtractFnReturnType, type MutationConfig, type QueryConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { ListingLinks } from '../../constants';
import type { ListingStepResponse } from '../../types';
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
    const response = await axios.patch<ApiResponse<ListingStepResponse>>(
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
  const navigate = useNavigate({ from: '/listings-start' });
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'amenities-err' });
    },
    onSuccess: () => {
      toast.success('Amenities added successfully', { id: 'amenities-suc' });
      navigate({
        to: ListingLinks.LISTINGS,
        search: (prev) => ({
          ...prev,
          listingId: prev.listingId,
        }),
      });
    },
    mutationFn: addAmenities,
    ...config,
  });
};

const getAmenities = async (listingId: number) => {
  try {
    const response = await axios.get<ApiResponse<string[]>>(
      `${url.listing}/${listingId}/amenities`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};
type QueryFnType = () => Promise<ApiResponse<string[]>>;
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
