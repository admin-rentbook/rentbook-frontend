import { useWaitlist } from '@/features/wait-wish-lists/hooks/useWaitlist';
import { useWishlist } from '@/features/wait-wish-lists/hooks/useWishlist';
import { Card, CardContent, ImageCarousel } from '@/shared/components';
import type { ListingDTO } from '@/shared/types';
import { formatNamibianDollar, formatRentalPrice } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  CalendarLock01Icon,
  DashedLine02Icon,
  FavouriteIcon,
  Loading03Icon,
} from 'hugeicons-react';

type PropertyCardProps = {
  property: ListingDTO;
  onClick?: (property: ListingDTO) => void;
};

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const formattedPrice = property.rent_period
    ? formatRentalPrice(property.amount, property.rent_period)
    : (() => {
        const { symbol, amount } = formatNamibianDollar(property.amount);
        return `${symbol}${amount}/mo`;
      })();

  const {
    toggleWishlist,
    isWishlisted: checkIsWishlisted,
    isAdding,
    isRemoving,
  } = useWishlist();
  const { isWaitlisted: checkIsWaitlisted } = useWaitlist();

  const isWishlisted = checkIsWishlisted(property.id ?? 0);
  const isWaitlisted = checkIsWaitlisted(property.id ?? 0);
  const isWishlistLoading = isAdding || isRemoving;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (property.id && !isWishlistLoading) {
      toggleWishlist(property.id);
    }
  };

  const propertyItems = [
    {
      count: property.beds,
      icon: BedSingle02Icon,
    },
    {
      count: property.bathrooms,
      icon: Bathtub01Icon,
    },
    {
      count: property.size_sqft,
      icon: DashedLine02Icon,
    },
  ];

  // Custom overlay with wishlist and waitlist icons
  const carouselOverlay = (
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
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        disabled={isWishlistLoading}
        className="relative"
      >
        {isWishlistLoading ? (
          <Loading03Icon className="size-6 text-primary-500 animate-spin" />
        ) : (
          <FavouriteIcon
            className={`size-6 transition-colors ${
              isWishlisted
                ? 'fill-primary-500 text-white'
                : 'fill-gray-900 text-white'
            }`}
          />
        )}
      </button>
    </div>
  );

  return (
    <Card
      className="overflow-hidden rounded-[1.25em] bg-white hover:shadow-lg transition-shadow cursor-pointer h-auto flex flex-col"
      onClick={() => onClick?.(property)}
    >
      <CardContent className="p-1 flex flex-col h-full gap-2 rounded-[1.25em]">
        <ImageCarousel
          images={property.images}
          alt={property.title}
          overlay={carouselOverlay}
          showArrowsOnHover={true}
        />

        <div className="flex px-2 py-1 justify-between items-end pr-5">
          <div className="space-y-0.5">
            <h5 className="text-base font-semibold text-gray-900 truncate">
              {property.title}
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
          <p className="text-body-sm-semi text-black-500">{formattedPrice}</p>
        </div>
      </CardContent>
    </Card>
  );
};
