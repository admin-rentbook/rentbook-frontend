import {
  axios,
  queryClient,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/core/lib';
import { formatError, retryQuery } from '@/shared/utils/helpers';
import type { PropertyDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getPropertyDetailsById = async (propertyId: number) => {
  try {
    const response = await axios.get<{ data: PropertyDTO }>(
      url.getPropertyDetailsById(propertyId)
    );

    return response.data.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = typeof getPropertyDetailsById;

type UseGetPropertyDetailsByIdOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 5 * 60 * 1000;
const CACHED_TIME = 10 * 60 * 1000;

export const useGetPropertyDetailsById = (
  propertyId: number,
  config?: UseGetPropertyDetailsByIdOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [...queryKey.all, 'details', propertyId],
    queryFn: () => getPropertyDetailsById(propertyId),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
    staleTime: STALE_TIME,
    gcTime: CACHED_TIME,
    enabled: !!propertyId,
  });
};

export const prefetchPropertyDetailsById = (propertyId: number) => {
  return queryClient.prefetchQuery({
    queryKey: [...queryKey.all, 'details', propertyId],
    queryFn: () => getPropertyDetailsById(propertyId),
    staleTime: STALE_TIME,
  });
};
