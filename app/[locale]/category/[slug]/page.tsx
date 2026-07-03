import { notFound } from 'next/navigation';
import ArticleGrid from '@/components/ArticleGrid';
import Sidebar from '@/components/Sidebar';
import { CATEGORY_SLUGS, isCategorySlug } from '@/lib/categories';
import { getArticlesByCategory } from '@/lib/articles';
import { locales, isLocale, getDictionary, Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.flatMap((locale) => CATEGORY_SLUGS.map((slug) => ({ locale, slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale) || !isCategorySlug(params.slug)) return {};
  const dict = getDictionary(params.locale);
  const category = dict.categories[params.slug];
  return { title: category.name, description: category.description };
}

export default function CategoryPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale) || !isCategorySlug(params.slug)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const category = dict.categories[params.slug];

  const articles = getArticlesByCategory(locale, params.slug);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <header className="mb-6 border-b border-marine-900/10 pb-4">
          <h1 className="text-3xl font-extrabold text-marine-900">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-marine-700">{category.description}</p>
        </header>
        {articles.length === 0 ? (
          <p className="rounded-lg bg-foam p-6 text-center text-marine-700">{dict.categoryPage.empty}</p>
        ) : (
          <ArticleGrid articles={articles} locale={locale} />
        )}
      </div>
      <Sidebar locale={locale} />
    </div>
  );
}
