import { getTopCountries } from '@/lib/countries';

export default function CountryRanking() {
  const countries = getTopCountries(8);
  const max = countries[0]?.blueFlagSites ?? 1;

  return (
    <div className="rounded-xl bg-white p-5 shadow-card ring-1 ring-marine-900/5">
      <h3 className="text-base font-bold text-marine-900">
        🏆 Países con más galardones Blue Flag
      </h3>
      <ol className="mt-4 space-y-3">
        {countries.map((c, i) => (
          <li key={c.country} className="flex items-center gap-3">
            <span className="w-5 text-sm font-bold text-marine-500">{i + 1}</span>
            <span className="text-lg" aria-hidden>
              {c.flag}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-marine-800">{c.country}</span>
                <span className="text-marine-500">{c.blueFlagSites}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-celeste-200">
                <div
                  className="h-full rounded-full bg-celeste-500"
                  style={{ width: `${(c.blueFlagSites / max) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[11px] text-marine-500">
        Cifras de referencia de sitios galardonados Blue Flag, actualizadas para la temporada 2026.
      </p>
    </div>
  );
}
