interface Step {
  id: number;
  title: string;
  subSteps?: Array<{
    id: number;
    title: string;
  }>;
}

interface MobileStepperSliderProps {
  steps: Step[];
  currentMainStep: number;
  currentSubStep: number;
  isStepComplete: (mainStep: number, subStep: number) => boolean;
  isMainStepComplete: (mainStep: number) => boolean;
}

export const MobileStepperSlider = ({
  steps,
  currentMainStep,
  currentSubStep,
  isStepComplete,
}: MobileStepperSliderProps) => {
  const calculateProgress = () => {
    let totalSubSteps = 0;
    let completedSubSteps = 0;

    steps.forEach((step, mainIndex) => {
      if (step.subSteps?.length) {
        totalSubSteps += step.subSteps.length;

        // Count completed substeps
        step.subSteps.forEach((_, subIndex) => {
          if (isStepComplete(mainIndex, subIndex)) {
            completedSubSteps++;
          }
        });
      } else {
        totalSubSteps += 1;
        if (mainIndex < currentMainStep) {
          completedSubSteps += 1;
        }
      }
    });

    return totalSubSteps > 0 ? (completedSubSteps / totalSubSteps) * 100 : 0;
  };

  return (
    <div className="w-full bg-white sticky top-0 z-10 px-4 py-4">
      {/* Progress Bar - moves with every substep completion */}
      <div className="h-2 bg-custom-neutral-150 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 transition-all duration-500 ease-out"
          style={{
            width: `${calculateProgress()}%`,
          }}
        />
      </div>

      {/* Optional: Show current step text */}
      <div className="mt-2 text-black-400 text-center text-body-xs">
        {steps[currentMainStep]?.title}
        {steps[currentMainStep]?.subSteps &&
          steps[currentMainStep].subSteps!.length > 0 && (
            <span className="ml-1">
              ({currentSubStep + 1}/{steps[currentMainStep].subSteps!.length})
            </span>
          )}
      </div>
    </div>
  );
};
