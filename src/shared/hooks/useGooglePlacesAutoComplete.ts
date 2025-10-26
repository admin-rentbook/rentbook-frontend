import { useCallback, useEffect, useRef, useState } from 'react';
import type { LocationResult } from '../types';
import { useDebounce } from './useDebounce';

interface UseGooglePlacesAutocompleteProps {
  componentRestrictions?: google.maps.places.ComponentRestrictions;
  debounceMs?: number;
  minSearchLength?: number;
  setIsOpenPopover?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EMPTY_PREDICTIONS: google.maps.places.AutocompletePrediction[] = [];

export function useGooglePlacesAutocomplete({
  componentRestrictions,
  debounceMs = 300,
  minSearchLength = 3,
  setIsOpenPopover
}: UseGooglePlacesAutocompleteProps = {}) {
  const [input, setInput] = useState('');
  const [predictions, setPredictions] =
    useState<google.maps.places.AutocompletePrediction[]>(EMPTY_PREDICTIONS);
  const [loading, setLoading] = useState(false);
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const lastRequestRef = useRef<number>(0);

  const debouncedInput = useDebounce(input, debounceMs);

  // Cleanup function to reset state
  const cleanup = useCallback(() => {
    setPredictions(EMPTY_PREDICTIONS);
    setLoading(false);
    sessionTokenRef.current = null;
  }, []);

  // Reset predictions when input is cleared
  useEffect(() => {
    if (!debouncedInput) {
      cleanup();
    }
  }, [debouncedInput, cleanup]);

  // Fetch predictions with rate limiting
  useEffect(() => {
    // Don't search if input is too short
    if (!debouncedInput || debouncedInput.length < minSearchLength) {
      setPredictions(EMPTY_PREDICTIONS);
      setLoading(false);
      return;
    }

    if (!window.google?.maps?.places) {
      console.warn('Google Maps Places API not loaded');
      return;
    }

    // Create session token if needed
    if (!sessionTokenRef.current) {
      sessionTokenRef.current =
        new window.google.maps.places.AutocompleteSessionToken();
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastRequestRef.current < 150) {
      // Minimum 150ms between requests
      return;
    }
    lastRequestRef.current = now;

    let isCancelled = false;

    if (debouncedInput && debouncedInput.length > 3 && !predictions) {
      setLoading(true);
    }
    const service = new window.google.maps.places.AutocompleteService();

    service.getPlacePredictions(
      {
        input: debouncedInput,
        types: ['address'],
        componentRestrictions,
        sessionToken: sessionTokenRef.current,
      },
      (results, status) => {
        if (isCancelled) return;

        setLoading(false);
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPredictions(results);
        } else {
          setPredictions(EMPTY_PREDICTIONS);
        }
      }
    );

    return () => {
      isCancelled = true;
    };
  }, [debouncedInput, componentRestrictions, minSearchLength]);

  const getPlaceDetails = useCallback(
    async (
      prediction: google.maps.places.AutocompletePrediction
    ): Promise<LocationResult> => {
      if (!window.google?.maps?.places) {
        throw new Error('Google Maps Places API not loaded');
      }

      return new Promise((resolve, _reject) => {
        const placeService = new window.google.maps.places.PlacesService(
          document.createElement('div')
        );

        placeService.getDetails(
          {
            placeId: prediction.place_id,
            fields: ['geometry', 'formatted_address', 'place_id'],
            sessionToken: sessionTokenRef.current ?? undefined,
          },
          (place, status) => {
            // Clear session token after getting details
            sessionTokenRef.current = null;

            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              place?.geometry?.location
            ) {
              resolve({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address ?? prediction.description,
                placeId: place.place_id ?? prediction.place_id,
              });
            } else {
              resolve({
                lat: NaN,
                lng: NaN,
                address: prediction.description,
                placeId: prediction.place_id,
              });
            }
          }
        );
      });
    },
    []
  );

  const clearPredictions = useCallback(() => {
    setPredictions(EMPTY_PREDICTIONS);
    setInput('');
    sessionTokenRef.current = null;
  }, []);

  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(null);
  const handleSelectPrediction = async (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    try {
      const location = await getPlaceDetails(prediction);
      setSelectedLocation(location);
      setInput(location.address);
      clearPredictions();
      setIsOpenPopover?.(false);
    } catch (error) {
      console.error('Failed to get place details:', error);
    }
  };

  return {
    input,
    setInput,
    predictions,
    loading,
    getPlaceDetails,
    clearPredictions,
    selectedLocation,
    handleSelectPrediction,
  };
}
