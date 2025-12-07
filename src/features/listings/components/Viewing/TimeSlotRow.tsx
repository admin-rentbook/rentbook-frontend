import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components';
import { formatTimeToDisplay, generateTimeOptions } from '@/shared/utils';
import { Add01Icon, Copy01Icon, Delete02Icon } from 'hugeicons-react';
import type { DayOfWeek } from '../../constants';
import type { TimeSlot } from '../../types';
import { CopyTimesPopover } from './CopyTimesPopover';

type TimeSlotRowProps = {
  day: DayOfWeek;
  slot: TimeSlot;
  index: number;
  onUpdate: (field: 'startTime' | 'endTime', value: string) => void;
  onDelete: () => void;
  deleteAllTimeSlots: (day: DayOfWeek) => void;
  addTimeSlot: (day: DayOfWeek) => void;
  showCopyButton?: boolean;
  onCopy: (sourceDay: DayOfWeek, targetDays: DayOfWeek[]) => void;
};
export const TimeSlotRow = (props: TimeSlotRowProps) => {
  const { showCopyButton = true } = props;
  const TIME_OPTIONS = generateTimeOptions();
  return (
    <div className="flex justify-between items-center gap-2 mb-2">
      <div className="flex gap-3 items-center w-[80%]">
        <Select
          value={props.slot.startTime}
          onValueChange={(val) => props.onUpdate('startTime', val)}
        >
          <SelectTrigger className="px-3 h-11 py-2 w-full flex justify-center  rounded-[0.75em] bg-custom-gray-100/40 text-body-medium border-none focus:outline-none focus:ring-0">
            <SelectValue placeholder="Start Time" />
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((time) => (
              <SelectItem key={time} value={time}>
                {formatTimeToDisplay(time)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="h-[1px] w-[20px] bg-black-500" />

        <Select
          value={props.slot.endTime}
          onValueChange={(val) => props.onUpdate('endTime', val)}
        >
          <SelectTrigger className="px-3 h-11 py-2 w-full flex justify-center rounded-[0.75em] bg-custom-gray-100/40 text-body-medium border-none focus:outline-none focus:ring-0">
            <SelectValue placeholder="End Time" />
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((time) => (
              <SelectItem key={time} value={time}>
                {formatTimeToDisplay(time)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        {props.index === 0 ? (
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="icon"
              className="p-0"
              onClick={() => props.addTimeSlot(props.day)}
            >
              <Add01Icon className="size-5" />
            </Button>
            {showCopyButton && (
              <CopyTimesPopover
                onCopy={(days) => props.onCopy(props.day, days)}
                currentDay={props.day}
              >
                <Button type="button" className="p-0" variant="icon">
                  <Copy01Icon className="size-5" />
                </Button>
              </CopyTimesPopover>
            )}

            <Button
              type="button"
              variant="icon"
              className="p-0"
              onClick={() => props.deleteAllTimeSlots(props.day)}
            >
              <Delete02Icon className="size-5" />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            className="p-0"
            variant="icon"
            onClick={props.onDelete}
          >
            <Delete02Icon className="size-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
