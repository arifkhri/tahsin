import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
      screen: 'max-w-screen-2xl',
    },
    padding: {
      none: 'px-0',
      sm: 'px-4',
      default: 'px-6',
      lg: 'px-8',
      xl: 'px-10',
    },
    center: {
      true: 'mx-auto',
      false: 'mx-0',
    },
  },
  defaultVariants: {
    size: 'lg',
    padding: 'default',
    center: true,
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, center, ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ size, padding, center, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container, containerVariants };
