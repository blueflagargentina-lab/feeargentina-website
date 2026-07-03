import BlueFlagMapWrapper from './BlueFlagMapWrapper';
import CountryRanking from './CountryRanking';
import NewsletterForm from './NewsletterForm';
import { Locale } from '@/lib/i18n';

export default function Sidebar({ locale }: { locale: Locale }) {
  return (
    <aside className="flex flex-col gap-6">
      <BlueFlagMapWrapper locale={locale} />
      <CountryRanking locale={locale} />
      <NewsletterForm locale={locale} />
    </aside>
  );
}
