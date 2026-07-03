'use client';

import dynamic from 'next/dynamic';
import { Locale, getDictionary } from '@/lib/i18n';

const BlueFlagMap = dynamic(() => import('./BlueFlagMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center rounded-lg bg-celeste-100 text-sm text-marine-600">
      …
    </div>
  ),
});

export default function BlueFlagMapWrapper({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).sidebar;
  return (
    <div className="rounded-xl bg-white p-5 shadow-card ring-1 ring-marine-900/5">
      <h3 className="mb-3 text-base font-bold text-marine-900">{dict.mapTitle}</h3>
      <BlueFlagMap locale={locale} />
      <p className="mt-3 text-[11px] text-marine-500">{dict.mapCaption}</p>
    </div>
  );
}
