import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const metadata = {
  title: 'Acerca de',
  description:
    'Cómo funciona Marea Azul, portal editorial automatizado sobre el programa Blue Flag, y su vínculo con FEE Argentina.',
};

function readInstitutionalDoc(filename: string) {
  const filePath = path.join(process.cwd(), 'content', filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  return matter(raw).content;
}

export default function AcercaDePage() {
  const historia = readInstitutionalDoc('historia.md');
  const programas = readInstitutionalDoc('programas.md');
  const contacto = readInstitutionalDoc('contacto.md');

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold text-marine-900">Acerca de Marea Azul</h1>

      <section className="prose-article mt-6">
        <p>
          <strong>Marea Azul</strong> es un portal editorial que recopila, traduce y resume en
          español la actualidad internacional sobre el programa de certificación ecológica{' '}
          <strong>Blue Flag (Bandera Azul)</strong>: nuevas playas y marinas certificadas, criterios
          de calidad de agua y gestión ambiental, y proyectos de sostenibilidad costera.
        </p>
        <h2>Cómo se produce el contenido</h2>
        <ul>
          <li>
            Un proceso automatizado consulta fuentes RSS de agencias internacionales, ministerios de
            turismo y medios especializados (por ejemplo, Blue Flag International y Euronews Travel).
          </li>
          <li>
            Cada noticia se reescribe con un modelo de lenguaje siguiendo una guía editorial que exige
            tono periodístico objetivo, redacción original en español, optimización SEO y la mención
            del año en curso.
          </li>
          <li>
            Al final de cada artículo se enlaza siempre la fuente original, para que quien lea pueda
            consultar la nota fuente completa.
          </li>
          <li>Un editor humano puede revisar, corregir o despublicar cualquier artículo antes o después de su publicación.</li>
        </ul>
        <h2>Vínculo con FEE Argentina</h2>
        <p>
          El programa Blue Flag es administrado internacionalmente por la Fundación para la Educación
          Ambiental (FEE) y, en Argentina, por FEE Argentina bajo el nombre Bandera Azul. Marea Azul es
          un proyecto editorial independiente que sigue de cerca la actualidad de ese programa.
        </p>
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
