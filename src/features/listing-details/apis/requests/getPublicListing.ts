import {
  axios,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import type { PublicListingDTO } from '../../types';
import { queryKey, url } from '../url-query';

const getPublicListing = async (listingId: number) => {
  try {
    const response = await axios.get<ApiResponse<PublicListingDTO>>(
      url.publicListing(listingId),
      {
        skipAuthRedirect: true,
      }
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<PublicListingDTO>>;
type UseGetPublicListingOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export const useGetPublicListing = (
  listingId: number,
  config?: UseGetPublicListingOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getPublicListing(listingId),
    queryKey: queryKey.publicListing(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!listingId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
