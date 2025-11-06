import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/shared/components';
import type { PropertyDTO } from '@/shared/types';
import { formatNamibianDollar } from '@/shared/utils';
import { useEffect, useState } from 'react';

type PropertyCardProps = {
  property: PropertyDTO;
  onClick: () => void;
};

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { symbol, amount } = formatNamibianDollar(property.amount);

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Card
      className="overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer h-[500px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-1.5 flex flex-col h-full gap-2">
        <div className="relative flex-1 min-h-0 rounded-[20px] overflow-hidden">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            className="h-full w-full"
            // onSelect={(index) => setCurrentIndex(index)}
            setApi={setApi}
          >
            <CarouselContent className="h-full">
              {property.images.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="h-full w-full" onClick={onClick}>
                    <img
                      src={image}
                      alt={`${property.propertyName} - Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-[20px]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {property.images.length > 1 && isHovered && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 border-none shadow-md transition-all" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 border-none shadow-md transition-all" />
              </>
            )}
            {property.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {property.images.map((_, index) => (
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

        <div className="flex px-2 py-1 justify-between items-end">
          <div className="space-y-0.5">
            <h5 className="text-base font-semibold text-gray-900 truncate">
              {property.propertyName}
            </h5>
            <p className="text-sm text-gray-600 truncate">
              {property.location}
            </p>
            <div className="flex gap-4 pt-1">
              {property.amenities.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="flex items-start gap-1.5 text-gray-700"
                >
                  <item.icon className="size-4" />
                  <span className="text-body-small">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-body-sm-semi">
            <span className="text-black-500/60">{symbol}</span>
            <span className="text-black-500">{amount}</span>
            <span className="text-black-400">/mo</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
