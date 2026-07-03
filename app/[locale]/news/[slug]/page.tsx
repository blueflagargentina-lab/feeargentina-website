import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CategoryBadge from '@/components/CategoryBadge';
import ShareButtons from '@/components/ShareButtons';
import ArticleGrid from '@/components/ArticleGrid';
import Sidebar from '@/components/Sidebar';
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { locales, isLocale, getDictionary, dateLocale, Locale } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mareazul.news';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllArticles(locale).map((article) => ({ locale, slug: article.slug }))
  );
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) return {};
  const article = getArticleBySlug(params.locale, params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.seoDescription,
    openGraph: {
      title: article.title,
      description: article.seoDescription,
      images: [article.cover],
    },
  };
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(dateLocale(locale), {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticlePage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  const article = getArticleBySlug(locale, params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(locale, article);
  const articleUrl = `${SITE_URL}/${locale}/news/${article.slug}`;
  const categoryText = dict.categories[article.category];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article>
        <div className="mb-4 flex items-center gap-3">
          <CategoryBadge category={article.category} label={categoryText.name} />
          <time className="text-sm text-marine-500" dateTime={article.date}>
            {formatDate(article.date, locale)}
          </time>
          <span className="text-sm text-marine-500">📍 {article.country}</span>
        </div>

        <h1 className="text-3xl font-extrabold leading-tight text-marine-900 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-lg text-marine-700">{article.excerpt}</p>

        <div className="relative my-6 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image src={article.cover} alt={article.coverAlt} fill priority sizes="100vw" className="object-cover" />
        </div>

        <div className="mb-6">
          <ShareButtons title={article.title} url={articleUrl} dict={dict.share} />
        </div>

        <div className="prose-article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        </div>

        <div className="mt-8 rounded-lg border border-marine-900/10 bg-celeste-200/30 p-4 text-sm text-marine-700">
          {dict.article.editorialNotePrefix}{' '}
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-marine-600 underline hover:text-marine-800"
          >
            {article.sourceName}
          </a>
          .
        </div>

        <div className="mt-6">
          <ShareButtons title={article.title} url={articleUrl} dict={dict.share} />
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-marine-900">{dict.article.relatedNews}</h2>
            <ArticleGrid articles={related} locale={locale} />
          </section>
        )}

        <p className="mt-8 text-sm">
          <Link href={`/${locale}`} className="text-marine-500 hover:text-marine-700">
            {dict.article.backToHome}
          </Link>
        </p>
      </article>
      <Sidebar locale={locale} />
    </div>
  );
}
