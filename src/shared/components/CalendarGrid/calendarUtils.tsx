import type { JSX } from 'react';

export type CalendarDay = {
  day: number;
  dateString: string;
  isAvailable: boolean;
  isToday: boolean;
  isSelected: boolean;
};

type GenerateCalendarDaysParams = {
  daysInMonth: number;
  firstDay: number;
  selectedDate: string | null;
  highlightColor: 'primary' | 'accent';
  getDateString: (day: number) => string;
  isDateAvailable: (day: number) => boolean;
  isToday: (dateString: string) => boolean;
  onDayClick: (day: number) => void;
};

export const generateCalendarDays = ({
  daysInMonth,
  firstDay,
  selectedDate,
  highlightColor,
  getDateString,
  isDateAvailable,
  isToday,
  onDayClick,
}: GenerateCalendarDaysParams): JSX.Element[] => {
  const calendarDays: JSX.Element[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="w-[50px] h-[50px]" />);
  }

  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = getDateString(day);
    const isAvailable = isDateAvailable(day);
    const isTodayDay = isToday(dateString);
    const isSelected = selectedDate === dateString;

    // Determine background color based on selection and availability
    const getBgColor = () => {
      if (isSelected && highlightColor === 'primary') {
        return 'bg-red-400 text-white';
      }
      if (isAvailable && highlightColor === 'accent') {
        return 'bg-sidebar-accent';
      }
      if (isAvailable && highlightColor === 'primary') {
        return 'bg-sidebar-accent';
      }
      return 'bg-white';
    };

    const getTextColor = () => {
      if (isSelected && highlightColor === 'primary') {
        return 'text-white';
      }
      return 'text-black-500';
    };

    calendarDays.push(
      <div
        key={day}
        onClick={() => isAvailable && onDayClick(day)}
        className={`
          lg:w-[66px] w-[46px] h-[42px] lg:h-[56px] rounded-[16px] lg:rounded-[24px]
          p-2 relative
          border border-neutral-200
          ${getBgColor()}
          ${getTextColor()}
          ${isAvailable ? 'cursor-pointer hover:opacity-80 transition-opacity' : 'opacity-40 cursor-not-allowed'}
        `}
      >
        <span
          className={`
            text-body absolute top-2 left-2
            ${
              isTodayDay && !isSelected
                ? 'bg-primary-500 text-white grid place-items-center size-[22px] lg:size-[26px] rounded-full'
                : ''
            }
          `}
        >
          {day}
        </span>
      </div>
    );
  }

  return calendarDays;
};
