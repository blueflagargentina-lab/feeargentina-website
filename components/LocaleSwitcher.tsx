'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, Locale, getDictionary } from '@/lib/i18n';

function pathForLocale(pathname: string, target: Locale) {
  const segments = pathname.split('/');
  segments[1] = target;
  return segments.join('/') || `/${target}`;
}

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale).localeSwitcher;

  return (
    <div className="flex items-center gap-1 text-sm font-semibold">
      {locales.map((target, i) => (
        <span key={target} className="flex items-center gap-1">
          {i > 0 && <span className="text-celeste-400">/</span>}
          <Link
            href={pathForLocale(pathname, target)}
            className={target === locale ? 'text-white' : 'text-celeste-300 hover:text-white'}
            aria-current={target === locale ? 'true' : undefined}
          >
            {dict[target]}
          </Link>
        </span>
      ))}
    </div>
  );
}
