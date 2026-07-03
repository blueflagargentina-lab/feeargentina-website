import Link from 'next/link';
import CategoryNav from './CategoryNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="bg-marine-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🏳️‍🌊
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-tight">Marea Azul</span>
              <span className="text-[11px] uppercase tracking-widest text-celeste-300">
                Noticias del programa Blue Flag
              </span>
            </span>
          </Link>
          <div className="hidden items-center gap-4 text-sm sm:flex">
            <Link href="/acerca-de" className="text-celeste-200 hover:text-white">
              Acerca de
            </Link>
            <a
              href="#newsletter"
              className="rounded-full bg-eco-500 px-4 py-2 font-semibold text-white transition hover:bg-eco-600"
            >
              Suscribirme
            </a>
          </div>
        </div>
      </div>
      <CategoryNav />
    </header>
  );
}
