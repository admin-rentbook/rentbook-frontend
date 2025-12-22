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
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { ListingLinks, type ListingType } from '../../constants';
import type {
  ListingDescriptionDTO,
  ListingDescriptionFormValues,
  ListingStepResponse,
} from '../../types';
import { queryKey, url } from '../url-query';

type AddListingDescriptionVariables = {
  data: ListingDescriptionFormValues;
  propertyId: number;
};
const addListingDescription = async ({
  data,
  propertyId,
}: AddListingDescriptionVariables) => {
  const basePayload: ListingDescriptionDTO = {
    title: data.listingTitle,
    listing_type: data.listingType as ListingType,
    description: data.listingDescription,
    beds: Number(data.noOfBeds),
    bathrooms: Number(data.noOfBathrooms),
    size_sqft: Number(data.sizeSqFt),
  };

  const payload: ListingDescriptionDTO = data.blockId
    ? {
        ...basePayload,
        complex: {
          complex_id: data.blockId,
          new_complex_name: data.blockName as string,
        },
      }
    : basePayload;

  try {
    const response = await axios.post<ApiResponse<ListingStepResponse>>(
      `${url.addListingDescription}${propertyId}/listings/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseAddListingDescriptionOptions = {
  config?: MutationConfig<typeof addListingDescription>;
};

export const useAddListingDescription = ({
  config,
}: UseAddListingDescriptionOptions = {}) => {
  const navigate = useNavigate({ from: '/listings-start' });
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'create-add-listing-err' });
    },
    onSuccess: (res, variable) => {
      toast.success(`${variable.data.listingTitle} added successfully`, {
        id: 'create-add-suc',
      });
      navigate({
        to: ListingLinks.LISTINGS,
        search: { listingId: res.data.listing_id },
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.listingDescription(res.data.listing_id),
      });
    },
    mutationFn: addListingDescription,
    ...config,
  });
};

type UpdateListingDescriptionVariables = {
  data: ListingDescriptionFormValues;
  listingId: number;
};
const updateListingDescription = async ({
  data,
  listingId,
}: UpdateListingDescriptionVariables) => {
  const basePayload: ListingDescriptionDTO = {
    title: data.listingTitle,
    listing_type: data.listingType as ListingType,
    description: data.listingDescription,
    beds: Number(data.noOfBeds),
    bathrooms: Number(data.noOfBathrooms),
    size_sqft: Number(data.sizeSqFt),
  };
  const payload: ListingDescriptionDTO = data.blockId
    ? {
        ...basePayload,
        complex: {
          complex_id: data.blockId,
          new_complex_name: data.blockName as string,
        },
      }
    : basePayload;

  try {
    const response = await axios.patch<ApiResponse<ListingDescriptionDTO>>(
      `${url.listing}/${listingId}/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseUpdateListingDescriptionOptions = {
  config?: MutationConfig<typeof updateListingDescription>;
};

export const useUpdateListingDescription = ({
  config,
}: UseUpdateListingDescriptionOptions = {}) => {
  const navigate = useNavigate({ from: '/listings-start' });
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'update-listing-err' });
    },
    onSuccess: (res, variable) => {
      toast.success(`${variable.data.listingTitle} updated successfully`, {
        id: 'update-add-suc',
      });
      navigate({
        to: ListingLinks.LISTINGS,
        search: (prev) => ({
          listingId: prev.listingId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.listingDescription(res.data.id as number),
      });
    },
    mutationFn: updateListingDescription,
    ...config,
  });
};

const getListingDescription = async (listingId: number) => {
  try {
    const response = await axios.get<ApiResponse<ListingDescriptionDTO>>(
      `${url.listing}/${listingId}/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<ListingDescriptionDTO>>;
type UseGetListingDescriptionOptions = QueryConfig<QueryFnType>;

export const useGetListingDescription = (
  listingId: number,
  config?: UseGetListingDescriptionOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getListingDescription(listingId),
    queryKey: queryKey.listingDescription(listingId),
    staleTime: 5 * 60 * 1000,
    enabled: !!listingId,
  });
};
