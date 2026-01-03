import { useSearch } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import {
  useViewing,
  useViewingFee,
  useViewingTimes,
  useViewingTypeSelection,
} from '../../hooks';
import { ListingTitle, NavigateButtons } from '../shared';
import { PropertyViewingTime } from './PropertyViewingTime';
import { ViewingFee } from './ViewingFee';
import { ViewingSelection } from './ViewingSelection';

type ViewingProps = {
  onNext: (() => void) | undefined;
  onPrev: (() => void) | undefined;
};
export const Viewing = ({ onNext, onPrev }: ViewingProps) => {
  const { listingId } = useSearch({ strict: false }) as { listingId?: number };

  const viewingApiHook = useViewing(listingId as number, onNext);
  const viewingTypeSelection = useViewingTypeSelection(viewingApiHook.viewingData);
  const viewingTimesHook = useViewingTimes(viewingApiHook.viewingData);
  const viewingFeeHook = useViewingFee(
    onNext,
    viewingTimesHook.schedule,
    viewingTypeSelection.selectedType,
    viewingApiHook.onSubmit,
    viewingApiHook.viewingData
  );

  // Loading state
  if (viewingApiHook.isPending || viewingApiHook.isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        <p className="ml-3 text-body text-black-400 mt-3">
          Loading viewing settings...
        </p>
      </div>
    );
  }

  // Error state
  if (viewingApiHook.isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <p className="text-heading-4 text-error-500 mb-2">
            Failed to load viewing settings
          </p>
          <p className="text-body text-black-400">
            Please try again or contact support if the problem persists.
          </p>
        </div>
        <NavigateButtons
          onBack={() => onPrev?.()}
          onContinue={() => {}}
          isButtonDisabled={true}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6 xl:w-3/5 pb-10">
        <ListingTitle
          description=""
          title="Set up how people can book for viewing?"
        />
        <ViewingSelection viewingTypeSelection={viewingTypeSelection} />
        <PropertyViewingTime viewTimesHook={viewingTimesHook} />
        <ViewingFee viewFeeHook={viewingFeeHook} />
      </div>
      <NavigateButtons
        onBack={() => onPrev?.()}
        onContinue={viewingFeeHook.handleSubmit}
        isButtonDisabled={!viewingFeeHook.canSubmit || viewingApiHook.isUpdateLoading}
        isLoading={viewingApiHook.isUpdateLoading}
      />
    </div>
  );
};
