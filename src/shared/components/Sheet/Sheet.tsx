import {
  Sheet as ShadCnSheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet';
import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

interface SheetProps {
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
export const Sheet = (props: SheetProps) => {
  return (
    <ShadCnSheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          'h-screen w-screen p-0  border-0 max-sm:w-full max-sm:h-full',
          'md:hidden',
          props.className
        )}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader className="sr-only">
          <SheetTitle className="sr-only">{props.title}</SheetTitle>
          <SheetDescription className="sr-only">
            {props.description}
          </SheetDescription>
        </SheetHeader>

        <div className="h-full w-full overflow-y-auto">{props.children}</div>

        {props.footer}
      </SheetContent>
    </ShadCnSheet>
  );
};
