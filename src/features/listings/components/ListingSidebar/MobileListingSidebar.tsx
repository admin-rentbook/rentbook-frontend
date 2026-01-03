import { Button } from '@/shared/components/ui/button';
import { Sheet } from '@/shared/components/Sheet';
import type { UseStepper } from '@/shared/hooks/useStepper';
import type { Step } from '@/shared/types';
import { CheckmarkCircle02Icon, Menu01Icon } from 'hugeicons-react';
import { useState } from 'react';
import { flattenSteps } from './utils';
import { cn } from '@/shared/lib/utils';

type MobileListingSidebarProps = {
  steps: Step[];
  stepper: UseStepper;
};

export const MobileListingSidebar = ({
  steps,
  stepper,
}: MobileListingSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const flatSteps = flattenSteps(steps);

  // Get current step title
  const currentFlatStep = flatSteps.find(
    (step) =>
      step.mainStepIndex === stepper.currentMainStep &&
      step.subStepIndex === stepper.getCurrentSubStep(stepper.currentMainStep)
  );

  const currentStepTitle = currentFlatStep?.title || 'Steps';

  const handleNavigate = (mainStep: number, subStep: number) => {
    stepper.goToStep(mainStep, subStep);
    setIsOpen(false);
  };

  const isCurrentStep = (mainIndex: number, subIndex: number) => {
    return (
      stepper.currentMainStep === mainIndex &&
      stepper.getCurrentSubStep(mainIndex) === subIndex
    );
  };

  const isStepCompleted = (mainIndex: number, subIndex: number) => {
    return stepper.isSubStepCompleted(mainIndex, subIndex);
  };

  return (
    <div className="p-4 border-b">
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        side="bottom"
        className="h-[80vh]"
        title="Listing Steps"
        description="Navigate between listing creation steps"
        trigger={
          <Button variant="outline" className="w-full justify-start gap-2">
            <Menu01Icon className="size-4" />
            <span className="truncate">{currentStepTitle}</span>
          </Button>
        }
      >
        <div className="flex flex-col h-full p-4">
          <h2 className="text-heading-5 text-black-500 mb-4">Listing Steps</h2>
          <nav className="flex flex-col gap-2">
            {flatSteps.map((step) => {
              const Icon = step.icon;
              const isCurrent = isCurrentStep(
                step.mainStepIndex,
                step.subStepIndex
              );
              const isCompleted = isStepCompleted(
                step.mainStepIndex,
                step.subStepIndex
              );

              return (
                <button
                  key={step.id}
                  onClick={() =>
                    handleNavigate(step.mainStepIndex, step.subStepIndex)
                  }
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
                    'border-l-4',
                    isCurrent
                      ? 'bg-primary-50 border-primary-500'
                      : 'border-transparent hover:bg-neutral-50'
                  )}
                >
                  <div
                    className={cn(
                      'flex-shrink-0 size-10 rounded-lg flex items-center justify-center',
                      isCurrent
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-neutral-100 text-neutral-600'
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        'text-sm truncate',
                        isCurrent
                          ? 'text-primary-700 font-medium'
                          : 'text-neutral-700'
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                  {isCompleted && !isCurrent && (
                    <CheckmarkCircle02Icon className="flex-shrink-0 size-5 text-green-600" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </Sheet>
    </div>
  );
};