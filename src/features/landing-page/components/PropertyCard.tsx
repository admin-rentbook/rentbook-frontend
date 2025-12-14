import { usePropertyInfoStore } from '@/core/store';
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components';
import { useCarouselHook } from '@/shared/hooks';
import type { PropertyDTO } from '@/shared/types';
import { formatNamibianDollar } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  CalendarLock01Icon,
  DashedLine02Icon,
  FavouriteIcon,
} from 'hugeicons-react';

type PropertyCardProps = {
  property: PropertyDTO;
  onClick?: (property: PropertyDTO) => void;
};

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const { currentIndex, isHovered, setApi, api, setIsHovered } =
    useCarouselHook();

  const { symbol, amount } = formatNamibianDollar(property.amount);
  const toggleWishlist = usePropertyInfoStore((s) => s.toggleWishlist);
  const isWishlisted = usePropertyInfoStore((s) =>
    s.isWishlisted(property.id ?? '')
  );
  const isWaitlisted = usePropertyInfoStore((s) =>
    s.isWaitlisted(property.id ?? '')
  );
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(property);
  };

  const propertyItems = [
    {
      count: property.bedrooms,
      icon: BedSingle02Icon,
    },
    {
      count: property.bathrooms,
      icon: Bathtub01Icon,
    },
    {
      count: property.square,
      icon: DashedLine02Icon,
    },
  ];

  return (
    <Card
      className="overflow-hidden rounded-[1.25em] bg-white hover:shadow-lg transition-shadow cursor-pointer h-auto flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(property)}
    >
      <CardContent className="p-1 flex flex-col h-full gap-2 rounded-[1.25em]">
        <div className="relative z-1 flex-1 min-h-0 rounded-[1.25em] overflow-hidden">
          <div className="absolute top-2 w-full z-10">
            <div
              className={`flex ${isWaitlisted ? 'justify-between' : 'justify-end'} px-2 items-center`}
            >
              {isWaitlisted && (
                <div className="flex gap-2 text-body text-primary-500 px-2 py-1 bg-white rounded-full">
                  <CalendarLock01Icon className="size-4" />
                  <p>10 days left</p>
                </div>
              )}
              <button
                onClick={handleWishlistClick}
                aria-label={
                  isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
                }
              >
                <FavouriteIcon
                  className={`size-6 transition-colors ${
                    isWishlisted
                      ? 'fill-primary-500 text-white'
                      : 'fill-gray-900 text-white'
                  }`}
                />
              </button>
            </div>
          </div>
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
                  <div className="h-full w-full">
                    <img
                      src={image}
                      alt={`${property.propertyName} - Image ${index + 1}`}
                      className="w-full h-[260px] object-cover rounded-[1.25em]"
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

        <div className="flex px-2 py-1 justify-between items-end pr-5">
          <div className="space-y-0.5">
            <h5 className="text-base font-semibold text-gray-900 truncate">
              {property.propertyName}
            </h5>
            <p className="text-sm text-gray-600 truncate">
              {property.location}
            </p>
            <div className="flex gap-4 pt-1">
              {propertyItems.map((item, index) => (
                <div
                  key={`${item.count}-${index}`}
                  className="flex items-center gap-1.5 text-gray-700"
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
