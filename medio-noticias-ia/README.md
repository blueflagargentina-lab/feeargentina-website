# Medio Noticias IA — Blue Flag News

Sistema multiagente autónomo que detecta noticias sobre Blue Flag y blue economy,
las redacta como notas originales y las publica en `salida/` sólo si pasan el
control de estilo y de alucinaciones.

```
fuentes/rss_list.json  →  Detector  →  Redactor  →  Verificador  →  salida/*.md
                          (async)      (LLM, manual_estilo.md)   (reglas)
```

- **Detector** (`src/detector.py`): descarga y parsea cada feed en paralelo con
  `httpx`/`asyncio`; un feed caído o con error HTTP se descarta sin frenar a los
  demás. Deduplica contra `estado/urls_vistas.json`.
- **Redactor** (`src/redactor.py`): relee `manual_estilo.md` en cada llamada y le
  pide al modelo (Anthropic, `claude-opus-5` por defecto) una nota estructurada
  (título, entrada, cuerpo, 3 viñetas) vía `client.messages.parse(...)`.
- **Verificador** (`src/verificador.py`): chequeos deterministas de estilo
  (longitud de título, cantidad de párrafos y viñetas, mención del año en curso,
  enlace de la fuente fuera del cuerpo) y de posibles alucinaciones (copia casi
  literal de la fuente, números que no aparecen en el texto original).

## Uso

```bash
uv sync
cp .env.example .env   # completar ANTHROPIC_API_KEY
uv run python -m src.main
```

Las notas aprobadas quedan en `salida/*.md` con frontmatter (`title`,
`sourceName`, `sourceUrl`, `publishedAt`). Las rechazadas se loguean con el
motivo y no se escriben a disco.
