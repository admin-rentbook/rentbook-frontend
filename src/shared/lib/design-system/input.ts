import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'w-full rounded-10 border font-sans transition-all duration-200',
    'placeholder:text-gray-400 focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-custom-neutral-200',
    'aria-invalid:border-red-300 aria-invalid:bg-red-300/5 aria-invalid:focus:border-red-300',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white text-gray-900 border-neutral-200',
          'focus:border-primary-500 focus:shadow-pri',
        ],
        filled: [
          'border-transparent text-gray-900',
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
        default: 'h-11 md:h-8 px-3 text-sm',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-11 px-4 text-lg',
      },
      state: {
        // default: 'h-11 md:h-8 px-3 text-sm',
        error:
          'border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50',
        success:
          'border-green-500 focus:border-green-500 focus:ring-green-500/20 bg-green-50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      // state: 'default',
    },
  }
);
