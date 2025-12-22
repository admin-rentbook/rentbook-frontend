import { axios, queryClient, useMutation, useQuery, type ExtractFnReturnType, type MutationConfig, type QueryConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import type { ComplexDTO, ListingDescriptionDTO } from '../../types';
import { queryKey, url } from '../url-query';

type CreateComplexVariables = {
  complexName: string;
  propertyId: number;
};

const createComplex = async ({
  complexName,
  propertyId,
}: CreateComplexVariables) => {
  const payload: ComplexDTO = {
    name: complexName,
    description: `Complex ${complexName} created`,
  };
  try {
    const response = await axios.post<ApiResponse<ListingDescriptionDTO>>(
      `${url.properties}/${propertyId}/complexes/`,
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
      // Invalidate complexes query so all components refetch
      queryClient.invalidateQueries({
        queryKey: queryKey.complexes(variables.propertyId),
      });
    },
    mutationFn: createComplex,
    ...config,
  });
};


const getComplexes = async (propertyId: number) => {
  try {
    const response = await axios.get<ApiResponse<ComplexDTO[]>>(
      `${url.properties}/${propertyId}/complexes/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<ComplexDTO[]>>;
type UseGetComplexesOptions = QueryConfig<QueryFnType>;

export const useGetComplexes = (
  propertyId: number,
  config?: UseGetComplexesOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getComplexes(propertyId),
    queryKey: queryKey.complexes(propertyId),
    staleTime: 5 * 60 * 1000,
    enabled: !!propertyId,
  });
};
