import { Badge } from '@/shared/components';
import { cn } from '@/shared/lib/utils';
import { convertUnderscoreToSpace } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { CircleIcon } from 'hugeicons-react';
import type { PropertyDTO } from '../types/property';

const tableColumnHelper = createColumnHelper<PropertyDTO>();

export const propertyColumns: ColumnDef<PropertyDTO, any>[] = [
  tableColumnHelper.accessor('property_name', {
    id: 'property_name',
    cell: (info) => <span className="text-neutral-600">{info.getValue()}</span>,
    header: 'Property name',
  }),
  tableColumnHelper.accessor('address.formatted_address', {
    id: 'address',
    cell: (info) => (
      <span className="font-normal text-custom-neutral-500">
        {info.getValue()}
      </span>
    ),
    header: 'Address',
  }),
  tableColumnHelper.accessor('updated_at', {
    id: 'unit',
    cell: () => {
      return (
        <Badge className="bg-custom-neutral-100 text-custom-neutral-900 py-[6px] px-2 rounded-lg">
          {`${0} listed`}
        </Badge>
      );
    },
    header: 'Units',
  }),
  tableColumnHelper.accessor('approval_status', {
    id: 'approval_status',
    cell: (info) => {
      const { bgColor, textColor, fillColor } = returnStatus(info.getValue());
      return (
        <Badge className={`${bgColor} ${textColor}`}>
          <CircleIcon
            className={cn(`size-[7px] ${fillColor}`)}
            style={{ height: '7px', width: '7px' }}
          />
          {<span>{convertUnderscoreToSpace(info.getValue())}</span>}
        </Badge>
      );
    },
    header: 'Status',
  }),
];
