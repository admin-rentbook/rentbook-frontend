import {
  axios,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/core/lib';
import { formatError } from '@/shared/utils/helpers';
import type {
  ApiListingSummary,
  ListingFilters,
  PaginatedResponse,
} from '../../types';
import { queryKey, url } from '../url-query';

const getAllListings = async (
  currentPage: number,
  pageSize: number,
  filters?: ListingFilters
) => {
  try {
    const response = await axios.get<PaginatedResponse<ApiListingSummary>>(
      url.allListings,
      {
        params: {
          page: currentPage,
          page_size: pageSize,
          ...filters,
        },
        skipAuth: true, // Public endpoint - no bearer token required
        skipAuthRedirect: true, // Don't redirect on 401
      }
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

type QueryFnType = () => Promise<PaginatedResponse<ApiListingSummary>>;
type UseGetAllListingsOptions = QueryConfig<QueryFnType>;

export const useGetAllListings = (
  currentPage: number,
  pageSize: number,
  filters?: ListingFilters,
  config?: UseGetAllListingsOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getAllListings(currentPage, pageSize, filters),
    // Use spread to ensure filters object changes trigger cache invalidation
    queryKey: [...queryKey.allListings(currentPage, pageSize), filters || {}],
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};
