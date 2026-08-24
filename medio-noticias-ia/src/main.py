"""Orquestador del pipeline: Detector -> Redactor -> Verificador -> salida/.

Uso:
    uv run python -m src.main
"""

import asyncio
import logging
import re
import unicodedata
from datetime import datetime, timezone

import anthropic

from . import detector, redactor, verificador
from .config import ANTHROPIC_TIMEOUT_SECONDS, SALIDA_DIR
from .models import NoticiaCruda, NotaEstructurada

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
logger = logging.getLogger(__name__)


def _slugify(texto: str) -> str:
    texto = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode("ascii")
    texto = re.sub(r"[^a-zA-Z0-9]+", "-", texto).strip("-").lower()
    return texto or "nota"


def _guardar_nota(nota: NotaEstructurada, noticia: NoticiaCruda) -> None:
    SALIDA_DIR.mkdir(parents=True, exist_ok=True)
    ahora = datetime.now(timezone.utc)
    slug = _slugify(nota.titulo)
    ruta = SALIDA_DIR / f"{ahora:%Y-%m-%d}-{slug}.md"

    vinetas_md = "\n".join(f"- {v}" for v in nota.vinetas)
    contenido = f"""---
title: "{nota.titulo}"
sourceName: "{noticia.source_name}"
sourceUrl: "{noticia.link}"
publishedAt: "{ahora.isoformat()}"
---

{nota.entrada}

{nota.cuerpo}

## Puntos clave

{vinetas_md}
"""
    ruta.write_text(contenido, encoding="utf-8")
    logger.info("Publicado: %s", ruta.name)


def main() -> None:
    fuentes = detector.cargar_fuentes()
    urls_vistas = detector.cargar_urls_vistas()

    primicias = asyncio.run(detector.detectar(fuentes, urls_vistas))
    logger.info("Detector: %d primicia(s) nueva(s) encontrada(s).", len(primicias))

    if not primicias:
        return

    client = anthropic.Anthropic(timeout=ANTHROPIC_TIMEOUT_SECONDS)

    for noticia in primicias:
        # Se marca como vista aunque falle la redacción o la verificación,
        # para no reintentar la misma URL en cada corrida.
        urls_vistas.add(noticia.link)

        nota = redactor.redactar(client, noticia)
        if nota is None:
            continue

        resultado = verificador.verificar(nota, noticia)
        if resultado.aprobado:
            _guardar_nota(nota, noticia)
        else:
            logger.warning(
                "Rechazado por el Verificador ('%s'): %s",
                noticia.title,
                "; ".join(resultado.motivos),
            )

    detector.guardar_urls_vistas(urls_vistas)


if __name__ == "__main__":
    main()
