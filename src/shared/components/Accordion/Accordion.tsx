import {
  Accordion as ShadCnAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { cn } from "@/shared/lib/utils";

export type AccordionItemType = {
  value: string;
  trigger?: React.ReactNode;
  content: React.ReactNode;
};

type BaseProps = {
  items: AccordionItemType[];
  className?: string;
  classNameContent?: string;
  triggerClassName?: string;
};

type SingleAccordionProps = BaseProps & {
  type?: "single";
  defaultValue?: string;
  collapsible?: boolean;
};

type MultipleAccordionProps = BaseProps & {
  type: "multiple";
  defaultValue?: string[];
  collapsible?: boolean;
};

export const AccordionComponent = (
  props: SingleAccordionProps | MultipleAccordionProps
) => {
  const {
    type = "single",
    items,
    collapsible = true,
    defaultValue,
    className,
    classNameContent,
    triggerClassName,
  } = props;

  return (
    <ShadCnAccordion
      type={type}
      collapsible={collapsible}
      defaultValue={defaultValue as any}
      className={cn("w-full", className)}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          {item.trigger && (
            <AccordionTrigger className={triggerClassName}>
              {item.trigger}
            </AccordionTrigger>
          )}
          <AccordionContent className={classNameContent}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </ShadCnAccordion>
  );
};
