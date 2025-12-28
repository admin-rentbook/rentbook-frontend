import { usePropertyInfoStore } from '@/core/store';
import { Card, CardContent, ImageCarousel } from '@/shared/components';
import type { ListingDTO } from '@/shared/types';
import { formatNamibianDollar } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  CalendarLock01Icon,
  DashedLine02Icon,
  FavouriteIcon,
} from 'hugeicons-react';

type PropertyCardProps = {
  property: ListingDTO;
  onClick?: (property: ListingDTO) => void;
};

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const { symbol, amount } = formatNamibianDollar(property.amount);
  const toggleWishlist = usePropertyInfoStore((s) => s.toggleWishlist);
  const isWishlisted = usePropertyInfoStore((s) =>
    s.isWishlisted(property.id ?? 0)
  );
  const isWaitlisted = usePropertyInfoStore((s) =>
    s.isWaitlisted(property.id ?? 0)
  );
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(property);
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
