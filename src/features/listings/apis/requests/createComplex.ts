import { axios, useMutation, type MutationConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import type { ComplexDTO, ListingDescriptionDTO } from '../../types';
import { url } from '../url-query';

type CreateComplexVariables = {
  complexName: string;
  propertyId: number;
};

const createComplex = async ({
  complexName,
  propertyId,
}: CreateComplexVariables) => {
  const payload: ComplexDTO = {
    new_complex_name: complexName,
    new_complex_description: `Complex ${complexName} created`,
  };
  try {
    const response = await axios.patch<ApiResponse<ListingDescriptionDTO>>(
      `${url.listing}/${propertyId}/complex/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseCreateComplexOptions = {
  config?: MutationConfig<typeof createComplex>;
};

export const useCreateComplex = ({ config }: UseCreateComplexOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'create-com-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success(`${variables.complexName} added successfully`, {
        id: 'create-add_com-suc',
      });
    },
    mutationFn: createComplex,
    ...config,
  });
};
