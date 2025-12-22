import { Links } from '@/features/property-owners/constants';
import { Button, PropertyImage } from '@/shared/components';
import { Header } from '@/shared/components/Header';
import { useNavigate } from '@tanstack/react-router';
import { ListingLinks } from '../constants';

export const ListingsGetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <Header
        title="Create listing"
        onCancel={() => navigate({ to: Links.CREATE_PROPERTY })}
      />

      <div className="flex flex-col justify-center items-center h-[calc(100%-68px)]">
        <div className="flex flex-col gap-10 justify-center lg:gap-20 items-center h-full lg:h-auto">
          <PropertyImage />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col  gap-4">
              <h1 className="text-heading-1 text-center text-icons-black">
                Let’s create your listing
              </h1>
              <p className="text-heading-4 text-black-400 text-center">
                It’s easy to create your listings. Listings allow you to rent
                units under a<br /> property
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-6 w-full lg:w-auto px-4">
          <Button
            className="px-8 w-full"
            onClick={() =>
              navigate({
                to: ListingLinks.LISTINGS,
                search: (prev) => ({
                  propertyId: prev.propertyId,
                }),
              })
            }
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
};
