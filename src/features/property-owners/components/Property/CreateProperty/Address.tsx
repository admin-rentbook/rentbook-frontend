import { useCreatePropertyStore } from '@/features/property-owners/store';
import type { CreatePropertyData } from '@/features/property-owners/types/property';
import {
  Button,
  Input,
  MapPicker,
  PopoverComponent,
} from '@/shared/components';
import {
  useCurrentLocation,
  useGooglePlacesAutocomplete,
} from '@/shared/hooks';
import { useMapPicker } from '@/shared/hooks/useMapPicker';
import type { LocationResult } from '@/shared/types';
import { GlobalSearchIcon, Location05Icon } from 'hugeicons-react';
import { Loader2, MapPin } from 'lucide-react';
import { useCallback, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { AddressPredictionsList } from './AddressPredictionList';

type AddressProps = {
  form: UseFormReturn<CreatePropertyData>;
};
export const Address = ({ form }: AddressProps) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [finalAddress, setFinalAddress] = useState('');

  const handleFinalAddress = useCallback(
    (location: LocationResult) => {
      form.setValue('address', location.address, { shouldValidate: true });
      form.setValue('lat', location.lat, { shouldValidate: true });
      form.setValue('lng', location.lng, { shouldValidate: true });
      form.setValue('placeId', location?.placeId ?? '', {
        shouldValidate: true,
      });
    },
    [form]
  );

  const {
    input,
    setInput,
    predictions,
    loading,
    handleSelectPrediction,
  } = useGooglePlacesAutocomplete({
    componentRestrictions: { country: 'na' },
    setIsOpenPopover,
    onLocationResult: (location) => {
      handleFinalAddress(location);
      setFinalAddress(location.address);
    },
  });
  const {
    loading: locationLoading,
    handleGetCurrentLocation,
  } = useCurrentLocation({
    setIsOpenPopover,
    onLocationResult: (location) => {
      handleFinalAddress(location);
      setFinalAddress(location.address);
    },
  });

  const {
    selectedPosition,
    handleMapClick,
    handleMarkerDrag,
    address: mapAddress,
    loading: mapLoading,
    handleConfirm,
  } = useMapPicker({
    setIsOpenPopover: setIsOpenMap,
    onLocationResult: (location) => {
      handleFinalAddress(location);
      setFinalAddress(location.address);
    },
  });

  const propertyData = useCreatePropertyStore((s) => s.propertyData);

  return (
    <div className="flex flex-col gap-2 pb-10">
      <p className="text-label text-black-400">Address</p>

      <PopoverComponent
        open={isOpenPopover}
        onOpenChange={setIsOpenPopover}
        side="bottom"
        className="px-6 py-8 w-full bg-white"
        trigger={
          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={() => setIsOpenPopover(true)}
            className="w-full justify-start rounded-10 py-0 text-body text-black-400"
          >
            <div className="flex gap-3 items-center">
              <GlobalSearchIcon className="size-6" />
              <p className="text-body text-black-400">
                {finalAddress ?? propertyData.address}
              </p>
            </div>
          </Button>
        }
        children={
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for an address..."
                className="w-full p-2 border rounded-md"
                autoFocus
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>

            <button
              className="flex gap-3 items-center transition-colors disabled:opacity-50"
              onClick={handleGetCurrentLocation}
              disabled={locationLoading}
            >
              <div className="flex items-center justify-center size-[50px] bg-success-50 rounded-xl">
                {locationLoading ? (
                  <Loader2 className="h-6 w-6 text-success-500 animate-spin" />
                ) : (
                  <Location05Icon className="size-6 text-success-500" />
                )}
              </div>
              <div className="text-left flex-1">
                <p className="text-body text-neutral-600">My location</p>
                <p className="text-body-xs text-custom-neutral-900">
                  {locationLoading
                    ? 'Getting location...'
                    : 'Use my current location'}
                </p>
              </div>
            </button>

            <MapPicker
              selectedPosition={selectedPosition}
              handleMapClick={handleMapClick}
              handleMarkerDrag={handleMarkerDrag}
              onOpenChange={setIsOpenMap}
              open={isOpenMap}
              address={mapAddress}
              handleConfirm={handleConfirm}
              loading={mapLoading}
            />
            {loading ||
              (predictions.length > 0 && (
                <AddressPredictionsList
                  onSelect={handleSelectPrediction}
                  predictions={predictions}
                />
              ))}
          </div>
        }
      />
    </div>
  );
};
