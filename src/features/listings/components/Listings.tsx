import { Stepper } from '@/shared/components';
import { Header } from '@/shared/components/Header';
import { useStepper } from '@/shared/hooks';
import { steps } from './Steps';

export const Listings = () => {
  const stepper = useStepper(steps);
  const currentStep = steps[stepper.currentMainStep];

  const getCurrentComponent = () => {
    if (currentStep.subSteps?.length > 0) {
      const Component = currentStep.subSteps[stepper.currentSubStep].component;
      return <Component onNext={stepper.nextSubStep} />;
    } else {
      const Component = currentStep.component;
      return Component ? <Component onNext={stepper.nextMainStep} /> : null;
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <div>
        <Header title="Create listing" onCancel={() => {}} />
      </div>

      <div className="grid grid-cols-[40%_1fr] p-5 lg:px-10 lg:pt-10">
        <div className="h-fit sticky top-8">
          <Stepper steps={steps} stepper={stepper} />
        </div>
        <div>{getCurrentComponent()}</div>
      </div>
    </div>
  );
};
