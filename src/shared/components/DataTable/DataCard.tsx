import { flexRender, type ColumnDef, type Row } from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  row: Row<TData>;
}

export const DataCard = <TData, TValue>({
  row,
  columns,
}: DataTableProps<TData, TValue>) => {
  return (
    <div className="border-b border-b-sidebar-border p-4 space-y-3 bg-white">
      {columns.map((_column, idx) => {
        const cell = row.getVisibleCells()[idx];
        return (
          <div key={cell.id} className="flex flex-col">
            <span className="text-sm text-gray-900">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </span>
          </div>
        );
      })}
    </div>
  );
};
