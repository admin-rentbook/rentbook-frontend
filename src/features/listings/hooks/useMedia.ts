import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { uploadAndSaveMedia, useGetMedia, useDeleteMedia } from '../apis/requests/media';
import { useListingDraft } from '../providers';
import { validateImageFile } from '../utils/mediaUploadHelpers';
import type { MediaDTO } from '../types';

export const useMedia = (onNext: (() => void) | undefined) => {
  const MINIMUM_IMAGE_NUMBER = 5;

  const { listingId } = useListingDraft();

  const [newFiles, setNewFiles] = useState<File[]>([]); // Only new files to upload
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mediaMetadata, setMediaMetadata] = useState<MediaDTO[]>([]);
  const [deletingImageId, setDeletingImageId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasLoadedExistingMedia = useRef(false);

  const {
    data: existingMedia,
    refetch: refetchMedia,
    isLoading,
    isFetching,
  } = useGetMedia(listingId as number, {
    enabled: !!listingId,
  });

  const deleteMutation = useDeleteMedia({});

  // Load existing media only once
  useEffect(() => {
    if (existingMedia?.data && existingMedia.data.length > 0 && !hasLoadedExistingMedia.current) {
      hasLoadedExistingMedia.current = true;
      setMediaMetadata(existingMedia.data);

      // Priority: signed_url > thumb_medium > thumb_large > file_url
      const mediaPreviews = existingMedia.data.map((media, index) => {
        const url =
          media.signed_url ||
          media.thumb_medium ||
          media.thumb_large ||
          media.file_url;

        if (!url) {
          console.warn(`⚠️ No URL available for image ${index}:`, media.file_name);
        }

        console.log(`🔗 Image ${index}:`, {
          signed_url: media.signed_url,
          thumb_medium: media.thumb_medium,
          thumb_large: media.thumb_large,
          file_url: media.file_url,
          using: url || 'MISSING',
          file_name: media.file_name,
        });
        return url || ''; // Keep empty string to maintain array length
      });

      setPreviewUrls(mediaPreviews);
      // Clear any new files when loading existing media (user navigated back)
      setNewFiles([]);
    }
  }, [existingMedia]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    let hasError = false;

    for (const file of fileArray) {
      const validation = validateImageFile(file);

      if (!validation.valid) {
        const errorType =
          file.size > 5 * 1024 * 1024 ? 'File too large' : 'Invalid file type';
        toast.error(errorType, {
          description: validation.error,
        });
        hasError = true;
        continue;
      }

      validFiles.push(file);
    }

    if (hasError && validFiles.length === 0) return;

    // Add new files to state
    setNewFiles((prev) => [...prev, ...validFiles]);

    // Create blob URLs for preview
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    // Only revoke object URLs for local previews (blob URLs)
    if (previewUrls[index].startsWith('blob:')) {
      URL.revokeObjectURL(previewUrls[index]);
      // Remove from newFiles
      const newFileIndex = index - mediaMetadata.length;
      setNewFiles((prev) => prev.filter((_, i) => i !== newFileIndex));
    }

    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setMediaMetadata((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteImage = async (index: number) => {
    const media = mediaMetadata[index];

    // If it's a local image (blob URL), just remove from state
    if (previewUrls[index].startsWith('blob:')) {
      removeImage(index);
      return;
    }

    // If it's a server image, call delete API
    if (media?.id && listingId) {
      setDeletingImageId(media.id);
      try {
        await deleteMutation.mutateAsync({
          listingId: listingId as number,
          mediaId: media.id,
        });
        // Remove from state after successful delete
        removeImage(index);
      } catch (error) {
        console.error('Delete failed:', error);
        // Error toast is already shown by the mutation
      } finally {
        setDeletingImageId(null);
      }
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Total images = existing server images + new files
  const totalImages = mediaMetadata.length + newFiles.length;
  const cannotProceed = totalImages < MINIMUM_IMAGE_NUMBER || isUploading;

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSubmitImages = async () => {
    if (!listingId) {
      toast.error('Listing ID not found');
      return;
    }

    // If there are no new files to upload, just proceed to next step
    if (newFiles.length === 0) {
      console.log('✅ No new files to upload, proceeding to next step');
      onNext?.();
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Only upload NEW files, not existing media
      await uploadAndSaveMedia({
        files: newFiles,
        listingId: listingId as number,
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      });

      // Refetch media to get the saved data
      await refetchMedia();

      // Clear new files after successful upload
      setNewFiles([]);

      // Show success message
      toast.success('Media uploaded successfully');
      onNext?.();
    } catch (error: any) {
      console.error('Upload error:', error);

      const errorMessage =
        error.message || 'Failed to upload media. Please try again.';
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    previewUrls,
    fileInputRef,
    handleFileSelect,
    removeImage,
    handleDeleteImage,
    openFilePicker,
    cannotProceed,
    imageCount: totalImages,
    handleDragOver,
    handleDrop,
    handleSubmitImages,
    isUploading,
    uploadProgress,
    existingMedia: existingMedia?.data || [],
    isLoadingMedia: isLoading || isFetching,
    deletingImageId,
    mediaMetadata,
    newFilesCount: newFiles.length,
  };
};