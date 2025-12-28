import { PropertyCard } from '@/features/landing-page/components/PropertyCard';
import { Loader2 } from 'lucide-react';
import { useReviewListing } from '../../hooks';
import { ListingTitle, NavigateButtons } from '../shared';
import { AdditionalDetailsCard } from './AdditionalDetailsCard';
import { AmenitiesDetails } from './AmenitiesDetails';
import { FinalDetailsCard } from './FinalDetailsCard';
import { ListingDescriptionDetails } from './ListingDescriptionDetails';
import { MediaDetails } from './MediaDetails';
import { PaymentDetails } from './PaymentDetails';
import { ViewingTimesDetails } from './ViewTimesDetails';

type ReviewListingProps = {
  onNext: (() => void) | undefined;
  onPrev: (() => void) | undefined;
  goToStep?: (mainStepId: number, subStepId?: number) => void;
};

export const ReviewListing = ({ onPrev, goToStep }: ReviewListingProps) => {
  const {
    listingDescription,
    amenities,
    media,
    rentalPricing,
    viewing,
    additionalFees,
    discount,
    finalDetails,
    additionalDetails,
    isLoading,
    isSubmitting,
    handleReviewSubmit,
    loadingStates,
    propertyCardData,
  } = useReviewListing();

  return (
    <div className="flex flex-col h-full">
      <div className="grid xl:grid-cols-[60%_1fr] gap-10 h-full">
        <div className="flex flex-col gap-6">
          <ListingTitle
            description="Look over the details, then submit when you are ready"
            title="Review your listing"
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              <p className="ml-3 text-body text-black-400">
                Loading listing details...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {loadingStates.description ? (
                <div className="flex items-center justify-center py-8 rounded-[1.25em] bg-sidebar">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                  <p className="ml-2 text-body text-black-400">
                    Loading description...
                  </p>
                </div>
              ) : (
                <ListingDescriptionDetails
                  listingDetails={listingDescription}
                  onEdit={() => goToStep?.(0, 0)}
                />
              )}

              {loadingStates.amenities ? (
                <div className="flex items-center justify-center py-8 rounded-[1.25em] bg-sidebar">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                  <p className="ml-2 text-body text-black-400">
                    Loading amenities...
                  </p>
                </div>
              ) : (
                <AmenitiesDetails
                  amenities={amenities}
                  onEdit={() => goToStep?.(0, 1)}
                />
              )}

              {loadingStates.media ? (
                <div className="flex items-center justify-center py-8 rounded-[1.25em] bg-sidebar">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                  <p className="ml-2 text-body text-black-400">
                    Loading media...
                  </p>
                </div>
              ) : (
                <MediaDetails images={media} onEdit={() => goToStep?.(0, 2)} />
              )}

              {loadingStates.rentalPrice ||
              loadingStates.additionalFees ||
              loadingStates.discount ? (
                <div className="flex items-center justify-center py-8 rounded-[1.25em] bg-sidebar">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                  <p className="ml-2 text-body text-black-400">
                    Loading payment details...
                  </p>
                </div>
              ) : (
                <PaymentDetails
                  rentalPricing={rentalPricing}
                  additionalFees={additionalFees}
                  discount={discount}
                  onEdit={() => goToStep?.(1, 0)}
                />
              )}

              {loadingStates.viewing ? (
                <div className="flex items-center justify-center py-8 rounded-[1.25em] bg-sidebar">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                  <p className="ml-2 text-body text-black-400">
                    Loading viewing times...
                  </p>
                </div>
              ) : (
                <ViewingTimesDetails
                  viewingTimes={viewing}
                  onEdit={() => goToStep?.(2, 0)}
                />
              )}

              {loadingStates.finalDetails ? (
                <div className="flex items-center justify-center py-8 rounded-[1.25em] bg-sidebar">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                  <p className="ml-2 text-body text-black-400">
                    Loading availability...
                  </p>
                </div>
              ) : (
                <FinalDetailsCard
                  finalDetails={finalDetails}
                  onEdit={() => goToStep?.(3, 0)}
                />
              )}

              {loadingStates.additionalDetails ? (
                <div className="flex items-center justify-center py-8 rounded-[1.25em] bg-sidebar">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                  <p className="ml-2 text-body text-black-400">
                    Loading additional details...
                  </p>
                </div>
              ) : (
                <AdditionalDetailsCard
                  additionalDetails={additionalDetails}
                  onEdit={() => goToStep?.(3, 1)}
                />
              )}
            </div>
          )}
        </div>
        <div className="bg-sidebar hidden  rounded-[2em] xl:grid place-items-center h-full">
          <div className="w-2/3">
            <PropertyCard property={propertyCardData} />
          </div>
        </div>
      </div>
      <div className="pt-10">
        <NavigateButtons
          onBack={() => onPrev?.()}
          onContinue={handleReviewSubmit}
          saveBtnText="Publish listing"
          isButtonDisabled={isLoading || isSubmitting}
        />
      </div>
    </div>
  );
};
