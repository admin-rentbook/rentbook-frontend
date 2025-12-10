import { Button } from '@/shared/components';

type NavigateButtonsProps = {
  onBack: () => void;
  isButtonDisabled?: boolean;
  onContinue?: () => void;
  btnText?: string;
  saveBtnText?:string
};

export const NavigateButtons = ({
  isButtonDisabled,
  onContinue,
  onBack,
  btnText = 'Back',
  saveBtnText='Continue'
}: NavigateButtonsProps) => {
  return (
    <div className="flex w-full gap-4 h-full align-baseline items-end justify-end">
      <Button variant="tertiary" onClick={onBack}>
        {btnText}
      </Button>
      <Button disabled={isButtonDisabled} onClick={onContinue}>
        {saveBtnText}
      </Button>
    </div>
  );
};
