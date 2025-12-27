import { Badge } from '@/shared/components';
import { Edit01Icon } from 'hugeicons-react';

type ReviewTriggerProps = {
  name: string;
  onEdit?: () => void;
};
export const ReviewTrigger = ({ name, onEdit }: ReviewTriggerProps) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit?.();
  };

  return (
    <div className="flex items-center justify-between w-full">
      <h5 className="text-heading-4 text-icons-black">{name}</h5>
      <div className="flex gap-2">
        <Badge variant="success">
          <div className="size-[7px] bg-success-500 rounded-full" />
          Complete
        </Badge>
        <Edit01Icon
          className="size-6 text-black-400 cursor-pointer"
          onClick={handleEditClick}
        />
      </div>
    </div>
  );
};
