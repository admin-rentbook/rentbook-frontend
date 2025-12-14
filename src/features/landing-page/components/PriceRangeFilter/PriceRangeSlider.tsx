import { Slider } from '@/shared/components/ui/slider';
import { cn } from '@/shared/lib/utils';

type PriceRangeSliderProps = {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
};
export const PriceRangeSlider = ({
  priceRange,
  setPriceRange,
}: PriceRangeSliderProps) => {
  return (
    <div className="relative h-30 mb-6 w-full lg:w-[400px]">
      <div className="absolute inset-0 flex items-end justify-between gap-[1px]">
        {Array.from({ length: 30 }).map((_, i) => {
          const heights = [
            12, 15, 18, 22, 28, 35, 42, 48, 55, 62, 40, 72, 90, 76, 80, 82, 85,
            88, 90, 92, 94, 95, 40, 97, 75, 43, 97, 80, 86, 43, 90, 87, 83, 78,
            72, 65, 58, 50, 42, 35, 28, 22, 18, 15, 12, 10, 8, 7, 6, 5, 4, 3, 3,
            2, 2, 1, 1, 1, 1, 1,
          ];

          // Add some randomness to make it more natural
          const baseHeight = heights[i] || 5;
          const variation = (Math.random() - 0.5) * 8;
          const height = Math.max(5, Math.min(100, baseHeight + variation));

          // Check if bar is in selected range
          const position = (i / 30) * 10000;
          const isInRange =
            position >= priceRange[0] && position <= priceRange[1];

          return (
            <div
              key={i}
              className={cn(
                'flex-1 rounded-t-[2px] transition-all duration-150',
                isInRange ? 'bg-primary-500' : 'bg-gray-300/60'
              )}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Slider overlay positioned at bottom */}
      <div className="absolute -inset-x-4 -bottom-0 px-3">
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={10000}
          step={50}
          sliderThumbClassName="relative size-6 bg-white  border-[5px] border-primary-500 shadow-lg before:rounded-full before:bg-primary-500"
        />
      </div>
    </div>
  );
};
