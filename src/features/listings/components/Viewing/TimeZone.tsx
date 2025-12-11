import { getNamibiaTimezone } from '@/shared/utils';
import { GlobalIcon } from 'hugeicons-react';

export const TimeZone = () => {
  const { abbreviation, name, offset, time } = getNamibiaTimezone();
  return (
    <div className="flex justify-between rounded-[1.5em] p-3 bg-sidebar">
      <div className="flex flex-2 text-black-400 items-center gap-3">
        <GlobalIcon className="size-6" />
        <div>
          <p className="text-body lg:text-body-medium text-black-400">
            Time Zone
          </p>
          <p className="text-body-xs lg:text-body-small text-black-400">{`${abbreviation} (${name})`}</p>
        </div>
      </div>
      <div>
        <p className="text-body lg:text-body-medium text-black-400 text-end">
          {offset}
        </p>
        <p className="text-body-xs lg:text-body-small text-black-400 text-end">
          {time}
        </p>
      </div>
    </div>
  );
};
