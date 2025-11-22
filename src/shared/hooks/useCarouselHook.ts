import { useEffect, useState } from 'react';
import type { CarouselApi } from '../components';

export const useCarouselHook = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return {
    currentIndex,
    isHovered,
    setIsHovered,
    setApi,
    api
  };
};
