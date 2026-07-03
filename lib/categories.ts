import { CategorySlug } from './types';

export const CATEGORY_SLUGS: CategorySlug[] = [
  'playas-destacadas',
  'marinas-y-embarcaciones',
  'nuevas-certificaciones',
  'sostenibilidad-marina',
];

export function isCategorySlug(slug: string): slug is CategorySlug {
  return (CATEGORY_SLUGS as string[]).includes(slug);
}
