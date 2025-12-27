import { Links } from '@/features/property-owners/constants';
import { Button, MobileStepperSlider, Stepper } from '@/shared/components';
import { Header } from '@/shared/components/Header';
import { useMobile, useStepper } from '@/shared/hooks';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useGetListingDescription } from '../apis';
import { useListingDraft } from '../providers';
import { listingDraftStorage } from '../utils';
import { steps } from './Steps';

export const Listings = () => {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const { draft, syncFromApiData } = useListingDraft();
  const { listingId } = useSearch({ from: '/listings-start' });

  // Fetch listing data to get current_step from API
  const { data: listingDescription } = useGetListingDescription(listingId as number);
  const listingDescriptionData = listingDescription?.data;

  // Sync API data to session storage on mount BEFORE stepper initializes
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

  // Get initial step state from draft (which is synced with API)
  const initialStepState = listingDraftStorage.getCurrentStepCoordinates();

  // Initialize stepper with API-synced state
  const stepper = useStepper(steps, {
    initialMainStep: initialStepState.mainStep,
    initialSubStep: { [initialStepState.mainStep]: initialStepState.subStep },
    initialCompletedSteps: initialStepState.completedSteps,
  });

  // Re-sync stepper when API current_step changes
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
    }
  }, [draft?.apiCurrentStep]);

  const currentStep = steps[stepper.currentMainStep];

  const getCurrentComponent = () => {
    if (currentStep.subSteps?.length > 0) {
      const currentSubStepIndex = stepper.getCurrentSubStep(
        stepper.currentMainStep
      );
      const Component = currentStep.subSteps[currentSubStepIndex].component;

      return <Component onNext={stepper.goForward} onPrev={stepper.goBack} goToStep={stepper.goToStep} />;
    } else {
      const Component = currentStep.component;
      return Component ? (
        <Component onNext={stepper.goForward} onPrev={stepper.goBack} />
      ) : null;
    }
  };

  const { setDraft } = useListingDraft();
  const isEmpty = (obj: object | null | undefined): boolean =>
    !!obj && Object.keys(obj).length === 0;
  const existingDraft = listingDraftStorage.getDraft();
  const handleOnClick = () => {
    setDraft(existingDraft);
    navigate({ to: Links.CREATE_PROPERTY });
  };
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <div className="flex justify-between items-center pr-5">
        <Header
          title="Create listing"
          onCancel={() =>
            navigate({
              to: '/property-details',
              search: (prev) => ({
                ...prev,
                propertyId: prev.propertyId,
              }),
            })
          }
        />
        <Button
          variant="tertiary"
          onClick={handleOnClick}
          disabled={isEmpty(draft?.progress.completedSteps)}
        >
          Save & exit
        </Button>
      </div>

      {isMobile ? (
        <div className="flex flex-col h-full">
          <MobileStepperSlider
            steps={steps}
            currentMainStep={stepper.currentMainStep}
            currentSubStep={stepper.getCurrentSubStep(stepper.currentMainStep)}
            isStepComplete={stepper.isSubStepCompleted}
            isMainStepComplete={stepper.isMainStepCompleted}
          />
          <div className="flex-1 overflow-y-auto p-4">
            {getCurrentComponent()}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[30%_1fr] p-5 lg:px-10 lg:pt-10">
          <div className="h-fit sticky top-8">
            <Stepper steps={steps} stepper={stepper} />
          </div>
          <div>{getCurrentComponent()}</div>
        </div>
      )}
    </div>
  );
};
