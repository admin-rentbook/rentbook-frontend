import { GuestHouseIcon } from 'hugeicons-react';
import type { ComplexDTO } from '../../../types';

type ComplexCardProps = {
  complex: ComplexDTO;
  onComplexClick: (complexId: number, complexName: string) => void;
};

export const ComplexCard = ({ complex, onComplexClick }: ComplexCardProps) => {
  const getGridLayout = (count: number) => {
    if (count === 0) return 'grid-cols-1';
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-2';
    return 'grid-cols-2';
  };

  const getGridRows = (count: number) => {
    if (count <= 2) return 'grid-rows-1';
    if (count <= 4) return 'grid-rows-2';
    if (count <= 6) return 'grid-rows-3';
    if (count <= 8) return 'grid-rows-4';
    return 'auto-rows-fr';
  };

  const listingCount = complex.listings?.length || 0;

  return (
    <div
      className="flex flex-col gap-2 bg-white border border-custom-neutral-50 cursor-pointer hover:opacity-90 transition-opacity rounded-[1.25em] p-1"
      onClick={() => onComplexClick(complex.id as number, complex.name)}
    >
      <div className="relative w-full rounded-[1.25em] overflow-hidden aspect-[4/4]">
        {listingCount > 0 ? (
          <div
            className={`grid ${getGridLayout(listingCount)} ${getGridRows(listingCount)} h-full gap-1 rounded-[15px]`}
          >
            {complex.listings?.map((listing, index) => (
              <div
                key={listing.id || index}
                className="w-full h-full overflow-hidden"
              >
                <img
                  src={listing.title}
                  alt={`${listing.description} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center bg-sidebar-accent rounded-[15px]">
            <GuestHouseIcon className="size-[40px] text-black-500" />
          </div>
        )}
      </div>
      <div className="flex flex-col p-2">
        <h3 className="text-body text-black-500 truncate">
          {complex.name}
        </h3>
        <p className="text-body-xs text-black-400">{`${listingCount} listing${listingCount !== 1 ? 's' : ''}`}</p>
      </div>
    </div>
  );
};
