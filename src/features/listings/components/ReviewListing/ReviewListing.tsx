import propertyImage from '@/assets/images/property-image.jpg';
import { PropertyCard } from '@/features/landing-page/components/PropertyCard';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  DashedLine02Icon,
} from 'hugeicons-react';
import { useListingDraft } from '../../providers';
import type {
  AmenitiesData,
  ListingDescriptionFormValues,
  MediaData,
  RentalPriceData,
  ViewTimesData,
} from '../../types';
import { ListingTitle } from '../shared';
import { AmenitiesDetails } from './AmenitiesDetails';
import { ListingDescriptionDetails } from './ListingDescriptionDetails';
import { MediaDetails } from './MediaDetails';
import { PaymentDetails } from './PaymentDetails';
import { ViewingTimesDetails } from './ViewTimesDetails';
export const ReviewListing = () => {
  const { draft } = useListingDraft();

  const property = {
    propertyName: 'The Palm Residence',
    location: 'Windhoek, Khomas Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 20000,
  };

  return (
    <div className="grid grid-cols-[60%_1fr] gap-10 h-full">
      <div className="flex flex-col gap-6">
        <ListingTitle
          description="Look over the details, then submit when you are ready"
          title="Review your listing"
        />
        <div className="space-y-4">
          <ListingDescriptionDetails
            listingDetails={
              draft?.listingDescription as ListingDescriptionFormValues
            }
          />
          <AmenitiesDetails amenities={draft?.amenities as AmenitiesData} />
          <MediaDetails images={draft?.media as MediaData} />
          <PaymentDetails rentals={draft?.rentalPrice as RentalPriceData} />
          <ViewingTimesDetails
            viewingTimes={draft?.viewingTimes as ViewTimesData}
          />
        </div>
      </div>
      <div className="bg-sidebar rounded-[2em] grid place-items-center h-full">
        <div className="w-2/3">
          <PropertyCard property={property} />
        </div>
      </div>
    </div>
  );
};
