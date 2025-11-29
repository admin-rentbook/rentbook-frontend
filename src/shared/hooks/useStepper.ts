import { useState } from 'react';
import type { Step } from '../types';

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
  nextSubStep: () => void;
  nextMainStep: () => void;
};

export const useStepper = (steps: Step[]): UseStepper => {
  const [currentMainStep, setCurrentMainStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState<Record<number, number>>(
    {}
  );
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    {}
  );
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleExpand = (stepId: number) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
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

  const nextSubStep = () => {
    const step = steps[currentMainStep];
    if (!step?.subSteps?.length) return;

    const current = getCurrentSubStep(currentMainStep);
    completeSubStep(currentMainStep, current);

    const nextSubStepIndex = current + 1;
    if (nextSubStepIndex < step.subSteps.length) {
      setCurrentSubStep({
        ...currentSubStep,
        [currentMainStep]: nextSubStepIndex,
      });
    }
  };

  const nextMainStep = () => {
    if (currentMainStep < steps.length - 1) {
      setCurrentMainStep(currentMainStep + 1);
      toggleExpand(currentMainStep + 1);
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
    nextSubStep,
    nextMainStep,
  };
};
