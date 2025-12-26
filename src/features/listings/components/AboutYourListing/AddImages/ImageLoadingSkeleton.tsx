export const ImageLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-4">
      {/* First large skeleton */}
      <div className="row-span-1 col-span-2">
        <div className="relative h-[200px] rounded-[1.25em] bg-gray-200 animate-pulse overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
      {/* Four smaller skeletons */}
      {[...Array(4)].map((_, index) => (
        <div key={`skeleton-${index}`} className="col-span-1 row-span-1">
          <div className="relative h-[200px] rounded-[1.25em] bg-gray-200 animate-pulse overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};