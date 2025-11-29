import { type UseStepper } from '@/shared/hooks';
import type { Step } from '@/shared/types';
import { MainStep } from './MainStep';
import { SubStep } from './SubStep';
import { VerticalDottedLine } from './VerticalDottedLine';

type StepperProps = {
  steps: Step[];
  className?: string;
  stepper: UseStepper;
};

export const Stepper = ({ steps, className = '', stepper }: StepperProps) => {
  return (
    <div className={className}>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {index < steps.length - 1 && <VerticalDottedLine />}
            <MainStep
              step={step}
              index={index}
              isActive={stepper.currentMainStep === step.id}
              isCompleted={stepper.isMainStepCompleted(step.id)}
              isExpanded={stepper.expandedSteps[step.id]}
              progressPercentage={stepper.getProgressPercentage(step.id)}
              completedCount={stepper.getCompletedSubStepsCount(step.id)}
              onStepClick={() => {
                stepper.goToStep(step.id);
                stepper.toggleExpand(step.id);
              }}
              showConnector={index < steps.length - 1}
            />

            {/* Sub Steps */}
            {step.subSteps?.length > 0 && stepper.expandedSteps[step.id] && (
              <div className="space-y-3 pl-12">
                {step.subSteps.map((subStep) => {
                  const isActive =
                    stepper.currentMainStep === step.id &&
                    stepper.getCurrentSubStep(step.id) === subStep.id;
                  const isCompleted = stepper.isSubStepCompleted(
                    step.id,
                    subStep.id
                  );

                  return (
                    <SubStep
                      key={subStep.id}
                      subStep={subStep}
                      isActive={isActive}
                      isCompleted={isCompleted}
                      onClick={() => stepper.goToStep(step.id, subStep.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
