'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const radioButtonVariants = cva(
  'inline-flex items-center justify-center rounded-lg border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        emerald:
          'border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white data-[state=checked]:border-emerald-500',
        default:
          'border-indigo-300 bg-white text-indigo-700 hover:bg-indigo-50 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white data-[state=checked]:border-indigo-500',
        outline:
          'border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900 data-[state=checked]:border-gray-400',
        lime: 'border-lime-300 bg-white text-lime-700 hover:bg-lime-50 data-[state=checked]:bg-lime-500 data-[state=checked]:text-white data-[state=checked]:border-lime-500',
        purple:
          'border-purple-300 bg-white text-purple-700 hover:bg-purple-50 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white data-[state=checked]:border-purple-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 py-1 text-xs',
        lg: 'h-12 px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface RadioButtonProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'type' | 'onChange'
    >,
    VariantProps<typeof radioButtonVariants> {
  label: string;
  value: string;
  checked?: boolean;
  name: string;
  onChange?: (value: string) => void;
  className?: string;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      className,
      variant,
      size,
      label,
      value,
      checked,
      name,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={cn(
          radioButtonVariants({ variant, size }),
          checked && 'data-[state=checked]',
          className
        )}
        data-state={checked ? 'checked' : 'unchecked'}
      >
        <input
          ref={ref}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange?.(value)}
          className="sr-only"
          {...props}
        />
        {label}
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';

export { RadioButton, radioButtonVariants };
