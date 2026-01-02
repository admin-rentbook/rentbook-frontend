import {
  axios,
  useMutation,
  type MutationConfig,
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
import { url } from '../url-query';

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
    },
    mutationFn: submitKyc,
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
 * Complete KYC Upload Flow (3 steps)
 * Step 1: Get upload URL for front ID
 * Step 2: Upload front ID to Backblaze
 * Step 3: Get upload URL for back ID
 * Step 4: Upload back ID to Backblaze
 * Step 5: Submit KYC with file details
 */
export const uploadKycDocuments = async ({
  frontIdCard,
  backIdCard,
  namibianRegNo,
  onProgress,
}: UploadKycDocumentsParams): Promise<void> => {
  try {
    // Step 1: Get upload URL for front ID card
    if (onProgress) onProgress(10);

    const frontUploadData = await getKycUploadUrl({
      file_name: frontIdCard.name,
      document_type: 'id_card_front',
    });

    if (onProgress) onProgress(20);

    // Step 2: Upload front ID card to Backblaze
    const frontBackblazeResponse: BackblazeUploadResponse = await uploadToBackblaze(
      frontIdCard,
      frontUploadData.upload_url,
      frontUploadData.authorization_token,
      frontUploadData.file_name
    );

    if (onProgress) onProgress(40);

    // Small delay before next upload
    await delay(500);

    // Step 3: Get upload URL for back ID card
    const backUploadData = await getKycUploadUrl({
      file_name: backIdCard.name,
      document_type: 'id_card_back',
    });

    if (onProgress) onProgress(50);

    // Step 4: Upload back ID card to Backblaze
    const backBackblazeResponse: BackblazeUploadResponse = await uploadToBackblaze(
      backIdCard,
      backUploadData.upload_url,
      backUploadData.authorization_token,
      backUploadData.file_name
    );

    if (onProgress) onProgress(70);

    // Small delay before final submit
    await delay(1000);

    // Step 5: Submit KYC with uploaded file details
    const submitPayload: KycSubmitPayload = {
      namibian_registration_number: namibianRegNo,
      id_card_front_file_name: frontBackblazeResponse.fileName,
      id_card_back_file_name: backBackblazeResponse.fileName,
      id_card_front_file_id: frontBackblazeResponse.fileId,
      id_card_back_file_id: backBackblazeResponse.fileId,
    };

    if (onProgress) onProgress(85);

    await submitKyc(submitPayload);

    if (onProgress) onProgress(100);
  } catch (error) {
    console.error('KYC upload failed:', error);
    throw error;
  }
};