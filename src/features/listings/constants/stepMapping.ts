/**
 * Maps API step names to step coordinates (mainStep, subStep)
 * This is the single source of truth for step progression
 */

export type StepCoordinate = {
  mainStep: number;
  subStep: number;
  apiStepName: string;
  title: string;
};

export const STEP_MAP: StepCoordinate[] = [
  // Main Step 0: About your listing
  {
    mainStep: 0,
    subStep: 0,
    apiStepName: 'listings',
    title: 'Listing description',
  },
  {
    mainStep: 0,
    subStep: 1,
    apiStepName: 'amenities',
    title: 'Amenities',
  },
  {
    mainStep: 0,
    subStep: 2,
    apiStepName: 'media',
    title: 'Add media',
  },

  // Main Step 1: Cost & fees
  {
    mainStep: 1,
    subStep: 0,
    apiStepName: 'pricing',
    title: 'Set your price',
  },

  // Main Step 2: Viewing
  {
    mainStep: 2,
    subStep: 0,
    apiStepName: 'viewing',
    title: 'Set viewing',
  },

  // Main Step 3: Final details
  {
    mainStep: 3,
    subStep: 0,
    apiStepName: 'availability',
    title: 'Set final details',
  },
  {
    mainStep: 3,
    subStep: 1,
    apiStepName: 'additional_details',
    title: 'Additional details',
  },

  // Main Step 4: Review
  {
    mainStep: 4,
    subStep: 0,
    apiStepName: 'review',
    title: 'Review listing',
  },
];

/**
 * Get step coordinates from API step name
 */
export const getStepFromApiName = (
  apiStepName: string
): StepCoordinate | null => {
  return STEP_MAP.find((step) => step.apiStepName === apiStepName) || null;
};

/**
 * Get API step name from coordinates
 */
export const getApiStepName = (
  mainStep: number,
  subStep: number
): string | null => {
  const step = STEP_MAP.find(
    (s) => s.mainStep === mainStep && s.subStep === subStep
  );
  return step?.apiStepName || null;
};

/**
 * Get all completed steps up to and including the given API step
 */
export const getCompletedStepsUpTo = (
  currentApiStep: string
): Record<string, boolean> => {
  const currentStepCoord = getStepFromApiName(currentApiStep);
  if (!currentStepCoord) return {};

  const completedSteps: Record<string, boolean> = {};

  // Mark all steps up to (but not including) current step as complete
  STEP_MAP.forEach((step) => {
    const isBefore =
      step.mainStep < currentStepCoord.mainStep ||
      (step.mainStep === currentStepCoord.mainStep &&
        step.subStep < currentStepCoord.subStep);

    if (isBefore) {
      completedSteps[`${step.mainStep}-${step.subStep}`] = true;
    }
  });

  return completedSteps;
};

/**
 * Get the next step coordinates
 */
export const getNextStep = (
  mainStep: number,
  subStep: number
): StepCoordinate | null => {
  const currentIndex = STEP_MAP.findIndex(
    (s) => s.mainStep === mainStep && s.subStep === subStep
  );

  if (currentIndex === -1 || currentIndex === STEP_MAP.length - 1) {
    return null;
  }

  return STEP_MAP[currentIndex + 1];
};
