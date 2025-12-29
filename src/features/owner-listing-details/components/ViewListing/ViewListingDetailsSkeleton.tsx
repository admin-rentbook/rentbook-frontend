import { Skeleton } from '@/shared/components/ui/skeleton';

export const ViewListingDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 pb-10">
      {/* Image Carousel Skeleton */}
      <Skeleton className="w-full h-[400px] lg:h-[215px] xl:h-[300px] rounded-[1.25em]" />

      {/* Title and Price Skeleton */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 lg:gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-32 lg:block hidden" />
      </div>

      {/* Property Details Skeleton */}
      <div className="flex gap-3 lg:gap-6 flex-wrap">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center gap-1">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Location Skeleton */}
      <Skeleton className="h-4 w-48" />

      {/* Price on mobile Skeleton */}
      <Skeleton className="h-8 w-32 lg:hidden" />

      {/* Buttons Skeleton */}
      <div className="flex flex-col lg:flex-row gap-4 pt-4">
        <Skeleton className="h-10 w-full lg:w-1/2 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
};