import { notFound } from 'next/navigation';
import ArticleGrid from '@/components/ArticleGrid';
import Sidebar from '@/components/Sidebar';
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories';
import { getArticlesByCategory } from '@/lib/articles';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categoria: c.slug }));
}

export function generateMetadata({ params }: { params: { categoria: string } }) {
  const category = getCategoryBySlug(params.categoria);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { categoria: string } }) {
  const category = getCategoryBySlug(params.categoria);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <header className="mb-6 border-b border-marine-900/10 pb-4">
          <h1 className="text-3xl font-extrabold text-marine-900">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-marine-700">{category.description}</p>
        </header>
        <ArticleGrid articles={articles} />
      </div>
      <Sidebar />
    </div>
  );
}
