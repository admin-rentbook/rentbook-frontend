import type { Step } from '@/shared/types';
import {
  Calendar04Icon,
  GuestHouseIcon,
  Image02Icon,
  NoteIcon,
  PayByCheckIcon,
  type HugeiconsProps,
} from 'hugeicons-react';

type HugeIconsTypeProps = React.FC<
  Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

export type FlatStep = {
  id: string;
  title: string;
  icon: HugeIconsTypeProps;
  mainStepIndex: number;
  subStepIndex: number;
  apiStepName: string;
};

export const flattenSteps = (steps: Step[]): FlatStep[] => {
  const flatSteps: FlatStep[] = [];

  steps.forEach((mainStep, mainIndex) => {
    if (mainStep.subSteps && mainStep.subSteps.length > 0) {
      mainStep.subSteps.forEach((subStep, subIndex) => {
        flatSteps.push({
          id: `${mainIndex}-${subIndex}`,
          title: subStep.title,
          icon: getIconForStep(subStep.title),
          mainStepIndex: mainIndex,
          subStepIndex: subIndex,
          apiStepName: subStep.apiStepName as string,
        });
      });
    }
  });

  return flatSteps;
};

const getIconForStep = (title: string): HugeIconsTypeProps => {
  // Map based on user specifications
  const iconMap: Record<string, HugeIconsTypeProps> = {
    'Listing description': GuestHouseIcon,
    Amenities: NoteIcon,
    'Add media': Image02Icon,
    'Set your price': PayByCheckIcon,
    'Set viewing': Calendar04Icon,
    'Set final details': NoteIcon,
    'Additional details': NoteIcon,
    'Review listing': NoteIcon,
  };

  return iconMap[title] || NoteIcon;
};
