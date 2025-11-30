import type { SubStepType } from '@/shared/types';
import { SubStepCheckbox } from './SubStepCheckbox';

type SubStepProps = {
  subStep: SubStepType;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
};

export const SubStep = (props: SubStepProps) => {
  return (
    <div
      onClick={props.onClick}
      className="flex items-center gap-3 w-full text-left group"
    >
      <SubStepCheckbox isCompleted={props.isCompleted} />
      <span className='text-body-small'>
        {props.subStep.title}
      </span>
    </div>
  );
};
