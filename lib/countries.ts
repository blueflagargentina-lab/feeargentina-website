import countriesData from '@/data/paises-blue-flag.json';
import { CountryRankingEntry } from './types';

export function getCountryRanking(): CountryRankingEntry[] {
  return [...(countriesData as CountryRankingEntry[])].sort(
    (a, b) => b.blueFlagSites - a.blueFlagSites
  );
}

export function getTopCountries(limit = 8): CountryRankingEntry[] {
  return getCountryRanking().slice(0, limit);
}

export function getMapPoints(): CountryRankingEntry[] {
  return countriesData as CountryRankingEntry[];
}
