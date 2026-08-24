"""Orquestador del pipeline editorial de Blue Flag News: Detector -> Redactor -> Verificador."""

import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
FUENTES_PATH = BASE_DIR / "fuentes" / "rss_list.json"
SEEN_URLS_PATH = BASE_DIR / "src" / "seen_urls.json"


def cargar_fuentes() -> list[dict]:
    with open(FUENTES_PATH, encoding="utf-8") as f:
        return json.load(f)


def cargar_urls_vistas() -> set[str]:
    if not SEEN_URLS_PATH.exists():
        return set()
    with open(SEEN_URLS_PATH, encoding="utf-8") as f:
        return set(json.load(f))


def guardar_urls_vistas(urls: set[str]) -> None:
    with open(SEEN_URLS_PATH, "w", encoding="utf-8") as f:
        json.dump(sorted(urls), f, ensure_ascii=False, indent=2)


def detectar(fuentes: list[dict], urls_vistas: set[str]) -> list[dict]:
    """Agente Detector: monitorea las fuentes y devuelve ítems nuevos.

    TODO: reemplazar por el fetch real de cada feed RSS/Atom (ver
    agentes/detector.skill.md).
    """
    return []


def redactar(item: dict) -> dict:
    """Agente Redactor: reescribe el ítem en un artículo original (es/en).

    TODO: integrar el modelo de lenguaje siguiendo manual_estilo.md y
    agentes/redactor.skill.md.
    """
    raise NotImplementedError


def verificar(articulo: dict) -> bool:
    """Agente Verificador: valida el artículo contra el checklist editorial.

    TODO: implementar el checklist de agentes/verificador.skill.md.
    """
    raise NotImplementedError


def main() -> None:
    fuentes = cargar_fuentes()
    urls_vistas = cargar_urls_vistas()

    items_nuevos = detectar(fuentes, urls_vistas)
    print(f"Detector: {len(items_nuevos)} ítem(s) nuevo(s) encontrados.")

    for item in items_nuevos:
        try:
            articulo = redactar(item)
        except NotImplementedError:
            print("Redactor no implementado aún.")
            break

        if verificar(articulo):
            print(f"Publicado: {articulo.get('title')}")
        else:
            print(f"Rechazado por el Verificador: {item.get('title')}")

        urls_vistas.add(item["link"])

    guardar_urls_vistas(urls_vistas)


if __name__ == "__main__":
    main()
