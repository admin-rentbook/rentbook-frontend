import { DialogComponent, Sheet } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { NavigateButtons } from '../shared';

type DeleteDayConfirmationProps = {
  onDeleteAll: () => void;
  setIsOpen: () => void;
  isOpen: boolean;
};

export const DeleteDayConfirmation = (props: DeleteDayConfirmationProps) => {
  const { isMobile } = useMobile();

  const Confirmation = () => {
    return (
      <div className="flex flex-col p-4">
        <h5 className="text-heading-4 text-center text-black-500 pb-15">Are you sure?</h5>
        <NavigateButtons
          onBack={props.setIsOpen}
          onContinue={props.onDeleteAll}
          saveBtnText="Delete"
          btnText="Cancel"
        />
      </div>
    );
  };
  if (isMobile) {
    return (
      <Sheet
        open={props.isOpen}
        onOpenChange={props.setIsOpen}
        children={<Confirmation />}
        className='h-[20vh] max-sm:h-[30vh]'
      />
    );
  }

  return (
    <DialogComponent
      open={props.isOpen}
      onOpenChange={props.setIsOpen}
      className="rounded-[2em] border-0 lg:w-1/3 xl:w-1/4"
      children={<Confirmation />}
    />
  );
};
