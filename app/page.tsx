import Hero from '@/components/Hero';
import ArticleGrid from '@/components/ArticleGrid';
import Sidebar from '@/components/Sidebar';
import { CATEGORIES } from '@/lib/categories';
import { getArticlesByCategory, getFeaturedArticle, getLatestArticles } from '@/lib/articles';
import Link from 'next/link';

export default function HomePage() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(6, featured?.slug);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-12">
        {featured && <Hero article={featured} />}

        <section>
          <h2 className="mb-4 text-xl font-bold text-marine-900">Últimas noticias</h2>
          <ArticleGrid articles={latest} />
        </section>

        {CATEGORIES.map((category) => {
          const articles = getArticlesByCategory(category.slug).slice(0, 3);
          if (articles.length === 0) return null;
          return (
            <section key={category.slug}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-marine-900">{category.name}</h2>
                <Link
                  href={`/categorias/${category.slug}`}
                  className="text-sm font-semibold text-marine-500 hover:text-marine-700"
                >
                  Ver todas →
                </Link>
              </div>
              <ArticleGrid articles={articles} />
            </section>
          );
        })}
      </div>
      <Sidebar />
    </div>
  );
}
