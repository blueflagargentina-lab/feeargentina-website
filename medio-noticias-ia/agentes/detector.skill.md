# Agente de Monitoreo — Detector

## Objetivo

Vigilar las fuentes listadas en `fuentes/rss_list.json` y detectar noticias nuevas
relevantes para Blue Flag News (playas, marinas, certificaciones Blue Flag,
sostenibilidad marina y costera).

## Entradas

- `fuentes/rss_list.json`: lista de feeds RSS/Atom a monitorear (nombre, URL, idioma,
  país por defecto, estado de verificación).
- Registro de URLs ya procesadas (deduplicación), equivalente a `data/seen-urls.json`
  del pipeline existente.

## Reglas

1. Descartar ítems cuya URL ya fue procesada anteriormente.
2. Descartar ítems que no mencionen Blue Flag, playas, marinas, certificaciones
   ambientales costeras o temas de sostenibilidad marina.
3. Marcar como `verified: false` cualquier fuente que devuelva error HTTP o esté
   vacía, y registrar el motivo (igual que las notas en `config/sources.json`).
4. No reescribir ni resumir el contenido: solo extraer título, enlace, fecha,
   fuente y resumen/snippet original.
5. Entregar la salida al Redactor en un formato estructurado (JSON) con al menos:
   `title`, `link`, `isoDate`, `sourceName`, `contentSnippet`.

## Salida esperada

Lista de ítems nuevos, sin duplicados, listos para ser reescritos.
