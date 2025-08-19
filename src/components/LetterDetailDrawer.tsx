'use client';

import { Drawer } from '@/components/ui/drawer';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { ArabicLetter } from '@/data/arabicLetters';

export interface LetterDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  letter: ArabicLetter | null;
}

export function LetterDetailDrawer({
  isOpen,
  onClose,
  letter,
}: LetterDetailDrawerProps) {
  if (!letter) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Detail Huruf ${letter.letter} (${letter.name})`}
      size="lg"
      position="bottom"
    >
      <div className="flex flex-col h-full max-h-[70vh] sm:max-h-[60vh]">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-1 pb-4">
          {/* Mobile Container */}
          <div className="max-w-sm mx-auto sm:max-w-none">
            {/* Makhraj Information */}
            <Card variant="elevated" className="p-4">
              <Typography
                variant="body"
                className="text-gray-700 mb-3 font-semibold text-lg"
              >
                Makhraj
              </Typography>
              <div className="flex justify-between items-center p-3 rounded-lg border border-gray-200">
                <Typography
                  variant="body"
                  className="text-gray-800 font-semibold"
                >
                  {letter.makhraj}
                </Typography>
              </div>
            </Card>

            {/* Sifat-sifat Huruf */}
            <Card variant="elevated" className="p-4">
              <Typography
                variant="body"
                className="text-gray-700 mb-4 font-semibold text-lg"
              >
                Sifat Huruf
              </Typography>
              <div className="space-y-3">
                {/* Nafas */}
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <Typography
                    variant="body"
                    className="text-gray-600 font-medium"
                  >
                    Nafas:
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-emerald-800 font-semibold"
                  >
                    {letter.nafas}
                  </Typography>
                </div>

                {/* Suara */}
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <Typography
                    variant="body"
                    className="text-gray-600 font-medium"
                  >
                    Suara:
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-purple-800 font-semibold"
                  >
                    {letter.suara}
                  </Typography>
                </div>

                {/* Lidah */}
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <Typography
                    variant="body"
                    className="text-gray-600 font-medium"
                  >
                    Lidah:
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-indigo-800 font-semibold"
                  >
                    {letter.lidah}
                  </Typography>
                </div>

                {/* Tebal */}
                <div className="flex justify-between items-center p-3 bg-lime-50 rounded-lg border border-lime-200">
                  <Typography
                    variant="body"
                    className="text-gray-600 font-medium"
                  >
                    Tebal:
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-lime-800 font-semibold"
                  >
                    {letter.tebal}
                  </Typography>
                </div>

                {/* Pengucapan */}
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Typography
                    variant="body"
                    className="text-gray-600 font-medium"
                  >
                    Pengucapan:
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-orange-800 font-semibold"
                  >
                    {letter.pengucapan}
                  </Typography>
                </div>
              </div>
            </Card>

            {/* Sifat Tambahan */}
            {letter.sifatImtihan && (
              <Card variant="elevated" className="p-4">
                <Typography
                  variant="body"
                  className="text-gray-700 mb-3 font-semibold text-lg"
                >
                  Sifat Tambahan
                </Typography>
                <div className="flex justify-between items-center p-3 rounded-lg border border-gray-200">
                  <Typography
                    variant="body"
                    className="text-gray-800 font-semibold"
                  >
                    {letter.sifatImtihan}
                  </Typography>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
