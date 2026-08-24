import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 text-center font-medium leading-tight rounded-lg border border-transparent cursor-pointer transition-all duration-200 whitespace-normal sm:whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-700',
  {
    variants: {
      variant: {
        primary: 'bg-primary-800 text-white border-primary-800 hover:bg-primary-900 hover:border-primary-900 hover:-translate-y-0.5 hover:shadow-md',
        secondary: 'bg-white text-primary-800 border-primary-400 hover:bg-primary-50 hover:border-primary-600',
        ghost: 'bg-transparent text-neutral-700 hover:bg-surface-secondary hover:text-neutral-900',
        danger: 'bg-critical-500 text-white border-critical-500 hover:bg-critical-600',
        outline: 'bg-transparent text-neutral-900 border-neutral-200 hover:bg-surface-secondary hover:border-neutral-300',
        teal: 'bg-teal-500 text-white border-teal-500 hover:bg-teal-600 hover:-translate-y-0.5',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-8 py-3.5 text-base',
        xl: 'px-10 py-4 text-base font-semibold',
        icon: 'p-2 w-9 h-9',
        'icon-sm': 'p-1 w-7 h-7',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);
