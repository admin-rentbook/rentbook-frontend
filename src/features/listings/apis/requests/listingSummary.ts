import {
  axios,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import type { ListingSummaryDTO } from '../../types';
import { queryKey, url } from '../url-query';

const getListingSummary = async (listingId: number) => {
  try {
    const response = await axios.get<ApiResponse<ListingSummaryDTO>>(
      `${url.listing}/${listingId}/summary/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<ListingSummaryDTO>>;
type UseGetListingSummaryOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export const useGetListingSummary = (
  listingId: number,
  config?: UseGetListingSummaryOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getListingSummary(listingId),
    queryKey: queryKey.listingSummary(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!listingId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};