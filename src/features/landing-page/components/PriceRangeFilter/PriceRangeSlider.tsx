import { Slider } from '@/shared/components/ui/slider';
import { useState, useEffect } from 'react';

type PriceRangeSliderProps = {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  onLocalChange?: (range: [number, number]) => void;
};

export const PriceRangeSlider = ({
  priceRange,
  setPriceRange,
  onLocalChange,
}: PriceRangeSliderProps) => {
  // Use local state for immediate UI updates
  const [localValue, setLocalValue] = useState(priceRange);

  // Sync with parent when priceRange changes externally
  useEffect(() => {
    setLocalValue(priceRange);
  }, [priceRange]);

  return (
    <div className="w-full lg:w-[400px] py-4">
      <Slider
        value={localValue}
        onValueChange={(value) => {
          const newValue = value as [number, number];
          setLocalValue(newValue);
          onLocalChange?.(newValue);
        }}
        onValueCommit={(value) => {
          setPriceRange(value as [number, number]);
        }}
        min={0}
        max={10000}
        step={50}
        sliderTrackClassName="bg-gray-200"
        sliderRangeClassName="bg-primary-500"
        sliderThumbClassName="size-6 bg-white border-[5px] border-primary-500 shadow-lg"
      />
    </div>
  );
};
