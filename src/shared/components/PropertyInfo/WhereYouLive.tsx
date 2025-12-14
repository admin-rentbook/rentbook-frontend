import HouseIcon from '@/assets/icons/house-2.svg?react';
import { env } from '@/config';
import type { LocationResult } from '@/shared/types';
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';

type WhereYouLiveProps = {
  location: LocationResult;
};
export const WhereYouLive = ({ location }: WhereYouLiveProps) => {
  const position: google.maps.LatLngLiteral = {
    lat: location.lat,
    lng: location.lng,
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-heading text-black-500">Where you'll live</h2>
        <p className="text-body-base-normal text-black-300">
          {location.address}
        </p>
      </div>
      <div className="h-[300px] rounded-2xl">
        <Map
          mapId={env.GOOGLE_MAPS_MAP_ID}
          defaultZoom={15}
          center={position}
          gestureHandling="greedy"
          style={{ width: '100%', height: '100%' }}
        >
          <AdvancedMarker position={position} draggable={false}>
            <div className="grid place-items-center rounded-full bg-primary-500/10 size-[120px]">
              <div className="bg-primary-500 rounded-full flex items-center justify-center size-[46px]">
                <HouseIcon className="size-6 text-white" />
              </div>
            </div>
          </AdvancedMarker>
        </Map>
      </div>
    </div>
  );
};
