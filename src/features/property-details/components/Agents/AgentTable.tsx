import { DataTable } from '@/shared/components';
import { EmptyState } from '@/shared/components/EmptyState';
import type { PaginationState } from '@tanstack/react-table';
import type { AgentDTO, agentColumns } from '../../columns/agentColumns';
import { AgentListMobile } from './AgentListMobile';

type AgentTableProps = {
  agents: AgentDTO[];
  columns: typeof agentColumns;
  isLoading?: boolean;
  isFetching?: boolean;
  searchTerm: string;
  reset: () => void;
  pagination?: PaginationState;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  onRowAction?: (agent: AgentDTO) => void;
};

export const AgentTable = ({
  agents,
  columns,
  isLoading = false,
  isFetching = false,
  searchTerm,
  reset,
  pagination = { pageIndex: 0, pageSize: 10 },
  setPagination = () => {},
  onRowAction,
}: AgentTableProps) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={agents || []}
        totalItems={agents.length}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={isLoading}
        isFetching={isFetching}
        mobileCardRender={(row) => <AgentListMobile row={row} />}
        onRowAction={onRowAction}
        emptyState={
          <EmptyState
            title="No Agents found"
            description={
              searchTerm
                ? `No agents matching "${searchTerm}"`
                : 'No agents at the moment'
            }
            actionLabel="Clear Search"
            onAction={reset}
          />
        }
      />
    </div>
  );
};