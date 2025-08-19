'use client';

import { RadioButton, type RadioButtonProps } from './radio-button';
import { cn } from '@/lib/utils';

export interface RadioButtonGroupProps {
  options: Array<{
    label: string;
    value: string;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  variant?: RadioButtonProps['variant'];
  size?: RadioButtonProps['size'];
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'grid';
  columns?: number;
}

export function RadioButtonGroup({
  options,
  value,
  onChange,
  name,
  variant = 'default',
  size = 'default',
  className,
  layout = 'horizontal',
  columns = 3,
}: RadioButtonGroupProps) {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col gap-2';
      case 'grid':
        return `grid grid-cols-${columns} gap-2`;
      default:
        return 'flex flex-wrap gap-2';
    }
  };

  return (
    <div className={cn(getLayoutClasses(), className)}>
      {options.map(option => (
        <RadioButton
          key={option.value}
          name={name}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          variant={variant}
          size={size}
        />
      ))}
    </div>
  );
}
