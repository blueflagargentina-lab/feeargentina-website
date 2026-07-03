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

export default function Hero({ article }: { article: Article }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-marine-900 text-white shadow-card">
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <Image
          src={article.cover}
          alt={article.coverAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-marine-900 via-marine-900/40 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <CategoryBadge category={article.category} />
          <time className="text-sm text-celeste-200" dateTime={article.date}>
            {formatDate(article.date)}
          </time>
        </div>
        <h1 className="max-w-3xl text-2xl font-extrabold leading-tight sm:text-4xl">
          <Link href={`/noticias/${article.slug}`}>{article.title}</Link>
        </h1>
        <p className="max-w-2xl text-sm text-celeste-100 sm:text-base">{article.excerpt}</p>
        <Link
          href={`/noticias/${article.slug}`}
          className="mt-2 inline-block w-fit rounded-full bg-eco-500 px-5 py-2 text-sm font-semibold transition hover:bg-eco-600"
        >
          Leer nota completa
        </Link>
      </div>
    </section>
  );
}
