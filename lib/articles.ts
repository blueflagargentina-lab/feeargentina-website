import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleFrontmatter, CategorySlug } from './types';
import { Locale } from './i18n';

function articlesDir(locale: Locale) {
  return path.join(process.cwd(), 'content', 'articulos', locale);
}

function readArticleFile(dir: string, filename: string): Article {
  const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as ArticleFrontmatter), content };
}

export function getAllArticles(locale: Locale): Article[] {
  const dir = articlesDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readArticleFile(dir, f))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedArticle(locale: Locale): Article | undefined {
  const articles = getAllArticles(locale);
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getArticlesByCategory(locale: Locale, category: CategorySlug): Article[] {
  return getAllArticles(locale).filter((a) => a.category === category);
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  return getAllArticles(locale).find((a) => a.slug === slug);
}

export function getRelatedArticles(locale: Locale, article: Article, limit = 3): Article[] {
  return getAllArticles(locale)
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, limit);
}

export function getLatestArticles(locale: Locale, limit = 6, excludeSlug?: string): Article[] {
  return getAllArticles(locale)
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}
