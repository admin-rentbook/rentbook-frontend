import { Card, CardContent, Skeleton } from '@/shared/components';

export const ListingSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-[1.25em] bg-white h-auto flex flex-col">
      <CardContent className="p-1 flex flex-col h-full gap-2 rounded-[1.25em]">
        {/* Image skeleton */}
        <Skeleton className="w-full h-48 rounded-2xl" />

        {/* Content skeleton */}
        <div className="flex px-2 py-1 justify-between items-end pr-5">
          <div className="space-y-2 flex-1">
            {/* Title skeleton */}
            <Skeleton className="h-5 w-3/4" />

            {/* Location skeleton */}
            <Skeleton className="h-4 w-1/2" />

            {/* Property items skeleton */}
            <div className="flex gap-4 pt-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-3 w-6" />
                </div>
              ))}
            </div>
          </div>

          {/* Price skeleton */}
          <Skeleton className="h-5 w-20" />
        </div>
      </CardContent>
    </Card>
  );
};