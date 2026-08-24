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

- Idiomas de salida: español (`es`) e inglés (`en`), con el mismo `slug` en ambos.
- Formato de artículo: Markdown con frontmatter (título, categoría, excerpt, SEO,
  país, tags, fuente).
- Categorías válidas: `playas-destacadas`, `marinas-y-embarcaciones`,
  `nuevas-certificaciones`, `sostenibilidad-marina`.

## Punto de entrada

`src/main.py` orquesta el flujo completo: Detector → Redactor → Verificador → publicación.
