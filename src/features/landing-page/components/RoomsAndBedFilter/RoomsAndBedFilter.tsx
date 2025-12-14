import { Sheet } from '@/shared/components';
import { NavigationMenuComp } from '@/shared/components/NavigationMenu';
import { useMobile } from '@/shared/hooks';
import { Bathtub01Icon, BedSingle02Icon } from 'hugeicons-react';
import { Counter } from './Counter';

type RoomsAndBedFilterProps = {
  bedrooms: number;
  baths: number;
  setBedrooms: (count: number) => void;
  setBathrooms: (count: number) => void;
};

export const RoomsAndBedFilter = (props: RoomsAndBedFilterProps) => {
  const { isMobile } = useMobile();
  const Trigger = (
    <div className="flex gap-2 items-center text-body-medium text-black-500">
      <BedSingle02Icon className="size-5" />
      <p>Beds/Baths</p>
    </div>
  );

  const RoomsAndBedContent = () => (
    <div className="flex flex-col gap-6 px-4 pt-4 pb-8">
      <p className="text-body-medium text-black-500">Rooms and baths</p>
      <div className="flex flex-col gap-4">
        <Counter
          label="Bedrooms"
          IconComponent={BedSingle02Icon}
          onDecrement={() => props.setBedrooms(props.bedrooms - 1)}
          onIncrement={() => props.setBedrooms(props.bedrooms + 1)}
          value={props.bedrooms}
        />
        <Counter
          label="Bathrooms"
          IconComponent={Bathtub01Icon}
          onDecrement={() => props.setBathrooms(props.baths - 1)}
          onIncrement={() => props.setBathrooms(props.baths + 1)}
          value={props.baths}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return <Sheet trigger={Trigger} children={<RoomsAndBedContent />} />;
  }
  return (
    <NavigationMenuComp
      trigger={Trigger}
      className="w-600px"
      children={<RoomsAndBedContent />}
    />
  );
};
