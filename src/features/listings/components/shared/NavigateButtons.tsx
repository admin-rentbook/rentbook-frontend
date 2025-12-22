import { Button } from '@/shared/components';

type NavigateButtonsProps = {
  onBack?: () => void;
  isButtonDisabled?: boolean;
  onContinue?: () => void;
  btnText?: string;
  saveBtnText?: string;
  isLoading?:boolean
};

export const NavigateButtons = ({
  isButtonDisabled,
  onContinue,
  onBack,
  btnText = 'Back',
  saveBtnText = 'Continue',
  isLoading = false
}: NavigateButtonsProps) => {
  return (
    <div className="flex w-full lg:w-auto gap-4 h-full px-2 align-baseline items-end justify-end">
      <Button variant="tertiary" className="w-1/2 lg:w-auto" onClick={onBack}>
        {btnText}
      </Button>
      <Button
        disabled={isButtonDisabled}
        className="w-1/2 lg:w-auto"
        onClick={onContinue}
        isLoading={isLoading}
      >
        {saveBtnText}
      </Button>
    </div>
  );
};
