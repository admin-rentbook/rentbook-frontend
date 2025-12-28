import { useState } from 'react';
import type { Step } from '../types';

export type StepperInitialState = {
  initialMainStep?: number;
  initialSubStep?: Record<number, number>;
  initialCompletedSteps?: Record<string, boolean>;
};

export type UseStepper = {
  currentMainStep: number;
  currentSubStep: number;
  expandedSteps: Record<number, boolean>;
  completedSteps: Record<string, boolean>;
  toggleExpand: (stepId: number) => void;
  goToStep: (mainStepId: number, subStepId?: number | undefined) => void;
  completeSubStep: (mainStepId: number, subStepId: number) => void;
  completeMainStep: (mainStepId: number) => void;
  isSubStepCompleted: (mainStepId: number, subStepId: number) => boolean;
  isMainStepCompleted: (stepId: number) => boolean;
  getCompletedSubStepsCount: (stepId: number) => number;
  getProgressPercentage: (stepId: number) => number;
  getCurrentSubStep: (mainStepId: number) => number;
  goBack: () => void;
  goForward: () => void;
};

export const useStepper = (
  steps: Step[],
  initialState?: StepperInitialState
): UseStepper => {
  const [currentMainStep, setCurrentMainStep] = useState(
    initialState?.initialMainStep ?? 0
  );
  const [currentSubStep, setCurrentSubStep] = useState<Record<number, number>>(
    initialState?.initialSubStep ?? {}
  );
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    initialState?.initialCompletedSteps ?? {}
  );

  // Expand the current main step and the first step by default
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
    0: true,
    [initialState?.initialMainStep ?? 0]: true,
  });

  const toggleExpand = (stepId: number) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepId]: true,
    }));
  };

  const goToStep = (mainStepId: number, subStepId: number | undefined = 0) => {
    setCurrentMainStep(mainStepId);
    if (subStepId !== null) {
      setCurrentSubStep({ ...currentSubStep, [mainStepId]: subStepId });
    }
  };

  const completeSubStep = (mainStepId: number, subStepId: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [`${mainStepId}-${subStepId}`]: true,
    }));
  };
  const completeMainStep = (mainStepId: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [`${mainStepId}-complete`]: true,
    }));
  };

  const isSubStepCompleted = (mainStepId: number, subStepId: number) => {
    return completedSteps[`${mainStepId}-${subStepId}`] || false;
  };

  const getCompletedSubStepsCount = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step?.subSteps.length) return 0;
    return step.subSteps.filter((sub) => isSubStepCompleted(stepId, sub.id))
      .length;
  };

  const isMainStepCompleted = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step?.subSteps.length)
      return completedSteps[`${stepId}-complete`] || false;
    return step.subSteps.every((sub) => isSubStepCompleted(stepId, sub.id));
  };

  const getProgressPercentage = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step?.subSteps.length) return 0;
    const completed = getCompletedSubStepsCount(stepId);
    return (completed / step.subSteps.length) * 100;
  };

  const getCurrentSubStep = (mainStepId: number) => {
    return currentSubStep[mainStepId] ?? 0;
  };

  const goBack = () => {
    const currentSubStepIndex = getCurrentSubStep(currentMainStep);

    console.log('goBack:', { currentMainStep, currentSubStepIndex });

    // Try to go to previous substep first
    if (currentSubStepIndex > 0) {
      setCurrentSubStep((prev) => ({
        ...prev,
        [currentMainStep]: currentSubStepIndex - 1,
      }));
    }
    // Go to previous main step
    else if (currentMainStep > 0) {
      const prevStepIndex = currentMainStep - 1;
      const prevStep = steps[prevStepIndex];

      setCurrentMainStep(prevStepIndex);
      toggleExpand(prevStepIndex);

      // Set to last substep of previous main step
      if (prevStep?.subSteps?.length) {
        setCurrentSubStep((prev) => ({
          ...prev,
          [prevStepIndex]: prevStep.subSteps.length - 1,
        }));
      } else {
        setCurrentSubStep((prev) => ({
          ...prev,
          [prevStepIndex]: 0,
        }));
      }
    }
  };

  const goForward = () => {
    const step = steps[currentMainStep];
    const current = getCurrentSubStep(currentMainStep);
    // Mark current substep as complete
    if (step?.subSteps?.length) {
      completeSubStep(currentMainStep, current);
    }
    // Try to go to next substep first
    if (step?.subSteps?.length && current < step.subSteps.length - 1) {
      setCurrentSubStep((prev) => ({
        ...prev,
        [currentMainStep]: current + 1,
      }));
    }
    // Go to next main step
    else if (currentMainStep < steps.length - 1) {
      setCurrentMainStep(currentMainStep + 1);
      toggleExpand(currentMainStep + 1);
      setCurrentSubStep((prev) => ({
        ...prev,
        [currentMainStep + 1]: 0,
      }));
    }
  };

  return {
    currentMainStep,
    currentSubStep: getCurrentSubStep(currentMainStep),
    expandedSteps,
    completedSteps,
    toggleExpand,
    goToStep,
    completeSubStep,
    completeMainStep,
    isSubStepCompleted,
    isMainStepCompleted,
    getCompletedSubStepsCount,
    getProgressPercentage,
    getCurrentSubStep,
    goBack,
    goForward,
  };
};
