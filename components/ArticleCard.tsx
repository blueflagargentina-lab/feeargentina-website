import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types';
import CategoryBadge from './CategoryBadge';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-marine-900/5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/noticias/${article.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden">
        <Image
          src={article.cover}
          alt={article.coverAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <CategoryBadge category={article.category} />
          <time className="text-xs text-marine-500" dateTime={article.date}>
            {formatDate(article.date)}
          </time>
        </div>
        <h3 className="text-lg font-bold leading-snug text-marine-900">
          <Link href={`/noticias/${article.slug}`} className="hover:text-marine-600">
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-marine-700">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-marine-500">
          <span>📍 {article.country}</span>
          <span>Fuente: {article.sourceName}</span>
        </div>
      </div>
    </article>
  );
}
