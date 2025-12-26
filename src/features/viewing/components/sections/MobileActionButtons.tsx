import { Button } from '@/shared/components';
import {
  Cancel01Icon,
  CheckmarkBadge01Icon,
  PencilEdit01Icon,
} from 'hugeicons-react';

type MobileActionButtonsProps = {
  status: string;
  onCancel?: () => void;
  onReschedule?: () => void;
  onAccept?: () => void;
};

export const MobileActionButtons = ({
  status,
  onCancel,
  onReschedule,
  onAccept,
}: MobileActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 lg:hidden">
      {(status === 'upcoming' || status === 'unconfirmed') && (
        <Button
          variant="outline"
          size="lg"
          className="w-full shadow-custom-sm"
          onClick={onCancel}
        >
          <Cancel01Icon />
          {status === 'upcoming' ? 'Cancel viewing' : 'Decline'}
        </Button>
      )}
      {status === 'upcoming' && (
        <Button
          variant="outline"
          size="lg"
          className="w-full shadow-custom-sm"
          onClick={(e) => {
            e.stopPropagation();
            onReschedule?.();
          }}
        >
          <PencilEdit01Icon />
          Reschedule viewing
        </Button>
      )}
      {status === 'unconfirmed' && (
        <Button
          variant="outline"
          size="lg"
          className="w-full shadow-custom-sm"
          onClick={onAccept}
        >
          <CheckmarkBadge01Icon />
          Accept
        </Button>
      )}
    </div>
  );
};