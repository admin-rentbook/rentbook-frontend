import {
  axios,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { queryKey, url } from '../url-query';
import type { ListingDescriptionDTO } from '../../types';

const getListingsByPropId = async (propertyId: number) => {
  try {
    const response = await axios.get<ApiResponse<ListingDescriptionDTO[]>>(
      `${url.properties}/${propertyId}/listings/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = () => Promise<ApiResponse<ListingDescriptionDTO[]>>;
type UseGetListsByPropIdOptions = QueryConfig<QueryFnType>;

export const useGetListsByPropsId = (
  propertyId: number,
  config?: UseGetListsByPropIdOptions
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getListingsByPropId(propertyId),
    queryKey: queryKey.getAllListings(propertyId),
    enabled: !!propertyId,
  });
};
