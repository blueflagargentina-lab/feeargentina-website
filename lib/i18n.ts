import { CategorySlug } from './types';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dateLocale(locale: Locale): string {
  return locale === 'es' ? 'es-AR' : 'en-US';
}

interface CategoryText {
  name: string;
  description: string;
}

export interface Dictionary {
  siteName: string;
  tagline: string;
  siteDescription: string;
  nav: {
    about: string;
    subscribe: string;
  };
  categories: Record<CategorySlug, CategoryText>;
  home: {
    latestNews: string;
    viewAll: string;
  };
  hero: {
    readFullStory: string;
  };
  article: {
    source: string;
    editorialNotePrefix: string;
    relatedNews: string;
    backToHome: string;
  };
  share: {
    label: string;
    copyLink: string;
    linkCopied: string;
  };
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    button: string;
    buttonLoading: string;
    success: string;
    error: string;
  };
  sidebar: {
    mapTitle: string;
    mapLoading: string;
    mapCaption: string;
    rankingTitle: string;
    rankingCaption: string;
  };
  footer: {
    description: string;
    sectionsHeading: string;
    siteHeading: string;
    aboutLink: string;
    banderaAzulLink: string;
    blueFlagIntlLink: string;
    copyrightNote: string;
  };
  categoryPage: {
    empty: string;
  };
  about: {
    title: string;
    intro: string;
    howHeading: string;
    how: string[];
    linkHeading: string;
    linkBody: string;
  };
  localeSwitcher: { es: string; en: string };
}

const es: Dictionary = {
  siteName: 'Marea Azul',
  tagline: 'Noticias del programa Blue Flag',
  siteDescription:
    'Portal de noticias en español sobre playas, marinas y proyectos de sostenibilidad certificados con la Bandera Azul (Blue Flag) en todo el mundo.',
  nav: { about: 'Acerca de', subscribe: 'Suscribirme' },
  categories: {
    'playas-destacadas': {
      name: 'Playas Destacadas',
      description:
        'Costas y balnearios de todo el mundo que lucen la certificación Blue Flag por su calidad de agua, seguridad y gestión ambiental.',
    },
    'marinas-y-embarcaciones': {
      name: 'Marinas y Embarcaciones',
      description:
        'Puertos deportivos, marinas y operadores de turismo náutico certificados bajo los estándares internacionales de Blue Flag.',
    },
    'nuevas-certificaciones': {
      name: 'Nuevas Certificaciones',
      description:
        'Los últimos sitios en sumarse al programa Blue Flag y las novedades sobre procesos de evaluación en curso.',
    },
    'sostenibilidad-marina': {
      name: 'Sostenibilidad Marina',
      description:
        'Políticas, investigación y proyectos de conservación costera y marina vinculados a la Fundación para la Educación Ambiental (FEE).',
    },
  },
  home: { latestNews: 'Últimas noticias', viewAll: 'Ver todas →' },
  hero: { readFullStory: 'Leer nota completa' },
  article: {
    source: 'Fuente',
    editorialNotePrefix:
      'Nota elaborada por la redacción de Marea Azul a partir de fuentes internacionales. Fuente original:',
    relatedNews: 'Noticias relacionadas',
    backToHome: '← Volver a la portada',
  },
  share: { label: 'Compartir:', copyLink: 'Copiar enlace', linkCopied: '¡Enlace copiado!' },
  newsletter: {
    title: 'Recibí las novedades de Blue Flag',
    description: 'Un resumen semanal con nuevas certificaciones, playas y marinas destacadas.',
    placeholder: 'tu@email.com',
    button: 'Quiero suscribirme',
    buttonLoading: 'Enviando…',
    success: '¡Listo! Revisá tu correo para confirmar.',
    error: 'No pudimos procesar la suscripción. Probá de nuevo.',
  },
  sidebar: {
    mapTitle: '🗺️ Mapa global Blue Flag',
    mapLoading: 'Cargando mapa interactivo…',
    mapCaption: 'Tamaño del punto proporcional a la cantidad de sitios certificados por país.',
    rankingTitle: '🏆 Países con más galardones Blue Flag',
    rankingCaption:
      'Cifras de referencia de sitios galardonados Blue Flag, actualizadas para la temporada 2026.',
  },
  footer: {
    description:
      'Portal de noticias automatizado que traduce, resume y publica en español la actualidad internacional del programa Blue Flag (Bandera Azul) de la Fundación para la Educación Ambiental (FEE).',
    sectionsHeading: 'Secciones',
    siteHeading: 'Sitio',
    aboutLink: 'Acerca de / FEE Argentina',
    banderaAzulLink: 'Bandera Azul Argentina',
    blueFlagIntlLink: 'Blue Flag International',
    copyrightNote:
      'Marea Azul News · Contenido generado y curado automáticamente a partir de fuentes internacionales, con enlace a la nota original en cada artículo.',
  },
  categoryPage: { empty: 'Todavía no hay artículos publicados en esta sección.' },
  about: {
    title: 'Acerca de Marea Azul',
    intro:
      'Marea Azul es un portal editorial que recopila, traduce y resume en español la actualidad internacional sobre el programa de certificación ecológica Blue Flag (Bandera Azul): nuevas playas y marinas certificadas, criterios de calidad de agua y gestión ambiental, y proyectos de sostenibilidad costera.',
    howHeading: 'Cómo se produce el contenido',
    how: [
      'Un proceso automatizado consulta fuentes RSS de agencias internacionales, ministerios de turismo y medios especializados (por ejemplo, Blue Flag International y Euronews Travel).',
      'Cada noticia se reescribe con un modelo de lenguaje siguiendo una guía editorial que exige tono periodístico objetivo, redacción original en el idioma del sitio, optimización SEO y la mención del año en curso.',
      'Al final de cada artículo se enlaza siempre la fuente original, para que quien lea pueda consultar la nota fuente completa.',
      'Un editor humano puede revisar, corregir o despublicar cualquier artículo antes o después de su publicación.',
    ],
    linkHeading: 'Vínculo con FEE Argentina',
    linkBody:
      'El programa Blue Flag es administrado internacionalmente por la Fundación para la Educación Ambiental (FEE) y, en Argentina, por FEE Argentina bajo el nombre Bandera Azul. Marea Azul es un proyecto editorial independiente que sigue de cerca la actualidad de ese programa.',
  },
  localeSwitcher: { es: 'ES', en: 'EN' },
};

