import type { SelectCardType } from '@/shared/types';

type SelectCardProps = {
  type: SelectCardType;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  subHeaderClassName?: string;
};
export const SelectCard = ({
  type,
  isSelected,
  isHovered,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  subHeaderClassName = '',
}: SelectCardProps) => {
  const IconComponent = type.icon;
  const isActive = isSelected || isHovered;

  return (
    <div
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        flex flex-col rounded-[1.25rem] gap-4 px-4 pt-4 pb-6 
        cursor-pointer transition-all duration-200 border-none
        ${isActive ? type.bgColor : 'bg-white'}
      `}
    >
      <div
        className={`flex gap-2 items-center ${isActive ? type.color : 'text-sidebar-ring'} transition-colors`}
      >
        <IconComponent className="h-5 w-5" />
        <h5 className="text-body-lg leading-tight lg:leading-normal">{type.name}</h5>
      </div>
      <div className="flex flex-col gap-0">
        {type.subHeader && (
          <p className={subHeaderClassName}>{type.subHeader}</p>
        )}
        <p
          className={`text-body-xs lg:text-body-small ${isActive ? `${type.color}` : 'text-sidebar-ring'} transition-colors`}
        >
          {type.description}
        </p>
      </div>
    </div>
  );
};
