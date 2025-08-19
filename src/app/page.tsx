'use client';

import { useState } from 'react';
import IlmuMabadi from '@/components/view/IlmuMabadi';
import HurufHijaiyah from '@/components/view/HurufHijaiyah/HurufHijaiyah';
import { Container, Card, Typography } from '@/components/ui';

type PageMode = 'menu' | 'ilmu-mabadi' | 'makhraj' | 'sifat' | 'huruf-hijaiyah';

export default function Home() {
  const [currentMode, setCurrentMode] = useState<PageMode>('menu');

  const menuOptions = [
    {
      id: 'ilmu-mabadi',
      title: 'Mabadi',
      description: 'Mempelajari dasar-dasar ilmu tajwid',
      color: 'bg-emerald-200',
      textColor: 'text-emerald-900',
    },
    {
      id: 'makhraj',
      title: 'Makhraj',
      description: 'Tempat keluarnya huruf hijaiyah',
      color: 'bg-purple-200',
      textColor: 'text-purple-900',
    },
    {
      id: 'sifat',
      title: 'Sifat',
      description: 'Sifat lahadid dan ghairu lahadid',
      color: 'bg-indigo-200',
      textColor: 'text-indigo-900',
    },
    {
      id: 'huruf-hijaiyah',
      title: 'Huruf Hijaiyah',
      description: 'Rangkuman dalam 29 huruf hijaiyah',
      color: 'bg-lime-200',
      textColor: 'text-lime-900',
    },
  ];

  const renderMenu = () => (
    <Container size="lg" className="py-8 bg-neutral-100">
      <div className="text-center mb-8 pt-12">
        <div className="text-6xl mb-4">📖</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tahsin Quran</h1>
        <div className="bg-white/80 rounded-lg p-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            Aplikasi refleksi setelah belajar tahsin quran dari ilmu mabadi,
            makhraj dan sifat-sifatnya
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {menuOptions.map(option => (
          <Card
            key={option.id}
            variant="elevated"
            className={`${option.color} cursor-pointer transition-colors p-6`}
            onClick={() => setCurrentMode(option.id as PageMode)}
          >
            <Typography variant="h3" className={option.textColor}>
              {option.title}
            </Typography>
            <Typography
              variant="body"
              className={`${option.textColor} opacity-80 mt-2`}
            >
              {option.description}
            </Typography>
          </Card>
        ))}
      </div>
    </Container>
  );

  if (currentMode === 'ilmu-mabadi') {
    return <IlmuMabadi onBack={() => setCurrentMode('menu')} />;
  }

  if (currentMode === 'huruf-hijaiyah') {
    return <HurufHijaiyah onBack={() => setCurrentMode('menu')} />;
  }

  if (currentMode === 'makhraj') {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
        <Container size="md" className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-green-600">📍</span>
          </div>
          <Typography variant="h2" className="text-gray-900 mb-4">
            Makhraj
          </Typography>
          <Typography variant="body" className="text-gray-600 mb-8">
            Fitur ini sedang dalam pengembangan. Segera hadir untuk membantu
            Anda mempelajari tempat keluarnya huruf-huruf hijaiyah.
          </Typography>
          <Card
            variant="outlined"
            className="bg-green-100 cursor-pointer transition-colors p-4"
            onClick={() => setCurrentMode('menu')}
          >
            <Typography variant="body" className="text-green-700">
              ← Kembali ke Menu Utama
            </Typography>
          </Card>
        </Container>
      </div>
    );
  }

  if (currentMode === 'sifat') {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
        <Container size="md" className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-green-600">✨</span>
          </div>
          <Typography variant="h2" className="text-gray-900 mb-4">
            Sifat
          </Typography>
          <Typography variant="body" className="text-gray-600 mb-8">
            Fitur ini sedang dalam pengembangan. Segera hadir untuk membantu
            Anda mempelajari sifat-sifat huruf dalam ilmu tajwid.
          </Typography>
          <Card
            variant="outlined"
            className="bg-green-100 cursor-pointer transition-colors p-4"
            onClick={() => setCurrentMode('menu')}
          >
            <Typography variant="body" className="text-green-700">
              ← Kembali ke Menu Utama
            </Typography>
          </Card>
        </Container>
      </div>
    );
  }

  return <div className="min-h-screen bg-neutral-100">{renderMenu()}</div>;
}
