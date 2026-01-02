import { env } from '@/config/env';
import { axios } from '@/core/lib';
import { formatError } from './helpers';

/**
 * Calculate SHA1 hash of a file using Web Crypto API
 */
export const calculateSHA1 = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

/**
 * Construct Backblaze B2 public file URL
 */
export const constructBackblazeFileUrl = (fileName: string): string => {
  const bucketName = env.BACKBLAZE_BUCKET_NAME || 'rentbookBucket';
  return `https://f002.backblazeb2.com/file/${bucketName}/${fileName}`;
};

/**
 * Delay execution for a specified number of milliseconds
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Backblaze B2 upload response structure
 */
export type BackblazeUploadResponse = {
  fileId: string;
  fileName: string;
  contentLength: number;
  contentSha1: string;
  contentType: string;
  fileInfo: Record<string, string>;
};

/**
 * Upload a single file to Backblaze B2 signed URL
 */
export const uploadToBackblaze = async (
  file: File,
  signedUrl: string,
  authorizationToken: string,
  fileName: string
): Promise<BackblazeUploadResponse> => {
  const sha1Hash = await calculateSHA1(file);

  const response = await fetch(signedUrl, {
    method: 'POST',
    headers: {
      Authorization: authorizationToken,
      'Content-Type': file.type,
      'X-Bz-File-Name': encodeURIComponent(fileName),
      'X-Bz-Content-Sha1': sha1Hash,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Backblaze upload failed: ${response.statusText}`);
  }

  const backblazeResponse: BackblazeUploadResponse = await response.json();
  return backblazeResponse;
};

/**
 * Upload URL Response from backend (common structure)
 */
export type UploadUrlResponse = {
  success: boolean;
  data: {
    upload_url: string;
    authorization_token: string;
    bucket_id: string;
    file_name: string;
  };
  error: string | null;
  message: string;
};

/**
 * Common function to get upload URL from backend
 */
export const getUploadUrl = async (
  endpoint: string,
  payload: Record<string, any>
): Promise<{
  upload_url: string;
  file_name: string;
  authorization_token: string;
}> => {
  // Add a small delay to avoid rate limiting
  await delay(100);

  try {
    const response = await axios.post<UploadUrlResponse>(endpoint, payload);

    if (response.data.success === false || response.data.error) {
      const errorMessage =
        response.data.error ||
        response.data.message ||
        'Failed to get upload URL';
      throw new Error(errorMessage);
    }

    if (
      !response.data.data?.upload_url ||
      !response.data.data?.file_name ||
      !response.data.data?.authorization_token
    ) {
      console.error('Invalid response structure:', response.data);
      throw new Error(
        `Invalid response from server: missing required upload information. Response: ${JSON.stringify(response.data)}`
      );
    }

    return {
      upload_url: response.data.data.upload_url,
      file_name: response.data.data.file_name,
      authorization_token: response.data.data.authorization_token,
    };
  } catch (err: any) {
    if (
      err.message?.includes('Server storage') ||
      err.message?.includes('Invalid response')
    ) {
      throw err;
    }
    throw formatError(err);
  }
};