import { Article } from '@/lib/types';
import { Locale } from '@/lib/i18n';
import ArticleCard from './ArticleCard';

export default function ArticleGrid({ articles, locale }: { articles: Article[]; locale: Locale }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} locale={locale} />
      ))}
    </div>
  );
}
