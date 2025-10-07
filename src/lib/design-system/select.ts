import { cva } from 'class-variance-authority';

export const selectTriggerVariants = cva(
  [
    'flex w-full items-center justify-between gap-2 rounded-10 border font-sans transition-all duration-200',
    'text-left cursor-pointer focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-custom-neutral-200',
    'data-[placeholder]:text-gray-400',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',
    'aria-invalid:border-red-300 aria-invalid:bg-red-300/5 aria-invalid:focus:border-red-300 aria-invalid:data-[state=open]:border-red-300 ar',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white text-gray-900 border-neutral-200',
          'focus:border-primary-500 focus:shadow-pri',
          'data-[state=open]:border-primary-500',
        ],
        filled: [
          'border-transparent bg-gray-50 text-gray-900',
          'focus:bg-white focus:border-primary-500 focus:ring-primary-500/20',
          'hover:bg-gray-100',
        ],
        outlined: [
          'border-2 border-gray-300 bg-transparent text-gray-900',
          'focus:border-primary-500 focus:ring-primary-500/10',
          'hover:border-gray-400',
        ],
        ghost: [
          'border-transparent bg-transparent text-gray-900 border-b-2 border-b-gray-200 rounded-none',
          'focus:border-b-primary-500 focus:ring-0',
          'hover:border-b-gray-300',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        default: 'h-9 px-3 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
      state: {
        default: '',
        error:
          'border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50',
        success:
          'border-green-500 focus:border-green-500 focus:ring-green-500/20 bg-green-50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  }
);

// Select Content Variants (for the dropdown)
export const selectContentVariants = cva(
  [
    'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-10 border bg-white text-gray-900 shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm',
        default: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

// Select Item Variants
export const selectItemVariants = cva(
  [
    'relative flex w-full cursor-default select-none items-center gap-2 rounded-sm outline-hidden transition-colors',
    'focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    "[&_svg:not([class*='text-'])]:text-gray-500 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
  ],
  {
    variants: {
      size: {
        sm: 'py-1 pr-6 pl-2 text-xs',
        default: 'py-1.5 pr-8 pl-2 text-sm',
        md: 'py-1.5 pr-8 pl-2 text-sm',
        lg: 'py-2 pr-10 pl-3 text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

// Select Label Variants
export const selectLabelVariants = cva('font-medium text-gray-700 font-sans', {
  variants: {
    size: {
      sm: 'py-1 pl-2 pr-6 text-xs',
      default: 'py-1.5 pl-2 pr-8 text-xs',
      md: 'py-1.5 pl-2 pr-8 text-xs',
      lg: 'py-2 pl-3 pr-10 text-sm',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

// Select Separator Variants
export const selectSeparatorVariants = cva('-mx-1 my-1 h-px bg-muted');
