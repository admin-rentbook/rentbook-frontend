import propertyImage from '@/assets/images/property-image.jpg';
import { ImageCarousel, Sheet } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { convertUnderscoreToSpace, squareMeterFormatter } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  Building06Icon,
  CancelCircleIcon,
  DashedLine02Icon,
} from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';
import type { ViewingType } from '../types';
import {
  CompletionCodeSection,
  DateTimeSection,
  MobileActionButtons,
  ViewerInfoSection,
  ViewingFeeSection,
} from './sections';

type ViewingDetailsProps = {
  viewing: ViewingType;
  isOpenDetails: boolean;
  setIsOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  onReschedule?: () => void;
  onCancel?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  isButtonDisabled?: boolean;
  form?: UseFormReturn<{
    completionCode: string;
  }>;
  onSubmit: (data: { completionCode: string }) => void;
};

export const ViewingDetails = ({
  viewing,
  isOpenDetails,
  setIsOpenDetails,
  onReschedule,
  onCancel,
  onAccept,
  // onDecline,
  onSubmit,
  form,
  isButtonDisabled,
}: ViewingDetailsProps) => {
  const { isMobile } = useMobile();
  const propItems = [
    {
      icon: Building06Icon,
      name: convertUnderscoreToSpace(viewing.listing.listing_type),
    },
    {
      icon: BedSingle02Icon,
      name: `${viewing.listing.bathrooms} bedrooms`,
    },
    {
      icon: Bathtub01Icon,
      name: `${viewing.listing.beds} bathrooms`,
    },
    {
      icon: DashedLine02Icon,
      name: squareMeterFormatter.format(viewing.listing.size_sqft),
    },
  ];

  const Content = (
    <div className="space-y-6 lg:space-y-8 pt-10 px-6 pb-6">
      <div className="space-y-4 lg:space-y-5">
        <div>
          <ImageCarousel
            images={[
              propertyImage,
              propertyImage,
              propertyImage,
              propertyImage,
            ]}
            alt={viewing.listing.title}
            showArrowsOnHover={true}
            imageClassName="w-full h-[217px] object-cover rounded-[1.25em]"
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-heading-3 text-neutral-600">
            {viewing.listing.title}
          </h2>
          <div className="flex gap-4 pt-1 flex-wrap">
            {propItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center gap-1.5 text-gray-700"
              >
                <item.icon className="size-4 text-black-400" />
                <span className="text-body-small text-black-500">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-body-small text-black-400">
            123 Independence Avenue Central Business District Windhoek
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-2">
          <DateTimeSection
            startDate={viewing.startDate}
            endDate={viewing.endDate}
            status={viewing.status}
            onCancel={onCancel}
          />

          <ViewingFeeSection
            amount={200}
            status={viewing.status}
            onReschedule={onReschedule}
            onAccept={onAccept}
          />
        </div>

        <MobileActionButtons
          status={viewing.status}
          onCancel={onCancel}
          onReschedule={onReschedule}
          onAccept={onAccept}
        />
      </div>

      {viewing.status === 'cancelled' && (
        <div className="flex flex-col gap-2 p-3 bg-sidebar-accent rounded-[1.25em]">
          <div className="flex gap-2 text-red-700">
            <CancelCircleIcon />
            <p className="text-body-medium">Cancelled</p>
          </div>
          <p className="text-body-small text-black-300">
            Viewing has been cancelled by you. Viewing fee N$200 has been
            refunded back to the viewer
          </p>

          <p className="text-body text-black-500 pt-4">
            Reason:{' '}
            <span className="text-body-small text-black-300">
              I will not be available anymore
            </span>
          </p>
        </div>
      )}

      <ViewerInfoSection viewer={viewing.viewer} />

      {form && viewing.status === 'upcoming' && (
        <CompletionCodeSection
          form={form}
          onSubmit={onSubmit}
          isButtonDisabled={isButtonDisabled || false}
        />
      )}
    </div>
  );
  return (
    <>
      <Sheet
        open={isOpenDetails}
        onOpenChange={setIsOpenDetails}
        children={Content}
        side={isMobile ? 'bottom' : 'right'}
        className="max-w-full lg:max-w-xl"
      />
    </>
  );
};
