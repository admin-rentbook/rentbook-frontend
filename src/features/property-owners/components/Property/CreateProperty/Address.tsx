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
import { GlobalSearchIcon, Location05Icon } from 'hugeicons-react';
import { Loader2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { AddressPredictionsList } from './AddressPredictionList';

export const Address = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const { input, setInput, predictions, loading, handleSelectPrediction } =
    useGooglePlacesAutocomplete({
      componentRestrictions: { country: 'na' },
      setIsOpenPopover,
    });

  const { loading: locationLoading, handleCurrentLocation } =
    useCurrentLocation({ setIsOpenPopover });

  const {
    selectedPosition,
    handleMapClick,
    confirmLocation,
    handleMarkerDrag,
    address: mapAddress,
    loading: mapLoading,
  } = useMapPicker();

  const handleConfirm = async () => {
    const location = await confirmLocation();
    if (location) {
      setIsOpenMap(false);
    }
  };

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
            <GlobalSearchIcon className="size-6" />
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
              onClick={handleCurrentLocation}
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
