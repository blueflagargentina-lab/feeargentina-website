import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { locales, isLocale, getDictionary, Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return { title: dict.nav.about, description: dict.about.intro };
}

function readInstitutionalDoc(filename: string, locale: Locale) {
  const localizedName = locale === 'en' ? filename.replace(/\.md$/, '.en.md') : filename;
  const candidate = path.join(process.cwd(), 'content', localizedName);
  const fallback = path.join(process.cwd(), 'content', filename);
  const filePath = fs.existsSync(candidate) ? candidate : fallback;
  const raw = fs.readFileSync(filePath, 'utf8');
  return matter(raw).content;
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  const historia = readInstitutionalDoc('historia.md', locale);
  const programas = readInstitutionalDoc('programas.md', locale);
  const contacto = readInstitutionalDoc('contacto.md', locale);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold text-marine-900">{dict.about.title}</h1>

      <section className="prose-article mt-6">
        <p>{dict.about.intro}</p>
        <h2>{dict.about.howHeading}</h2>
        <ul>
          {dict.about.how.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>{dict.about.linkHeading}</h2>
        <p>{dict.about.linkBody}</p>
      </section>

      <section className="prose-article mt-10 border-t border-marine-900/10 pt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{historia}</ReactMarkdown>
      </section>

      <section className="prose-article mt-10 border-t border-marine-900/10 pt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{programas}</ReactMarkdown>
      </section>

      <section className="prose-article mt-10 border-t border-marine-900/10 pt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{contacto}</ReactMarkdown>
      </section>
    </div>
  );
}
