import { Button } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { Cancel01Icon } from 'hugeicons-react';
import type { PublicListingDTO } from '../../types';
import { DateTimeDisplay } from './DateTimeDisplay';
import { PaymentBreakdown } from './PaymentBreakdown';
import { PropertyDetailsCard } from './PropertyDetailsCard';
import { getFormattedDate } from './utils';

type RequestViewingContentProps = {
  property: PublicListingDTO;
  selectedDate: string | null;
  selectedTimeSlot: {
    id: string;
    startTime: string;
    endTime: string;
  } | null;
  viewingFee: number;
  serviceFee: number;
  totalCost: number;
  cancellationDate: string;
  onBack: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

export const RequestViewingContent = ({
  property,
  selectedDate,
  selectedTimeSlot,
  viewingFee,
  serviceFee,
  totalCost,
  cancellationDate,
  onBack,
  onConfirm,
  onClose,
}: RequestViewingContentProps) => {
  const { isMobile } = useMobile();
  const dateInfo = getFormattedDate(selectedDate);

  return (
    <div className="p-6 space-y-6 h-full lg:h-auto flex flex-col justify-between">
      {/* Header */}
      <div className="mb-6 flex justify-between">
        <h2 className="text-heading-5 text-neutral-600">Request a viewing</h2>
        {!isMobile && (
          <Button variant="icon" className="text-black-300" onClick={onClose}>
            <Cancel01Icon className="size-6" />
          </Button>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Property Details */}
        <div className="space-y-4">
          <PropertyDetailsCard property={property} />
          <DateTimeDisplay dateInfo={dateInfo} timeSlot={selectedTimeSlot} />
        </div>

        {/* Right Side - Payment Details */}
        <PaymentBreakdown
          viewingFee={viewingFee}
          serviceFee={serviceFee}
          totalCost={totalCost}
          cancellationDate={cancellationDate}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-10 lg:h-auto pb-10 lg:pb-4">
        <Button
          variant="tertiary"
          size="lg"
          className="lg:w-auto w-1/2"
          onClick={onBack}
        >
          Back
        </Button>
        <Button size="lg" onClick={onConfirm} className="lg:w-auto w-1/2">
          Make payment
        </Button>
      </div>
    </div>
  );
};
