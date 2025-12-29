import type { ImageWithThumbnail } from '@/shared/types';
import { useMemo, useState } from 'react';

export const useImageGrid = (images: string[] | ImageWithThumbnail[]) => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract URLs and thumbnails from image array
  const processedImages = useMemo(() => {
    return images.map((img) => {
      if (typeof img === 'string') {
        return { url: img, thumbnail: undefined };
      }
      return img;
    });
  }, [images]);

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % processedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + processedImages.length) % processedImages.length);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeGallery();
  };

  return {
    images: processedImages,
    showGallery,
    currentImageIndex,
    openGallery,
    handleKeyDown,
    prevImage,
    closeGallery,
    nextImage,
    setCurrentImageIndex
  };
};
