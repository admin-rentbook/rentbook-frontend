import { Button, DialogComponent, Sheet } from '@/shared/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/components/ui/select';
import { useMobile } from '@/shared/hooks';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
} from 'hugeicons-react';
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
            w-[66px] h-[56px] rounded-[24px]
            p-2 cursor-pointer relative
            border border-neutral-200
            ${hasScheduleForDay ? 'bg-sidebar-accent' : 'bg-white'}
            text-black-500
            hover:opacity-80 transition-opacity
          `}
        >
          <span
            className={`
              text-body absolute top-2 left-2
              ${
                isTodayDay
                  ? 'bg-primary-500 text-white grid place-items-center size-[26px] rounded-full'
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

  const RescheduleContent = () => {
    if (showRescheduleView) {
      return (
        <div className="p-6">
          <h2 className="text-heading-5">Reschedule View</h2>
          <p className="text-body-small text-black-400">
            Component for rescheduling will be implemented here
          </p>
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
        <div className="mb-6 flex justify-between">
          <div>
            <h2 className="text-heading-5 text-neutral-600 mb-2">
              Reschedule viewing
            </h2>
            <p className="text-body-small text-black-400">
              Rescheduling this viewing will affect all renters
            </p>
          </div>

          {!isMobile && (
            <Button
              variant="icon"
              className="text-black-300"
              onClick={() => setIsOpen(false)}
            >
              <Cancel01Icon className="size-6" />
            </Button>
          )}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[65%35%] gap-4">
          {/* Calendar Side */}
          <div>
            {/* Month/Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <span className="text-heading-4">
                  {monthNames[currentMonth]}
                </span>
                <span className="text-heading-4 text-black-400">
                  {currentYear}
                </span>
                <Select
                  value={currentYear.toString()}
                  onValueChange={handleYearChange}
                >
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
                <Button variant="icon" onClick={handlePrevMonth}>
                  <ArrowLeft01Icon className="size-5" />
                </Button>
                <Button variant="icon" onClick={handleNextMonth}>
                  <ArrowRight01Icon className="size-5" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-2">
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-body-small text-black-400"
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
          <div className="border-t lg:border-t-0 lg:border-l border-border/30 pt-4 lg:pt-0 lg:pl-4">
            {selectedTimeSlots.length > 0 ? (
              <div className="space-y-2">
                {selectedTimeSlots.map((slot) => (
                  <Button
                    variant="outline"
                    key={slot.id}
                    onClick={() => handleTimeSlotClick(slot)}
                    className="rounded-full w-full !h-10"
                  >
                    <p className="text-body-medium text-black-500">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </Button>
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
      className="w-3/4 xl:w-1/2"
    >
      <RescheduleContent />
    </DialogComponent>
  );
};
