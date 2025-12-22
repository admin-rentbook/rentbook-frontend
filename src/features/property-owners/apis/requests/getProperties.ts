import {
  axios,
  queryClient,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/core/lib';
import type { Paginate, PaginateApiResponse } from '@/shared/types';
import { formatError, retryQuery } from '@/shared/utils/helpers';
import type { PropertyStatusType } from '../../constants';
import type { PropertyDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getProperties = async (
  filter: PropertyStatusType,
  currentPage: number,
  pageSize: number
) => {
  try {
    const response = await axios.get<PaginateApiResponse<PropertyDTO>>(
      url.getProperties,
      {
        params: {
          page: currentPage,
          page_size: pageSize,
          ...(filter && { status: filter }),
        },
      }
    );

    return response.data.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<Paginate<PropertyDTO>>;

type UseGetPropertiesOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 5 * 60 * 1000;
const CACHED_TIME = 10 * 60 * 1000;

export const useGetProperties = (
  filter: PropertyStatusType,
  currentPage: number,
  pageSize: number,
  config?: UseGetPropertiesOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.list(filter, currentPage, pageSize),
    queryFn: () => getProperties(filter, currentPage, pageSize),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
    staleTime: STALE_TIME,
    gcTime: CACHED_TIME,
  });
};

export const prefetchProperties = (
  filter: PropertyStatusType,
  currentPage: number,
  pageSize: number
) => {
  return queryClient.prefetchQuery({
    queryKey: queryKey.list(filter, currentPage, pageSize),
    queryFn: () => getProperties(filter, currentPage, pageSize),
    staleTime: STALE_TIME,
  });
};
