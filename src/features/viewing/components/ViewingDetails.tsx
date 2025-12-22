import agentImg from '@/assets/images/avatar.jpg';
import propertyImage from '@/assets/images/property-image.jpg';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ImageCarousel,
  Sheet,
} from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useMobile } from '@/shared/hooks';
import {
  convertUnderscoreToSpace,
  currencyFormatter,
  squareMeterFormatter,
} from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  Building06Icon,
  Call02Icon,
  Cancel01Icon,
  CheckmarkBadge01Icon,
  CheckmarkCircle01Icon,
  DashedLine02Icon,
  Flag02Icon,
  Mail02Icon,
  Money03Icon,
  PencilEdit01Icon,
} from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';
import type { ViewingType } from '../types';

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
    <div className="space-y-6 lg:space-y-8 pt-10">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/**part 1 */}
        <div className="flex flex-col gap-8">
          <div className="flex items-start space-x-3">
            <div className="size-[54px] flex flex-col justify-center rounded-[12px] border border-custom-neutral-100/40 bg-white flex-shrink-0">
              <div className="flex justify-center rounded-t-[12px] bg-custom-neutral-50/50 h-[30%]">
                <p className="text-11 text-black-300/50">Nov</p>
              </div>
              <div className="flex items-end justify-center h-[70%]">
                <p className="text-heading-lg">17</p>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-heading-lg text-black-500">
                17 Nov <span className="text-black-300/50">Monday</span>
              </p>
              <p className="text-body-medium text-black-400">
                {`${viewing.startDate}-${viewing.endDate}`}
              </p>
            </div>
          </div>
          {(viewing.status === 'upcoming' ||
            viewing.status === 'unconfirmed') && (
            <Button
              variant="outline"
              size="lg"
              className="w-full shadow-custom-sm"
              onClick={onCancel}
            >
              <Cancel01Icon />
              {viewing.status === 'upcoming'
                ? 'Cancel viewing'
                : 'Decline viewing'}
            </Button>
          )}
        </div>

        {/**part 2 */}
        <div className="flex flex-col gap-8">
          <div className="flex items-start space-x-3">
            <div className="size-[54px] grid place-items-center rounded-[12px] border border-custom-neutral-100/40 bg-white flex-shrink-0">
              <Money03Icon className="size-6 text-icons-black" />
            </div>
            <div className="flex-1">
              <p className="text-heading-lg text-black-500">
                {currencyFormatter.format(200, false)}/viewer
              </p>
              <p className="text-body-medium text-black-300">Viewing fee</p>
            </div>
          </div>
          {viewing.status === 'upcoming' && (
            <Button
              variant="outline"
              size="lg"
              className="w-full shadow-custom-sm"
              onClick={(e) => {
                e.stopPropagation();
                onReschedule?.();
              }}
            >
              <PencilEdit01Icon />
              Reschedule viewing
            </Button>
          )}
          {viewing.status === 'unconfirmed' && (
            <Button
              variant="outline"
              size="lg"
              className="w-full shadow-custom-sm"
              onClick={onAccept}
            >
              <CheckmarkBadge01Icon />
              Accept viewing
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-body-sm-semi text-black-300">Viewer</p>

        <div className="h-[1px] w-full bg-custom-neutral-100" />

        <div className="flex gap-3 items-center justify-between pb-3">
          <div className="flex gap-3 items-center">
            <Avatar className="size-[50px]">
              <AvatarImage className="object-cover" src={agentImg} />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-body text-neutral-600">
                {viewing.viewer.name}
              </p>
              <p className="text-body-small text-black-300">
                {viewing.viewer.email}
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            {contactItems.map((contact) => (
              <div
                key={contact.name}
                className="size-[45px] grid place-items-center rounded-full border border-custom-gray-300 hover:bg-custom-neutral-50 transition-colors cursor-pointer"
              >
                <contact.icon className="size-5 text-black-400" />
              </div>
            ))}
          </div>
        </div>

        {form && (
          <Form form={form} onSubmit={onSubmit}>
            <div className="border border-custom-gray-300 p-3 space-y-5 rounded-3xl">
              <p className="text-body-small text-black-300">
                Enter complete code given by the renter to indicate that viewing
                has been completed
              </p>
              <FormInput
                control={form.control}
                name="completionCode"
                label="Completion code"
                showErrorMessage
                size="sm"
              />
              <div className="pt-3">
                <Button
                  size="lg"
                  className="w-full"
                  disabled={isButtonDisabled}
                >
                  <CheckmarkCircle01Icon />
                  Complete viewing
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
  return (
    <>
      <Sheet
        open={isOpenDetails}
        onOpenChange={setIsOpenDetails}
        children={Content}
        side={isMobile ? 'bottom' : 'right'}
        className="max-w-full lg:max-w-xl p-6"
      />
    </>
  );
};

const contactItems = [
  {
    name: 'Phone',
    icon: Call02Icon,
  },
  {
    name: 'Message',
    icon: Mail02Icon,
  },
  {
    name: 'Report',
    icon: Flag02Icon,
  },
];
