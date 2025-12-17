import type { PaginationState, Table } from '@tanstack/react-table';

export const usePagination = <TData>(
  isServerSide: boolean,
  pagination: PaginationState,
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>,
  actualTotalItems: number,
  table: Table<TData>,
  pageCount: number
) => {
  const currentPage = pagination.pageIndex;
  const pageSize = pagination.pageSize;

  let startItem: number;
  let endItem: number;
  let totalPages: number;

  if (isServerSide) {
    startItem = (currentPage - 1) * pageSize + 1;
    endItem = Math.min(startItem + pageSize - 1, actualTotalItems);
    totalPages = pageCount || Math.ceil(actualTotalItems / pageSize);
  } else {
    const paginationRows = table.getRowModel().rows;
    totalPages = table.getPageCount();

    if (paginationRows.length > 0) {
      startItem = currentPage * pageSize + 1;
      endItem = Math.min(
        startItem + paginationRows.length - 1,
        actualTotalItems
      );
    } else {
      startItem = 0;
      endItem = 0;
    }
  }

  const goToFirstPage = () => {
    if (pagination.pageIndex > 1) {
      setPagination((prev) => ({ ...prev, pageIndex: 1 }));
    }
  };

  const goToPreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.max(prev.pageIndex - 1, 1),
    }));
  };

  const goToNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.min(prev.pageIndex + 1, pageCount),
    }));
  };

  const goToLastPage = () => {
    if (pagination.pageIndex < pageCount) {
      setPagination((prev) => ({ ...prev, pageIndex: pageCount }));
    }
  };
  return {
    startItem,
    endItem,
    totalPages,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  };
};
