import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const REQUIRED_IMAGE_NUMBER = 5;
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        console.log('error');
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

  const cannotProceed = images.length !== REQUIRED_IMAGE_NUMBER;

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
  };
};
