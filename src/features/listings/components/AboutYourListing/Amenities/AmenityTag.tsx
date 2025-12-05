import { Button } from '@/shared/components';
import { convertUnderscoreToSpace } from '@/shared/utils';
import { Add01Icon, Tick02Icon } from 'hugeicons-react';

type AmenityTagsProps = {
  amenity: string;
  isSelected: boolean;
  onClick: () => void;
};
export const AmenityTag = ({
  isSelected,
  amenity,
  onClick,
}: AmenityTagsProps) => {
  return (
    <Button
      className="font-normal"
      variant={isSelected ? 'primary' : 'default'}
      onClick={onClick}
      size='lg'
    >
      {isSelected ? <Tick02Icon /> : <Add01Icon />}
      {convertUnderscoreToSpace(amenity)}
    </Button>
  );
};
