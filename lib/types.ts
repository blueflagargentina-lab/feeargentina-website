export type CategorySlug =
  | 'playas-destacadas'
  | 'marinas-y-embarcaciones'
  | 'nuevas-certificaciones'
  | 'sostenibilidad-marina';

export interface CategoryDefinition {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: CategorySlug;
  excerpt: string;
  seoDescription: string;
  cover: string;
  coverAlt: string;
  country: string;
  tags: string[];
  featured?: boolean;
  sourceName: string;
  sourceUrl: string;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

export interface CountryRankingEntry {
  country: string;
  flag: string;
  blueFlagSites: number;
  lat: number;
  lng: number;
}
