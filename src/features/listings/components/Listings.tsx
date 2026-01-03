import { Button, MobileStepperSlider, Stepper } from '@/shared/components';
import { Header } from '@/shared/components/Header';
import { useListingsPage } from '../hooks/useListingsPage';
import { DesktopListingSidebar, MobileListingSidebar } from './ListingSidebar';

type ListingsProps = {
  isEditMode?: boolean;
};

export const Listings = ({ isEditMode = false }: ListingsProps) => {
  const {
    isMobile,
    stepper,
    steps,
    getCurrentComponent,
    handleSaveAndExit,
    handleCancel,
    isSaveDisabled,
  } = useListingsPage();

  return (
    <div className="flex flex-col h-screen">
      {/* Header - Edit mode: only Header, Create mode: Header + Save & exit */}
      {isEditMode ? (
        <div className="flex-shrink-0 z-50">
          <Header
            title="Edit listing"
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <div className="flex justify-between items-center pr-5 flex-shrink-0">
          <Header
            title="Create listing"
            onCancel={handleCancel}
          />
          <Button
            variant="tertiary"
            onClick={handleSaveAndExit}
            disabled={isSaveDisabled}
          >
            Save & exit
          </Button>
        </div>
      )}

      {/* NEW LISTING: Use existing stepper (unchanged) */}
      {!isEditMode && (
        <>
          {isMobile ? (
            <div className="flex flex-col flex-1 overflow-hidden">
              <MobileStepperSlider
                steps={steps}
                currentMainStep={stepper.currentMainStep}
                currentSubStep={stepper.getCurrentSubStep(
                  stepper.currentMainStep
                )}
                isStepComplete={stepper.isSubStepCompleted}
                isMainStepComplete={stepper.isMainStepCompleted}
              />
              <div className="flex-1 overflow-y-auto p-4">
                {getCurrentComponent()}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[30%_1fr] p-5 lg:px-10 lg:pt-10 flex-1 overflow-hidden">
              <div className="h-fit sticky top-8">
                <Stepper steps={steps} stepper={stepper} />
              </div>
              <div className="overflow-y-auto">{getCurrentComponent()}</div>
            </div>
          )}
        </>
      )}

      {/* EDIT LISTING: Use new sidebar navigation */}
      {isEditMode && (
        <div className="flex-1 overflow-hidden">
          {isMobile ? (
            <div className="flex flex-col h-full">
              <MobileListingSidebar steps={steps} stepper={stepper} />
              <div className="flex-1 overflow-y-auto p-4">
                {getCurrentComponent()}
              </div>
            </div>
          ) : (
            <DesktopListingSidebar steps={steps} stepper={stepper}>
              {getCurrentComponent()}
            </DesktopListingSidebar>
          )}
        </div>
      )}
    </div>
  );
};
