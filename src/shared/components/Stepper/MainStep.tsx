import { cn } from '@/shared/lib/utils';
import type { Step } from '@/shared/types';
import { CircularProgressLoader } from './CircularProgressLoader';

type MainStepProps = {
  step: Step;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isExpanded: boolean;
  progressPercentage: number;
  completedCount: number;
  onStepClick: () => void;
  showConnector: boolean;
};

export const MainStep = (props: MainStepProps) => {
  return (
    <div className="relative">
      <button
        onClick={props.onStepClick}
        className="flex items-start gap-4 w-full text-left group"
      >
        <div className="relative flex-shrink-0 bg-white">
          <CircularProgressLoader
            percentage={props.progressPercentage}
            isCompleted={props.isCompleted}
            stepNumber={props.index + 1}
            size={35}
          />
        </div>

        <div className="flex-1 pt-2">
          <div className="flex items-center justify-between pb-2">
            <h3
              className={cn('text-body-medium transition-colors duration-200', {
                'text-black-500 font-semibold': props.isActive,
                'text-black-500': props.isCompleted,
                'text-black-400 font-normal':
                  !props.isActive && !props.isCompleted,
              })}
            >
              {props.step.title}
            </h3>
          </div>
        </div>
      </button>
    </div>
  );
};
