'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  type Row,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { cn } from '@/shared/lib/utils';
import { Loading01Icon } from 'hugeicons-react';
import { DataTableSkeleton } from '../Skeletons';
import { DataCard } from './DataCard';
import { DataTablePagination } from './DataTablePagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pagination: PaginationState;
  pageCount?: number;
  totalItems?: number;
  isServerSide?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  emptyState?: React.ReactNode;
  mobileCardRender?: (row: Row<TData>) => React.ReactNode;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { isLoading = false, isFetching = false } = props;
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: props.setPagination,
    debugTable: true,
    state: {
      pagination: props.pagination,
    },
    manualPagination: props.isServerSide,
    pageCount: props.isServerSide ? props.pageCount : undefined,
  });

  const actualTotalItems = props.totalItems ?? props.data.length;

  if (isLoading) {
    return (
      <DataTableSkeleton
        rows={props.pagination.pageSize}
        columns={props.columns.length}
      />
    );
  }

  if (props.data.length === 0 && !isFetching) {
    return (
      props.emptyState || (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-body text-muted-foreground">No data available</p>
        </div>
      )
    );
  }

  return (
    <div className="relative">
      {isFetching && (
        <div className="absolute top-2 right-2 z-10">
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            <Loading01Icon className="h-3 w-3 animate-spin text-primary" />
            <span className="text-body-xs text-primary">Updating...</span>
          </div>
        </div>
      )}
      <div
        className={cn(
          'hidden lg:block overflow-hidden rounded-md',
          isFetching && 'opacity-70 pointer-events-none'
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="max-w-[150px] truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div
        className={cn(
          'lg:hidden space-y-4',
          isFetching && 'opacity-70 pointer-events-none'
        )}
      >
        {table.getRowModel().rows.map((row) => (
          <div key={row.id}>
            {props.mobileCardRender ? (
              props.mobileCardRender(row)
            ) : (
              <DataCard row={row} columns={props.columns} />
            )}
          </div>
        ))}
      </div>
      <DataTablePagination
        table={table}
        actualTotalItems={actualTotalItems}
        pageCount={props.pageCount ?? 0}
        isServerSide={props.isServerSide ?? false}
        pagination={props.pagination}
        setPagination={props.setPagination}
      />
    </div>
  );
}
