import Link from 'next/link';
import { CATEGORY_SLUGS } from '@/lib/categories';
import { Locale, getDictionary } from '@/lib/i18n';

export default function CategoryNav({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <nav className="border-t border-marine-700/20 bg-marine-800">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 py-2 text-sm font-medium">
        {CATEGORY_SLUGS.map((slug) => (
          <Link
            key={slug}
            href={`/${locale}/category/${slug}`}
            className="rounded-md px-3 py-1.5 text-celeste-200 transition hover:bg-marine-700 hover:text-white"
          >
            {dict.categories[slug].name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
