import { Button } from '@/shared/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/components/ui/select';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react';
import { generateCalendarDays } from './calendarUtils';

type CalendarGridProps = {
  currentMonth: number;
  currentYear: number;
  monthNames: string[];
  years: number[];
  daysInMonth: number;
  firstDay: number;
  selectedDate: string | null;
  highlightColor?: 'primary' | 'accent'; 
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: string) => void;
  onDayClick: (day: number) => void;
  getDateString: (day: number) => string;
  isDateAvailable: (day: number) => boolean;
  isToday: (dateString: string) => boolean;
};

export const CalendarGrid = ({
  currentMonth,
  currentYear,
  monthNames,
  years,
  daysInMonth,
  firstDay,
  selectedDate,
  highlightColor = 'accent',
  onPrevMonth,
  onNextMonth,
  onYearChange,
  onDayClick,
  getDateString,
  isDateAvailable,
  isToday,
}: CalendarGridProps) => {
  const calendarDays = generateCalendarDays({
    daysInMonth,
    firstDay,
    selectedDate,
    highlightColor,
    getDateString,
    isDateAvailable,
    isToday,
    onDayClick,
  });

  return (
    <div>
      {/* Month/Year Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <span className="text-heading-4">{monthNames[currentMonth]}</span>
          <span className="text-heading-4 text-black-400">{currentYear}</span>
          <Select value={currentYear.toString()} onValueChange={onYearChange}>
            <SelectTrigger
              className="text-body-small border-0 p-0"
              variant="default"
            />
            <SelectContent className="max-h-[200px]">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="icon" onClick={onPrevMonth}>
            <ArrowLeft01Icon className="size-5" />
          </Button>
          <Button variant="icon" onClick={onNextMonth}>
            <ArrowRight01Icon className="size-5" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-2">
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-body-small text-black-400"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 space-y-3 space-x-3">
          {calendarDays}
        </div>
      </div>
    </div>
  );
};