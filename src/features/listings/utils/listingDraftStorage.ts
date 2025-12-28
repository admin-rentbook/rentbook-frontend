import type { StepProgress } from '@/shared/types';
import {
  clearDataFromSessStorage,
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '@/shared/utils/helpers';
import {
  getCompletedStepsUpTo,
  getStepFromApiName,
} from '../constants/stepMapping';
import type {
  AmenitiesData,
  ListingDescriptionDTO,
  ListingDraft,
  ListingStepResponse,
} from '../types';
import { mapListingDescriptionDtoToDraft } from '../types/mappedTypes';

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

  syncProgressFromApiData(apiData: {
    listing_id: number;
    current_step?: string;
    listingDescription?: ListingDescriptionDTO;
    amenities?: AmenitiesData;
  }): void {
    let draft = listingDraftStorage.getDraft();
    if (!draft) {
      draft = listingDraftStorage.initializeDraft();
    }

    // Update draft with API data
    draft.listingId = apiData.listing_id;
    draft.listingDescription = mapListingDescriptionDtoToDraft(
      apiData.listingDescription
    );
    draft.amenities = apiData.amenities;

    if (apiData.current_step) {
      const stepCoord = getStepFromApiName(apiData.current_step);

      if (stepCoord) {
        // Mark all steps up to (but not including) current step as completed
        const completedSteps = getCompletedStepsUpTo(apiData.current_step);

        const currentSubStep = draft.progress.currentSubStep || {};

      
        if (apiData.current_step === 'additional_details') {
          // Mark additional_details as completed
          completedSteps[`${stepCoord.mainStep}-${stepCoord.subStep}`] = true;

          // Advance to review step
          currentSubStep[4] = 0;
          draft.progress = {
            ...draft.progress,
            currentMainStep: 4,
            currentSubStep: currentSubStep,
            completedSteps: {
              ...draft.progress.completedSteps,
              ...completedSteps,
            },
            apiSyncedSteps: {
              ...draft.progress.apiSyncedSteps,
              [apiData.current_step]: true,
            },
          };
        } else {
          currentSubStep[stepCoord.mainStep] = stepCoord.subStep;

          draft.progress = {
            ...draft.progress,
            currentMainStep: stepCoord.mainStep,
            currentSubStep: currentSubStep,
            completedSteps: {
              ...draft.progress.completedSteps,
              ...completedSteps,
            },
            apiSyncedSteps: {
              ...draft.progress.apiSyncedSteps,
              [apiData.current_step]: true,
            },
          };
        }

        draft.apiCurrentStep = apiData.current_step;
      }
    }

    draft.lastUpdated = new Date().toISOString();
    listingDraftStorage.saveDraft(draft);
  },

  getFurthestCompletedStep(): { mainStep: number; subStep: number } {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return { mainStep: 0, subStep: 0 };

    let furthestMain = 0;
    let furthestSub = 0;

    Object.keys(draft.progress.completedSteps).forEach((key) => {
      if (draft.progress.completedSteps[key]) {
        const [main, sub] = key.split('-').map(Number);
        if (!isNaN(main) && !isNaN(sub)) {
          if (
            main > furthestMain ||
            (main === furthestMain && sub > furthestSub)
          ) {
            furthestMain = main;
            furthestSub = sub;
          }
        }
      }
    });

    return { mainStep: furthestMain, subStep: furthestSub };
  },

  updateFromApiResponse(response: ListingStepResponse): void {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return;

    // Get step coordinates from API step name
    const stepCoord = getStepFromApiName(response.current_step);

    const updated: ListingDraft = {
      ...draft,
      listingId: response.listing_id,
      apiCurrentStep: response.current_step,
      lastUpdated: new Date().toISOString(),
    };

    if (stepCoord) {
      // Mark all steps up to current step as completed
      const completedSteps = getCompletedStepsUpTo(response.current_step);

      // Update currentSubStep to be an object mapping mainStep -> subStep
      const currentSubStep = draft.progress.currentSubStep || {};

      if (response.current_step === 'additional_details') {
        // Mark additional_details as completed
        completedSteps[`${stepCoord.mainStep}-${stepCoord.subStep}`] = true;

        // Advance to review step
        currentSubStep[4] = 0;
        updated.progress = {
          ...draft.progress,
          currentMainStep: 4,
          currentSubStep: currentSubStep,
          completedSteps: {
            ...draft.progress.completedSteps,
            ...completedSteps,
          },
          apiSyncedSteps: {
            ...draft.progress.apiSyncedSteps,
            [response.current_step]: true,
          },
        };
      } else {
        currentSubStep[stepCoord.mainStep] = stepCoord.subStep;

        updated.progress = {
          ...draft.progress,
          currentMainStep: stepCoord.mainStep,
          currentSubStep: currentSubStep,
          completedSteps: {
            ...draft.progress.completedSteps,
            ...completedSteps,
          },
          apiSyncedSteps: {
            ...draft.progress.apiSyncedSteps,
            [response.current_step]: true,
          },
        };
      }
    } else {
      // Mark API step as synced even if we don't have coordinates
      if (updated.progress.apiSyncedSteps) {
        updated.progress.apiSyncedSteps[response.current_step] = true;
      }
    }

    listingDraftStorage.saveDraft(updated);
  },

  isStepSyncedWithApi(apiStepName: string): boolean {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return false;

    return draft.progress.apiSyncedSteps?.[apiStepName] || false;
  },

  markStepSynced(apiStepName: string): void {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return;

    if (!draft.progress.apiSyncedSteps) {
      draft.progress.apiSyncedSteps = {};
    }

    draft.progress.apiSyncedSteps[apiStepName] = true;
    draft.lastUpdated = new Date().toISOString();

    listingDraftStorage.saveDraft(draft);
  },

  initializeDraft: (): ListingDraft => {
    const draft: ListingDraft = {
      draftId: `draft_${Date.now()}`,
      createAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      progress: {
        currentMainStep: 0,
        currentSubStep: {},
        completedSteps: {},
        lastUpdated: new Date().toISOString(),
        apiSyncedSteps: {},
      },
      isComplete: false,
    };
    listingDraftStorage.saveDraft(draft);
    return draft;
  },

  getCurrentStepCoordinates(): {
    mainStep: number;
    subStep: number;
    completedSteps: Record<string, boolean>;
  } {
    const draft = listingDraftStorage.getDraft();
    if (!draft) {
      return { mainStep: 0, subStep: 0, completedSteps: {} };
    }

    const mainStep = draft.progress.currentMainStep || 0;
    const currentSubStep = draft.progress.currentSubStep || {};
    const subStep = currentSubStep[mainStep] || 0;

    return {
      mainStep,
      subStep,
      completedSteps: draft.progress.completedSteps || {},
    };
  },

  saveDraft: (draft: ListingDraft): void => {
    try {
      draft.lastUpdated = new Date().toISOString();
      saveDataToSessStorage('listing_draft', draft);
    } catch (error) {
      console.log('Error saving draft', error);
    }
  },

  updateStepData: <K extends keyof ListingDraft>(
    stepKey: K,
    data: ListingDraft[K]
  ): void => {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return;

    const updated = {
      ...draft,
      [stepKey]: data,
      lastUpdated: new Date().toISOString(),
    };
    listingDraftStorage.saveDraft(updated);
  },

  updateProgress: (progress: Partial<StepProgress>): void => {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return;
    const updated = {
      ...draft,
      progress: {
        ...draft.progress,
        ...progress,
      },
      lastUpdated: new Date().toISOString(),
    };
    listingDraftStorage.saveDraft(updated);
  },

  markStepComplete: (mainStepId: number, subStepId: number): void => {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return;

    const updated = {
      ...draft,
      progress: {
        ...draft.progress,
        completedSteps: {
          ...draft.progress.completedSteps,
          [`${mainStepId}-${subStepId}`]: true,
        },
      },
      lastUpdated: new Date().toISOString(),
    };
    listingDraftStorage.saveDraft(updated);
  },

  markMainStepComplete: (mainStepId: number): void => {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return;
    const updated = {
      ...draft,
      progress: {
        ...draft.progress,
        completedSteps: {
          ...draft.progress.completedSteps,
          [`${mainStepId}-complete`]: true,
        },
      },
      lastUpdated: new Date().toISOString(),
    };
    listingDraftStorage.saveDraft(updated);
  },

  isStepComplete(mainStepId: number, subStepId: number): boolean {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return false;

    return draft.progress.completedSteps[`${mainStepId}-${subStepId}`] || false;
  },

  isMainStepComplete(mainStepId: number): boolean {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return false;

    return draft.progress.completedSteps[`${mainStepId}-complete`] || false;
  },

  getStepData<K extends keyof ListingDraft>(
    stepKey: K
  ): ListingDraft[K] | null {
    const draft = listingDraftStorage.getDraft();
    if (!draft) return null;

    return draft[stepKey] || null;
  },
  clearDraft: (): void => {
    clearDataFromSessStorage('listing_draft');
    console.log('Draft cleared');
  },
};
