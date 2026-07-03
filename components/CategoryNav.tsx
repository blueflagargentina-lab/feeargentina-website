import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

export default function CategoryNav() {
  return (
    <nav className="border-t border-marine-700/20 bg-marine-800">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 py-2 text-sm font-medium">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/categorias/${category.slug}`}
            className="rounded-md px-3 py-1.5 text-celeste-200 transition hover:bg-marine-700 hover:text-white"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
