import type { StepProgress } from '@/shared/types';
import { useCallback, useEffect, useState } from 'react';
import type { ListingDraft, ListingStepResponse } from '../types';
import { listingDraftStorage } from '../utils';

export const useListingDraftState = () => {
  const [draft, setDraft] = useState<ListingDraft | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load draft on mount
  useEffect(() => {
    const existingDraft = listingDraftStorage.getDraft();
    if (existingDraft) {
      setDraft(existingDraft);
    } else {
      const newDraft = listingDraftStorage.initializeDraft();
      setDraft(newDraft);
    }
    setIsLoading(false);
  }, []);

  const syncFromApiData = useCallback((apiData: any) => {
    listingDraftStorage.syncProgressFromApiData(apiData);
    setDraft(listingDraftStorage.getDraft());
  }, []);

  const getFurthestCompletedStep = useCallback(() => {
    return listingDraftStorage.getFurthestCompletedStep();
  }, []);

  type OmitK = Omit<
    ListingDraft,
    'draftId' | 'createdAt' | 'lastUpdated' | 'progress' | 'isComplete'
  >;
  const updateStepData = useCallback(
    <K extends keyof OmitK>(stepKey: K, data: ListingDraft[K]) => {
      listingDraftStorage.updateStepData(stepKey, data);
      setDraft(listingDraftStorage.getDraft());
    },
    []
  );
  const updateFromApiResponse = useCallback((response: ListingStepResponse) => {
    listingDraftStorage.updateFromApiResponse(response);
    setDraft(listingDraftStorage.getDraft());
  }, []);

  // ⭐ NEW: Check if step is synced with API
  const isStepSyncedWithApi = useCallback((apiStepName: string): boolean => {
    return listingDraftStorage.isStepSyncedWithApi(apiStepName);
  }, []);

  // ⭐ NEW: Mark step as synced
  const markStepSynced = useCallback((apiStepName: string) => {
    listingDraftStorage.markStepSynced(apiStepName);
    setDraft(listingDraftStorage.getDraft());
  }, []);

  const updateProgress = useCallback((progress: Partial<StepProgress>) => {
    listingDraftStorage.updateProgress(progress);
    setDraft(listingDraftStorage.getDraft());
  }, []);

  const markStepComplete = useCallback(
    (mainStepId: number, subStepId: number) => {
      listingDraftStorage.markStepComplete(mainStepId, subStepId);
      setDraft(listingDraftStorage.getDraft());
    },
    []
  );
  const markMainStepComplete = useCallback((mainStepId: number) => {
    listingDraftStorage.markMainStepComplete(mainStepId);
    setDraft(listingDraftStorage.getDraft());
  }, []);

  const isStepComplete = useCallback(
    (mainStepId: number, subStepId: number): boolean => {
      return listingDraftStorage.isStepComplete(mainStepId, subStepId);
    },
    []
  );
  const isMainStepComplete = useCallback((mainStepId: number): boolean => {
    return listingDraftStorage.isMainStepComplete(mainStepId);
  }, []);

  const clearDraft = useCallback(() => {
    listingDraftStorage.clearDraft();
    const newDraft = listingDraftStorage.initializeDraft();
    setDraft(newDraft);
  }, []);

  const initializeDraft = useCallback(() => {
    const newDraft = listingDraftStorage.initializeDraft();
    setDraft(newDraft);
  }, []);

  const getStepData = useCallback(
    <K extends keyof ListingDraft>(stepKey: K): ListingDraft[K] | null => {
      return listingDraftStorage.getStepData(stepKey);
    },
    []
  );

  return {
    draft,
    isLoading,
    updateStepData,
    updateFromApiResponse,
    updateProgress,
    markStepComplete,
    isStepComplete,
    clearDraft,
    initializeDraft,
    getStepData,
    markMainStepComplete,
    isMainStepComplete,
    isStepSyncedWithApi,
    markStepSynced,
    setDraft,
    syncFromApiData,
    getFurthestCompletedStep,
    listingId: draft?.listingId,
    apiCurrentStep: draft?.apiCurrentStep,
  };
};
