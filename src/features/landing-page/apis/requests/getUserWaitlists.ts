import {
  axios,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/core/lib';
import { formatError } from '@/shared/utils/helpers';
import type { WaitlistItem } from '../../types';
import { queryKey, url } from '../url-query';

type GetUserWaitlistsResponse = {
  success: boolean;
  message: string;
  data: WaitlistItem[];
};

const getUserWaitlists = async () => {
  try {
    const response = await axios.get<GetUserWaitlistsResponse>(
      url.userWaitlists
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

type QueryFnType = () => Promise<GetUserWaitlistsResponse>;
type UseGetUserWaitlistsOptions = QueryConfig<QueryFnType>;

export const useGetUserWaitlists = (
  enabled: boolean = false,
  config?: UseGetUserWaitlistsOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: getUserWaitlists,
    queryKey: queryKey.userWaitlists(),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled,
  });
};
