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
  mobileCardRender?: (row: Row<TData>) => React.ReactNode;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
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

  return (
    <div>
      <div className="hidden md:block overflow-hidden rounded-md">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={props.columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="md:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table
            .getRowModel()
            .rows.map((row) => (
              <div key={row.id}>
                {props.mobileCardRender ? (
                  props.mobileCardRender(row)
                ) : (
                  <DataCard row={row} columns={props.columns} />
                )}
              </div>
            ))
        ) : (
          <div className="text-center py-12 text-gray-500">No results.</div>
        )}
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
