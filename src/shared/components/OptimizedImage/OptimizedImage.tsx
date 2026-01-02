import { useState } from 'react';

type OptimizedImageProps = {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
};

/**
 * Optimized image component with blur-up loading technique
 * Shows thumbnail first (blurred), then loads full image for better perceived performance
 */
export const OptimizedImage = ({
  src,
  thumbnailSrc,
  alt,
  className = '',
  loading = 'lazy',
  priority = false,
}: OptimizedImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Use eager loading for priority images (first image in carousel)
  const loadingStrategy = priority ? 'eager' : loading;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Thumbnail - blurred background */}
      {thumbnailSrc && !imageLoaded && (
        <img
          src={thumbnailSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
          aria-hidden="true"
        />
      )}

      {/* Full resolution image */}
      <img
        src={src}
        alt={alt}
        loading={loadingStrategy}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setError(true)}
      />

      {/* Loading skeleton - shows when no thumbnail and image hasn't loaded */}
      {!thumbnailSrc && !imageLoaded && !error && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
      )}
    </div>
  );
};