import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import type { ReactNode } from 'react';
import { Button } from '../ui';

interface DialogComponentProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  showCloseButton?: boolean;
  closeButtonText?: string;
}
export const DialogComponent = (props: DialogComponentProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>

      <DialogContent className={props.className}>
        {(props.title || props.description) && (
          <DialogHeader className='hidden'>
            <DialogTitle className="hidden" aria-describedby={props.title}>
              {props.title}
            </DialogTitle>
            {props.description && (
              <DialogDescription>{props.description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {props.children}

        {(props.footer || props.showCloseButton) && (
          <DialogFooter>
            {props.footer || (
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {props.closeButtonText}
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
