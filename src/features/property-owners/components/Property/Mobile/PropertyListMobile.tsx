import type { PropertyDTO } from '@/features/property-owners/types/property';
import { returnPropertyStatusBadge } from '@/features/property-owners/utils';
import { Badge } from '@/shared/components';
import { cn } from '@/shared/lib/utils';
import { convertUnderscoreToSpace } from '@/shared/utils';
import type { Row } from '@tanstack/react-table';
import { ArrowRight01Icon, CircleIcon } from 'hugeicons-react';

type PropertyListMobileProps = {
  row: Row<PropertyDTO>;
};

export const PropertyListMobile = ({ row }: PropertyListMobileProps) => {
  const { bgColor, textColor, fillColor } = returnPropertyStatusBadge(
    row.original.approval_status ?? 'inactive'
  );
  return (
    <div className="flex flex-col gap-1 border-b border-b-sidebar-border pb-2">
      <div className="flex justify-between">
        <h5 className="text-body text-black-500">
          {row.original.property_name}
        </h5>
        <ArrowRight01Icon />
      </div>
      <p className="text-body-small text-black-400">
        {row.original.address.formatted_address}
      </p>
      <div className="flex gap-2">
        <Badge className="bg-custom-neutral-100  py-[6px] px-2 rounded-lg">
          <p className="text-body text-black-500">{`${0} listed`}</p>
        </Badge>
        <Badge className={`${bgColor}`}>
          <CircleIcon className={cn(`size-[7px] ${fillColor}`)} />
          {
            <span className={`text-body ${textColor}`}>
              {convertUnderscoreToSpace(row.original.approval_status)}
            </span>
          }
        </Badge>
      </div>
    </div>
  );
};
