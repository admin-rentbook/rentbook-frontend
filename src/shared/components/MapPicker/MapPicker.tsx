import HouseIcon from '@/assets/icons/house-2.svg?react';
import RouteIcon from '@/assets/icons/Route.svg?react';
import { env } from '@/config';
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { ArrowRight01Icon, MapPinIcon } from 'hugeicons-react';
import { Loader2 } from 'lucide-react';
import { ResponsiveModal } from '../ResponsiveModal';
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
    <ResponsiveModal
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
        <div
          className="
    grid 
    h-full
    lg:h-[500px]
    lg:w-[500px]
    w-full 
    rounded-2xl 
    overflow-hidden
    relative 
    grid-cols-1 
    grid-rows-1
 
  "
        >
          {/* MAP (fills whole area) */}
          <div className="col-start-1 row-start-1 col-end-1 row-end-1 z-0">
            <Map
              defaultCenter={props.selectedPosition}
              defaultZoom={15}
              onClick={props.handleMapClick as any}
              gestureHandling="greedy"
              mapId={env.GOOGLE_MAPS_MAP_ID}
              style={{ width: '100%', height: '100%' }}
            >
              <AdvancedMarker
                position={props.selectedPosition}
                draggable
                onDragEnd={props.handleMarkerDrag}
              >
                <div className="bg-neutral-600 rounded-full flex items-center justify-center size-[46px]">
                  <HouseIcon className="size-6 text-white" />
                </div>
              </AdvancedMarker>
            </Map>
          </div>

          {props.address && (
            <div className=" md:w-3/5 lg:w-4/5 col-start-1 row-start-1 col-end-1 row-end-1 self-end z-10 mb-24 mx-auto bg-white rounded-2xl shadow-custom-md p-4">
              <div className="flex gap-4 items-center">
                <div className="flex items-center justify-center h-[65px] w-[85px] rounded-xl p-2 bg-primary-foreground">
                  <HouseIcon className="size-8 text-neutral-400" />
                </div>
                <div>
                  <h5 className="text-body text-neutral-600 font-bold">
                    Property name
                  </h5>
                  <TooltipComp
                    children={
                      <p className="text-body-small text-neutral-200">
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
            <div
              className="w-3/5 lg:w-4/5 col-start-1 row-start-1 col-end-1 row-end-1 self-end z-10 mb-6 mx-auto bg-white rounded-2xl shadow-custom-md p-4 cursor-pointer"
              onClick={props.handleConfirm}
            >
              <div className="flex justify-between items-center">
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
