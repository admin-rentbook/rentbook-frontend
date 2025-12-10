import { GuestHouseIcon } from 'hugeicons-react';
import type { BlockDTO } from '../../../types';

type BlockProps = {
  block: BlockDTO;
  onBlockClick: (blockId: number, blockName: string) => void;
  
};

export const Block = (props: BlockProps) => {
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
  return (
    <div
      className="flex flex-col gap-2 bg-white border border-custom-neutral-50 cursor-pointer hover:opacity-90 transition-opacity rounded-[1.25em] p-1"
      onClick={() => props.onBlockClick(props.block.id, props.block.blockName)}
    >
      <div className="relative w-full rounded-[1.25em] overflow-hidden aspect-[4/4]">
        {props.block.listings.length > 0 ? (
          <div
            className={`grid ${getGridLayout(props.block.listings.length)} ${getGridRows(props.block.listings.length)} h-full gap-1 rounded-[15px]`}
          >
            {props.block.listings.map((listing, index) => (
              <div
                key={listing.listingTitle}
                className="w-full h-full overflow-hidden"
              >
                <img
                  src={listing.images?.[0]}
                  alt={`${listing.listingDescription} ${index + 1}`}
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
          {props.block.blockName}
        </h3>
        <p className="text-body-xs text-black-400">{`${props.block.listings.length} listings`}</p>
      </div>
    </div>
  );
};
