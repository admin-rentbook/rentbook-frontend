import { convertUnderscoreToSpace } from '@/shared/utils';
type AdditionalFeeCardProps = {
  additionalFee: {
    feeName: string;
    paymentFrequency: string;
    feeRequirement: string;
    amount?: number | undefined;
  };
};
export const AdditionalFeeBox = ({
  additionalFee,
}: AdditionalFeeCardProps) => {
  return (
    <div key={additionalFee.feeName} className="flex flex-col gap-1">
      <p className="text-heading-4 text-neutral-600">{additionalFee.feeName}</p>
      <p className="text-body-medium text-black-500">
        N${additionalFee.amount}
        <span className="text-black-400">
          , paid {convertUnderscoreToSpace(additionalFee.paymentFrequency)}
        </span>
        <span className="text-black-500">
          <b /> {convertUnderscoreToSpace(additionalFee.feeRequirement)}
        </span>
      </p>
    </div>
  );
};
