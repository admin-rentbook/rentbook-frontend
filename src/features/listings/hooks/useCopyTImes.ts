import { useState } from 'react';
import { DAYS_OF_WEEK, type DayOfWeek } from '../constants';

export type UseCopyTimes = {
  handleApply: () => void;
  handleDayToggle: (day: DayOfWeek, checked: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  selectedDays: DayOfWeek[];
  availableDays: DayOfWeek[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const useCopyTimes = (
  currentDay: DayOfWeek,
  onCopy: (days: DayOfWeek[]) => void
): UseCopyTimes => {
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const availableDays = DAYS_OF_WEEK.filter((day) => day !== currentDay);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDays(availableDays);
    } else {
      setSelectedDays([]);
    }
  };

  const handleDayToggle = (day: DayOfWeek, checked: boolean) => {
    if (checked) {
      setSelectedDays((prev) => [...prev, day]);
    } else {
      setSelectedDays((prev) => prev.filter((d) => d !== day));
    }
  };

  const handleApply = () => {
    onCopy(selectedDays);
    setSelectedDays([]);
    setIsOpen(false);
  };

  return {
    handleApply,
    handleDayToggle,
    handleSelectAll,
    selectedDays,
    availableDays,
    isOpen,
    setIsOpen,
  };
};
