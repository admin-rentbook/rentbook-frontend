import userImg from '@/assets/images/avatar.jpg';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  StatusBox,
} from '@/shared/components';
import { currencyFormatter } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import type { Row } from '@tanstack/react-table';
import { ArrowRight01Icon } from 'hugeicons-react';
import type { AgentDTO } from '../../columns/agentColumns';

type AgentListMobileProps = {
  row: Row<AgentDTO>;
};

export const AgentListMobile = ({ row }: AgentListMobileProps) => {
  const values = row.original;

  const { bgColor, textColor, fillColor } = returnStatus(values.status);

  return (
    <div className="flex flex-col border-b border-b-sidebar-border pb-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar className="size-8">
            <AvatarImage className="object-cover" src={userImg} />
            <AvatarFallback>{values.agentName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h5 className="text-body text-black-500">{values.agentName}</h5>
        </div>
        <ArrowRight01Icon />
      </div>

      <div className="flex gap-4 items-center mt-1">
        <p className="text-body-small text-black-500">
          {currencyFormatter.format(values.amountEarned, false)}
        </p>
        <StatusBox
          bgColor={bgColor}
          textColor={textColor}
          text={values.status}
          fillColor={fillColor}
        />
      </div>
    </div>
  );
};
