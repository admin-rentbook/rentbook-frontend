import {
  axios,
  queryClient,
  useMutation,
  type MutationConfig,
} from '@/core/lib';
import type { ApiResponse, LocationResult } from '@/shared/types';
import { isAgentListed } from '@/shared/utils';
import { formatError } from '@/shared/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Links } from '../../constants';
import type { CreatePropertyData, PropertyDTO } from '../../types';
import { queryKey, url } from '../url-query';

type CreatePropertyPayload = {
  data: CreatePropertyData;
  locationResult: LocationResult;
};

export const createProperty = async ({
  data,
  locationResult,
}: CreatePropertyPayload) => {
  const basePayload: PropertyDTO = {
    property_name: data.propertyName,
    listed_by: data.listedBy,
    address: {
      place_id: locationResult.placeId,
      formatted_address: locationResult.address,
      latitude: locationResult.lat,
      longitude: locationResult.lng,
      street_name: locationResult.street,
      city: locationResult.city,
      state: locationResult.state,
      country: locationResult.country,
      postal_code: locationResult.postalCode,
    },
  };
  const payload: PropertyDTO = isAgentListed(data)
    ? {
        ...basePayload,
        owner_email: data.ownerEmail,
      }
    : basePayload;
  try {
    const response = await axios.post<ApiResponse<{ property_id: number }>>(
      url.createProperty,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseCreatePropertyOptions = {
  config?: MutationConfig<typeof createProperty>;
};

export const useCreatePropertyMutation = ({
  config,
}: UseCreatePropertyOptions = {}) => {
  const navigate = useNavigate({ from: Links.CREATE_PROPERTY });
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'create-prop-err' });
    },
    onSuccess: (res) => {
      navigate({
        search: (prev) => ({
          ...prev,
          propertyId: res.data.property_id,
        }),
        replace: true,
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.lists(),
      });
    },
    mutationFn: createProperty,
    ...config,
  });
};
