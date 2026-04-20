import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Items CRUD',
  description: 'Frontend connected to NestJS API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}