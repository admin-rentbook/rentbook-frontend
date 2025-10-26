import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

type TooltipProps = {
  tooltipTrigger: React.ReactNode;
  children: React.ReactNode;
};
export const TooltipComp = (props: TooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{props.tooltipTrigger}</TooltipTrigger>
      <TooltipContent>{props.children}</TooltipContent>
    </Tooltip>
  );
};
