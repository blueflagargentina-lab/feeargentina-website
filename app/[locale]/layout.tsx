import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales, isLocale, getDictionary, Locale } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mareazul.news';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${dict.siteName} — ${dict.tagline}`,
      template: `%s | ${dict.siteName}`,
    },
    description: dict.siteDescription,
    alternates: {
      languages: {
        es: '/es',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: params.locale === 'es' ? 'es_AR' : 'en_US',
      siteName: dict.siteName,
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
