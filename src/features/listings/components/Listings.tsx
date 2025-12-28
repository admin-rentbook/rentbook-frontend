import { Button, MobileStepperSlider, Stepper } from '@/shared/components';
import { Header } from '@/shared/components/Header';
import { useListingsPage } from '../hooks/useListingsPage';

export const Listings = () => {
  const {
    isMobile,
    stepper,
    steps,
    getCurrentComponent,
    handleSaveAndExit,
    handleCancel,
    isSaveDisabled,
  } = useListingsPage();

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <div className="flex justify-between items-center pr-5">
        <Header title="Create listing" onCancel={handleCancel} />
        <Button
          variant="tertiary"
          onClick={handleSaveAndExit}
          disabled={isSaveDisabled}
        >
          Save & exit
        </Button>
      </div>

      {isMobile ? (
        <div className="flex flex-col h-full">
          <MobileStepperSlider
            steps={steps}
            currentMainStep={stepper.currentMainStep}
            currentSubStep={stepper.getCurrentSubStep(stepper.currentMainStep)}
            isStepComplete={stepper.isSubStepCompleted}
            isMainStepComplete={stepper.isMainStepCompleted}
          />
          <div className="flex-1 overflow-y-auto p-4">
            {getCurrentComponent()}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[30%_1fr] p-5 lg:px-10 lg:pt-10">
          <div className="h-fit sticky top-8">
            <Stepper steps={steps} stepper={stepper} />
          </div>
          <div>{getCurrentComponent()}</div>
        </div>
      )}
    </div>
  );
};
