import type { StepProgress } from '@/shared/types';
import {
  clearDataFromSessStorage,
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '@/shared/utils/helpers';
import type { ListingDraft } from '../types';

export const listingDraftStorage = {
  getDraft: (): ListingDraft | null => {
    try {
      const draft = getDataFromSessStorage('listing_draft') as ListingDraft;
      return draft ? draft : null;
    } catch (error) {
      console.log('Error reading draft', error);
      return null;
    }
  },

  initializeDraft: (): ListingDraft => {
    const draft: ListingDraft = {
      draftId: `draft_${Date.now()}`,
      createAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      progress: {
        currentMainStep: 0,
        currentSubStep: 0,
        completedSteps: {},
        lastUpdated: new Date().toISOString(),
      },
      isComplete: false,
    };
    listingDraftStorage.saveDraft(draft);
    return draft;
  },

  saveDraft: (draft: ListingDraft): void => {
    try {
      draft.lastUpdated = new Date().toISOString();
      saveDataToSessStorage('listing_draft', draft);
      console.log('Draft saved', draft);
    } catch (error) {
      console.log('Error saving draft', error);
    }
  },

  updateStepData: <
    K extends keyof Omit<
      ListingDraft,
      'draftId' | 'createdAt' | 'lastUpdated' | 'progress' | 'isComplete'
    >,
  >(
    stepKey: K,
    data: ListingDraft[K]
  ): void => {
    const draft =
      listingDraftStorage.getDraft() || listingDraftStorage.initializeDraft();
    draft[stepKey] = data;
    listingDraftStorage.saveDraft(draft);
  },

  updateProgress: (progress: Partial<StepProgress>): void => {
    const draft =
      listingDraftStorage.getDraft() || listingDraftStorage.initializeDraft();
    draft.progress = {
      ...draft.progress,
      ...progress,
      lastUpdated: new Date().toISOString(),
    };
    listingDraftStorage.saveDraft(draft);
  },

  markStepComplete: (mainStepId: number, subStepId: number): void => {
    const draft =
      listingDraftStorage.getDraft() || listingDraftStorage.initializeDraft();

    const stepKey = `${mainStepId}-${subStepId}`;

    // Ensure completedSteps is an object
    if (typeof draft.progress.completedSteps !== 'object') {
      draft.progress.completedSteps = {};
    }

    // Mark the step as completed (true)
    if (!draft.progress.completedSteps[stepKey]) {
      draft.progress.completedSteps[stepKey] = true;
      draft.progress.lastUpdated = new Date().toISOString();
      listingDraftStorage.saveDraft(draft);
    }
  },
  markMainStepComplete: (mainStepId: number): void => {
    const draft =
      listingDraftStorage.getDraft() || listingDraftStorage.initializeDraft();
    const mainStepKey = `main-${mainStepId}`;

    if (!draft.progress.completedSteps[mainStepKey]) {
      draft.progress.completedSteps[mainStepKey] = true;
      listingDraftStorage.saveDraft(draft);
    }
  },

  // Check if step is complete
  isStepComplete: (mainStepId: number, subStepId: number): boolean => {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return false;

    const stepKey = `${mainStepId}-${subStepId}`;
    return draft.progress.completedSteps?.[stepKey] === true;
  },

  isMainStepComplete: (mainStepId: number): boolean => {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return false;
    const mainStepKey = `main-${mainStepId}`;
    return !!draft.progress.completedSteps[mainStepKey];
  },

  // Clear draft
  clearDraft: (): void => {
    clearDataFromSessStorage('listing_draft');
    console.log('Draft cleared');
  },

  // Get specific step data
  getStepData: <K extends keyof ListingDraft>(
    stepKey: K
  ): ListingDraft[K] | null => {
    const draft = listingDraftStorage.getDraft();
    return draft ? draft[stepKey] : null;
  },
};
