import { PropertyDetailsLinks } from '@/features/property-details';
import { useMobile, useStepper } from '@/shared/hooks';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useGetListingDescription } from '../apis';
import { steps } from '../components/Steps';
import { useListingDraft } from '../providers';
import { listingDraftStorage } from '../utils';

export const useListingsPage = () => {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const { draft, syncFromApiData, clearDraft } = useListingDraft();
  const { listingId, propertyId } = useSearch({ strict: false }) as {
    listingId?: number;
    propertyId?: number;
    blockName?: string;
  };

  const { data: listingDescription } = useGetListingDescription(
    listingId as number
  );
  const listingDescriptionData = listingDescription?.data;

  // Clear draft if it belongs to a different listing or if no listingId (new listing)
  useEffect(() => {
    const existingDraft = listingDraftStorage.getDraft();

    // If there's no listingId in the URL (new listing) and there's an existing draft
    if (!listingId && existingDraft) {
      clearDraft();
    }
    // If there's a listingId in URL but it doesn't match the draft's listingId
    else if (listingId && existingDraft && existingDraft.listingId !== listingId) {
      clearDraft();
    }
  }, [listingId, clearDraft]);

  useEffect(() => {
    if (listingDescriptionData && listingId) {
      const apiStepName = listingDescriptionData.current_step || 'listings';

      syncFromApiData({
        listing_id: listingDescriptionData.id as number,
        current_step: apiStepName,
        listingDescription: listingDescriptionData,
      });
    }
  }, [listingDescriptionData, listingId, syncFromApiData]);

  // Get initial step state from draft (this will be empty if draft was just cleared)
  const initialStepState = draft?.progress
    ? {
        mainStep: draft.progress.currentMainStep || 0,
        subStep: draft.progress.currentSubStep?.[draft.progress.currentMainStep || 0] || 0,
        completedSteps: draft.progress.completedSteps || {},
      }
    : { mainStep: 0, subStep: 0, completedSteps: {} };

  // Initialize stepper with current draft state
  const stepper = useStepper(steps, {
    initialMainStep: initialStepState.mainStep,
    initialSubStep: { [initialStepState.mainStep]: initialStepState.subStep },
    initialCompletedSteps: initialStepState.completedSteps,
  });

  useEffect(() => {
    if (draft?.apiCurrentStep) {
      const currentStepState = listingDraftStorage.getCurrentStepCoordinates();

      // Navigate stepper to the current step from API
      stepper.goToStep(currentStepState.mainStep, currentStepState.subStep);

      // Mark all completed steps
      Object.keys(currentStepState.completedSteps).forEach((key) => {
        if (currentStepState.completedSteps[key]) {
          const [mainStep, subStep] = key.split('-').map(Number);
          if (!isNaN(mainStep) && !isNaN(subStep)) {
            stepper.completeSubStep(mainStep, subStep);
          } else if (key.endsWith('-complete')) {
            const mainStepOnly = parseInt(key.split('-')[0]);
            if (!isNaN(mainStepOnly)) {
              stepper.completeMainStep(mainStepOnly);
            }
          }
        }
      });
    } else {
      // If no apiCurrentStep (draft was cleared), reset stepper completely
      stepper.resetStepper();
    }
  }, [draft?.apiCurrentStep, draft?.listingId]);

  const currentStep = steps[stepper.currentMainStep];

  // Get the current component to render
  const getCurrentComponent = () => {
    if (currentStep.subSteps?.length > 0) {
      const currentSubStepIndex = stepper.getCurrentSubStep(
        stepper.currentMainStep
      );
      const Component = currentStep.subSteps[currentSubStepIndex].component;

      return (
        <Component
          onNext={stepper.goForward}
          onPrev={stepper.goBack}
          goToStep={stepper.goToStep}
        />
      );
    } else {
      const Component = currentStep.component;
      return Component ? (
        <Component onNext={stepper.goForward} onPrev={stepper.goBack} />
      ) : null;
    }
  };

  const handleSaveAndExit = () => {
    toast.success('Listing draft saved successfully', { id: 'saved-draft' });
    navigate({
      to: PropertyDetailsLinks.PROPERTY_DETAILS,
      search: {
        propertyId: propertyId,
      },
    });
  };

  const handleCancel = () => {
    navigate({
      to: '/property-details',
      search: (prev) => ({
        ...prev,
        propertyId: prev.propertyId,
      }),
    });
  };

  return {
    isMobile,
    draft,
    stepper,
    steps,
    currentStep,
    getCurrentComponent,
    handleSaveAndExit,
    handleCancel,
    // Only disable on first step ('listings') - use API step name as source of truth
    isSaveDisabled: draft?.apiCurrentStep === 'listings' || !draft?.apiCurrentStep,
  };
};
