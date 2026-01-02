import { ListingDetailsLinks } from '@/features/listing-details/constants';
import type { ListingDTO } from '@/shared/types';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight01Icon } from 'hugeicons-react';
import { useMemo } from 'react';
import { useListingsFilter } from '../providers';
import { transformToListingDTO } from '../utils';
import { ListingSkeleton } from './ListingSkeleton';
import { PropertyCard } from './PropertyCard';

export const Listings = () => {
  const navigate = useNavigate({ from: '/' });
  const { listings, isLoading, error } = useListingsFilter();

  const handleClick = (listing: ListingDTO) => {
    navigate({
      to: ListingDetailsLinks.LISTING_DETAILS,
      search: (prev) => ({
        ...prev,
        listingId: listing.id
      }),
    });
  };

  // Transform API data to ListingDTO format
  const transformedListings = useMemo(
    () => listings.map(transformToListingDTO),
    [listings]
  );

  if (error) {
    return (
      <div className="flex flex-col gap-3 justify-start pt-6">
        <div className="flex gap-4 items-center">
          <h3 className="text-heading-xl-semi text-black-500">
            Popular homes in Windhoek
          </h3>
          <ArrowRight01Icon className="size-5 text-black-400" />
        </div>
        <div className="p-8 text-center">
          <p className="text-body text-red-500">
            Failed to load listings. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 justify-start pt-6">
        <div className="flex gap-4 items-center">
          <h3 className="text-heading-xl-semi text-black-500">
            Popular homes in Windhoek
          </h3>
          <ArrowRight01Icon className="size-5 text-black-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <ListingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (transformedListings.length === 0) {
    return (
      <div className="flex flex-col gap-3 justify-start pt-6">
        <div className="flex gap-4 items-center">
          <h3 className="text-heading-xl-semi text-black-500">
            Popular homes in Windhoek
          </h3>
          <ArrowRight01Icon className="size-5 text-black-400" />
        </div>
        <div className="p-8 text-center">
          <p className="text-body text-black-400">
            No listings available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 justify-start pt-6">
      <div className="flex gap-4 items-center">
        <h3 className="text-heading-xl-semi text-black-500">
          Popular homes in Windhoek
        </h3>
        <ArrowRight01Icon className="size-5 text-black-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10">
        {transformedListings.map((listing) => (
          <PropertyCard
            property={listing}
            key={listing.id || listing.title}
            onClick={() => handleClick(listing)}
          />
        ))}
      </div>
    </div>
  );
};
