import type { FormattedDate } from './utils';

type DateTimeDisplayProps = {
  dateInfo: FormattedDate;
  timeSlot?: {
    startTime: string;
    endTime: string;
  } | null;
};

export const DateTimeDisplay = ({ dateInfo, timeSlot }: DateTimeDisplayProps) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="size-[54px] flex flex-col justify-center rounded-[12px] border border-custom-neutral-100/40 bg-white flex-shrink-0">
        <div className="flex justify-center rounded-t-[12px] bg-custom-neutral-50/50 h-[30%]">
          <p className="text-11 text-black-300/50">{dateInfo.month}</p>
        </div>
        <div className="flex items-end justify-center h-[70%]">
          <p className="text-heading-lg">{dateInfo.day}</p>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-heading-lg text-black-500">
          {dateInfo.fullDate}{' '}
          <span className="text-black-300/50">{dateInfo.dayOfWeek}</span>
        </p>
        <p className="text-body-medium text-black-400">
          {timeSlot
            ? `${timeSlot.startTime} - ${timeSlot.endTime}`
            : '10:00 AM - 11:00 AM'}
        </p>
      </div>
    </div>
  );
};