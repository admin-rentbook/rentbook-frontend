import { useState } from 'react';
import { RentalPayType, type RentalPay } from '../constants';


export type PaymentTypeSelection = {
    selectedType: RentalPay;
    hoveredType: string | null;
    selectType: (value: RentalPay) => void;
    isSelected: (value: string) => boolean;
    isHovered: (value: string) => boolean;
    handleMouseEnter: (value: string) => void;
    handleMouseLeave: () => void;
}

export const usePaymentTypeSelection = ():PaymentTypeSelection => {
  const [selectedType, setSelectedType] = useState<RentalPay>(RentalPayType.FIXED_PRICE);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const selectType = (value: RentalPay) => {
    setSelectedType(value);
  };

  const isSelected = (value: string) => selectedType === value;
  const isHovered = (value: string) => hoveredType === value;

  const handleMouseEnter = (value: string) => setHoveredType(value);
  const handleMouseLeave = () => setHoveredType(null);

  return {
    selectedType,
    hoveredType,
    selectType,
    isSelected,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
};
