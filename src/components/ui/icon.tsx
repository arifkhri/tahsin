import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as PhosphorIcons from '@phosphor-icons/react';

const iconVariants = cva('', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      default: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-10 h-10',
      '3xl': 'w-12 h-12',
    },
    color: {
      default: 'text-gray-700',
      primary: 'text-green-600',
      secondary: 'text-purple-600',
      accent: 'text-lime-600',
      muted: 'text-gray-500',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      danger: 'text-red-600',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
  },
});

export interface IconProps extends VariantProps<typeof iconVariants> {
  name: keyof typeof PhosphorIcons;
  className?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

const Icon = forwardRef<HTMLElement, IconProps>(
  ({ name, size, className, weight = 'regular', color, ...props }, ref) => {
    const IconComponent = PhosphorIcons[name] as React.ComponentType<{
      size?: number;
      weight?: string;
      className?: string;
      ref?: React.Ref<HTMLElement>;
    }>;

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        weight={weight}
        className={cn(iconVariants({ size, color }), className)}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

export { Icon, iconVariants };
