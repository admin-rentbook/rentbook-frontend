import * as React from 'react';

import { textareaVariants } from '@/shared/lib/design-system';
import { cn } from '@/shared/lib/utils';
import type { VariantProps } from 'class-variance-authority';

function Textarea({
  className,
  variant,
  ...props
}: React.ComponentProps<'textarea'> &
  VariantProps<typeof textareaVariants> & {
    asChild?: boolean;
  }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Textarea };
