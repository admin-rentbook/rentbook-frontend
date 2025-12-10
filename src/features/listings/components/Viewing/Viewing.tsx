import {
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
  const viewingTypeSelection = useViewingTypeSelection();
  const viewingTimesHook = useViewingTimes();
  const viewingFeeHook = useViewingFee(
    onNext,
    viewingTimesHook.schedule,
    viewingTypeSelection.selectedType
  );
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
        isButtonDisabled={!viewingFeeHook.canSubmit}
      />
    </div>
  );
};
