import React, { useState } from 'react';
import { Chip } from './chip';
import { Card, Typography } from './index';

interface MultiChipFilterProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder?: string;
  variant?: 'primary' | 'secondary' | 'default';
}

export const MultiChipFilter: React.FC<MultiChipFilterProps> = ({
  title,
  options,
  selectedOptions,
  onSelectionChange,
  placeholder = 'Pilih opsi...',
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChipClick = (option: string) => {
    const newSelected = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];
    onSelectionChange(newSelected);
  };

  const handleRemoveChip = (option: string) => {
    const newSelected = selectedOptions.filter(item => item !== option);
    onSelectionChange(newSelected);
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  return (
    <Card variant="elevated" className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Typography variant="body" className="text-gray-700 font-medium">
            {title}
          </Typography>
          {selectedOptions.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Hapus Semua
            </button>
          )}
        </div>

        {/* Selected chips */}
        {selectedOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map(option => (
              <Chip
                key={option}
                variant="selected"
                removable
                onRemove={() => handleRemoveChip(option)}
                size="sm"
              >
                {option}
              </Chip>
            ))}
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left text-sm border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 bg-white"
        >
          {selectedOptions.length > 0
            ? `${selectedOptions.length} dipilih`
            : placeholder}
          <span className="float-right">{isOpen ? '▲' : '▼'}</span>
        </button>

        {/* Options dropdown */}
        {isOpen && (
          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white">
            <div className="p-2 space-y-1">
              {options.map(option => (
                <Chip
                  key={option}
                  variant={variant}
                  selected={selectedOptions.includes(option)}
                  onClick={() => handleChipClick(option)}
                  className="w-full justify-start cursor-pointer"
                >
                  {option}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
