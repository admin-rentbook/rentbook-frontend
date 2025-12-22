import { DialogComponent, Sheet } from '@/shared/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/components/ui/select';
import { useMobile } from '@/shared/hooks';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react';
import { useReschedule } from '../hooks';

type RescheduleModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const RescheduleModal = ({
  isOpen,
  setIsOpen,
}: RescheduleModalProps) => {
  const { isMobile } = useMobile();
  const {
    currentMonth,
    currentYear,
    selectedDate,
    showRescheduleView,
    monthNames,
    years,
    selectedTimeSlots,
    daysInMonth,
    firstDay,
    handlePrevMonth,
    handleNextMonth,
    handleDayClick,
    handleTimeSlotClick,
    handleYearChange,
    setShowRescheduleView,
    getDateString,
    hasSchedule,
    isToday,
  } = useReschedule();

  const generateCalendarDays = () => {
    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="w-[50px] h-[50px]" />
      );
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = getDateString(day);
      const hasScheduleForDay = hasSchedule(dateString);
      const isTodayDay = isToday(dateString);

      calendarDays.push(
        <div
          key={day}
          onClick={() => handleDayClick(day)}
          className={`
            w-[66px] h-[56px] rounded-[24px] p-2 cursor-pointer relative
            ${hasScheduleForDay ? 'bg-custom-neutral-200' : 'bg-white border border-custom-gray-300'}
            text-black-500
            hover:opacity-80 transition-opacity
          `}
        >
          <span
            className={`
              text-body-small absolute top-2 left-2
              ${isTodayDay ? 'bg-primary-500 text-white px-2 py-0.5 rounded-full' : ''}
            `}
          >
            {day}
          </span>
        </div>
      );
    }

    return calendarDays;
  };

  const RescheduleContent = () => {
    if (showRescheduleView) {
      return (
        <div className="p-6">
          <h2 className="text-heading-2 mb-4">Reschedule View</h2>
          <p>Component for rescheduling will be implemented here</p>
          <button
            onClick={() => setShowRescheduleView(false)}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg"
          >
            Back to Calendar
          </button>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-heading-2 text-neutral-600 mb-2">
            Reschedule viewing
          </h2>
          <p className="text-body-small text-black-400">
            Rescheduling this viewing will affect all renters
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[70%_30%] gap-4">
          {/* Calendar Side - 70% on desktop, top on mobile */}
          <div>
            {/* Month/Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-heading-3">
                  {monthNames[currentMonth]}
                </span>
                <span>{currentYear}</span>
                <Select
                  value={currentYear.toString()}
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="text-body-small border-0" variant='default' />
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
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-custom-neutral-50 rounded-lg transition-colors"
                >
                  <ArrowLeft01Icon className="size-5" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-custom-neutral-50 rounded-lg transition-colors"
                >
                  <ArrowRight01Icon className="size-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-2">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-start text-body-small text-black-400 font-medium"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7 space-y-3 space-x-3">
                {generateCalendarDays()}
              </div>
            </div>
          </div>

          {/* Time Slots Side - 30% on desktop, bottom on mobile */}
          <div className="border-t lg:border-t-0 lg:border-l border-custom-neutral-100 pt-4 lg:pt-0 lg:pl-4">
            <h3 className="text-heading-4 text-neutral-600 mb-4">
              {selectedDate
                ? `Time slots for ${selectedDate}`
                : 'Select a date'}
            </h3>

            {selectedTimeSlots.length > 0 ? (
              <div className="space-y-2">
                {selectedTimeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeSlotClick(slot)}
                    className="w-full p-3 border border-custom-neutral-100 rounded-lg hover:bg-custom-neutral-50 transition-colors text-left"
                  >
                    <p className="text-body-medium text-black-500">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-body-small text-black-400">
                {selectedDate
                  ? 'No time slots available'
                  : 'Click on a date with viewings to see available time slots'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <RescheduleContent />
      </Sheet>
    );
  }

  return (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-2/3 xl:w-1/2"
    >
      <RescheduleContent />
    </DialogComponent>
  );
};
