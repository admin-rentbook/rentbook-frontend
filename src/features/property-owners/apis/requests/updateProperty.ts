import {
  axios,
  queryClient,
  useMutation,
  type MutationConfig,
} from '@/core/lib';
import type { LocationResult } from '@/shared/types';
import { isAgentListed } from '@/shared/utils';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import type { CreatePropertyData, PropertyDTO } from '../../types';
import { queryKey, url } from '../url-query';

type UpdatePropertyPayload = {
  propertyId: number;
  data: CreatePropertyData;
  locationResult: LocationResult;
};

export const updateProperty = async ({
  propertyId,
  data,
  locationResult,
}: UpdatePropertyPayload) => {
  const basePayload: Partial<PropertyDTO> = {
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

  // Only send owner_email for agent listings, matching createProperty API
  const payload: Partial<PropertyDTO> = isAgentListed(data)
    ? {
        ...basePayload,
        owner_email: data.ownerEmail,
      }
    : basePayload;

  try {
    const response = await axios.put<{ data: PropertyDTO }>(
      url.updateProperty(propertyId),
      payload
    );

    return response.data.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseUpdatePropertyMutationOptions = MutationConfig<typeof updateProperty>;

export const useUpdatePropertyMutation = (
  config?: UseUpdatePropertyMutationOptions
) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'update-prop-err' });
    },
    onSuccess: (data) => {
      toast.success('Property updated successfully', { id: 'update-prop-success' });
      queryClient.invalidateQueries({ queryKey: queryKey.all });
      queryClient.invalidateQueries({
        queryKey: [...queryKey.all, 'details', data.id],
      });
    },
    mutationFn: updateProperty,
    ...config,
  });
};