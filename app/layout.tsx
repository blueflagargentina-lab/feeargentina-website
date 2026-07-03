import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mareazul.news';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Marea Azul — Noticias del programa Blue Flag',
    template: '%s | Marea Azul',
  },
  description:
    'Portal de noticias en español sobre playas, marinas y proyectos de sostenibilidad certificados con la Bandera Azul (Blue Flag) en todo el mundo.',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Marea Azul',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
