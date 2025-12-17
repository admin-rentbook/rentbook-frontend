import { Skeleton } from '@/shared/components/ui/skeleton';

export const FilterHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="w-2/3 lg:w-1/5">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="w-32">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
};
