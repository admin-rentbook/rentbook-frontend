import propertyImage from '@/assets/images/property-image.jpg';
import { PropertyCard } from '@/features/landing-page/components/PropertyCard';
import { useReview } from '../../hooks';
import type {
  AmenitiesData,
  ListingDescriptionFormValues,
  MediaData,
  RentalPriceData,
  ViewTimesData,
} from '../../types';
import { ListingTitle, NavigateButtons } from '../shared';
import { AmenitiesDetails } from './AmenitiesDetails';
import { ListingDescriptionDetails } from './ListingDescriptionDetails';
import { MediaDetails } from './MediaDetails';
import { PaymentDetails } from './PaymentDetails';
import { ViewingTimesDetails } from './ViewTimesDetails';

type ReviewListingProps = {
  onNext: (() => void) | undefined;
  onPrev: (() => void) | undefined;
};
export const ReviewListing = ({ onNext, onPrev }: ReviewListingProps) => {
  const { handleReviewSubmit, draft } = useReview(onNext);

  const property = {
    id: '1',
    propertyName: 'The Palm Residence',
    location: 'Windhoek, Khomas Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      'SWIMMING_POOL',
      'BAR',
      'JACUZZI',
      'GYM',
      'dryer',
      'free_parking',
      'pool',
      'gym',
      'elevator',
      'security_system',
      'balcony',
      'garden',
      'pet_friendly',
      'wheelchair_accessible',
    ],
    amount: 20000,
    bedrooms: 3,
    bathrooms: 2,
    square: 25,
    propertyType: 'APARTMENT',
    description:
      'Spacious 3-bedroom apartment with modern amenities, located in a secure neighborhood. Features include a fully equipped kitchen, ensuite master bedroom, ample parking, and 24/7 security. Spacious 3-bedroom apartment with modern amenities, located in a secure neighborhood. Features include a fully equipped kitchen, ensuite master bedroom, ample parking, and 24/7 security. ',
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid xl:grid-cols-[60%_1fr] gap-10 h-full">
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
        <div className="bg-sidebar hidden  rounded-[2em] xl:grid place-items-center h-full">
          <div className="w-2/3">
            <PropertyCard property={property} />
          </div>
        </div>
      </div>
      <div className='pt-10'>
        <NavigateButtons
          onBack={() => onPrev?.()}
          onContinue={handleReviewSubmit}
          saveBtnText="Publish listing"
        />
      </div>
    </div>
  );
};
