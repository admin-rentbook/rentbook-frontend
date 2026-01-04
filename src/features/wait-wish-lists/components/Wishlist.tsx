import { PropertyCard } from '@/features/landing-page/components/PropertyCard';
import { ListingDetailsLinks } from '@/features/listing-details/constants';
import { ErrorState, Skeleton } from '@/shared/components';
import type { ListingDTO } from '@/shared/types';
import { useNavigate } from '@tanstack/react-router';
import { GuestHouseIcon } from 'hugeicons-react';
import { useWishlist } from '../hooks';

export const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlists, isLoading, error, isError, refetch } = useWishlist();
  const handleClick = (property: ListingDTO) => {
    console.log('Navigating to viewing request for property:', property);
    navigate({
      to: ListingDetailsLinks.LISTING_DETAILS,
      state: { property: property },
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full rounded-[1.25em]" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      {wishlists.length === 0 ? (
        <div className="flex justify-center py-10 rounded-[1.25em] overflow-hidden">
          <div className="flex flex-col gap-6  h-[300px] w-[400px] lg:h-[500px] lg:w-[500px] items-center justify-center bg-sidebar-accent rounded-[15px]">
            <GuestHouseIcon className="size-[40px] text-black-500" />
            <h4 className="text-body-medium text-black-400">
              Wishlists added will be displayed here
            </h4>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10">
          {wishlists.map((wishlist) => (
            <PropertyCard
              property={wishlist}
              key={wishlist.id || wishlist.title}
              onClick={handleClick}
            />
          ))}
        </div>
      )}
    </>
  );
};
