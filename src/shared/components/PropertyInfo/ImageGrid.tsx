import { useImageGrid } from '@/shared/hooks';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
} from 'hugeicons-react';
import type { ImageWithThumbnail } from '@/shared/types';
import { OptimizedImage } from '../OptimizedImage';
import { Button } from '../ui';

type ImageGridProps = {
  imageArray: string[] | ImageWithThumbnail[];
};

export const ImageGrid = ({ imageArray }: ImageGridProps) => {
  const {
    currentImageIndex,
    images,
    openGallery,
    showGallery,
    prevImage,
    nextImage,
    handleKeyDown,
    closeGallery,
    setCurrentImageIndex,
  } = useImageGrid(imageArray);
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[320px] rounded-[1.25em] overflow-hidden">
        <div
          className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer"
          onClick={() => openGallery(0)}
        >
          <OptimizedImage
            src={images[0].url}
            thumbnailSrc={images[0].thumbnail}
            alt="Property main view"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority={true}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        <div
          className="relative overflow-hidden group cursor-pointer"
          onClick={() => openGallery(1)}
        >
          <OptimizedImage
            src={images[1].url}
            thumbnailSrc={images[1].thumbnail}
            alt="Property view 2"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        <div
          className="relative overflow-hidden group cursor-pointer rounded-br-[1.25em] hover:rounded-br-[1.25em]"
          onClick={() => openGallery(2)}
        >
          <OptimizedImage
            src={images[2].url}
            thumbnailSrc={images[2].thumbnail}
            alt="Property view 3"
            className="w-full h-full  object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        <div
          className="relative overflow-hidden group cursor-pointer"
          onClick={() => openGallery(3)}
        >
          <OptimizedImage
            src={images[3].url}
            thumbnailSrc={images[3].thumbnail}
            alt="Property view 4"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        <div
          className="relative overflow-hidden rounded-tr-[1.25em] hover:rounded-tr-[1.25em] group cursor-pointer"
          onClick={() => openGallery(4)}
        >
          <OptimizedImage
            src={images[4].url}
            thumbnailSrc={images[4].thumbnail}
            alt="Property view 5"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

          {imageArray.length > 5 && (
            <div className="absolute bottom-3 right-2 z-10">
              <Button variant="default" onClick={() => console.log('heheeh')}>
                <p className="text-body-xs text-icons-black">Show all photos</p>
                <p className="text-body-xs text-center text-black-400">
                  + {imageArray.length - 5}
                </p>
              </Button>
            </div>
          )}
        </div>
      </div>

      {showGallery && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close gallery"
          >
            <Cancel01Icon size={32} />
          </button>

          <div className="absolute top-4 left-4 text-lg z-10">
            <p className="text-body-small text-white">
              {currentImageIndex + 1} / {images.length}
            </p>
          </div>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Previous image"
          >
            <ArrowLeft01Icon size={48} />
          </button>

          <div className="max-w-6xl max-h-[90vh] mx-auto px-16">
            <img
              src={images[currentImageIndex].url}
              alt={`Property view ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Next image"
          >
            <ArrowRight01Icon size={48} />
          </button>

          {/* Thumbnail strip at bottom */}
          <div className="absolute bottom-4 left-0 right-0 overflow-x-auto">
            <div className="flex gap-2 justify-center px-4 pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden transition-all ${
                    index === currentImageIndex
                      ? 'ring-2 ring-white opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.thumbnail || img.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
