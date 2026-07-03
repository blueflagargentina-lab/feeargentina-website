'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getMapPoints, getCountryName } from '@/lib/countries';
import { Locale } from '@/lib/i18n';

const SITES_LABEL: Record<Locale, string> = {
  es: 'sitios con certificación Blue Flag',
  en: 'Blue Flag certified sites',
};

export default function BlueFlagMap({ locale }: { locale: Locale }) {
  const points = getMapPoints();

  useEffect(() => {
    // Evita el ícono roto por defecto de Leaflet al empaquetar con Next.js.
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={[30, 10]}
      zoom={2}
      scrollWheelZoom={false}
      className="h-64 w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <CircleMarker
          key={point.country}
          center={[point.lat, point.lng]}
          radius={Math.max(5, Math.sqrt(point.blueFlagSites))}
          pathOptions={{ color: '#136189', fillColor: '#4FB8E8', fillOpacity: 0.8 }}
        >
          <Popup>
            {point.flag} <strong>{getCountryName(point, locale)}</strong>
            <br />
            {point.blueFlagSites} {SITES_LABEL[locale]}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
