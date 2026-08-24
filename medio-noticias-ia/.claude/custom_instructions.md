# Instrucciones globales — Medio Noticias IA (Blue Flag News)

Este directorio contiene el diseño de un pipeline editorial basado en agentes para
**Blue Flag News**, el portal bilingüe (ES/EN) sobre el programa de certificación
ecológica Blue Flag. Complementa (no reemplaza) el pipeline existente en
`scripts/fetch-sources.mjs` y `scripts/generate-articles.mjs` en la raíz del repo.

## Rol de Claude Code en este proyecto

- Actuar como orquestador de tres agentes especializados definidos en `agentes/`:
  **Detector** (monitoreo de fuentes), **Redactor** (reescritura editorial) y
  **Verificador** (control de estilo y filtro de calidad).
- Cada agente tiene una responsabilidad única y no debe asumir tareas de los otros.
- Seguir siempre la línea editorial definida en `manual_estilo.md` al generar o revisar
  contenido.
- No publicar contenido que no haya pasado por el Verificador.
- No inventar fuentes ni URLs: usar únicamente las listadas en `fuentes/rss_list.json`.

## Convenciones

- Idioma de salida: español.
- Formato de nota: Markdown con frontmatter (título, fuente, URL, fecha) y cuerpo
  con título, entrada (lede), cuerpo en 3-5 párrafos y exactamente 3 viñetas clave.
- Gestión de dependencias con `uv` (`pyproject.toml` en este directorio).
- Todo el código de red del Detector es asíncrono (`httpx.AsyncClient` +
  `asyncio.gather`) y aísla los errores por fuente: una fuente caída no debe
  interrumpir a las demás.
- El Redactor relee `manual_estilo.md` en cada llamada, nunca lo cachea entre
  ejecuciones.

## Punto de entrada

```bash
cd medio-noticias-ia
uv sync
cp .env.example .env   # completar ANTHROPIC_API_KEY
uv run python -m src.main
```

`src/main.py` orquesta el flujo completo: Detector → Redactor → Verificador →
`salida/*.md`. El estado de deduplicación vive en `estado/urls_vistas.json`.
