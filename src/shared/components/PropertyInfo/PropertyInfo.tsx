import propertyImageFallback from '@/assets/images/property-image.jpg';
import { usePropertyInfoStore } from '@/core/store';
import type { ListingDTO } from '@/shared/types';
import { useNavigate } from '@tanstack/react-router';
import {
  ArrowLeft01Icon,
  FavouriteIcon,
  Flag02Icon,
  Upload04Icon,
} from 'hugeicons-react';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';
import { Button } from '../ui';
import { Details } from './Details';
import { ExcitingFeatures } from './ExcitingFeatures';
import { ImageGrid } from './ImageGrid';
import { ReviewComponent } from './ReviewComponent';
import { ThingsToNote } from './ThingsToNote';
import { WhereYouLive } from './WhereYouLive';

type PropertyInfoProps = {
  actionItem?: React.ReactNode;
  property: ListingDTO;
};

export const PropertyInfo = ({ actionItem, property }: PropertyInfoProps) => {
  const navigate = useNavigate();
  const isWishlisted = usePropertyInfoStore((s) =>
    s.isWishlisted(property?.id ?? 0)
  );
  const toggleWishlist = usePropertyInfoStore((s) => s.toggleWishlist);

  // Use images from API or fallback to default image
  const imageArray =
    property?.images && property.images.length > 0
      ? property.images
      : [{ url: propertyImageFallback, thumbnail: undefined }];

  const handleBack = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="h-full flex flex-col gap-6 py-10">
      {/* Desktop: Buttons above image grid */}
      <div className="hidden lg:flex flex-col gap-4 px-4 md:px-6 lg:px-8 2xl:px-30">
        <div className="flex gap-2 justify-end">
          {propertyItems.map((item) => (
            <>
              {item.name === 'Wishlist' ? (
                <Button
                  className="px-4 py-2 rounded-full"
                  variant="outline"
                  key={item.name}
                  onClick={() => toggleWishlist(property || ({} as ListingDTO))}
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
        <ImageGrid imageArray={imageArray} />
      </div>

      <div className="lg:hidden">
        <ImageCarousel
          images={imageArray}
          alt="Property"
          imageClassName="w-full h-[290px] object-cover"
          containerClassName="relative w-full"
          showDots={false}
          showArrows={true}
          showArrowsOnHover={false}
          showCounter={true}
          overlay={
            <div className="flex justify-between items-start px-4 pt-2">
              <div
                className="rounded-full size-9 grid place-items-center bg-white shadow-md"
                onClick={handleBack}
              >
                <ArrowLeft01Icon className="size-6" />
              </div>

              <div className="flex gap-2">
                <div className="rounded-full size-9 grid place-items-center bg-white shadow-md">
                  <Upload04Icon className="size-4" />
                </div>
                <div
                  className="rounded-full size-9 grid place-items-center bg-white shadow-md"
                  onClick={() => toggleWishlist(property || ({} as ListingDTO))}
                >
                  <FavouriteIcon
                    className={`size-4 ${
                      isWishlisted
                        ? 'fill-primary-500 text-primary-500'
                        : 'fill-white text-black-500'
                    }`}
                  />
                </div>
                <div className="rounded-full size-9 grid place-items-center bg-white shadow-md">
                  <Flag02Icon className="size-4" />
                </div>
              </div>
            </div>
          }
        />
      </div>

      <div className="px-4 md:px-6 lg:px-8 2xl:px-30">
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
        {/* <div className="h-[1px] w-full bg-custom-neutral-100" /> */}
        {property?.notes && <ThingsToNote notes={property.notes} />}
      </div>
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
