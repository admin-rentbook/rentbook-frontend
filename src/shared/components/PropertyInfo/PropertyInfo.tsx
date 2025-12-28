import property2 from '@/assets/images/property-2.jpg';
import property3 from '@/assets/images/property-3.jpg';
import property1 from '@/assets/images/property-image.jpg';
import { usePropertyInfoStore } from '@/core/store';
import type { PropertyDTO } from '@/shared/types';
import { FavouriteIcon, Flag02Icon, Upload04Icon } from 'hugeicons-react';
import { Button } from '../ui';
import { Details } from './Details';
import { ExcitingFeatures } from './ExcitingFeatures';
import { ImageGrid } from './ImageGrid';
import { ReviewComponent } from './ReviewComponent';
import { ThingsToNote } from './ThingsToNote';
import { WhereYouLive } from './WhereYouLive';

type PropertyInfoProps = {
  actionItem?: React.ReactNode;
  property: PropertyDTO;
};

export const PropertyInfo = ({ actionItem, property }: PropertyInfoProps) => {
  //   const location = useLocation();
  //   const property = location.state.property;

  const isWishlisted = usePropertyInfoStore((s) =>
    s.isWishlisted(property?.id ?? 0)
  );
  const toggleWishlist = usePropertyInfoStore((s) => s.toggleWishlist);
  return (
    <div className="h-full flex flex-col px-4 gap-6 md:px-6 lg:px-8 2xl:px-30 py-10">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 justify-end">
          {propertyItems.map((item) => (
            <>
              {item.name === 'Wishlist' ? (
                <Button
                  className="px-4 py-2 rounded-full"
                  variant="outline"
                  key={item.name}
                  onClick={() =>
                    toggleWishlist(property || ({} as PropertyDTO))
                  }
                >
                  <item.icon
                    className={`${
                      isWishlisted
                        ? 'fill-primary-500 text-white'
                        : 'fill-white text-black-500'
                    }`}
                  />
                  {isWishlisted ? 'Added to Wish list' : item.name}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  key={item.name}
                  className="px-4 py-2 rounded-full"
                >
                  <item.icon />
                  {item.name}
                </Button>
              )}
            </>
          ))}
        </div>
        <ImageGrid
          imageArray={[
            property1,
            property2,
            property3,
            property1,
            property2,
            property3,
          ]}
        />
      </div>
      <div className="grid md:grid-cols-[60%_40%] gap-4 pt-4 justify-between">
        <div className="flex flex-col gap-6">
          <Details property={property} />
          <div className="h-[1px] w-full bg-custom-neutral-100" />
          {property?.amenities && (
            <ExcitingFeatures amenities={property.amenities} />
          )}
          <div className="h-[1px] w-full bg-custom-neutral-100" />

          {property?.locationResult && (
            <WhereYouLive location={property.locationResult} />
          )}
          <div className="h-[1px] w-full bg-custom-neutral-100" />
        </div>
        {actionItem && (
          <div className="flex items-start justify-end">{actionItem}</div>
        )}
      </div>

      {property?.reviews && <ReviewComponent reviewData={property.reviews} />}
      <div className="h-[1px] w-full bg-custom-neutral-100" />
      {property?.notes && <ThingsToNote notes={property.notes} />}
    </div>
  );
};

const propertyItems = [
  {
    icon: Upload04Icon,
    name: 'Share',
    onAction: () => ({}),
  },
  {
    icon: FavouriteIcon,
    name: 'Wishlist',
    onAction: () => ({}),
  },
  {
    icon: Flag02Icon,
    name: 'Report',
    onAction: () => ({}),
  },
];
