import BlueFlagMapWrapper from './BlueFlagMapWrapper';
import CountryRanking from './CountryRanking';
import NewsletterForm from './NewsletterForm';

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <BlueFlagMapWrapper />
      <CountryRanking />
      <NewsletterForm />
    </aside>
  );
}
