import { usePropertyInfoStore } from "@/core/store";
import { PropertyCard } from "@/features/landing-page/components/PropertyCard";
import { ListingDetailsLinks } from "@/features/listing-details/constants";
import type { ListingDTO } from "@/shared/types";
import { useNavigate } from "@tanstack/react-router";
import { GuestHouseIcon } from "hugeicons-react";

export const Waitlist = () =>{
 const waitlists = usePropertyInfoStore((s) => s.waitlist);
  const navigate = useNavigate();

  const handleClick = (property: ListingDTO) => {
    console.log('Navigating to viewing request for property:', property);
    navigate({
      to: ListingDetailsLinks.LISTING_DETAILS,
      state: { property: property },
    });
  };
  return (
    <>
      {waitlists.length === 0 ? (
        <div className="flex justify-center py-10 rounded-[1.25em] overflow-hidden aspect-[4/4]">
          <div className="flex flex-col gap-6 h-[500px] w-[500px] items-center justify-center bg-sidebar-accent rounded-[15px]">
            <GuestHouseIcon className="size-[40px] text-black-500" />
            <h4 className="text-body-medium text-black-400">
              Property added will be displayed here
            </h4>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10">
          {waitlists.map((wishlist) => (
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
}