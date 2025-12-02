import { useMobile } from '@/shared/hooks';
import { Sheet } from '../Sheet';
import { DialogComponent } from '../Dialog';

type ResponsiveModalProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
};

export const ResponsiveModal = (props: ResponsiveModalProps) => {
  const { isMobile } = useMobile();

  // Mobile: Show Sheet
  if (isMobile) {
    return (
      <Sheet
        open={props.open}
        onOpenChange={props.onOpenChange}
        trigger={props.trigger}
        title={props.title}
        description={props.description}
        className={props.className}
        footer={props.footer}
      >
        {props.children}
      </Sheet>
    );
  }

  // Desktop: Show Dialog
  return (
    <DialogComponent
      open={props.open}
      onOpenChange={props.onOpenChange}
      trigger={props.trigger}
      title={props.title}
      description={props.description}
      className={props.className}
      showCloseButton={props.showCloseButton}
      footer={props.footer}
      style={props.style}
    >
      {props.children}
    </DialogComponent>
  );
};