import {
  constructBackblazeFileUrl,
  delay,
  type BackblazeUploadResponse,
} from '@/shared/utils';
import type { MediaDTO } from '../types/listing.dtos';

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