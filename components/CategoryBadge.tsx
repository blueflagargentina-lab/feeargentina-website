import { CategorySlug } from '@/lib/types';

const STYLES: Record<CategorySlug, string> = {
  'playas-destacadas': 'bg-celeste-400 text-marine-900',
  'marinas-y-embarcaciones': 'bg-marine-500 text-white',
  'nuevas-certificaciones': 'bg-eco-500 text-white',
  'sostenibilidad-marina': 'bg-marine-700 text-white',
};

export default function CategoryBadge({ category, label }: { category: CategorySlug; label: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${STYLES[category]}`}
    >
      {label}
    </span>
  );
}
