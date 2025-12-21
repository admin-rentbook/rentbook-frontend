import propImage from '@/assets/images/property-2.jpg';
import type { ListingDescriptionDTO } from '@/features/listings/types';
import { StatusBox } from '@/shared/components';
import {
  convertUnderscoreToSpace,
  currencyFormatter,
  squareMeterFormatter,
} from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  DashedLine02Icon,
} from 'hugeicons-react';

const tableColumnHelper = createColumnHelper<ListingDescriptionDTO>();

export const listingColumns: ColumnDef<ListingDescriptionDTO, any>[] = [
  tableColumnHelper.accessor('title', {
    id: 'title',
    cell: (info) => {
      return (
        <div className="flex gap-2 text-neutral-600 items-center">
          <img className="h-[40px] w-[40px] object-cover" src={propImage} />
          <p>{info.getValue()}</p>
        </div>
      );
    },
    header: 'Name',
  }),
  tableColumnHelper.accessor('bathrooms', {
    id: 'address',
    cell: (info) => {
      const row = info.row.original;
      const items = [
        {
          value: `${row?.beds}`,
          icon: BedSingle02Icon,
        },
        {
          value: `${row?.bathrooms}`,
          icon: Bathtub01Icon,
        },
        {
          value: `${squareMeterFormatter.format(row?.size_sqft)}`,
          icon: DashedLine02Icon,
        },
      ];
      return (
        <div className="flex gap-2 items-center">
          {items.map((item) => (
            <div className="flex gap-1 items-start text-icons-black">
              {<item.icon className="size-4 text-black-400" />}
              <p className="text-body-xs">{item.value}</p>
            </div>
          ))}
        </div>
      );
    },
    header: 'Listing specification',
  }),
  tableColumnHelper.accessor('listing_type', {
    id: 'listing_type',
    cell: (info) => <span>{convertUnderscoreToSpace(info.getValue())}</span>,
    header: 'Listing type',
  }),
  // tableColumnHelper.accessor('amount', {
  //   id: 'amount',
  //   cell: (info) => (
  //     <span>{`${currencyFormatter.format(info.getValue(), false)}/yr`}</span>
  //   ),
  //   header: 'Rent',
  // }),
  tableColumnHelper.accessor('status', {
    id: 'status',
    cell: (info) => {
      const { bgColor, textColor, fillColor } = returnStatus(info.getValue());
      return (
        <>
          <StatusBox
            bgColor={bgColor}
            textColor={textColor}
            text={convertUnderscoreToSpace(info.getValue())}
            fillColor={fillColor}
          />
        </>
      );
    },
    header: 'Status',
  }),
];
