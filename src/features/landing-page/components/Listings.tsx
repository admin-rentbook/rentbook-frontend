import { ArrowRight01Icon } from 'hugeicons-react';
import { propertyCards } from '../constants';
import { PropertyCard } from './PropertyCard';

export const Listings = () => {
  const handleClick = () => {
    console.log('click');
  };
  return (
    <div className="flex flex-col gap-3 justify-start">
      <div className="flex gap-4 items-center">
        <h3 className="text-heading-xl-semi text-black-500">
          Popular homes in Windhoek
        </h3>
        <ArrowRight01Icon className="size-5 text-black-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10">
        {propertyCards.map((card) => (
          <PropertyCard
            property={card}
            key={card.propertyName}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};
