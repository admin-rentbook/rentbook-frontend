import { currencyFormatter } from '@/shared/utils';
import { CheckmarkCircle01Icon } from 'hugeicons-react';

type PaymentBreakdownProps = {
  viewingFee: number;
  serviceFee: number;
  totalCost: number;
  cancellationDate: string;
};

export const PaymentBreakdown = ({
  viewingFee,
  serviceFee,
  totalCost,
  cancellationDate,
}: PaymentBreakdownProps) => {
  return (
    <div className="space-y-4">
      {/* Instant Confirmation Info */}
      <div className="bg-primary-100 rounded-[1.25em] p-4 space-y-2">
        <div className="flex items-center gap-2 text-primary-500">
          <CheckmarkCircle01Icon className="size-5" />
          <p className="text-body-18 font-medium">Approval required</p>
        </div>
        <p className="text-body-small text-red-400">
          Viewing request is subject to approver by the property owner. Viewing
          fee will be held in trust by rentbook until you acknowledge viewing
          has been one. <span className="underline cursor-pointer">Learn more</span>
        </p>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-body-small text-black-300">Viewing fee</p>
          <p className="text-body-small text-black-400">
            {currencyFormatter.format(viewingFee, false)}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-body-small text-black-300">Service fee</p>
          <p className="text-body-small text-black-400">
            {currencyFormatter.format(serviceFee, false)}
          </p>
        </div>

        <div className="h-[1px] w-full bg-custom-gray-300" />

        <div className="flex justify-between items-center">
          <p className="text-body-medium text-black-500">Total cost</p>
          <p className="text-body-medium text-black-500">
            {currencyFormatter.format(totalCost, false)}
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-custom-gray-100" />

      {/* Cancellation Policy */}
      <p className="text-body-small text-black-300">
        Get full refund when you cancel on or before {cancellationDate}.{' '}
        <span className="underline cursor-pointer text-black-500">
          Learn more
        </span>
      </p>
    </div>
  );
};
