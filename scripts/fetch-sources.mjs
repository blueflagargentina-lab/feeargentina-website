import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const SOURCES_PATH = path.join(ROOT, 'config', 'sources.json');
const RAW_DIR = path.join(ROOT, 'data', 'raw');
const SEEN_URLS_PATH = path.join(ROOT, 'data', 'seen-urls.json');

function loadSeenUrls() {
  if (!fs.existsSync(SEEN_URLS_PATH)) return new Set();
  return new Set(JSON.parse(fs.readFileSync(SEEN_URLS_PATH, 'utf8')));
}

function saveSeenUrls(seen) {
  fs.writeFileSync(SEEN_URLS_PATH, JSON.stringify([...seen], null, 2));
}

function slugifyDate(date) {
  return date.toISOString().slice(0, 10);
}

async function main() {
  const sources = JSON.parse(fs.readFileSync(SOURCES_PATH, 'utf8'));
  const seenUrls = loadSeenUrls();
  const parser = new Parser();

  fs.mkdirSync(RAW_DIR, { recursive: true });

  let totalNew = 0;

  for (const source of sources) {
    let feed;
    try {
      feed = await parser.parseURL(source.url);
    } catch (err) {
      console.error(`No se pudo leer el feed "${source.name}" (${source.url}):`, err.message);
      continue;
    }

    const newItems = (feed.items ?? [])
      .filter((item) => item.link && !seenUrls.has(item.link))
      .map((item) => ({
        sourceName: source.name,
        defaultCountry: source.defaultCountry ?? 'Internacional',
        title: item.title,
        link: item.link,
        isoDate: item.isoDate,
        contentSnippet: item.contentSnippet,
        content: item['content:encoded'] ?? item.content,
      }));

    if (newItems.length === 0) continue;

    const filename = `${slugifyDate(new Date())}-${source.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}.json`;
    fs.writeFileSync(path.join(RAW_DIR, filename), JSON.stringify(newItems, null, 2));

    newItems.forEach((item) => seenUrls.add(item.link));
    totalNew += newItems.length;
    console.log(`+ ${newItems.length} noticias nuevas de "${source.name}"`);
  }

  saveSeenUrls(seenUrls);
  console.log(`Listo. ${totalNew} noticias nuevas guardadas en data/raw/.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
