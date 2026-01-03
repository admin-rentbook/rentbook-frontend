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
import {
  delay,
  getUploadUrl,
  uploadToBackblaze,
  type BackblazeUploadResponse,
} from '@/shared/utils';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { queryKey, url } from '../url-query';

/**
 * KYC Document Type
 */
export type KycDocumentType = 'id_card_front' | 'id_card_back';

/**
 * KYC Document Upload Data
 */
type KycDocumentData = {
  file_name: string;
  document_type: KycDocumentType;
};

/**
 * Step 1: Get upload URL and authorization token
 * Uses general storage upload URL API
 */
const getKycUploadUrl = async (
  data: KycDocumentData
): Promise<{
  upload_url: string;
  file_name: string;
  authorization_token: string;
}> => {
  // Map document_type to file_type for general storage API
  const fileType = data.document_type === 'id_card_front' ? 'front' : 'back';

  const payload = {
    context: 'kyc',
    file_type: fileType,
    file_name: data.file_name,
  };

  const endpoint = `${url.storage}/upload-url/`;
  return getUploadUrl(endpoint, payload);
};

/**
 * KYC Submit Payload
 */
export type KycSubmitPayload = {
  namibian_registration_number: string;
  id_card_front_file_name: string;
  id_card_back_file_name: string;
  id_card_front_file_id?: string;
  id_card_back_file_id?: string;
};

/**
 * Step 3: Submit KYC with uploaded file details
 */
const submitKyc = async (payload: KycSubmitPayload): Promise<ApiResponse<any>> => {
  // Add delay before making the request to avoid rate limiting
  await delay(500);

  try {
    const response = await axios.post<ApiResponse<any>>(
      `${url.kyc}/submit/`,
      payload
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseSubmitKycOptions = {
  config?: MutationConfig<typeof submitKyc>;
};

export const useSubmitKyc = ({ config }: UseSubmitKycOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'kyc-submit-err' });
    },
    onSuccess: () => {
      toast.success('KYC submitted successfully!', { id: 'kyc-submit-succ' });
      // Invalidate KYC status query to refetch updated status
      queryClient.invalidateQueries({ queryKey: queryKey.kycStatus() });
    },
    mutationFn: submitKyc,
    ...config,
  });
};

/**
 * KYC Status Response
 */
export type KycStatusResponse = {
  id: number;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
  };
  namibian_registration_number: string;
  status: 'approved' | 'pending' | 'rejected';
  status_display: string;
  is_verified: boolean;
  submitted_at: string;
  reviewed_at: string | null;
};

/**
 * Get KYC Status
 */
const getKycStatus = async () => {
  try {
    const response = await axios.get<ApiResponse<KycStatusResponse>>(url.kycStatus);
    return response.data.data;
  } catch (err) {
    throw formatError(err);
  }
};

type QueryFnType = typeof getKycStatus;

type UseGetKycStatusOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetKycStatus = ({ config }: UseGetKycStatusOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: queryKey.kycStatus(),
    queryFn: getKycStatus,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...config,
  });
};

/**
 * Uploaded File Info
 */
export type UploadedFileInfo = {
  file_name: string;
  file_id: string;
};

/**
 * Upload KYC Documents Params
 */
type UploadKycDocumentsParams = {
  frontIdCard: File;
  backIdCard: File;
  namibianRegNo: string;
  onProgress?: (progress: number) => void;
};

/**
 * Complete KYC Upload Flow - Optimized with parallel uploads
 * Step 1: Get upload URLs for both front and back IDs in parallel
 * Step 2: Upload both IDs to Backblaze in parallel
 * Step 3: Submit KYC with file details
 */
export const uploadKycDocuments = async ({
  frontIdCard,
  backIdCard,
  namibianRegNo,
  onProgress,
}: UploadKycDocumentsParams): Promise<void> => {
  try {
    // Step 1: Get upload URLs for both documents in parallel
    if (onProgress) onProgress(10);

    const [frontUploadData, backUploadData] = await Promise.all([
      getKycUploadUrl({
        file_name: frontIdCard.name,
        document_type: 'id_card_front',
      }),
      getKycUploadUrl({
        file_name: backIdCard.name,
        document_type: 'id_card_back',
      }),
    ]);

    if (onProgress) onProgress(30);

    // Step 2: Upload both ID cards to Backblaze in parallel
    const [frontBackblazeResponse, backBackblazeResponse]: BackblazeUploadResponse[] = await Promise.all([
      uploadToBackblaze(
        frontIdCard,
        frontUploadData.upload_url,
        frontUploadData.authorization_token,
        frontUploadData.file_name
      ),
      uploadToBackblaze(
        backIdCard,
        backUploadData.upload_url,
        backUploadData.authorization_token,
        backUploadData.file_name
      ),
    ]);

    if (onProgress) onProgress(75);

    // Small delay before final submit
    await delay(300);

    // Step 3: Submit KYC with uploaded file details
    const submitPayload: KycSubmitPayload = {
      namibian_registration_number: namibianRegNo,
      id_card_front_file_name: frontBackblazeResponse.fileName,
      id_card_back_file_name: backBackblazeResponse.fileName,
      id_card_front_file_id: frontBackblazeResponse.fileId,
      id_card_back_file_id: backBackblazeResponse.fileId,
    };

    if (onProgress) onProgress(90);

    await submitKyc(submitPayload);

    if (onProgress) onProgress(100);
  } catch (error) {
    console.error('KYC upload failed:', error);
    throw error;
  }
};