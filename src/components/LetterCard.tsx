'use client';

import { useState } from 'react';
import { ArabicLetter } from '@/data/arabicLetters';
import { LetterDetailDrawer } from './LetterDetailDrawer';

interface LetterCardProps {
  letter: ArabicLetter;
  className?: string;
}

export default function LetterCard({
  letter,
  className = '',
}: LetterCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div
        className={`w-full h-48 cursor-pointer transform transition-transform duration-200 hover:scale-105 ${className}`}
        onClick={() => setShowDetail(true)}
      >
        {/* Card Content */}
        <div className="w-full h-full  bg-lime-200 rounded-xl flex flex-col items-center justify-center text-lime-900">
          <div className="text-6xl font-bold mb-2 text-lime-800">
            {letter.letter}
          </div>
          <div className="text-lg font-medium text-lime-800">{letter.name}</div>
        </div>
      </div>

      {/* Detail Drawer */}
      <LetterDetailDrawer
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        letter={letter}
      />
    </>
  );
}
