import type { Metadata } from 'next';
import { roboto } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tahsin Quran',
  description: 'Aplikasi refleksi setelah tahsin quran',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={roboto.variable}>
      <body className={`font-roboto antialiased`}>{children}</body>
    </html>
  );
}
