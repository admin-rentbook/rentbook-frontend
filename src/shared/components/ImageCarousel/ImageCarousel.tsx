import type { ReactNode } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { useCarouselHook } from '@/shared/hooks';

type ImageCarouselProps = {
  images: string[];
  alt?: string;
  imageClassName?: string;
  containerClassName?: string;
  showDots?: boolean;
  showArrows?: boolean;
  showArrowsOnHover?: boolean;
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
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div
                className="h-full w-full"
                onClick={() => onImageClick?.(index)}
              >
                <img
                  src={image}
                  alt={`${alt} - Image ${index + 1}`}
                  className={imageClassName}
                />
              </div>
            </CarouselItem>
          ))}
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
        {images.length > 1 && showDots && (
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
      </Carousel>
    </div>
  );
};