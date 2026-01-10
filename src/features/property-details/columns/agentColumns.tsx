import userImg from '@/assets/images/avatar.jpg';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  StatusBox,
} from '@/shared/components';
import { currencyFormatter, formatDateLong } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers/returnStatus';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';

export type AgentDTO = {
  id: number;
  agentName: string;
  agentEmail: string;
  agentAvatar?: string;
  listedUnits: number;
  amountEarned: number;
  dateCreated: string;
  status: 'active' | 'pending' | 'inactive';
};

const tableColumnHelper = createColumnHelper<AgentDTO>();

export const agentColumns: ColumnDef<AgentDTO, any>[] = [
  tableColumnHelper.accessor('agentName', {
    id: 'agentName',
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="flex gap-2 text-neutral-600 items-center">
          <Avatar className="size-8">
            <AvatarImage className="object-cover" src={userImg} />
            <AvatarFallback>{row.agentName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <p className="text-body">{info.getValue()}</p>
        </div>
      );
    },
    header: 'Agent',
  }),
  tableColumnHelper.accessor('listedUnits', {
    id: 'listedUnits',
    cell: (info) => <span className="text-body">{info.getValue()}</span>,
    header: 'Listed units',
  }),
  tableColumnHelper.accessor('amountEarned', {
    id: 'amountEarned',
    cell: (info) => (
      <span className="text-body">
        {currencyFormatter.format(info.getValue(), false)}
      </span>
    ),
    header: 'Total earned',
  }),
  tableColumnHelper.accessor('dateCreated', {
    id: 'dateCreated',
    cell: (info) => (
      <span className="text-body">{formatDateLong(info.getValue())}</span>
    ),
    header: 'Date added',
  }),
  tableColumnHelper.accessor('status', {
    id: 'status',
    cell: (info) => {
      const statusDetails = returnStatus(info.getValue());
      return (
        <StatusBox
          bgColor={statusDetails.bgColor}
          textColor={statusDetails.textColor}
          text={info.getValue()}
          fillColor={statusDetails.fillColor}
        />
      );
    },
    header: 'Status',
  }),
];
