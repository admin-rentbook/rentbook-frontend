import type { ReactNode } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { useCarouselHook } from '@/shared/hooks';
import type { ImageWithThumbnail } from '@/shared/types';
import { OptimizedImage } from '../OptimizedImage';

type ImageCarouselProps = {
  images: string[] | ImageWithThumbnail[];
  alt?: string;
  imageClassName?: string;
  containerClassName?: string;
  showDots?: boolean;
  showArrows?: boolean;
  showArrowsOnHover?: boolean;
  showCounter?: boolean;
  overlay?: ReactNode;
  onImageClick?: (index: number) => void;
};

export const ImageCarousel = ({
  images,
  alt = 'Image',
  imageClassName = 'w-full h-[260px] object-cover rounded-[1.25em]',
  containerClassName = 'relative z-1 flex-1 min-h-0 rounded-[1.25em] overflow-hidden',
  showDots = true,
  showArrows = true,
  showArrowsOnHover = true,
  showCounter = false,
  overlay,
  onImageClick,
}: ImageCarouselProps) => {
  const { currentIndex, isHovered, setApi, api, setIsHovered } =
    useCarouselHook();

  const shouldShowArrows = showArrows && (showArrowsOnHover ? isHovered : true);

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    api?.scrollPrev();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    api?.scrollNext();
  };

  return (
    <div
      className={containerClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay content (e.g., wishlist, waitlist icons) */}
      {overlay && <div className="absolute top-2 w-full z-10">{overlay}</div>}

      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="h-full w-full"
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => {
            // Check if image is a string or ImageWithThumbnail object
            const imageUrl = typeof image === 'string' ? image : image.url;
            const thumbnailUrl =
              typeof image === 'string' ? undefined : image.thumbnail;

            return (
              <CarouselItem key={index} className="h-full">
                <div
                  className="h-full w-full"
                  onClick={() => onImageClick?.(index)}
                >
                  <OptimizedImage
                    src={imageUrl}
                    thumbnailSrc={thumbnailUrl}
                    alt={`${alt} - Image ${index + 1}`}
                    className={imageClassName}
                    priority={index === 0} // First image loads eagerly
                    loading={index === 0 ? 'eager' : 'lazy'} // Lazy load non-visible images
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation arrows */}
        {images.length > 1 && shouldShowArrows && (
          <>
            <CarouselPrevious
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 border-none shadow-md transition-all"
              onClick={handlePrevClick}
            />
            <CarouselNext
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 border-none shadow-md transition-all"
              onClick={handleNextClick}
            />
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && showDots && !showCounter && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  api?.scrollTo(index);
                }}
                className={`rounded-full transition-all duration-300 hover:scale-110 ${
                  index === currentIndex
                    ? 'w-[4px] h-[4px] bg-white'
                    : 'w-[4px] h-[4px] bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter - bottom right */}
        {images.length > 1 && showCounter && (
          <div className="absolute bottom-3 right-3 bg-white text-icons-black px-3 py-1 rounded-full">
            <p className="text-body">
              {currentIndex + 1}/{images.length}
            </p>
          </div>
        )}
      </Carousel>
    </div>
  );
};