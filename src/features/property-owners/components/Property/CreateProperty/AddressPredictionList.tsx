import { Separator } from '@/shared/components';
import { Location01Icon } from 'hugeicons-react';

interface AddressPredictionsListProps {
  predictions: google.maps.places.AutocompletePrediction[];
  onSelect: (prediction: google.maps.places.AutocompletePrediction) => void;
}

export function AddressPredictionsList({
  predictions,
  onSelect,
}: AddressPredictionsListProps) {
  if (!predictions.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
      <Separator className='border border-gray-300' />
      {predictions.map((prediction) => (
        <button
          key={prediction.place_id}
          onClick={() => onSelect(prediction)}
          className="flex w-full items-center gap-3 rounded-lg py-2 text-left"
        >
          <div className='flex items-center justify-center size-[50px] bg-primary-foreground rounded-xl'>
            <Location01Icon className="size-6 text-custom-gray-900 shrink-0" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {prediction.structured_formatting.main_text}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {prediction.structured_formatting.secondary_text}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
