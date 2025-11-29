import type { ReactNode } from 'react';
import { DialogComponent } from '../Dialog';

type NotificationModalProps = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  modalOptions: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
  actions: ReactNode;
  className?: string;
};

export const NotificationModal = (props: NotificationModalProps) => {
  return (
    <DialogComponent
      open={props.modalOptions.open}
      onOpenChange={props.modalOptions.onOpenChange}
      className={props.className}
      children={
        <div className="flex flex-col items-center pb-5">
          <div className="flex flex-col gap-5 items-center py-25 px-12">
            <props.icon />
            <div className="flex flex-col gap-3">
              <h5 className="text-heading-xl text-black-500 text-center">
                {props.title}
              </h5>
              <p className="text-body-medium text-black-400 text-center">
                {props.description}
              </p>
            </div>
          </div>
          {props.actions}
        </div>
      }
    />
  );
};
