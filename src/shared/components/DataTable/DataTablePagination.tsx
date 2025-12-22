import { type PaginationState, type Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/shared/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { usePagination } from '@/shared/hooks/usePagination';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  actualTotalItems: number;
  pageCount: number;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  isServerSide: boolean;
  isLoading?: boolean;
}

export function DataTablePagination<TData>(
  props: DataTablePaginationProps<TData>
) {
  const {
    startItem,
    endItem,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(
    props.isServerSide,
    props.pagination,
    props.setPagination,
    props.actualTotalItems,
    props.table,
    props.pageCount
  );
  const handlePageSizeChange = (newPageSize: number) => {
    props.setPagination({
      pageIndex: 1,
      pageSize: newPageSize,
    });
  };

  return (
    <>
      {/* Desktop Pagination */}
      <div className="hidden md:flex items-center justify-between bg-primary-foreground px-5 py-2 rounded-xl">
        <div className="text-body text-black-500 flex-1">
          {`${props.actualTotalItems} results found`}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-body text-black-400">Rows per page</p>
            <Select
              value={`${props.table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                handlePageSizeChange(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={props.table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-body text-black-400">
            {props.actualTotalItems > 0
              ? `${startItem}-${endItem} of ${props.actualTotalItems}`
              : '0-0 of 0'}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              onClick={goToFirstPage}
              disabled={props.pagination.pageIndex === 1 || props.isLoading}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              onClick={goToPreviousPage}
              disabled={props.pagination.pageIndex === 1 || props.isLoading}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              onClick={goToNextPage}
              disabled={
                props.pagination.pageIndex === props.pageCount ||
                props.isLoading
              }
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              onClick={goToLastPage}
              disabled={
                props.pagination.pageIndex === props.pageCount ||
                props.isLoading
              }
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Pagination */}
      <div className="flex md:hidden flex-col space-y-3 bg-primary-foreground px-4 py-3 rounded-xl">
        {/* Results count and page size selector */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-black-500">
            {props.actualTotalItems > 0
              ? `${startItem}-${endItem} of ${props.actualTotalItems}`
              : '0 results'}
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-black-400">Show</p>
            <Select
              value={`${props.table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                handlePageSizeChange(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[60px]">
                <SelectValue
                  placeholder={props.table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            className="size-9"
            onClick={goToPreviousPage}
            disabled={props.pagination.pageIndex === 1 || props.isLoading}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-black-400 min-w-[80px] text-center">
            Page {props.table.getState().pagination.pageIndex} of{' '}
            {props.table.getPageCount() || 1}
          </div>
          <Button
            variant="outline"
            className="size-9"
            onClick={goToNextPage}
            disabled={!props.table.getCanNextPage() || props.isLoading}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
