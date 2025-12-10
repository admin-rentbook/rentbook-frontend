import { Links } from '@/features/property-owners/constants';
import { MobileStepperSlider, Stepper } from '@/shared/components';
import { Header } from '@/shared/components/Header';
import { useMobile, useStepper } from '@/shared/hooks';
import { useNavigate } from '@tanstack/react-router';
import { steps } from './Steps';

export const Listings = () => {
  const stepper = useStepper(steps);
  const currentStep = steps[stepper.currentMainStep];
  const navigate = useNavigate();
  const {isMobile} = useMobile()

 const getCurrentComponent = () => {
  if (currentStep.subSteps?.length > 0) {
    const currentSubStepIndex = stepper.getCurrentSubStep(
      stepper.currentMainStep
    );
    const Component = currentStep.subSteps[currentSubStepIndex].component;

    return (
      <Component onNext={stepper.goForward} onPrev={stepper.goBack} />
    );
  } else {
    const Component = currentStep.component;
    return Component ? (
      <Component onNext={stepper.goForward} onPrev={stepper.goBack} />
    ) : null;
  }
};


  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <div>
        <Header
          title="Create listing"
          onCancel={() => navigate({ to: Links.CREATE_PROPERTY })}
        />
      </div>

       {/* ✅ Conditional rendering based on screen size */}
      {isMobile ? (
        // Mobile Layout with Slider
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
        // Desktop Layout with Sidebar Stepper
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