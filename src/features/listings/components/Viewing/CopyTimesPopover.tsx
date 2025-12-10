import { Checkbox, Label, PopoverComponent, Sheet } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { DAYS_OF_WEEK, type DayOfWeek } from '../../constants';
import { useCopyTimes } from '../../hooks';
import { NavigateButtons } from '../shared';

type CopyTimesPopoverProps = {
  currentDay: DayOfWeek;
  onCopy: (days: DayOfWeek[]) => void;
  children: React.ReactNode;
};
export const CopyTimesPopover = (props: CopyTimesPopoverProps) => {
  const { isMobile } = useMobile();
  const {
    handleSelectAll,
    availableDays,
    selectedDays,
    handleDayToggle,
    handleApply,
    setIsOpen,
    isOpen
  } = useCopyTimes(props.currentDay, props.onCopy);

  const CopyTimesContent = () => {
    return (
      <div className="bg-white rounded-[1.25em] p-6 flex flex-col gap-4">
        <p className="text-body-medium text-black-500">Copy times to:</p>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedDays.length === availableDays.length}
            onCheckedChange={handleSelectAll}
          />
          <Label
            htmlFor="select-all"
            className="text-body text-black-500 cursor-pointer"
          >
            Select all
          </Label>
        </div>
        <div className="space-y-4">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={`day-${day}`}
                checked={selectedDays.includes(day)}
                onCheckedChange={(checked) =>
                  handleDayToggle(day, checked as boolean)
                }
                disabled={day === props.currentDay}
              />
              <Label
                htmlFor={`day-${day}`}
                className={`text-body text-black-500 cursor-pointer ${
                  day === props.currentDay ? 'text-muted-foreground' : ''
                }`}
              >
                {day}
              </Label>
            </div>
          ))}
        </div>
        <NavigateButtons
          isButtonDisabled={selectedDays.length === 0}
          onBack={() => setIsOpen(false)}
          onContinue={handleApply}
          saveBtnText="Apply"
          btnText="Cancel"
        />
      </div>
    );
  };

  if (isMobile) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        children={<CopyTimesContent />}
        trigger={props.children}
      />
    );
  }

  return (
    <PopoverComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      children={<CopyTimesContent />}
      trigger={props.children}
    />
  );
};
