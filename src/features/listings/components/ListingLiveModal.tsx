import propImg from '@/assets/images/property-6.jpg';
import { Button, DialogComponent, Sheet } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import type { ListingDTO } from '@/shared/types';
import { formatNamibianDollar, squareMeterFormatter } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  DashedLine02Icon,
  Share08Icon,
} from 'hugeicons-react';

type ListingLiveModalProps = {
  listing: ListingDTO;
  modalOptions: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
  onShareListing?: () => void;
};

export const ListingLiveModal = ({
  listing,
  modalOptions,
  onShareListing,
}: ListingLiveModalProps) => {
  const { isMobile } = useMobile();
  const { symbol, amount } = formatNamibianDollar(listing.amount);

  const items = [
    {
      value: `${listing.beds}`,
      icon: BedSingle02Icon,
    },
    {
      value: `${listing.bathrooms}`,
      icon: Bathtub01Icon,
    },
    {
      value: `${squareMeterFormatter.format(listing.size_sqft)}`,
      icon: DashedLine02Icon,
    },
  ];

  const content = (
    <div className="flex flex-col">
      <div className="h-full flex flex-col p-10 lg:p-12 relative overflow-hidden">
        <div className="absolute inset-0 p-4 lg:p-8">
          <div className="h-[300px] lg:h-[200px] lg:w-[440px] rounded-[1.25em] overflow-hidden opacity-50 blur-[200px] bg-gradient-to-b from-primary-500 to-warning-600" />
        </div>

        <div className="relative h-[300px] lg:h-[200px] lg:w-[440px] rounded-[1.25em] overflow-hidden z-10">
          <img
            src={listing.images[0] as string || propImg}
            alt={listing.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 text-white p-4 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-body-medium lg:text-heading-4">
              {listing.title}
            </p>
            <p className="text-body-small lg:text-body">{listing.location}</p>
            <div className="flex items-center gap-6">
              <div className="flex gap-2 items-center flex-wrap">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-1 items-center text-white"
                  >
                    <item.icon className="size-4 text-white" />
                    <p className="text-body-small lg:text-body-medium">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-body-medium lg:text-heading-5">
                {symbol}
                {amount}/mo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 lg:p-8 flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-3 items-center text-center">
          <h3 className="text-heading-xl text-black-500">
            Your listing is now live
          </h3>
          <p className="text-body-medium lg:text-body-medium text-black-400">
            Show off your listing to renters
          </p>
        </div>
        <Button onClick={onShareListing} className="w-auto" size="sm">
          <Share08Icon className="size-5" />
          Share listing
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Sheet
          open={modalOptions.open}
          onOpenChange={modalOptions.onOpenChange}
          className="pt-0 max-h-[60vh] rounded-t-[1.25em] overflow-hidden"
        >
          {content}
        </Sheet>
      ) : (
        <DialogComponent
          open={modalOptions.open}
          onOpenChange={modalOptions.onOpenChange}
          className="max-w-2xl p-0 overflow-hidden"
        >
          {content}
        </DialogComponent>
      )}
    </>
  );
};
