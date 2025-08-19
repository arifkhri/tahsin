import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { XIcon } from '@phosphor-icons/react/dist/ssr';

const chipVariants = cva(
  'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200',
        primary: 'bg-lime-100 text-lime-800 border-lime-300 hover:bg-lime-200',
        secondary:
          'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200',
        selected: 'bg-lime-500 text-white border-lime-500 hover:bg-lime-600',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  children: React.ReactNode;
  selected?: boolean;
  onRemove?: () => void;
  removable?: boolean;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      children,
      selected,
      onRemove,
      removable,
      onClick,
      ...props
    },
    ref
  ) => {
    const chipVariant = selected ? 'selected' : variant;

    return (
      <div
        className={cn(chipVariants({ variant: chipVariant, size, className }))}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        <span>{children}</span>
        {removable && onRemove && (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          >
            <XIcon size={14} />
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

export { Chip, chipVariants };
