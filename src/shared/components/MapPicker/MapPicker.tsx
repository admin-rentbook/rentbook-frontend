import HouseIcon from '@/assets/icons/house-2.svg?react';
import RouteIcon from '@/assets/icons/Route.svg?react';
import { env } from '@/config';
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { ArrowRight01Icon, MapPinIcon } from 'hugeicons-react';
import { Loader2 } from 'lucide-react';
import { DialogComponent } from '../Dialog';
import { TooltipComp } from '../Tooltip/Tooltip';

type MapPickerProps = {
  selectedPosition: google.maps.LatLngLiteral | undefined;
  handleMapClick: (e: google.maps.MapMouseEvent) => void;
  handleMarkerDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  address?: string;
  handleConfirm?: () => void;
  loading: boolean;
};

export const MapPicker = (props: MapPickerProps) => {
  return (
    <DialogComponent
      title="open-map"
      open={props.open}
      onOpenChange={props.onOpenChange}
      showCloseButton
      trigger={
        <div className="flex gap-3 items-center hover:cursor-pointer">
          <div
            className={`flex items-center justify-center size-[50px] bg-red-50 rounded-xl`}
          >
            <MapPinIcon className={`size-6 text-red-400`} />
          </div>
          <div className="text-left flex-1">
            <p className="text-body text-neutral-600">Set location on map</p>
            <p className="text-body-xs text-custom-neutral-900">
              Use map to pinpoint address
            </p>
          </div>
        </div>
      }
      children={
        <div className="relative h-[500px] w-[500px] rounded-2xl overflow-hidden">
          <Map
            defaultCenter={props.selectedPosition}
            defaultZoom={15}
            onClick={props.handleMapClick as any}
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapId={env.GOOGLE_MAPS_MAP_ID}
            style={{ width: '100%', height: '100%' }}
          >
            <AdvancedMarker
              position={props.selectedPosition}
              draggable
              onDragEnd={props?.handleMarkerDrag}
              style={{ opacity: 1 }}
            >
              <div className="relative">
                <div className="bg-neutral-600 rounded-full flex items-center justify-center size-[46px]">
                  <HouseIcon className="size-6 text-white opacity-100" />
                </div>
              </div>
            </AdvancedMarker>
          </Map>

          {props.address && (
            <div className="absolute bottom-1/5 left-1/10 h-[80px] w-4/5 bg-white rounded-[20px] shadow-custom-md">
              <div className="flex p-2 gap-4 items-center">
                <div className="flex items-center justify-center h-[65px] w-[85px] rounded-xl p-2 bg-primary-foreground">
                  <HouseIcon className="size-8 text-neutral-400" />
                </div>
                <div>
                  <h5 className="text-body text-neutral-600 font-bold">
                    Property name
                  </h5>
                  <TooltipComp
                    children={
                      <p className="text-body-small text-neutral=200">
                        {props.address}
                      </p>
                    }
                    tooltipTrigger={
                      <p className="text-body-small text-neutral-500 truncate w-40">
                        {props.address}
                      </p>
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {props.handleConfirm && props.address && (
            <div className="absolute bottom-1/12 left-1/10 rounded-[20px] h-[44px] w-4/5 bg-white shadow-custom-md">
              <div
                className="flex justify-between items-center p-2 h-full hover:cursor-pointer"
                onClick={props.handleConfirm}
              >
                <div className="flex gap-3 text-neutral-600">
                  <RouteIcon className="size-5" />
                  <h5 className="text-body font-bold">Confirm location</h5>
                </div>
                {props.loading ? (
                  <Loader2 className="h-6 w-6 text-success-500 animate-spin" />
                ) : (
                  <ArrowRight01Icon className="size-5 text-neutral-600" />
                )}
              </div>
            </div>
          )}
        </div>
      }
    />
  );
};
