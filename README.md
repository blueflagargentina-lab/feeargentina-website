# Marea Azul / Blue Tide — Portal de noticias automatizado sobre Blue Flag (Bandera Azul)

Portal editorial **bilingüe (español / inglés)** que recopila, traduce, resume y publica noticias
internacionales sobre el programa de certificación ecológica **Blue Flag**: playas, marinas,
nuevas certificaciones y sostenibilidad marina. El proyecto nace vinculado a **FEE Argentina**, el
capítulo argentino de la Fundación para la Educación Ambiental que administra Bandera Azul en el
país (ver `content/*.md` y la página `/es/about` / `/en/about`).

## Idiomas

El sitio vive bajo rutas con prefijo de idioma: `/es/...` (español, contenido "Marea Azul") y
`/en/...` (inglés, contenido "Blue Tide"). La raíz `/` redirige a `/es` vía `middleware.ts`, que
también redirige las rutas legacy sin prefijo de idioma (`/categorias/*`, `/noticias/*`,
`/acerca-de`) a sus equivalentes en `/es`. El selector ES/EN vive en el header
(`components/LocaleSwitcher.tsx`) y conserva la página actual al cambiar de idioma.

- Textos de interfaz (nav, botones, sidebar, footer, etc.): `lib/i18n.ts`.
- Artículos: `content/articulos/es/*.md` y `content/articulos/en/*.md` (mismo `slug` en ambos
  idiomas para la misma noticia, así los enlaces cruzados apuntan al lugar correcto).
- Contenido institucional de FEE Argentina: `content/historia.md` / `content/historia.en.md`
  (mismo patrón para `programas.md` y `contacto.md`).

## Arquitectura

```
Fuentes RSS (Blue Flag Intl., Euronews Travel, UNWTO, Bandera Azul AR)
        │  scripts/fetch-sources.mjs
        ▼
  data/raw/*.json  (noticias nuevas, deduplicadas por URL en data/seen-urls.json)
        │  scripts/generate-articles.mjs  →  LLM (Anthropic Claude), una vez por idioma
        ▼
  content/articulos/es/*.md + content/articulos/en/*.md  (mismo slug, frontmatter SEO)
        │  Next.js (build estático de contenido)
        ▼
     Sitio publicado (App Router, generateStaticParams para /es y /en)
```

La ingesta y reescritura corren de forma programada vía GitHub Actions
(`.github/workflows/ingest-news.yml`, cada 6 horas) y también pueden ejecutarse a mano.

## Stack técnico

- **Next.js 14 (App Router) + TypeScript** — sitio y rutas, con segmento dinámico `app/[locale]/`.
- **Tailwind CSS** — diseño con paleta ecológica de azules marinos, celestes y blancos.
- **Contenido como archivos**: cada noticia es un `.md` con frontmatter en
  `content/articulos/{es,en}/`, leído en build time con `gray-matter` (`lib/articles.ts`).
- **react-markdown + remark-gfm** — renderizado del cuerpo de los artículos.
- **react-leaflet** — mapa interactivo con los sitios Blue Flag por país (sidebar).
- **rss-parser + @anthropic-ai/sdk** — pipeline de ingesta y reescritura editorial (`scripts/`).

## Estructura del sitio (por idioma, prefijo `/es` o `/en`)

- **Portada (`/{locale}`)** — hero con la noticia principal + rejilla de últimas noticias + vista
  previa por categoría.
- **Categorías**: `/{locale}/category/playas-destacadas`, `/marinas-y-embarcaciones`,
  `/nuevas-certificaciones`, `/sostenibilidad-marina` (el slug de categoría es el mismo id interno
  en ambos idiomas; el nombre visible se traduce vía `lib/i18n.ts`).
- **Artículo (`/{locale}/news/[slug]`)** — nota completa, botones para compartir (WhatsApp, X,
  Facebook, LinkedIn, copiar enlace) y enlace a la fuente original al pie.
- **Sidebar** — mapa interactivo global, ranking de países con más galardones Blue Flag y
  formulario de suscripción a newsletter.
- **`/{locale}/about`** — metodología editorial + información institucional de FEE Argentina.

## Guía editorial del contenido autoeditado

Definida en `scripts/lib/prompt.mjs` y aplicada a cada artículo generado (una vez por idioma):

1. Reescritura 100% original en el idioma de destino, sin frases textuales de la fuente (evita plagio).
2. Tono periodístico objetivo, en tercera persona.
3. Mención explícita del año en curso en el cuerpo del artículo.
4. Título y meta descripción optimizados para SEO.
5. Enlace a la fuente original siempre visible al final del artículo (`sourceName` / `sourceUrl`
   en el frontmatter, renderizado por `app/[locale]/news/[slug]/page.tsx`).

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000 (redirige a /es)
npm run build && npm run start
```

## Pipeline de automatización

```bash
cp .env.example .env.local   # completar ANTHROPIC_API_KEY
npm run ingest:fetch         # trae noticias nuevas de config/sources.json a data/raw/
npm run ingest:generate      # las reescribe con el LLM en ES y EN, y las publica en content/articulos/
```

- `config/sources.json` lista las fuentes RSS. Los feeds incluidos (Blue Flag International,
  Euronews Travel, UNWTO, Bandera Azul Argentina) son de referencia: verificá y ajustá las URLs
  reales antes de activar el cron en producción, ya que algunos medios cambian sus endpoints RSS.
- El workflow `.github/workflows/ingest-news.yml` corre ambos pasos cada 6 horas y commitea los
  artículos nuevos automáticamente. Requiere el secret `ANTHROPIC_API_KEY` en el repositorio.
- Un editor humano siempre puede revisar, corregir o eliminar cualquier `.md` generado antes o
  después de su publicación: son archivos de texto versionados en Git.

## Newsletter y redes

- `components/NewsletterForm.tsx` envía el email a `app/api/newsletter/route.ts`, dejado como stub
  listo para conectar con un proveedor (Mailchimp, Resend, Brevo) vía las variables
  `NEWSLETTER_PROVIDER` / `NEWSLETTER_API_KEY` / `NEWSLETTER_LIST_ID` de `.env.example`.
- `components/ShareButtons.tsx` genera los enlaces de compartido para cada artículo.

## Variables de entorno

Ver `.env.example`. Como mínimo, para correr el pipeline de generación se necesita
`ANTHROPIC_API_KEY`.

## Créditos institucionales

El programa Blue Flag es administrado internacionalmente por la **Fundación para la Educación
Ambiental (FEE)** y, en Argentina, por **FEE Argentina** bajo el nombre Bandera Azul
([banderaazul.org.ar](http://www.banderaazul.org.ar)). Marea Azul / Blue Tide es un proyecto
editorial que sigue la actualidad de ese programa; el contenido institucional original de FEE
Argentina se conserva en `content/*.md` (español) y `content/*.en.md` (inglés).
