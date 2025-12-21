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
  DashedLine02Icon,
  PencilEdit01Icon,
} from 'hugeicons-react';
import type { ViewingType } from '../types';
type ViewingCardProps = {
  viewing: ViewingType;
};

export const ViewingCard = ({ viewing }: ViewingCardProps) => {
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
    <div className="border border-custom-gray-100 rounded-[1.25em] p-3 grid grid-cols-[65%_35%]">
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
            <p className="text-body text-neutral-600">{viewing.agent.name}</p>
            <p className="hidden lg:block text-body-small text-black-300">
              {viewing.agent.email}
            </p>
          </div>
        </div>

        <div className="gap-2 hidden lg:flex pt-3 h-full items-end">
          <Button variant="outline" className="shadow-custom-sm" size="sm">
            <PencilEdit01Icon />
            Reschedule viewing
          </Button>
          <Button variant="outline" className="shadow-custom-sm" size="sm">
            <Cancel01Icon />
            Cancel viewing
          </Button>
        </div>
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
            <div className="flex gap-2 items-center">
              {items.map((item, index) => (
                <div key={index} className="flex gap-1 items-center text-white">
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
  );
};
