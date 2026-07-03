import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt, buildUserPrompt } from './lib/prompt.mjs';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const RAW_DIR = path.join(ROOT, 'data', 'raw');
const ARTICLES_DIR = path.join(ROOT, 'content', 'articulos');

const VALID_CATEGORIES = [
  'playas-destacadas',
  'marinas-y-embarcaciones',
  'nuevas-certificaciones',
  'sostenibilidad-marina',
];

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

function toFrontmatterYaml(fields) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((v) => JSON.stringify(v)).join(', ')}]`);
    } else {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

function extractJson(rawText) {
  const cleaned = rawText.trim().replace(/^```(json)?/, '').replace(/```$/, '');
  return JSON.parse(cleaned);
}

async function rewriteWithLlm(client, item, currentYear) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: buildSystemPrompt(currentYear),
    messages: [{ role: 'user', content: buildUserPrompt(item) }],
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return extractJson(textBlock.text);
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Falta ANTHROPIC_API_KEY en el entorno. Abortando.');
    process.exit(1);
  }

  if (!fs.existsSync(RAW_DIR)) {
    console.log('No hay data/raw/. Ejecutá primero "npm run ingest:fetch".');
    return;
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const currentYear = new Date().getFullYear();
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });

  const rawFiles = fs.readdirSync(RAW_DIR).filter((f) => f.endsWith('.json'));
  let generated = 0;

  for (const filename of rawFiles) {
    const filePath = path.join(RAW_DIR, filename);
    const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const failedItems = [];

    for (const item of items) {
      try {
        const result = await rewriteWithLlm(client, item, currentYear);
        const category = VALID_CATEGORIES.includes(result.category)
          ? result.category
          : 'sostenibilidad-marina';
        const slug = `${slugify(result.title)}-${currentYear}`;
        const today = new Date().toISOString().slice(0, 10);

        const frontmatter = toFrontmatterYaml({
          title: result.title,
          slug,
          date: today,
          category,
          excerpt: result.excerpt,
          seoDescription: result.seoDescription,
          cover: `https://picsum.photos/seed/${slug}/1200/800`,
          coverAlt: result.coverAlt,
          country: result.country || item.defaultCountry,
          tags: result.tags || [],
          sourceName: item.sourceName,
          sourceUrl: item.link,
        });

        fs.writeFileSync(path.join(ARTICLES_DIR, `${slug}.md`), frontmatter + result.body + '\n');
        generated += 1;
        console.log(`✓ Generado: ${slug}.md`);
      } catch (err) {
        console.error(`✗ Falló la reescritura de "${item.title}":`, err.message);
        failedItems.push(item);
      }
    }

    if (failedItems.length === 0) {
      fs.unlinkSync(filePath);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(failedItems, null, 2));
    }
  }

  console.log(`Listo. ${generated} artículos nuevos en content/articulos/.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
