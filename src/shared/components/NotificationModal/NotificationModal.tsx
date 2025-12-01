import { useMobile } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';
import { DialogComponent } from '../Dialog';
import { Sheet } from '../Sheet';

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
  const { isMobile } = useMobile();
  return (
    <>
      {isMobile ? (
        <Sheet
          open={props.modalOptions.open}
          onOpenChange={props.modalOptions.onOpenChange}
          children={
            <CommonElement
              actions={props.actions}
              description={props.description}
              icon={props.icon}
              title={props.title}
            />
          }
        />
      ) : (
        <DialogComponent
          open={props.modalOptions.open}
          onOpenChange={props.modalOptions.onOpenChange}
          className={cn(`${props.className} hidden lg:block`)}
          children={
            <CommonElement
              actions={props.actions}
              description={props.description}
              icon={props.icon}
              title={props.title}
            />
          }
        />
      )}
    </>
  );
};

type CommonElementProps = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  title: string;
  description: string;
  actions: ReactNode;
};
const CommonElement = (props: CommonElementProps) => {
  return (
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
  );
};
