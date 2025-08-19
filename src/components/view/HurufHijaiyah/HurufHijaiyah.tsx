'use client';

import { useState, useMemo } from 'react';
import { Container, Card, Typography, Button } from '@/components/ui';
import { CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { FunnelIcon } from '@phosphor-icons/react/dist/ssr/Funnel';
import { arabicLettersData } from '@/data/arabicLetters';
import LetterCard from '@/components/LetterCard';

import { Filter } from './Filter';

interface HurufHijaiyahProps {
  onBack: () => void;
}

export default function HurufHijaiyah({ onBack }: HurufHijaiyahProps) {
  const [searchName, setSearchName] = useState('');
  const [selectedMakhraj, setSelectedMakhraj] = useState<string>('');
  const [selectedSifat, setSelectedSifat] = useState<string>('');
  const [selectedSifatTambahan, setSelectedSifatTambahan] =
    useState<string>('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Extract unique values for filters
  const makhrajOptions = useMemo(() => {
    // Define the order of makhraj groups based on the second word (anatomical location)
    const makhrajGroups = {
      Lisan: new Set<string>(), // Tongue-related
      Halq: new Set<string>(), // Throat-related
      Khayshum: new Set<string>(), // Nasal-related
      // Jauf: new Set<string>(), // Cavity-related
      Syafatain: new Set<string>(),
    };

    // Collect unique values for each group based on second word
    arabicLettersData.forEach(letter => {
      const words = letter.makhraj.split(' ');
      const secondWord = words.length > 1 ? words[1] : words[0];

      if (secondWord === 'Lisan') {
        makhrajGroups.Lisan.add(letter.makhraj);
      } else if (secondWord === 'Halq') {
        makhrajGroups.Halq.add(letter.makhraj);
      } else if (secondWord === 'Khayshum') {
        makhrajGroups.Khayshum.add(letter.makhraj);
        // } else if (secondWord === 'Jauf') {
        //   makhrajGroups.Jauf.add(letter.makhraj);
      } else if (secondWord === 'Syafatain') {
        makhrajGroups.Syafatain.add(letter.makhraj);
      }
    });

    // Create ordered options by group
    const groupedOptions = [
      // Lisan (Tongue) group
      ...Array.from(makhrajGroups.Lisan)
        .sort()
        .map(makhraj => ({ label: makhraj, value: makhraj })),
      // Halq (Throat) group
      ...Array.from(makhrajGroups.Halq)
        .sort()
        .map(makhraj => ({ label: makhraj, value: makhraj })),
      // Khayshum (Nasal) group
      ...Array.from(makhrajGroups.Khayshum)
        .sort()
        .map(makhraj => ({ label: makhraj, value: makhraj })),
      // Jauf (Cavity) group
      // ...Array.from(makhrajGroups.Jauf)
      //   .sort()
      //   .map(makhraj => ({ label: makhraj, value: makhraj })),
      ...Array.from(makhrajGroups.Syafatain)
        .sort()
        .map(makhraj => ({ label: makhraj, value: makhraj })),
    ];

    return groupedOptions;
  }, []);

  const sifatOptions = useMemo(() => {
    // Define the order of sifat groups
    const sifatGroups = {
      nafas: new Set<string>(),
      lidah: new Set<string>(),
      tebal: new Set<string>(),
      pengucapan: new Set<string>(),
      suara: new Set<string>(),
    };

    // Collect unique values for each group
    arabicLettersData.forEach(letter => {
      sifatGroups.nafas.add(letter.nafas);
      sifatGroups.lidah.add(letter.lidah);
      sifatGroups.tebal.add(letter.tebal);
      sifatGroups.pengucapan.add(letter.pengucapan);
      sifatGroups.suara.add(letter.suara);
    });

    // Create ordered options by group
    const groupedOptions = [
      ...Array.from(sifatGroups.nafas).map(sifat => ({
        label: sifat,
        value: sifat,
      })),
      ...Array.from(sifatGroups.lidah).map(sifat => ({
        label: sifat,
        value: sifat,
      })),
      ...Array.from(sifatGroups.tebal).map(sifat => ({
        label: sifat,
        value: sifat,
      })),
      ...Array.from(sifatGroups.pengucapan).map(sifat => ({
        label: sifat,
        value: sifat,
      })),
      ...Array.from(sifatGroups.suara).map(sifat => ({
        label: sifat,
        value: sifat,
      })),
    ];

    return groupedOptions;
  }, []);

  const sifatTambahanOptions = useMemo(() => {
    const sifatTambahanSet = new Set();
    arabicLettersData.forEach(letter => {
      // Add only sifatImtihan
      if (letter.sifatImtihan) {
        sifatTambahanSet.add(letter.sifatImtihan);
      }
    });
    const uniqueSifatTambahan = Array.from(sifatTambahanSet).sort() as string[];
    return [
      // { label: 'Semua Sifat', value: '' },
      ...uniqueSifatTambahan.map(sifat => ({ label: sifat, value: sifat })),
    ];
  }, []);

  const filteredLetters = useMemo(() => {
    return arabicLettersData.filter(letter => {
      // Name search filter
      const matchesSearch =
        searchName === '' ||
        letter.letter.includes(searchName) ||
        letter.name.toLowerCase().includes(searchName.toLowerCase());

      // Makhraj filter
      const matchesMakhraj =
        selectedMakhraj === '' || letter.makhraj === selectedMakhraj;

      // Sifat filter - check if letter has the selected sifat (excluding sifatImtihan)
      const matchesSifat =
        selectedSifat === '' ||
        letter.nafas === selectedSifat ||
        letter.suara === selectedSifat ||
        letter.lidah === selectedSifat ||
        letter.tebal === selectedSifat ||
        letter.pengucapan === selectedSifat;

      // Sifat Tambahan filter - check only sifatImtihan
      const matchesSifatTambahan =
        selectedSifatTambahan === '' ||
        letter.sifatImtihan === selectedSifatTambahan;

      return (
        matchesSearch && matchesMakhraj && matchesSifat && matchesSifatTambahan
      );
    });
  }, [searchName, selectedMakhraj, selectedSifat, selectedSifatTambahan]);

  const resetAllFilters = () => {
    setSearchName('');
    setSelectedMakhraj('');
    setSelectedSifat('');
    setSelectedSifatTambahan('');
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Container size="lg" className="py-6">
        {/* Header */}
        <div className="flex items-center mb-8 w-full">
          <Button
            size="icon"
            variant="ghost"
            onClick={onBack}
            className="flex-none"
          >
            <CaretLeftIcon size={25} />
          </Button>
          <Typography
            variant="h3"
            className="text-gray-900 text-center flex-1 grow"
          >
            Huruf Hijaiyah
          </Typography>
        </div>

        {/* Content */}
        <div className="space-y-6 flex flex-col">
          {/* Controls */}
          <div className="grid grid-cols-1 gap-4">
            {/* Search and Filter Trigger */}
            <Card variant="elevated" className="p-4">
              <Typography variant="body" className="text-gray-700 mb-2">
                Filter
              </Typography>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cari nama huruf..."
                  value={searchName}
                  onChange={e => setSearchName(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="relative"
                >
                  <FunnelIcon size={20} />
                  {(selectedMakhraj ||
                    selectedSifat ||
                    selectedSifatTambahan) && (
                    <span className="ml-2 px-3 py-1 absolute bg-lime-200 text-lime-800 rounded-full top-[-10px] right-[-15px]">
                      {
                        [
                          selectedMakhraj,
                          selectedSifat,
                          selectedSifatTambahan,
                        ].filter(Boolean).length
                      }
                    </span>
                  )}
                </Button>
              </div>
              {/* Filter Summary */}
              {(selectedMakhraj || selectedSifat || selectedSifatTambahan) && (
                <Card variant="ghost" className="p-3">
                  <div className="space-y-1">
                    {selectedMakhraj && (
                      <Typography
                        variant="caption"
                        className="text-emerald-500 block"
                      >
                        Makhraj:{' '}
                        {
                          makhrajOptions.find(
                            opt => opt.value === selectedMakhraj
                          )?.label
                        }
                      </Typography>
                    )}
                    {selectedSifat && (
                      <Typography
                        variant="caption"
                        className="text-purple-500 block"
                      >
                        Sifat:{' '}
                        {
                          sifatOptions.find(opt => opt.value === selectedSifat)
                            ?.label
                        }
                      </Typography>
                    )}
                    {selectedSifatTambahan && (
                      <Typography
                        variant="caption"
                        className="text-indigo-500 block"
                      >
                        Sifat:{' '}
                        {
                          sifatTambahanOptions.find(
                            opt => opt.value === selectedSifatTambahan
                          )?.label
                        }
                      </Typography>
                    )}
                  </div>
                </Card>
              )}
            </Card>
          </div>

          {/* Letters Grid - 2 cards per row */}
          <Typography variant="h5" className="text-lime-900 text-center block">
            {filteredLetters.length} Huruf
          </Typography>
          {filteredLetters.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredLetters.map(letter => (
                <LetterCard
                  key={letter.id}
                  letter={letter}
                  className="animate-fadeIn"
                />
              ))}
            </div>
          ) : (
            <Card variant="elevated" className="p-12 text-center">
              <div className="text-6xl mb-4">🔎</div>
              <Typography variant="h4" className="text-gray-600 mb-4">
                Tidak ada huruf yang cocok dengan pencarian
              </Typography>
              <Button
                variant="outline"
                onClick={resetAllFilters}
                // className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Reset Pencarian
              </Button>
            </Card>
          )}
        </div>
      </Container>

      {/* Filter Drawer */}
      <Filter
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        selectedMakhraj={selectedMakhraj}
        onMakhrajChange={setSelectedMakhraj}
        selectedSifat={selectedSifat}
        onSifatChange={setSelectedSifat}
        selectedSifatTambahan={selectedSifatTambahan}
        onSifatTambahanChange={setSelectedSifatTambahan}
        makhrajOptions={makhrajOptions}
        sifatOptions={sifatOptions}
        sifatTambahanOptions={sifatTambahanOptions}
        onReset={resetAllFilters}
        onApply={() => {
          // Optional: Add any additional logic when filters are applied
          console.log('Filters applied:', {
            selectedMakhraj,
            selectedSifat,
            selectedSifatTambahan,
          });
        }}
      />
    </div>
  );
}
