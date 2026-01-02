import { Skeleton } from '../ui/skeleton';

export const PropertyInfoSkeleton = () => {
  return (
    <div className="h-full flex flex-col px-4 gap-6 md:px-6 lg:px-8 2xl:px-30 py-10">
      <div className="flex flex-col gap-4">
        {/* Action Buttons Skeleton */}
        <div className="flex gap-2 justify-end">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        {/* Image Grid Skeleton */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px]">
          {/* Large image */}
          <Skeleton className="col-span-2 row-span-2 rounded-2xl" />
          {/* Smaller images */}
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="rounded-2xl" />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[60%_40%] gap-4 pt-4 justify-between">
        <div className="flex flex-col gap-6">
          {/* Details Section */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-48" />
            <div className="flex gap-4 flex-wrap">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-6 w-24" />
              ))}
            </div>
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="h-[1px] w-full bg-custom-neutral-100" />

          {/* Exciting Features Section */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} className="h-10 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="h-[1px] w-full bg-custom-neutral-100" />

          {/* Where You Live Section */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-[300px] w-full rounded-2xl" />
          </div>

          <div className="h-[1px] w-full bg-custom-neutral-100" />
        </div>

        {/* Action Item Skeleton (JoinWaitlist) */}
        <div className="flex items-start justify-end">
          <Skeleton className="h-[300px] w-full max-w-md rounded-[1.25em]" />
        </div>
      </div>
    </div>
  );
};