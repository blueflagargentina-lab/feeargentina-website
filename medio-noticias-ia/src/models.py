"""Modelos de datos compartidos entre agentes."""

from dataclasses import dataclass
from typing import List, Optional

from pydantic import BaseModel, Field


@dataclass
class Fuente:
    name: str
    url: str
    language: str
    default_country: str
    verified: bool


@dataclass
class NoticiaCruda:
    """Salida del Agente Detector: un ítem nuevo listo para el Redactor."""

    title: str
    link: str
    source_name: str
    published: Optional[str]
    texto_bruto: str


class NotaEstructurada(BaseModel):
    """Salida del Agente Redactor: la nota exigida por output_format en messages.parse()."""

    titulo: str = Field(..., description="Título de la nota, optimizado para SEO, máximo 90 caracteres.")
    entrada: str = Field(..., description="Párrafo de entrada (lede): resume la noticia en 2-3 frases.")
    cuerpo: str = Field(..., description="Cuerpo de la nota en Markdown, 3 a 5 párrafos.")
    vinetas: List[str] = Field(..., description="Exactamente 3 viñetas con los puntos clave de la noticia.")


class ResultadoVerificacion(BaseModel):
    aprobado: bool
    motivos: List[str] = Field(default_factory=list)