const en: Dictionary = {
  siteName: 'Blue Tide',
  tagline: 'News from the Blue Flag programme',
  siteDescription:
    'English-language news portal covering beaches, marinas and sustainability projects certified with the Blue Flag eco-label worldwide.',
  nav: { about: 'About', subscribe: 'Subscribe' },
  categories: {
    'playas-destacadas': {
      name: 'Featured Beaches',
      description:
        'Coastlines and seaside resorts around the world flying the Blue Flag for their water quality, safety and environmental management.',
    },
    'marinas-y-embarcaciones': {
      name: 'Marinas & Boating',
      description:
        'Marinas, ports and nautical tourism operators certified under Blue Flag international standards.',
    },
    'nuevas-certificaciones': {
      name: 'New Certifications',
      description:
        'The latest sites joining the Blue Flag programme and updates on ongoing assessment processes.',
    },
    'sostenibilidad-marina': {
      name: 'Marine Sustainability',
      description:
        'Policy, research and coastal or marine conservation projects linked to the Foundation for Environmental Education (FEE).',
    },
  },
  home: { latestNews: 'Latest news', viewAll: 'View all →' },
  hero: { readFullStory: 'Read full story' },
  article: {
    source: 'Source',
    editorialNotePrefix:
      'Story compiled by the Blue Tide editorial team from international sources. Original source:',
    relatedNews: 'Related news',
    backToHome: '← Back to homepage',
  },
  share: { label: 'Share:', copyLink: 'Copy link', linkCopied: 'Link copied!' },
  newsletter: {
    title: 'Get Blue Flag updates',
    description: 'A weekly digest of new certifications and featured beaches and marinas.',
    placeholder: 'you@email.com',
    button: 'Subscribe me',
    buttonLoading: 'Sending…',
    success: "You're in! Check your inbox to confirm.",
    error: "We couldn't process your subscription. Please try again.",
  },
  sidebar: {
    mapTitle: '🗺️ Global Blue Flag map',
    mapLoading: 'Loading interactive map…',
    mapCaption: 'Dot size is proportional to the number of certified sites per country.',
    rankingTitle: '🏆 Countries with the most Blue Flag awards',
    rankingCaption: 'Reference figures for Blue Flag awarded sites, updated for the 2026 season.',
  },
  footer: {
    description:
      'Automated news portal that translates, summarizes and publishes international coverage of the Foundation for Environmental Education (FEE) Blue Flag programme.',
    sectionsHeading: 'Sections',
    siteHeading: 'Site',
    aboutLink: 'About / FEE Argentina',
    banderaAzulLink: 'Blue Flag Argentina',
    blueFlagIntlLink: 'Blue Flag International',
    copyrightNote:
      'Blue Tide News · Content automatically generated and curated from international sources, with a link to the original story in every article.',
  },
  categoryPage: { empty: 'No articles have been published in this section yet.' },
  about: {
    title: 'About Blue Tide',
    intro:
      'Blue Tide is an editorial portal that gathers, translates and summarizes international coverage of the Blue Flag eco-certification programme: newly certified beaches and marinas, water quality and environmental management criteria, and coastal sustainability projects.',
    howHeading: 'How the content is produced',
    how: [
      'An automated process monitors RSS feeds from international agencies, tourism ministries and specialized outlets (for example, Blue Flag International and Euronews Travel).',
      "Each story is rewritten by a language model following an editorial brief that requires an objective journalistic tone, original wording in the site's language, SEO optimization and a mention of the current year.",
      'Every article always links to the original source at the end, so readers can consult the full source story.',
      'A human editor can review, correct or unpublish any article before or after it goes live.',
    ],
    linkHeading: 'Connection to FEE Argentina',
    linkBody:
      'The Blue Flag programme is run internationally by the Foundation for Environmental Education (FEE) and, in Argentina, by FEE Argentina under the name Bandera Azul. Blue Tide is an independent editorial project that closely follows that programme.',
  },
  localeSwitcher: { es: 'ES', en: 'EN' },
};

export const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
