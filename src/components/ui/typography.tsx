import { HTMLAttributes, forwardRef, ElementType } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl',
      h2: 'text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl',
      h3: 'text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl',
      h4: 'text-xl font-bold tracking-tight text-gray-900 lg:text-2xl',
      h5: 'text-lg font-bold tracking-tight text-gray-900 lg:text-xl',
      h6: 'text-base font-bold tracking-tight text-gray-900 lg:text-lg',
      body: 'text-base text-gray-700 leading-relaxed',
      bodyLarge: 'text-lg text-gray-700 leading-relaxed',
      bodySmall: 'text-sm text-gray-700 leading-relaxed',
      caption: 'text-sm text-gray-500 leading-normal',
      label: 'text-sm font-medium text-gray-900 leading-normal',
      overline:
        'text-xs font-medium text-gray-500 uppercase tracking-wide leading-normal',
      muted: 'text-sm text-gray-500 leading-relaxed',
      code: 'relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    align: 'left',
  },
});

export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: ElementType;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, align, weight, as, ...props }, ref) => {
    const Component = as || getDefaultElement(variant);

    return (
      <Component
        className={cn(
          typographyVariants({ variant, align, weight, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = 'Typography';

function getDefaultElement(variant: TypographyProps['variant']): ElementType {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'code':
      return 'code';
    default:
      return 'p';
  }
}

export { Typography, typographyVariants };
