import { Sheet } from '@/shared/components';
import { NavigationMenuComp } from '@/shared/components/NavigationMenu';
import { useMobile } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { currencyFormatter } from '@/shared/utils';
import { DollarCircleIcon } from 'hugeicons-react';
import { useState, useCallback, useMemo } from 'react';
import { PriceRangeSlider } from './PriceRangeSlider';

type PriceRangeFilterProps = {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
};

export const PriceRangeFilter = ({
  priceRange,
  setPriceRange,
}: PriceRangeFilterProps) => {
  const { isMobile } = useMobile();
  const [displayRange, setDisplayRange] = useState(priceRange);

  const handleLocalChange = useCallback((range: [number, number]) => {
    setDisplayRange(range);
  }, []);

  const Trigger = useMemo(
    () => (
      <div className="flex gap-2 items-center text-body-medium text-black-500">
        <DollarCircleIcon className="size-5" />
        <p>Price</p>
      </div>
    ),
    []
  );

  const PriceRangeFilterContent = useMemo(
    () => (
      <div className="flex flex-col gap-6 px-4 pt-4 pb-8">
        <p className="text-body-medium text-black-500">Price range</p>
        <div className="flex flex-col gap-4">
          <PriceRangeSlider
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onLocalChange={handleLocalChange}
          />

          <div className="flex items-center justify-between gap-20">
            <div className="flex flex-col gap-2 items-center">
              <span className="text-caption text-black-300">Minimum</span>
              <div className="text-caption text-black-300 border border-custom-gray-300 px-4 py-2 rounded-full">
                {currencyFormatter.format(displayRange[0])}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-caption text-black-300">Maximum</span>
              <div className="text-caption text-black-300 border border-custom-gray-300 px-4 py-2 rounded-full">
                {currencyFormatter.format(displayRange[1])}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [priceRange, setPriceRange, handleLocalChange, displayRange]
  );

  if (isMobile) {
    return (
      <Sheet
        trigger={Trigger}
        children={PriceRangeFilterContent}
        triggerClassName={cn(
          'bg-sidebar p-3 hover:bg-accent hover:text-accent-foreground rounded-full'
        )}
        className="max-h-[60vh] rounded-t-2xl"
      />
    );
  }
  return (
    <NavigationMenuComp trigger={Trigger} children={PriceRangeFilterContent} />
  );
};
