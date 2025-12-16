// src/shared/hooks/useMapPicker.ts
import { useCallback, useState } from 'react';
import type { LocationResult } from '../types';

interface UseMapPickerProps {
  initialLocation?: {
    lat: number;
    lng: number;
  };
  setIsOpenMap?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenPopover?: React.Dispatch<React.SetStateAction<boolean>>;
  onLocationResult?: (location: LocationResult) => void;
}

export function useMapPicker({
  initialLocation,
  setIsOpenMap,
  onLocationResult,
  setIsOpenPopover
}: UseMapPickerProps = {}) {
  const DEFAULT_LOCATION = { lat: -22.5609, lng: 17.0658 }; // Windhoek, Namibia

  const [selectedPosition, setSelectedPosition] =
    useState<google.maps.LatLngLiteral>(initialLocation || DEFAULT_LOCATION);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [fullAddress, setFullAddress] = useState<LocationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractAddressFromResult = (
    result: google.maps.GeocoderResult,
    lat: number,
    lng: number
  ): LocationResult => {
    const getComponent = (type: string) => {
      return (
        result.address_components?.find((c) => c.types.includes(type))
          ?.long_name || ''
      );
    };

    const streetNumber = getComponent('street_number');
    const route = getComponent('route');

    return {
      lat,
      lng,
      address: result.formatted_address,
      placeId: result.place_id || '',
      street: `${streetNumber} ${route}`.trim() || '',
      city:
        getComponent('locality') ||
        getComponent('administrative_area_level_2') ||
        '',
      state: getComponent('administrative_area_level_1') || '',
      country: getComponent('country') || '',
      postalCode: getComponent('postal_code') || '',
    };
  };

  // Fallback location result
  const createFallbackLocation = (
    lat: number,
    lng: number,
    address?: string
  ): LocationResult => ({
    lat,
    lng,
    address: address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    placeId: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });
  // Reverse geocode to get address
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setCoordinates(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    if (!window.google?.maps) {
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const geocoder = new window.google.maps.Geocoder();
      const latLng = new window.google.maps.LatLng(lat, lng);

      return new Promise<void>((resolve) => {
        geocoder.geocode({ location: latLng }, (results, status) => {
          setLoading(false);
          if (status === 'OK' && results && results.length > 0) {
            setAddress(results[0].formatted_address);
          } else {
            setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
          }
          resolve();
        });
      });
    } catch (err) {
      setLoading(false);
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
  }, []);

  // Handle position change (marker drag or map click)
  const handlePositionChange = useCallback(
    (lat: number, lng: number) => {
      setSelectedPosition({ lat, lng });
      reverseGeocode(lat, lng);
    },
    [reverseGeocode]
  );

  // Confirm and return selected location
  const confirmLocation =
    useCallback(async (): Promise<LocationResult | null> => {
      if (!selectedPosition) return null;

      setLoading(true);

      try {
        const geocoder = new window.google.maps.Geocoder();
        const latLng = new window.google.maps.LatLng(
          selectedPosition.lat,
          selectedPosition.lng
        );

        return new Promise((resolve) => {
          geocoder.geocode({ location: latLng }, (results, status) => {
            setLoading(false);

            const locationResult =
              status === 'OK' && results?.[0]
                ? extractAddressFromResult(
                    results[0],
                    selectedPosition.lat,
                    selectedPosition.lng
                  )
                : createFallbackLocation(
                    selectedPosition.lat,
                    selectedPosition.lng,
                    address
                  );

            setFullAddress(locationResult);
            resolve(locationResult);
          });
        });
      } catch (err) {
        setLoading(false);
        const locationResult = createFallbackLocation(
          selectedPosition.lat,
          selectedPosition.lng,
          address
        );
        setFullAddress(locationResult);
        return locationResult;
      }
    }, [selectedPosition, address]);
  const handleMarkerDrag = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      handlePositionChange(e.latLng.lat(), e.latLng.lng());
    }
  };

  // Handle map click
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      handlePositionChange(e.latLng.lat(), e.latLng.lng());
    }
  };

  const handleConfirm = async () => {
    const location = await confirmLocation();
    if (location) {
      setFullAddress(location);
      setIsOpenMap?.(false);
      setIsOpenPopover?.(false)
      onLocationResult?.(location);
    }
  };
  // Reset state
  const reset = useCallback(() => {
    setSelectedPosition(initialLocation || DEFAULT_LOCATION);
    setAddress('');
    setError(null);
  }, [initialLocation, DEFAULT_LOCATION]);

  return {
    // State
    selectedPosition,
    address,
    fullAddress,
    loading,
    error,
    coordinates,

    // Actions
    handlePositionChange,
    handleMapClick,
    handleMarkerDrag,
    handleConfirm,
    reset,
  };
}
