import type { Step } from '../types';

// Helper to find step by API name
export const findStepByApiName = (
  steps: Step[],
  apiStepName: string
): { mainStep: number; subStep: number } | null => {
  for (let mainIndex = 0; mainIndex < steps.length; mainIndex++) {
    const mainStep = steps[mainIndex];
    for (let subIndex = 0; subIndex < mainStep.subSteps.length; subIndex++) {
      if (mainStep.subSteps[subIndex].apiStepName === apiStepName) {
        return { mainStep: mainIndex, subStep: subIndex };
      }
    }
  }
  return null;
};

// Helper to get API name from step indices
export const getApiStepName = (
  steps: Step[],
  mainStepId: number,
  subStepId: number
): string | undefined => {
  const mainStep = steps.find((s) => s.id === mainStepId);
  if (!mainStep) return undefined;

  const subStep = mainStep.subSteps.find((s) => s.id === subStepId);
  return subStep?.apiStepName;
};
