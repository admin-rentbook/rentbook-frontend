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
import { delay, getUploadUrl, uploadToBackblaze } from '@/shared/utils';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import type { MediaDTO } from '../../types';
import { createMediaDTO } from '../../utils/mediaUploadHelpers';
import { queryKey, url } from '../url-query';

type AddMediaVariables = {
  data: MediaDTO;
  listingId: number;
};

const addMediaToGetUploadUrl = async ({
  data,
  listingId,
}: AddMediaVariables): Promise<{
  upload_url: string;
  file_name: string;
  authorization_token: string;
}> => {
  const payload: MediaDTO = {
    file_name: data.file_name,
    mime_type: data.mime_type,
  };

  const endpoint = `${url.listing}/${listingId}/media/upload-url/`;
  return getUploadUrl(endpoint, payload);
};

type UseAddMediaToGetUploadUrlOptions = {
  config?: MutationConfig<typeof addMediaToGetUploadUrl>;
};
export const useAddMediaToGetUploadUrl = ({
  config,
}: UseAddMediaToGetUploadUrlOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'upload-err' });
    },
    onSuccess: () => {
      toast.success('Media success', { id: 'upload-succ' });
    },
    mutationFn: addMediaToGetUploadUrl,
    ...config,
  });
};

type UpdateListingMedia = {
  listingId: number;
  media: MediaDTO[];
};
const updateListingMedia = async ({ listingId, media }: UpdateListingMedia) => {
  // Add delay before making the request to avoid rate limiting
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const response = await axios.patch<ApiResponse<MediaDTO[]>>(
      `${url.listing}/${listingId}/media/`,
      { media }
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseUpdateListingMediaOptions = {
  config?: MutationConfig<typeof updateListingMedia>;
};
export const useUpdateListingMedia = ({
  config,
}: UseUpdateListingMediaOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'upload-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Media success', { id: 'upload-succ' });
      queryClient.invalidateQueries({
        queryKey: queryKey.getMedia(variables.listingId),
      });
    },
    mutationFn: updateListingMedia,
    ...config,
  });
};

type DeleteMediaVariables = {
  listingId: number;
  mediaId: number;
};

const deleteMedia = async ({ listingId, mediaId }: DeleteMediaVariables) => {
  try {
    const response = await axios.delete<ApiResponse<null>>(
      `${url.listing}/${listingId}/media/${mediaId}/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseDeleteMediaOptions = {
  config?: MutationConfig<typeof deleteMedia>;
};

export const useDeleteMedia = ({ config }: UseDeleteMediaOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'delete-err' });
    },
    onSuccess: (_res, variables) => {
      toast.success('Image deleted successfully', { id: 'delete-succ' });
      queryClient.invalidateQueries({
        queryKey: queryKey.getMedia(variables.listingId),
      });
    },
    mutationFn: deleteMedia,
    ...config,
  });
};

const getMedia = async (listingId: number) => {
  try {
    const response = await axios.get<ApiResponse<MediaDTO[]>>(
      `${url.listing}/${listingId}/media/`
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UploadFilesParams = {
  files: File[];
  listingId: number;
  onProgress?: (progress: number) => void;
  maxConcurrent?: number;
  delayBetweenBatches?: number;
};

export const uploadAndSaveMedia = async ({
  files,
  listingId,
  onProgress,
  maxConcurrent = 1, // Process 1 file at a time to avoid rate limits (429 errors)
  delayBetweenBatches = 1000, // 1 second delay between files to avoid rate limiting
}: UploadFilesParams): Promise<void> => {
  const uploadedFiles: MediaDTO[] = [];
  let completedUploads = 0;

  // Process files in batches to avoid rate limiting
  for (let i = 0; i < files.length; i += maxConcurrent) {
    const batch = files.slice(i, i + maxConcurrent);

    // Process current batch in parallel
    const batchPromises = batch.map(async (file, batchIndex) => {
      try {
        // Step 1: Get upload URL and authorization token
        const response = await addMediaToGetUploadUrl({
          listingId,
          data: {
            file_name: file.name,
            mime_type: file.type,
          },
        });

        // Step 2: Upload file to Backblaze B2 using signed URL with proper headers
        const backblazeResponse = await uploadToBackblaze(
          file,
          response.upload_url,
          response.authorization_token,
          response.file_name
        );

        // Update progress
        completedUploads++;
        if (onProgress) {
          const progressPercent = (completedUploads / files.length) * 80;
          onProgress(Math.round(progressPercent));
        }

        // Calculate order based on total position in all files
        const order = i + batchIndex;

        // Create MediaDTO using utility function
        const mediaDTO = createMediaDTO(backblazeResponse, file, order);

        return mediaDTO;
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        throw error;
      }
    });

    // Wait for current batch to complete
    const batchResults = await Promise.all(batchPromises);
    uploadedFiles.push(...batchResults);

    // Add delay between batches to avoid rate limiting (except for last batch)
    if (i + maxConcurrent < files.length) {
      await delay(delayBetweenBatches);
    }
  }

  // Update progress to 90%
  if (onProgress) {
    onProgress(90);
  }

  // Add a delay before saving to database to avoid rate limiting
  await delay(2000);

  // Step 3: Save all media to database
  await updateListingMedia({ listingId, media: uploadedFiles });

  if (onProgress) {
    onProgress(100);
  }
};

const STALE_TIME = 5 * 60 * 1000;
const CACHED_TIME = 10 * 60 * 1000;
type QueryFnType = () => Promise<ApiResponse<MediaDTO[]>>;
type UseGetMediaOptions = QueryConfig<QueryFnType>;

export const useGetMedia = (listingId: number, config?: UseGetMediaOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryFn: () => getMedia(listingId),
    queryKey: queryKey.getMedia(listingId),
    staleTime: STALE_TIME,
    gcTime: CACHED_TIME,
  });
};
