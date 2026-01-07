import {
  axios,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import type { WishlistItem } from '../../types';
import { queryKey, url } from '../url-query';

const getWishlists = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get<ApiResponse<WishlistItem[]>>(
      url.wishlists,
      {
        params: {
          page,
          page_size: pageSize,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

type QueryFnType = () => Promise<ApiResponse<WishlistItem[]>>;
type UseGetWishlistsOptions = QueryConfig<QueryFnType>;

export const useGetWishlists = (
  page: number,
  pageSize: number,
  enabled: boolean = false,
  config?: UseGetWishlistsOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getWishlists(page, pageSize),
    queryKey: queryKey.wishlists(page, pageSize),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled,
  });
};
