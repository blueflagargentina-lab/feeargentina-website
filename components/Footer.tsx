import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-16 bg-marine-900 text-celeste-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <h4 className="text-lg font-bold text-white">Marea Azul</h4>
          <p className="mt-2 text-sm text-celeste-300">
            Portal de noticias automatizado que traduce, resume y publica en español la actualidad
            internacional del programa Blue Flag (Bandera Azul) de la Fundación para la Educación
            Ambiental (FEE).
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Secciones</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/categorias/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Sitio</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/acerca-de" className="hover:text-white">
                Acerca de / FEE Argentina
              </Link>
            </li>
            <li>
              <a href="https://www.banderaazul.org.ar" target="_blank" rel="noreferrer" className="hover:text-white">
                Bandera Azul Argentina
              </a>
            </li>
            <li>
              <a href="https://www.blueflag.global" target="_blank" rel="noreferrer" className="hover:text-white">
                Blue Flag International
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-marine-700 px-4 py-4 text-center text-xs text-celeste-400">
        © {currentYear} Marea Azul News · Contenido generado y curado automáticamente a partir de fuentes
        internacionales, con enlace a la nota original en cada artículo.
      </div>
    </footer>
  );
}
