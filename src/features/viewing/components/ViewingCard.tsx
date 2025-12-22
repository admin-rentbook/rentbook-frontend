import agentImg from '@/assets/images/avatar.jpg';
import propImg from '@/assets/images/property-6.jpg';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@/shared/components';
import { currencyFormatter, squareMeterFormatter } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  Cancel01Icon,
  CheckmarkBadge01Icon,
  DashedLine02Icon,
  PencilEdit01Icon,
} from 'hugeicons-react';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { ViewingType } from '../types';
import { ViewingDetails } from './ViewingDetails';

type ViewingCardProps = {
  viewing: ViewingType;
  onReschedule?: () => void;
  onCancel?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  form?: UseFormReturn<{
    completionCode: string;
  }>;
  onSubmit: (data: { completionCode: string }) => void;
  isButtonDisabled?:boolean
};

export const ViewingCard = ({
  viewing,
  onReschedule,
  onCancel,
  onAccept,
  onDecline,
  onSubmit,
  form,
  isButtonDisabled = false
}: ViewingCardProps) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const items = [
    {
      value: `${viewing.listing?.beds}`,
      icon: BedSingle02Icon,
    },
    {
      value: `${viewing.listing?.bathrooms}`,
      icon: Bathtub01Icon,
    },
    {
      value: `${squareMeterFormatter.format(viewing.listing?.size_sqft)}`,
      icon: DashedLine02Icon,
    },
  ];
  return (
    <>
      <div
        className="border border-custom-gray-100 hover:cursor-pointer rounded-[1.25em] p-3 grid grid-cols-[65%_35%]"
        onClick={() => setIsOpenDetails(true)}
      >
        <div className="flex flex-col gap-3">
          <p className="text-body-medium text-black-300">
            {`${viewing.startDate}-${viewing.endDate}`}
          </p>
          <h4 className="text-neutral-600 text-body-medium lg:text-heading-3">
            {`Viewing at ${viewing.listing.title}, premium apartments`}
          </h4>
          <div className="flex gap-2 items-center">
            <Avatar className="size-[50px]">
              <AvatarImage className="object-cover" src={agentImg} />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-body text-neutral-600">
                {viewing.viewer.name}
              </p>
              <p className="hidden lg:block text-body-small text-black-300">
                {viewing.viewer.email}
              </p>
            </div>
          </div>

          {viewing.status === 'upcoming' && (
            <div className="gap-2 hidden lg:flex pt-3 h-full items-end">
              <Button
                variant="outline"
                className="shadow-custom-sm"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onReschedule?.();
                }}
              >
                <PencilEdit01Icon />
                Reschedule viewing
              </Button>
              <Button
                variant="outline"
                className="shadow-custom-sm"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel?.();
                }}
              >
                <Cancel01Icon />
                Cancel viewing
              </Button>
            </div>
          )}

          {viewing.status === 'unconfirmed' && (
            <div className="gap-2 hidden lg:flex pt-3 h-full items-end">
              <Button
                variant="outline"
                className="shadow-custom-sm"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept?.();
                }}
              >
                <CheckmarkBadge01Icon />
                Accept viewing
              </Button>
              <Button
                variant="outline"
                className="shadow-custom-sm"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDecline?.();
                }}
              >
                <Cancel01Icon />
                Decline viewing
              </Button>
            </div>
          )}
        </div>

        {/*prop details*/}
        <div className="relative">
          <img
            src={propImg}
            className="object-cover rounded-[1.25em] max-h-[230px] h-3/4 lg:h-auto w-full"
          />
          <div className="absolute hidden  bottom-0 left-0 right-0 lg:flex flex-col gap-2 text-white p-3 bg-gradient-to-t from-black/60 to-transparent rounded-b-[1.25em]">
            <p className="text-body-medium">{viewing.listing.title}</p>
            <p className="text-body-small">Windoek, Khomas Region</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center flex-wrap">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-1 items-center text-white"
                  >
                    {<item.icon className="size-4 text-white" />}
                    <p className="text-body-small text-body-medium">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p>{currencyFormatter.format(20000, false)}/yr</p>
            </div>
          </div>
        </div>
      </div>
      <ViewingDetails
        viewing={viewing}
        isOpenDetails={isOpenDetails}
        setIsOpenDetails={setIsOpenDetails}
        onReschedule={onReschedule}
        onCancel={onCancel}
        onAccept={onAccept}
        onDecline={onDecline}
        form={form}
        onSubmit={onSubmit}
        isButtonDisabled={isButtonDisabled}
      />
    </>
  );
};
