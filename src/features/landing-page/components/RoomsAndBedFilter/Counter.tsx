import { Button } from '@/shared/components';
import { Add01Icon, Remove01Icon, type HugeiconsProps } from 'hugeicons-react';

interface CounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  IconComponent: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

export const Counter = ({
  label,
  value,
  onIncrement,
  onDecrement,
  IconComponent,
}: CounterProps) => {
  return (
    <div className="flex items-center gap-10 justify-between py-3">
      <div className='flex gap-2 items-center text-black-400'>
        <IconComponent className='size-[14px]' />
        <p className="text-body-medium text-black-400">{label}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="tertiary"
          className="h-10 w-10 rounded-[8px]"
          onClick={onDecrement}
          disabled={value === 0}
        >
          <Remove01Icon />
        </Button>
        <span className="text-body-medium text-black-500 min-w-[20px] text-center">
          {value}
        </span>
        <Button
          type="button"
          variant="tertiary"
          className="h-10 w-10 rounded-[8px]"
          onClick={onIncrement}
        >
          <Add01Icon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
