import { Button, PropertyImage } from '@/shared/components';
import { Header } from '@/shared/components/Header';
import { useNavigate } from '@tanstack/react-router';
import { ListingLinks } from '../constants';

export const ListingsGetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <Header title="Create listing" onCancel={() => ({})} />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="flex flex-col gap-20">
          <PropertyImage />
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-heading-1 text-icons-black">
              Let’s create your listing
            </h1>
            <p className="text-heading-4 text-black-400 text-center">
              It’s easy to create your listings. Listings allow you to rent
              units under a<br /> property
            </p>
            <div className="flex justify-center">
              <Button
                className="px-8"
                onClick={() => navigate({ to: ListingLinks.LISTINGS })}
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
