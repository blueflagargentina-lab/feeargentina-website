import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <p className="rounded-lg bg-foam p-6 text-center text-marine-700">
        Todavía no hay artículos publicados en esta sección.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
