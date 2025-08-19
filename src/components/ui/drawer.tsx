'use client';

import { useState, useEffect, ReactNode } from 'react';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { Button } from './button';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  position?: 'left' | 'right' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  className,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!mounted) {
    return null;
  }

  const sizeClasses = {
    sm: position === 'bottom' ? 'h-80' : 'w-80',
    md: position === 'bottom' ? 'h-96' : 'w-96',
    lg: position === 'bottom' ? 'h-[500px]' : 'w-[500px]',
  };

  const positionClasses = {
    left: {
      transform: isOpen ? 'translate-x-0' : '-translate-x-full',
      side: 'left-0',
      orientation: 'top-0 h-full',
    },
    right: {
      transform: isOpen ? 'translate-x-0' : 'translate-x-full',
      side: 'right-0',
      orientation: 'top-0 h-full',
    },
    bottom: {
      transform: isOpen ? 'translate-y-0' : 'translate-y-full',
      side: 'bottom-0',
      orientation: 'left-0 w-full',
    },
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out',
          position === 'bottom' ? 'flex flex-col' : '',
          sizeClasses[size],
          positionClasses[position].side,
          positionClasses[position].orientation,
          positionClasses[position].transform,
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon size={20} />
          </Button>
        </div>

        {/* Content */}
        <div
          className={cn(
            'overflow-y-auto p-4',
            position === 'bottom' ? 'flex-1' : 'flex-1'
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
