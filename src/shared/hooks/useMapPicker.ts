// src/shared/hooks/useMapPicker.ts
import { useCallback, useState } from 'react';

interface LocationResult {
  lat: number;
  lng: number;
  address: string;
  placeId: string;
}

interface UseMapPickerProps {
  initialLocation?: {
    lat: number;
    lng: number;
  };
  setIsOpenPopover?: React.Dispatch<React.SetStateAction<boolean>>;
   onLocationResult?: (location: LocationResult) => void;
}

export function useMapPicker({
  initialLocation,
  setIsOpenPopover,
  onLocationResult
}: UseMapPickerProps = {}) {
  const DEFAULT_LOCATION = { lat: -22.5609, lng: 17.0658 }; // Windhoek, Namibia

  const [selectedPosition, setSelectedPosition] =
    useState<google.maps.LatLngLiteral>(initialLocation || DEFAULT_LOCATION);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [fullAddress, setFullAddress] = useState<LocationResult | null>(null);
  const [loading, setLoading] = useState(false);
  //   const [gettingCurrentLocation, setGettingCurrentLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Search for location by address
  //   const searchLocation = useCallback(async (query: string, mapInstance?: google.maps.Map) => {
  //     if (!query.trim() || !window.google?.maps) return;

  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const geocoder = new window.google.maps.Geocoder();

  //       return new Promise<boolean>((resolve) => {
  //         geocoder.geocode(
  //           {
  //             address: query,
  //             componentRestrictions: { country: 'ng' }
  //           },
  //           (results, status) => {
  //             setLoading(false);
  //             if (status === 'OK' && results && results.length > 0) {
  //               const location = results[0].geometry.location;
  //               const lat = location.lat();
  //               const lng = location.lng();

  //               setSelectedPosition({ lat, lng });
  //               setAddress(results[0].formatted_address);

  //               // Pan map to location
  //               if (mapInstance) {
  //                 mapInstance.panTo({ lat, lng });
  //                 mapInstance.setZoom(16);
  //               }

  //               resolve(true);
  //             } else {
  //               setError('Location not found. Try a different search.');
  //               resolve(false);
  //             }
  //           }
  //         );
  //       });
  //     } catch (err) {
  //       setLoading(false);
  //       setError('Search failed. Please try again.');
  //       return false;
  //     }
  //   }, []);

  // Get current device location
  //   const getCurrentLocation = useCallback(async (mapInstance?: google.maps.Map) => {
  //     if (!navigator.geolocation) {
  //       setError('Geolocation is not supported by your browser');
  //       return false;
  //     }

  //     setGettingCurrentLocation(true);
  //     setError(null);

  //     return new Promise<boolean>((resolve) => {
  //       navigator.geolocation.getCurrentPosition(
  //         async (position) => {
  //           const lat = position.coords.latitude;
  //           const lng = position.coords.longitude;

  //           setSelectedPosition({ lat, lng });
  //           await reverseGeocode(lat, lng);

  //           // Pan map to current location
  //           if (mapInstance) {
  //             mapInstance.panTo({ lat, lng });
  //             mapInstance.setZoom(16);
  //           }

  //           setGettingCurrentLocation(false);
  //           resolve(true);
  //         },
  //         (err) => {
  //           setGettingCurrentLocation(false);

  //           let errorMsg = 'Failed to get your location';
  //           switch (err.code) {
  //             case err.PERMISSION_DENIED:
  //               errorMsg = 'Location permission denied';
  //               break;
  //             case err.POSITION_UNAVAILABLE:
  //               errorMsg = 'Location unavailable';
  //               break;
  //             case err.TIMEOUT:
  //               errorMsg = 'Location request timed out';
  //               break;
  //           }

  //           setError(errorMsg);
  //           resolve(false);
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 10000,
  //           maximumAge: 0,
  //         }
  //       );
  //     });
  //   }, [reverseGeocode]);

  // Confirm and return selected location
  const confirmLocation =
    useCallback(async (): Promise<LocationResult | null> => {
      if (!selectedPosition) return null;

      // If we don't have an address, try to get it
      if (!address || !address.includes(',')) {
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

              const locationResult: LocationResult = {
                lat: selectedPosition.lat,
                lng: selectedPosition.lng,
                address:
                  status === 'OK' && results?.[0]
                    ? results[0].formatted_address
                    : `${selectedPosition.lat.toFixed(6)}, ${selectedPosition.lng.toFixed(6)}`,
                placeId: results?.[0]?.place_id || '',
              };

              setFullAddress(locationResult);
              resolve(locationResult);
            });
          });
        } catch (err) {
          setLoading(false);
          const locationResult: LocationResult = {
            lat: selectedPosition.lat,
            lng: selectedPosition.lng,
            address: `${selectedPosition.lat.toFixed(6)}, ${selectedPosition.lng.toFixed(6)}`,
            placeId: '',
          };

          setFullAddress(locationResult);
          return locationResult;
        }
      } else {
        const locationResult: LocationResult = {
          lat: selectedPosition.lat,
          lng: selectedPosition.lng,
          address,
          placeId: '',
        };

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
      setIsOpenPopover?.(false);
      onLocationResult?.(location)
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
