'use client';

import { useState } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { RadioButtonGroup } from '@/components/ui/radio-button-group';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';

export interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMakhraj: string;
  onMakhrajChange: (value: string) => void;
  selectedSifat: string;
  onSifatChange: (value: string) => void;
  selectedSifatTambahan: string;
  onSifatTambahanChange: (value: string) => void;
  makhrajOptions: Array<{ label: string; value: string }>;
  sifatOptions: Array<{ label: string; value: string }>;
  sifatTambahanOptions: Array<{ label: string; value: string }>;
  onReset: () => void;
  onApply?: () => void;
}

export function Filter({
  isOpen,
  onClose,
  selectedMakhraj,
  onMakhrajChange,
  selectedSifat,
  onSifatChange,
  selectedSifatTambahan,
  onSifatTambahanChange,
  makhrajOptions,
  sifatOptions,
  sifatTambahanOptions,
  onApply,
}: FilterProps) {
  // Local state for temporary filter values
  const [tempMakhraj, setTempMakhraj] = useState(selectedMakhraj);
  const [tempSifat, setTempSifat] = useState(selectedSifat);
  const [tempSifatTambahan, setTempSifatTambahan] = useState(
    selectedSifatTambahan
  );

  // Reset temp values when drawer opens
  // const handleDrawerOpen = () => {
  //   setTempMakhraj(selectedMakhraj);
  //   setTempSifat(selectedSifat);
  //   setTempSifatTambahan(selectedSifatTambahan);
  // };

  // Apply filters and close drawer
  const handleApply = () => {
    onMakhrajChange(tempMakhraj);
    onSifatChange(tempSifat);
    onSifatTambahanChange(tempSifatTambahan);
    onApply?.();
    onClose();
  };

  // Reset all filters
  const handleReset = () => {
    setTempMakhraj('');
    setTempSifat('');
    setTempSifatTambahan('');
    // onMakhrajChange('');
    // onSifatChange('');
    // onSifatTambahanChange('');
    // onReset();
    // onClose();
  };

  // Reset temp values and close without applying
  const handleClose = () => {
    setTempMakhraj(selectedMakhraj);
    setTempSifat(selectedSifat);
    setTempSifatTambahan(selectedSifatTambahan);
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title="Filter Tambahan"
      size="lg"
      position="bottom"
    >
      <div className="flex flex-col h-full">
        {/* Scrollable Filter Content */}
        <div className="flex-1 overflow-y-auto px-1 pb-4 space-y-6 max-h-[70vh] sm:max-h-[60vh]">
          {/* Mobile Container */}
          <div className="max-w-sm mx-auto sm:max-w-none">
            {/* Makhraj Filter */}
            <Card variant="elevated" className="p-4">
              <Typography
                variant="body"
                className="text-gray-700 mb-3 font-medium"
              >
                Makhraj
              </Typography>
              <RadioButtonGroup
                value={tempMakhraj}
                onChange={setTempMakhraj}
                options={makhrajOptions}
                name="drawer-makhraj-filter"
                layout="grid"
                variant="emerald"
                columns={2}
              />
            </Card>

            {/* Sifat Filter */}
            <Card variant="elevated" className="p-4 mt-4">
              <Typography
                variant="body"
                className="text-gray-700 mb-3 font-medium"
              >
                Sifat Lahadid
              </Typography>
              <RadioButtonGroup
                value={tempSifat}
                onChange={setTempSifat}
                options={sifatOptions}
                name="drawer-sifat-filter"
                layout="grid"
                variant="purple"
                columns={2}
              />
            </Card>

            {/* Sifat Tambahan Filter */}
            <Card variant="elevated" className="p-4 mt-4">
              <Typography
                variant="body"
                className="text-gray-700 mb-3 font-medium"
              >
                Sifat Ghairu Lahadid
              </Typography>
              <RadioButtonGroup
                value={tempSifatTambahan}
                onChange={setTempSifatTambahan}
                options={sifatTambahanOptions}
                name="drawer-sifat-tambahan-filter"
                layout="grid"
                variant="default"
                columns={2}
              />
            </Card>
          </div>
        </div>

        {/* Fixed Action Buttons */}
        <div className="flex-shrink-0 border-t border-gray-200 pt-4 bg-white">
          <div className="max-w-sm mx-auto sm:max-w-none space-y-3">
            <Button variant="primary" onClick={handleApply} className="w-full">
              Terapkan
            </Button>

            <Button variant="outline" onClick={handleReset} className="w-full">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
