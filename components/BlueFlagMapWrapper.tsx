'use client';

import dynamic from 'next/dynamic';

const BlueFlagMap = dynamic(() => import('./BlueFlagMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center rounded-lg bg-celeste-100 text-sm text-marine-600">
      Cargando mapa interactivo…
    </div>
  ),
});

export default function BlueFlagMapWrapper() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-card ring-1 ring-marine-900/5">
      <h3 className="mb-3 text-base font-bold text-marine-900">🗺️ Mapa global Blue Flag</h3>
      <BlueFlagMap />
      <p className="mt-3 text-[11px] text-marine-500">
        Tamaño del punto proporcional a la cantidad de sitios certificados por país.
      </p>
    </div>
  );
}
