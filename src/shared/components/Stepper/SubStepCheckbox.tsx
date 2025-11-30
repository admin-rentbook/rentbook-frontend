import { cn } from '@/shared/lib/utils';
import { Check } from 'lucide-react';

type SubStepCheckboxProps = {
  isCompleted: boolean;
  className?: string;
};
export const SubStepCheckbox = ({
  isCompleted,
  className = '',
}: SubStepCheckboxProps) => {
  return (
    <div
      className={cn(
        'size-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
        isCompleted ? 'bg-primary-500' : 'bg-custom-neutral-100',
        className
      )}
    >
      {isCompleted && <Check className="text-white size-3" />}
    </div>
  );
};
