import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useListingDraft } from '../providers';
import { useAutoSaveValue } from './useAutoSave';

export const useImageUpload = (onNext: (() => void) | undefined) => {
  const MINIMUM_IMAGE_NUMBER = 5;

  const {
    updateStepData,
    markStepComplete,
    getStepData,
    markMainStepComplete,
  } = useListingDraft();
  const savedData = useMemo(() => getStepData('media'), []);

  const [images, setImages] = useState<File[]>(() => {
    if (!savedData?.images) return [];

    return savedData.images.map((img) => {
      // Re-create a File-like object using Blob
      return new File(['placeholder'], img.name, { type: img.type });
    });
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>(() => {
    return savedData?.images?.map((img) => img.url) ?? [];
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useAutoSaveValue(images, (current) => {
    const mediaImages = current.map((file, index) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: previewUrls[index],
    }));
    updateStepData('media', { images: mediaImages });
  });

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    let hasError = false;

    for (const file of fileArray) {
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type', {
          description: `${file.name} is not an image file. Please select only images.`,
        });
        hasError = true;
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large', {
          description: `${file.name} exceeds 5MB. Please choose a smaller image.`,
        });
        hasError = true;
        continue;
      }
      if (hasError) return;

      validFiles.push(file);
    }

    const newImages = [...images, ...validFiles];
    setImages(newImages);

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const cannotProceed = images.length < MINIMUM_IMAGE_NUMBER;

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
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

  const handleSubmitImages = () => {
    const mediaImages = images.map((file, index) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: previewUrls[index],
    }));
    updateStepData('media', { images: mediaImages });
    markStepComplete(0, 2);
    markMainStepComplete(0);
    onNext?.();
  };

  return {
    images,
    previewUrls,
    fileInputRef,
    handleFileSelect,
    removeImage,
    openFilePicker,
    cannotProceed,
    imageCount: images.length,
    handleDragOver,
    handleDrop,
    handleSubmitImages,
  };
};
