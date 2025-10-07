import { env } from '@/config';
import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
export const MapComponent = () => {

  const [open, setIsOpen] = useState(false);

  type LatLng = { lat: number; lng: number };

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error('Geolocation error:', err);
          // fallback if permission denied
          setUserLocation({ lat: 6.5244, lng: 3.3792 }); // Lagos
        }
      );
    } else {
      // browser doesn't support geolocation
      setUserLocation({ lat: 6.5244, lng: 3.3792 }); // fallback
    }
  }, []);

  if (!userLocation) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        Loading map…
      </div>
    );
  }
  return (
    <div className="h-screen w-screen">
      <Map
        defaultCenter={userLocation}
        zoom={12}
        mapId={env.GOOGLE_MAPS_MAP_ID}
      >
        <AdvancedMarker position={userLocation} onClick={() => setIsOpen(true)}>
          <Pin />
        </AdvancedMarker>
        {open && (
          <InfoWindow position={userLocation} onCloseClick={() => setIsOpen(false)}>
            <p>I am in hamburg</p>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};
