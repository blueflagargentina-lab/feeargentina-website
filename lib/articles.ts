import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleFrontmatter, CategorySlug } from './types';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articulos');

function readArticleFile(filename: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as ArticleFrontmatter), content };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(readArticleFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedArticle(): Article | undefined {
  const articles = getAllArticles();
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, limit);
}

export function getLatestArticles(limit = 6, excludeSlug?: string): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}
