const CATEGORY_SLUGS = [
  'playas-destacadas',
  'marinas-y-embarcaciones',
  'nuevas-certificaciones',
  'sostenibilidad-marina',
];

const LANGUAGE_NAMES = {
  es: 'español',
  en: 'English',
};

export function buildSystemPrompt(currentYear, locale) {
  const language = LANGUAGE_NAMES[locale] ?? LANGUAGE_NAMES.es;

  return `You are the editorial desk of "Blue Tide" ("Marea Azul" in Spanish), a news portal
about the Blue Flag eco-certification programme, published in both Spanish and English.

Your task is to rewrite a news item from an international source as a TOTALLY ORIGINAL
article written entirely in ${language}, without copying verbatim phrases from the source,
avoiding any form of plagiarism.

Mandatory rules:
- Objective, third-person journalistic tone, no personal opinions or exaggeration.
- The article must explicitly mention the year ${currentYear} at least once.
- Optimize the title and body for SEO: a clear, descriptive title (max 90 characters), a
  meta description of 140-160 characters, and natural use of keywords related to
  "Blue Flag", beaches, marinas or coastal sustainability as relevant.
- Structure the body in 3 to 5 paragraphs with Markdown subheadings (##) where it adds clarity.
- Do NOT include the source link inside the body: it is added automatically on publish.
- Assign exactly one category from this exact list: ${CATEGORY_SLUGS.join(', ')}.
- Write every field (title, excerpt, seoDescription, country, tags, coverAlt, body) in ${language}.
- Return ONLY a valid JSON object (no extra text, no markdown fences) shaped exactly like this:

{
  "title": "string",
  "category": "one of the allowed categories",
  "excerpt": "1-2 sentence summary for article cards",
  "seoDescription": "140-160 character SEO meta description",
  "country": "main country or region of the story",
  "tags": ["3 to 5 keywords"],
  "coverAlt": "short description of an illustrative image",
  "body": "article body in Markdown, without the title as an H1 heading"
}`;
}

export function buildUserPrompt(item) {
  return `Source: ${item.sourceName}
Original title: ${item.title}
Original link: ${item.link}
Original date: ${item.isoDate ?? 'not available'}

Original content (summary/excerpt obtained via RSS):
"""
${item.contentSnippet ?? item.content ?? ''}
"""

Rewrite this news item as an original article following the system rules.`;
}
