import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

const radioGroupItemVariants = cva(
  'border-primary-500 text-primary-500 focus-visible:border-primary-500 focus-visible:ring-ring/50 aria-invalid:ring-red-300/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-red-300 dark:bg-input/30 aspect-square shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'size-3.5',
        default: 'size-4',
        md: 'size-5',
        lg: 'size-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const radioIndicatorVariants = cva(
  'fill-primary-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  {
    variants: {
      size: {
        sm: 'size-1.5',
        default: 'size-2',
        md: 'size-2.5',
        lg: 'size-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

function RadioGroupItem({ className, size, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioGroupItemVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className={radioIndicatorVariants({ size })} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
