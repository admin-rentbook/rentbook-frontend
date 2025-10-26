import { useCallback, useState } from 'react';
import type { LocationResult } from '../types';

interface UseCurrentLocationReturn {
  getCurrentLocation: () => Promise<LocationResult>;
  getAddressForLocation: (lat: number, lng: number) => Promise<LocationResult>;
  loading: boolean;
  error: string | null;
  location: LocationResult | null;
  handleGetAddress: () => Promise<void>;
  handleCurrentLocation: () => Promise<void>;
  showAddressOption: boolean;
}

type UseCurrentLocationProps = {
  setIsOpenPopover?: React.Dispatch<React.SetStateAction<boolean>>;
};
export function useCurrentLocation({
  setIsOpenPopover,
}: UseCurrentLocationProps = {}): UseCurrentLocationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationResult | null>(null);

  // Step 1: Get coordinates only (FREE)
  const getCurrentLocation = useCallback(async (): Promise<LocationResult> => {
    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = 'Geolocation is not supported';
        setError(errorMsg);
        setLoading(false);
        reject(new Error(errorMsg));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const locationData: LocationResult = {
            lat,
            lng,
            address: '', // Empty - will be filled when user requests
            placeId: '',
          };

          setLocation(locationData);
          setError(null);
          setLoading(false);
          resolve(locationData);
        },
        (err) => {
          setLoading(false);
          let errorMsg = 'Failed to get location';

          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMsg = 'Location permission denied';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMsg = 'Location unavailable';
              break;
            case err.TIMEOUT:
              errorMsg = 'Request timed out';
              break;
          }

          setError(errorMsg);
          reject(new Error(errorMsg));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }, []);

  const getAddressForLocation = useCallback(
    async (lat: number, lng: number): Promise<LocationResult> => {
      setLoading(true);
      setError(null);

      return new Promise((resolve, reject) => {
        if (!window.google?.maps) {
          const errorMsg = 'Google Maps not loaded';
          setError(errorMsg);
          setLoading(false);
          reject(new Error(errorMsg));
          return;
        }

        const geocoder = new window.google.maps.Geocoder();
        const latLng = new window.google.maps.LatLng(lat, lng);

        geocoder.geocode({ location: latLng }, (results, status) => {
          setLoading(false);

          if (status === 'OK' && results && results.length > 0) {
            const result = results[0];
            const locationData: LocationResult = {
              lat,
              lng,
              address: result.formatted_address,
              placeId: result.place_id,
            };

            setLocation(locationData);
            setError(null);
            resolve(locationData);
          } else {
            const errorMsg = 'Could not get address for this location';
            setError(errorMsg);
            reject(new Error(errorMsg));
          }
        });
      });
    },
    []
  );

  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(null);
  const [showAddressOption, setShowAddressOption] = useState(false);

  const handleCurrentLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      setSelectedLocation(coords);
      setShowAddressOption(true); // Show "Get Address" button
      setIsOpenPopover?.(false);
    } catch (error) {
      console.error('Failed to get current location:', error);
    }
  };

  // Step 2: Get address (COSTS)
  const handleGetAddress = async () => {
    if (!selectedLocation) return;

    try {
      const locationWithAddress = await getAddressForLocation(
        selectedLocation.lat,
        selectedLocation.lng
      );
      setSelectedLocation(locationWithAddress);
      setShowAddressOption(false);
      setIsOpenPopover?.(false);
    } catch (error) {
      console.error('Failed to get address:', error);
    }
  };

  return {
    getCurrentLocation,
    getAddressForLocation,
    loading,
    error,
    location,
    handleGetAddress,
    handleCurrentLocation,
    showAddressOption,
  };
}
