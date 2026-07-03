import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import ArticleGrid from '@/components/ArticleGrid';
import Sidebar from '@/components/Sidebar';
import { CATEGORY_SLUGS } from '@/lib/categories';
import { getArticlesByCategory, getFeaturedArticle, getLatestArticles } from '@/lib/articles';
import { isLocale, getDictionary, Locale } from '@/lib/i18n';

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  const featured = getFeaturedArticle(locale);
  const latest = getLatestArticles(locale, 6, featured?.slug);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-12">
        {featured && <Hero article={featured} locale={locale} />}

        <section>
          <h2 className="mb-4 text-xl font-bold text-marine-900">{dict.home.latestNews}</h2>
          <ArticleGrid articles={latest} locale={locale} />
        </section>

        {CATEGORY_SLUGS.map((slug) => {
          const articles = getArticlesByCategory(locale, slug).slice(0, 3);
          if (articles.length === 0) return null;
          const categoryText = dict.categories[slug];
          return (
            <section key={slug}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-marine-900">{categoryText.name}</h2>
                <Link
                  href={`/${locale}/category/${slug}`}
                  className="text-sm font-semibold text-marine-500 hover:text-marine-700"
                >
                  {dict.home.viewAll}
                </Link>
              </div>
              <ArticleGrid articles={articles} locale={locale} />
            </section>
          );
        })}
      </div>
      <Sidebar locale={locale} />
    </div>
  );
}
