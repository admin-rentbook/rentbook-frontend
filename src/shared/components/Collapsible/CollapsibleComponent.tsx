import type { ReactNode } from 'react';
import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible as ShadCnCollapsible,
} from '../ui';

type CollapsibleProps = {
  trigger?: ReactNode;
  className?: string;
  children: ReactNode;
  open?: boolean;
  headerTrigger?: ReactNode;
  onOpenChange?: (open: boolean) => void;
};
export const CollapsibleComponent = (props: CollapsibleProps) => {
  return (
    <ShadCnCollapsible
      className={props.className}
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      {props.headerTrigger}
      {props.trigger && (
        <CollapsibleTrigger asChild>{props.trigger}</CollapsibleTrigger>
      )}

      <CollapsibleContent className={props.className}>
        {props.children}
      </CollapsibleContent>
    </ShadCnCollapsible>
  );
};
