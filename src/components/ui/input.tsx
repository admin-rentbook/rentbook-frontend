import * as React from 'react';

import { inputVariants } from '@/lib/design-system/input';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';


function Input({
  className,
  type,
  size,
  variant,
  ...props
}: React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean;
  }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Input };
