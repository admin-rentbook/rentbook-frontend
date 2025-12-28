import { ListingDetailsLinks } from '@/features/listing-details/constants';
import type { ListingDTO } from '@/shared/types';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight01Icon } from 'hugeicons-react';
import { propertyCards } from '../constants';
import { PropertyCard } from './PropertyCard';

export const Listings = () => {
  const navigate = useNavigate();

  const handleClick = (property: ListingDTO) => {
    navigate({
      to: ListingDetailsLinks.LISTING_DETAILS,
      state: { property: property },
    });
  };

  const listings = propertyCards;

  return (
    <div className="flex flex-col gap-3 justify-start pt-6">
      <div className="flex gap-4 items-center">
        <h3 className="text-heading-xl-semi text-black-500">
          Popular homes in Windhoek
        </h3>
        <ArrowRight01Icon className="size-5 text-black-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10">
        {listings.map((listing) => (
          <PropertyCard
            property={listing}
            key={listing.id || listing.title}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};
