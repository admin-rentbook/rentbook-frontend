import { Button } from '@/shared/components';
import { Cancel01Icon } from 'hugeicons-react';

type DateTimeSectionProps = {
  startDate: string;
  endDate: string;
  status: string;
  onCancel?: () => void;
  showButton?: boolean;
};

export const DateTimeSection = ({
  startDate,
  endDate,
  status,
  onCancel,
  showButton = true,
}: DateTimeSectionProps) => {
  const showCancelButton =
    showButton && (status === 'upcoming' || status === 'unconfirmed');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start space-x-3">
        <div className="size-[54px] flex flex-col justify-center rounded-[12px] border border-custom-neutral-100/40 bg-white flex-shrink-0">
          <div className="flex justify-center rounded-t-[12px] bg-custom-neutral-50/50 h-[30%]">
            <p className="text-11 text-black-300/50">Nov</p>
          </div>
          <div className="flex items-end justify-center h-[70%]">
            <p className="text-heading-lg">17</p>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-heading-lg text-black-500">
            17 Nov <span className="text-black-300/50">Monday</span>
          </p>
          <p className="text-body-medium text-black-400">
            {`${startDate}-${endDate}`}
          </p>
        </div>
      </div>
      {showCancelButton && (
        <Button
          variant="outline"
          size="lg"
          className="w-full shadow-custom-sm hidden lg:flex"
          onClick={onCancel}
        >
          <Cancel01Icon />
          {status === 'upcoming' ? 'Cancel viewing' : 'Decline'}
        </Button>
      )}
    </div>
  );
};
