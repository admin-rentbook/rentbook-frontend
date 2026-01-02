import { PropertyDetailsLinks } from '@/features/property-details';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft01Icon } from 'hugeicons-react';
import { ViewListingDetails } from './ViewListingDetails';

export const ViewListing = () => {
  const navigate = useNavigate({ from: '/properties/listing' });
  return (
    <div>
      <div className="border-b-gray-50 border-0 lg:border-b">
        <div className="flex items-center justify-between p-5">
          <div
            className="flex items-center gap-3  text-black-300 hover:cursor-pointer"
            onClick={() =>
              navigate({
                to: PropertyDetailsLinks.PROPERTY_DETAILS,
                search: (prev) => ({
                  listingId: prev.listingId,
                  propertyId: prev.propertyId,
                }),
              })
            }
          >
            <ArrowLeft01Icon className="size-4" />
            <p className="text-body">Properties / Listing</p>
          </div>
        </div>
      </div>
      <div className="px-3 lg:p-5 grid place-items-center">
        <div className='w-full md:max-w-lg'>
          <ViewListingDetails />
        </div>
      </div>
    </div>
  );
};
