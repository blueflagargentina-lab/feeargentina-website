import Link from 'next/link';
import CategoryNav from './CategoryNav';
import LocaleSwitcher from './LocaleSwitcher';
import { Locale, getDictionary } from '@/lib/i18n';

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="bg-marine-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🏳️‍🌊
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-tight">{dict.siteName}</span>
              <span className="text-[11px] uppercase tracking-widest text-celeste-300">
                {dict.tagline}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <LocaleSwitcher locale={locale} />
            <Link href={`/${locale}/about`} className="hidden text-celeste-200 hover:text-white sm:inline">
              {dict.nav.about}
            </Link>
            <a
              href="#newsletter"
              className="hidden rounded-full bg-eco-500 px-4 py-2 font-semibold text-white transition hover:bg-eco-600 sm:inline"
            >
              {dict.nav.subscribe}
            </a>
          </div>
        </div>
      </div>
      <CategoryNav locale={locale} />
    </header>
  );
}
