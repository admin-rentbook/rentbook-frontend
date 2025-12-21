import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils';
import { convertUnderscoreToSpace } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import type { Status } from '@/shared/constants';
import { CircleIcon, Tick02Icon } from 'hugeicons-react';

export type StatusOption<T = string> = {
  value: T;
  label?: string;
};

type StatusSelectorProps<T extends string = string> = {
  options: StatusOption<T>[];
  selectedValue?: T | null;
  onSelect: (value: T) => void;
  onClose?: () => void;
};

export function StatusSelector<T extends Status = Status>({
  options,
  selectedValue,
  onSelect,
  onClose,
}: StatusSelectorProps<T>) {
  const handleSelect = (value: T) => {
    onSelect(value);
    onClose?.();
  };

  return (
    <div className="flex flex-col">
      {options.map((option) => {
        const { bgColor, fillColor, textColor } = returnStatus(option.value as Status);
        const isSelected = selectedValue === option.value;
        const displayLabel = option.label || convertUnderscoreToSpace(option.value);

        return (
          <div
            key={option.value}
            className={`py-2 px-3 cursor-pointer flex justify-between items-center rounded-lg transition-color`}
            onClick={() => handleSelect(option.value)}
          >
            <Badge className={`${bgColor} ${textColor}`}>
              <CircleIcon
                className={cn(`size-[7px] ${fillColor}`)}
                style={{ width: '7px', height: '7px' }}
              />
              <span>{displayLabel}</span>
            </Badge>
            {isSelected && (
              <Tick02Icon className="size-5 text-primary-500" />
            )}
          </div>
        );
      })}
    </div>
  );
}