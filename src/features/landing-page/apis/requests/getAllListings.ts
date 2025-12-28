import {
  axios,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/core/lib';
import type { ListingSummaryDTO } from '@/features/listings';
import type { PaginateApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { queryKey, url } from '../url-query';

const getAllListings = async (currentPage: number, pageSize: number) => {
  try {
    const response = await axios.get<PaginateApiResponse<ListingSummaryDTO>>(
      url.allListings,
      {
        params: {
          page: currentPage,
          page_size: pageSize,
        },
        // skipAuthRedirect: true,
      }
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

type QueryFnType = () => Promise<PaginateApiResponse<ListingSummaryDTO>>;
type UseGetAllListingsOptions = QueryConfig<QueryFnType>;

export const useGetAllListings = (
  currentPage: number,
  pageSize: number,
  config?: UseGetAllListingsOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getAllListings(currentPage, pageSize),
    queryKey: queryKey.allListings(currentPage, pageSize),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};
