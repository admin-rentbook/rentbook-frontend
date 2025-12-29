import { ImageCarousel } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { convertUnderscoreToSpace, squareMeterFormatter } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  Building06Icon,
  DashedLine02Icon,
} from 'hugeicons-react';
import { useViewListingDetails } from '../../hooks';
import { ListingActionsMenu } from './ListingActionsMenu';
import { ViewListingDetailsSkeleton } from './ViewListingDetailsSkeleton';

export const ViewListingDetails = () => {
  const { listingData, isLoading, listingId, handlers } =
    useViewListingDetails();

  if (isLoading) {
    return <ViewListingDetailsSkeleton />;
  }

  if (!listingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-body text-black-400">No listing data found</p>
      </div>
    );
  }

  const propertyDetails = [
    {
      name: convertUnderscoreToSpace(listingData.listing_type),
      icon: Building06Icon,
    },
    {
      name: `${listingData.beds} bedrooms`,
      icon: BedSingle02Icon,
    },
    {
      name: `${listingData.bathrooms} bathrooms`,
      icon: Bathtub01Icon,
    },
    {
      name: squareMeterFormatter.format(listingData.size_sqft),
      icon: DashedLine02Icon,
    },
  ];

  return (
    <div className="flex flex-col gap-4 pb-10">
      {/* Image Carousel */}
      <div className="w-full">
        <ImageCarousel
          images={listingData.images}
          alt={listingData.title}
          imageClassName="w-full h-[215px] xl:h-[300px] object-cover rounded-[1.25em]"
          containerClassName="relative w-full rounded-[1.25em] overflow-hidden"
          showArrowsOnHover={true}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 lg:gap-4">
        <h1 className="text-heading-xl-semi text-black-500">
          {listingData.propertyName}
        </h1>
        <h3 className="text-heading-3 text-icons-black lg:block hidden">
          {listingData.formattedAmount}
        </h3>
      </div>
      <div className="flex gap-3 lg:gap-6 flex-wrap">
        {propertyDetails.map((detail) => (
          <div key={detail.name} className="flex items-center gap-1">
            <detail.icon className="size-4 text-black-400" />
            <span className="text-body-base-normal text-icons-black">
              {detail.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-body-small text-black-400">{listingData.location}</p>
      <h3 className="text-heading-3 text-icons-black lg:hidden">
        {listingData.formattedAmount}
      </h3>
      <div className="flex flex-col lg:flex-row gap-4 pt-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handlers.handleCreateLease}
          className="w-full lg:w-1/2"
        >
          Create lease
        </Button>
        <ListingActionsMenu
          listingId={listingId}
          onAddToComplex={handlers.handleAddToComplex}
          onEditListing={handlers.handleEditListing}
          onShareListing={handlers.handleShareListing}
          onPreviewListing={handlers.handlePreviewListing}
          onAssignAgent={handlers.handleAssignAgent}
          onMarkUnavailable={handlers.handleMarkUnavailable}
        />
      </div>
    </div>
  );
};
