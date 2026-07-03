import Link from 'next/link';
import { CATEGORY_SLUGS } from '@/lib/categories';
import { Locale, getDictionary } from '@/lib/i18n';

const currentYear = new Date().getFullYear();

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="mt-16 bg-marine-900 text-celeste-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <h4 className="text-lg font-bold text-white">{dict.siteName}</h4>
          <p className="mt-2 text-sm text-celeste-300">{dict.footer.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.sectionsHeading}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {CATEGORY_SLUGS.map((slug) => (
              <li key={slug}>
                <Link href={`/${locale}/category/${slug}`} className="hover:text-white">
                  {dict.categories[slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.siteHeading}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href={`/${locale}/about`} className="hover:text-white">
                {dict.footer.aboutLink}
              </Link>
            </li>
            <li>
              <a href="https://www.banderaazul.org.ar" target="_blank" rel="noreferrer" className="hover:text-white">
                {dict.footer.banderaAzulLink}
              </a>
            </li>
            <li>
              <a href="https://www.blueflag.global" target="_blank" rel="noreferrer" className="hover:text-white">
                {dict.footer.blueFlagIntlLink}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-marine-700 px-4 py-4 text-center text-xs text-celeste-400">
        © {currentYear} {dict.footer.copyrightNote}
      </div>
    </footer>
  );
}
