import { CategoryDefinition, CategorySlug } from './types';

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'playas-destacadas',
    name: 'Playas Destacadas',
    description:
      'Costas y balnearios de todo el mundo que lucen la certificación Blue Flag por su calidad de agua, seguridad y gestión ambiental.',
  },
  {
    slug: 'marinas-y-embarcaciones',
    name: 'Marinas y Embarcaciones',
    description:
      'Puertos deportivos, marinas y operadores de turismo náutico certificados bajo los estándares internacionales de Blue Flag.',
  },
  {
    slug: 'nuevas-certificaciones',
    name: 'Nuevas Certificaciones',
    description:
      'Los últimos sitios en sumarse al programa Blue Flag y las novedades sobre procesos de evaluación en curso.',
  },
  {
    slug: 'sostenibilidad-marina',
    name: 'Sostenibilidad Marina',
    description:
      'Políticas, investigación y proyectos de conservación costera y marina vinculados a la Fundación para la Educación Ambiental (FEE).',
  },
];

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORIES.some((c) => c.slug === slug);
}
