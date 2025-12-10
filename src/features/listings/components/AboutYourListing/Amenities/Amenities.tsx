import { DEFAULT_AMENITIES } from '@/features/listings/constants';
import { useAmenities } from '@/features/listings/hooks';
import { Button, Input, Label } from '@/shared/components';
import { Add01Icon } from 'hugeicons-react';
import { ListingTitle, NavigateButtons } from '../../shared';
import { AmenityTag } from './AmenityTag';

type AmenitiesProps = {
  onNext: (() => void) | undefined;
  onPrev: (() => void) | undefined;
};

export const Amenities = ({ onNext, onPrev }: AmenitiesProps) => {
  const {
    availableAmenities,
    inputValue,
    setInputValue,
    toggleAmenity,
    addCustomAmenity,
    isSelected,
    handleKeyPress,
    handleSubmit,
    isButtonDisabled,
  } = useAmenities(DEFAULT_AMENITIES, onNext);
  return (
    <div className="flex flex-col gap-10 h-full">
      <ListingTitle
        description="Tell property seekers what stands out about your listing"
        title="Select as many that apply"
      />
      <div className="flex flex-wrap gap-3">
        {availableAmenities.map((amenity) => (
          <AmenityTag
            key={amenity}
            amenity={amenity}
            isSelected={isSelected(amenity)}
            onClick={() => toggleAmenity(amenity)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-body-medium text-black-500">Additional amenities</p>
        <div className="flex w-full max-w-md items-end gap-2">
          <div className="flex flex-col gap-3 lg:w-6/7">
            <Label className="text-label text-black-400">
              Describe the amenity
            </Label>
            <Input
              name="amenity"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="E.g Playground"
              value={inputValue}
              size="sm"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={addCustomAmenity}
            disabled={!inputValue.trim()}
          >
            <Add01Icon />
            Add
          </Button>
        </div>
      </div>
      <NavigateButtons
        isButtonDisabled={isButtonDisabled}
        onBack={() => onPrev?.()}
        onContinue={handleSubmit}
      />
    </div>
  );
};
