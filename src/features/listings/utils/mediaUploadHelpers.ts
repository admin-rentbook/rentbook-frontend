import { env } from '@/config/env';
import type { MediaDTO } from '../types/listing.dtos';

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
 * Transform Backblaze response to MediaDTO
 */
export const createMediaDTO = (
  backblazeResponse: BackblazeUploadResponse,
  file: File,
  order: number
): MediaDTO => {
  const fileUrl = constructBackblazeFileUrl(backblazeResponse.fileName);

  return {
    file_url: fileUrl,
    file_name: backblazeResponse.fileName,
    file_id: backblazeResponse.fileId,
    mime_type: backblazeResponse.contentType,
    file_size: backblazeResponse.contentLength,
    media_type: file.type.startsWith('image/') ? 'image' : 'video',
    order: order,
    is_primary: order === 0 ? 'true' : 'false',
  };
};

/**
 * Process files in batches with concurrency control
 */
export const processBatch = async <T>(
  items: T[],
  processor: (item: T, index: number) => Promise<void>,
  options: {
    maxConcurrent?: number;
    delayBetweenBatches?: number;
  } = {}
): Promise<void> => {
  const { maxConcurrent = 1, delayBetweenBatches = 1000 } = options;

  for (let i = 0; i < items.length; i += maxConcurrent) {
    const batch = items.slice(i, i + maxConcurrent);
    await Promise.all(batch.map((item, idx) => processor(item, i + idx)));

    // Add delay between batches (except for the last batch)
    if (i + maxConcurrent < items.length) {
      await delay(delayBetweenBatches);
    }
  }
};

/**
 * Validate image file
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      error: `${file.name} is not an image file. Please select only images.`,
    };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `${file.name} exceeds 5MB. Please choose a smaller image.`,
    };
  }

  return { valid: true };
};