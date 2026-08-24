"""Agente Detector: monitorea las fuentes RSS y devuelve primicias nuevas.

Toda la extracción de red es asíncrona y cada fuente se aísla: un feed caído,
lento o con error HTTP se descarta con un aviso, sin interrumpir a las demás.
"""

import asyncio
import json
import logging
from typing import List

import feedparser
import httpx

from .config import FUENTES_PATH, PALABRAS_CLAVE_RELEVANCIA, URLS_VISTAS_PATH
from .models import Fuente, NoticiaCruda

logger = logging.getLogger(__name__)

TIMEOUT_SEGUNDOS = 15.0
HEADERS = {"User-Agent": "BlueFlagNewsBot/1.0 (+https://banderaazul.org.ar)"}


def cargar_fuentes() -> List[Fuente]:
    with open(FUENTES_PATH, encoding="utf-8") as f:
        datos = json.load(f)
    return [
        Fuente(
            name=item["name"],
            url=item["url"],
            language=item.get("language", "es"),
            default_country=item.get("defaultCountry", ""),
            verified=item.get("verified", False),
        )
        for item in datos
    ]


def cargar_urls_vistas() -> set:
    if not URLS_VISTAS_PATH.exists():
        return set()
    with open(URLS_VISTAS_PATH, encoding="utf-8") as f:
        return set(json.load(f))


def guardar_urls_vistas(urls: set) -> None:
    URLS_VISTAS_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(URLS_VISTAS_PATH, "w", encoding="utf-8") as f:
        json.dump(sorted(urls), f, ensure_ascii=False, indent=2)


def _es_relevante(titulo: str, resumen: str) -> bool:
    texto = f"{titulo} {resumen}".lower()
    return any(palabra in texto for palabra in PALABRAS_CLAVE_RELEVANCIA)


async def _fetch_fuente(client: httpx.AsyncClient, fuente: Fuente) -> List[NoticiaCruda]:
    """Descarga y parsea una fuente. Nunca lanza: en error, devuelve []."""
    try:
        respuesta = await client.get(fuente.url, headers=HEADERS, timeout=TIMEOUT_SEGUNDOS)
        respuesta.raise_for_status()
    except httpx.HTTPStatusError as exc:
        logger.warning("Fuente '%s' devolvió %s: %s", fuente.name, exc.response.status_code, fuente.url)
        return []
    except httpx.RequestError as exc:
        logger.warning("Error de red al consultar '%s' (%s): %s", fuente.name, fuente.url, exc)
        return []

    try:
        feed = await asyncio.to_thread(feedparser.parse, respuesta.content)
    except Exception as exc:  # feedparser no documenta excepciones específicas
        logger.warning("No se pudo parsear el feed de '%s': %s", fuente.name, exc)
        return []

    if feed.bozo and not feed.entries:
        logger.warning("Feed de '%s' inválido o vacío: %s", fuente.name, fuente.url)
        return []

    noticias = []
    for entry in feed.entries:
        titulo = entry.get("title", "").strip()
        link = entry.get("link", "").strip()
        resumen = entry.get("summary", entry.get("description", "")).strip()
        if not titulo or not link:
            continue
        if not _es_relevante(titulo, resumen):
            continue
        noticias.append(
            NoticiaCruda(
                title=titulo,
                link=link,
                source_name=fuente.name,
                published=entry.get("published"),
                texto_bruto=resumen or titulo,
            )
        )
    return noticias


async def detectar(fuentes: List[Fuente], urls_vistas: set) -> List[NoticiaCruda]:
    """Consulta todas las fuentes en paralelo y devuelve las primicias nuevas."""
    async with httpx.AsyncClient(follow_redirects=True) as client:
        resultados = await asyncio.gather(
            *(_fetch_fuente(client, fuente) for fuente in fuentes),
            return_exceptions=True,
        )

    primicias: List[NoticiaCruda] = []
    for fuente, resultado in zip(fuentes, resultados):
        if isinstance(resultado, Exception):
            logger.warning("Fallo inesperado al procesar '%s': %s", fuente.name, resultado)
            continue
        for noticia in resultado:
            if noticia.link in urls_vistas:
                continue
            primicias.append(noticia)

    return primicias
