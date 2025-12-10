import * as React from 'react';

import { inputVariants } from '@/shared/lib/design-system';
import { cn } from '@/shared/lib/utils';
import type { VariantProps } from 'class-variance-authority';

function Input({
  className,
  type,
  size: customSize,
  variant,
  ...props
}:  Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'default' | '4xl';
  }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size: customSize, className }))}
      {...props}
    />
  );
}

export { Input };
