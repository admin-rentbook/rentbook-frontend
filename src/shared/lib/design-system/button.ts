import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "inline-flex hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-10  font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-white shadow-sec hover:bg-primary-600 active:bg-primary-600',
        'primary-outline':
          'border border-primary-500 text-primary-500 bg-transparent hover:bg-primary-50 active:bg-primary-100',
        'primary-ghost':
          'text-primary-500 hover:bg-primary-50 active:bg-primary-100',
        'primary-soft':
          'bg-primary-100 text-primary-500 hover:bg-primary-100',
        secondary:
          'bg-white text-neutral-600 shadow-sec hover:bg-secondary-600 active:bg-secondary-700',
        'secondary-outline':
          'border border-secondary-300 text-secondary-700 bg-transparent hover:bg-secondary-50 active:bg-secondary-100',
        'secondary-ghost':
          'text-secondary-600 hover:bg-secondary-50 active:bg-secondary-100',
        success:
          'bg-success-500 text-white hover:bg-success-600 active:bg-success-700',
        'success-outline':
          'border border-success-500 text-success-600 bg-transparent hover:bg-success-50 active:bg-success-100',
        'success-ghost':
          'text-success-600 hover:bg-success-50 active:bg-success-100',
        foundation: 'bg-red-300 text-white hover:bg-red-400 active:bg-red-400',
        tertiary: 'bg-muted text-neutral-600 hover-bg-muted active:bg-muted',

        // Warning variants
        warning:
          'bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700',
        'warning-outline':
          'border border-warning-500 text-warning-600 bg-transparent hover:bg-warning-50 active:bg-warning-100',
        'warning-ghost':
          'text-warning-600 hover:bg-warning-50 active:bg-warning-100',

        // Danger variants
        danger:
          'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700',
        'danger-outline':
          'border border-danger-500 text-danger-600 bg-transparent hover:bg-danger-50 active:bg-danger-100',
        'danger-ghost':
          'text-danger-600 hover:bg-danger-50 active:bg-danger-100',

        // Utility variants
        default: 'bg-sidebar text-neutral-600/50',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-neutral-200 bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary-500 underline-offset-4 hover:underline',
        icon: 'p-0 m-0 bg-transparent border-none shadow-none hover:bg-transparent focus-visible:ring-0',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-10 md:h-8 px-3 text-sm',
        md: 'h-10 md:h-9 px-3 text-sm',
        default: 'h-11 lg:h-8 text-sm px-3 py-4',
        lg: 'h-11 px-3',
        xl: 'h-12 px-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);
