import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Untuk Cinta 🌻',
  description: 'Mini experience ulang tahun yang dibuka pelan-pelan.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
