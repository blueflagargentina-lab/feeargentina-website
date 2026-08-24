"""Configuración y rutas compartidas del pipeline."""

import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

FUENTES_PATH = BASE_DIR / "fuentes" / "rss_list.json"
MANUAL_ESTILO_PATH = BASE_DIR / "manual_estilo.md"
SALIDA_DIR = BASE_DIR / "salida"
ESTADO_DIR = BASE_DIR / "estado"
URLS_VISTAS_PATH = ESTADO_DIR / "urls_vistas.json"

load_dotenv(BASE_DIR / ".env")

ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-opus-5")
ANTHROPIC_TIMEOUT_SECONDS = float(os.getenv("ANTHROPIC_TIMEOUT_SECONDS", "60"))

# Palabras clave usadas por el Detector para descartar ítems fuera de línea
# editorial (Blue Flag, playas, marinas, certificaciones y blue economy).
PALABRAS_CLAVE_RELEVANCIA = [
    "blue flag",
    "bandera azul",
    "playa",
    "beach",
    "marina",
    "certificaci",
    "sostenibilidad marina",
    "marine sustainability",
    "blue economy",
    "economía azul",
    "coastal",
    "costero",
    "ocean",
    "océano",
]
