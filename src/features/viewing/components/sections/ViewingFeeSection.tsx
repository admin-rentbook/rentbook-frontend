import { Button } from '@/shared/components';
import { currencyFormatter } from '@/shared/utils';
import {
  CheckmarkBadge01Icon,
  Money03Icon,
  PencilEdit01Icon,
} from 'hugeicons-react';

type ViewingFeeSectionProps = {
  amount: number;
  status: string;
  onReschedule?: () => void;
  onAccept?: () => void;
  showButton?: boolean;
};

export const ViewingFeeSection = ({
  amount,
  status,
  onReschedule,
  onAccept,
  showButton = true,
}: ViewingFeeSectionProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start space-x-3">
        <div className="size-[54px] grid place-items-center rounded-[12px] border border-custom-neutral-100/40 bg-white flex-shrink-0">
          <Money03Icon className="size-6 text-icons-black" />
        </div>
        <div className="flex-1">
          <p className="text-heading-lg text-black-500">
            {currencyFormatter.format(amount, false)}/viewer
          </p>
          <p className="text-body-medium text-black-300">Viewing fee</p>
        </div>
      </div>
      {showButton && status === 'upcoming' && (
        <Button
          variant="outline"
          size="lg"
          className="w-full shadow-custom-sm hidden lg:flex"
          onClick={(e) => {
            e.stopPropagation();
            onReschedule?.();
          }}
        >
          <PencilEdit01Icon />
          Reschedule viewing
        </Button>
      )}
      {showButton && status === 'unconfirmed' && (
        <Button
          variant="outline"
          size="lg"
          className="w-full shadow-custom-sm hidden lg:flex"
          onClick={onAccept}
        >
          <CheckmarkBadge01Icon />
          Accept
        </Button>
      )}
    </div>
  );
};