import type { RentalPaymentType } from '../../types';

type PaymentTypeCardProps = {
  type: RentalPaymentType;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
export const PaymentTypeCard = ({
  type,
  isSelected,
  isHovered,
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: PaymentTypeCardProps) => {
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
        <h5 className="text-body-lg">{type.name}</h5>
      </div>
      <p
        className={`text-body-small ${isActive ? `${type.color}` : 'text-sidebar-ring'} transition-colors`}
      >
        {type.description}
      </p>
    </div>
  );
};
