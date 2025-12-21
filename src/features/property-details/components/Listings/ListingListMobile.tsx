import propImage from '@/assets/images/property-2.jpg';
import type { ListingDescriptionDTO } from '@/features/listings/types';
import { StatusBox } from '@/shared/components';
import type { Status } from '@/shared/constants';
import {
  convertUnderscoreToSpace,
  currencyFormatter,
  squareMeterFormatter,
} from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import type { Row } from '@tanstack/react-table';
import {
  ArrowRight01Icon,
  Bathtub01Icon,
  BedSingle02Icon,
  DashedLine02Icon,
} from 'hugeicons-react';

type ListingsListMobileProps = {
  row: Row<ListingDescriptionDTO>;
};

export const ListingListMobile = ({ row }: ListingsListMobileProps) => {
  const values = row.original;

  const items = [
    {
      value: `${values?.beds}`,
      icon: BedSingle02Icon,
    },
    {
      value: `${values?.bathrooms}`,
      icon: Bathtub01Icon,
    },
    {
      value: `${squareMeterFormatter.format(values?.size_sqft)}`,
      icon: DashedLine02Icon,
    },
  ];
  const { bgColor, textColor, fillColor } = returnStatus(
    values?.status as Status
  );

  return (
    <div className="flex flex-col gap-1 border-b border-b-sidebar-border pb-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img
            className="h-[50px] w-[40px] object-cover rounded-[12px]"
            src={propImage}
          />
          <div className="flex flex-col">
            <h5 className="text-body text-black-500">{values.title}</h5>
            <div className="flex gap-3">
              {items.map((item) => (
                <div className="flex gap-1 items-start text-icons-black">
                  {<item.icon className="size-4 text-black-400" />}
                  <p className="text-body-xs">{item.value}</p>
                </div>
              ))}
              <div className="flex gap-1 items-start text-icons-black">
                <p className="text-body-xs">
                  {convertUnderscoreToSpace(values.listing_type)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ArrowRight01Icon />
      </div>
      <div className="flex gap-3 items-center">
        <p className="text-body-small text-icons-black">
          {currencyFormatter.format(0, false)}/yr
        </p>
        <StatusBox
          bgColor={bgColor}
          textColor={textColor}
          text={convertUnderscoreToSpace(values.status)}
          fillColor={fillColor}
        />
      </div>
    </div>
  );
};
