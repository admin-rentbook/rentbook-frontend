import { cn } from '@/shared/lib/utils';
import type { HugeiconsProps } from 'hugeicons-react';
import type { PropertyType } from '../../types';

type PropertyTypeCardProps = {
  IconComponent: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  label: PropertyType;
  isSelected: boolean;
  onClick: () => void;
};

export const PropertyTypeCard = ({
  IconComponent,
  label,
  isSelected,
  onClick,
}: PropertyTypeCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col hover:cursor-pointer items-center gap-3 w-[100px] px-0 py-3 rounded-[1.25em] border-1 transition-all hover:border-black-400',
        isSelected ? 'border-black-400' : 'border-custom-neutral-200 bg-white'
      )}
    >
      <IconComponent className='size-6 text-icons-black' />
      <p
        className={cn(
          'text-body-small text-black-400',
        )}
      >
        {label}
      </p>
    </div>
  );
};
