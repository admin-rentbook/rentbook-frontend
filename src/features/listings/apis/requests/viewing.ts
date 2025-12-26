import {
  axios,
  queryClient,
  useMutation,
  useQuery,
  type ExtractFnReturnType,
  type MutationConfig,
  type QueryConfig,
} from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import type { ViewTimesData } from '../../types';
import type { ViewingDTO } from '../../types/listing.dtos';
import { transformViewingFormToDTO } from '../../types/mappedTypes';
import { queryKey, url } from '../url-query';

const getViewing = async (
  listingId: number
): Promise<ApiResponse<ViewingDTO>> => {
  try {
    const response = await axios.get<ApiResponse<ViewingDTO>>(
      `${url.listing}/${listingId}/viewing/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<ViewingDTO>>;
type UseGetViewingOptions = QueryConfig<QueryFnType>;

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export const useGetViewing = (
  listingId: number,
  config?: UseGetViewingOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getViewing(listingId),
    queryKey: queryKey.viewing(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!listingId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

type UpdateViewingVariables = {
  data: ViewTimesData;
  listingId: number;
};

const updateViewing = async ({
  data,
  listingId,
}: UpdateViewingVariables): Promise<ApiResponse<ViewingDTO>> => {
  const payload = transformViewingFormToDTO(data);

  try {
    const response = await axios.patch<ApiResponse<ViewingDTO>>(
      `${url.listing}/${listingId}/viewing/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseUpdateViewingOptions = {
  config?: MutationConfig<typeof updateViewing>;
};

export const useUpdateViewing = ({
  config,
}: UseUpdateViewingOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'viewing-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Viewing settings saved successfully', {
        id: 'viewing-succ',
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.viewing(variables.listingId),
      });
    },
    mutationFn: updateViewing,
    ...config,
  });
};