import type { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface ReusablePopoverProps {
  trigger?: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PopoverComponent = (props: ReusablePopoverProps) => {
  const { side = 'bottom', align = 'center', sideOffset = 3 } = props;
  return (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      <PopoverTrigger asChild>{props.trigger}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={props.className}
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        {props.children}
      </PopoverContent>
    </Popover>
  );
};
