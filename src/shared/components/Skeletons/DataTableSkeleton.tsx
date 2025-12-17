// components/skeletons/DataTableSkeleton.tsx
import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { useMobile } from '@/shared/hooks';

interface DataTableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const DataTableSkeleton = ({
  rows = 10,
  columns = 6,
}: DataTableSkeletonProps) => {

  const { isMobile } = useMobile();
  
  if (isMobile) {
    return <MobileTableSkeleton rows={rows} />;
  }

  return (
    <div className="hidden lg:block overflow-hidden rounded-md border border-custom-gray-100">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const MobileTableSkeleton = ({ rows = 10 }: { rows: number }) => {
  return (
    <div className="lg:hidden flex flex-col gap-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 border-b border-b-sidebar-border pb-2"
        >
          <div className="flex justify-between items-start">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-5 rounded" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-7 w-20 rounded-lg" />
            <Skeleton className="h-7 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
