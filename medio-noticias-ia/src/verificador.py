"""Agente de Estilo y Filtro: valida la nota del Redactor antes de publicarla.

Corre chequeos deterministas (no otra llamada al modelo) para mantener esta
etapa rápida, barata y reproducible:

- Violaciones de estilo respecto de `manual_estilo.md` (estructura, longitud,
  mención del año en curso, enlace de la fuente fuera del cuerpo).
- Señales de alucinación: copia literal de la fuente y números que aparecen
  en la nota pero no en el texto bruto original.
"""

import re
from datetime import datetime
from typing import List

from .models import NoticiaCruda, NotaEstructurada, ResultadoVerificacion

LONGITUD_MAXIMA_TITULO = 90
PARRAFOS_MIN = 3
PARRAFOS_MAX = 5
PALABRAS_COPIA_LITERAL = 8


def _parrafos(cuerpo: str) -> List[str]:
    return [p.strip() for p in cuerpo.split("\n\n") if p.strip()]


def _tiene_copia_literal(cuerpo: str, texto_fuente: str, min_palabras: int = PALABRAS_COPIA_LITERAL) -> bool:
    palabras_cuerpo = re.findall(r"\w+", cuerpo.lower())
    palabras_fuente = re.findall(r"\w+", texto_fuente.lower())
    if len(palabras_fuente) < min_palabras:
        return False
    for i in range(len(palabras_fuente) - min_palabras + 1):
        ventana = palabras_fuente[i : i + min_palabras]
        texto_ventana = " ".join(ventana)
        if texto_ventana in " ".join(palabras_cuerpo):
            return True
    return False


def _numeros_no_respaldados(nota: NotaEstructurada, noticia: NoticiaCruda) -> List[str]:
    texto_nota = f"{nota.titulo} {nota.entrada} {nota.cuerpo}"
    texto_fuente = f"{noticia.title} {noticia.texto_bruto}"
    numeros_nota = set(re.findall(r"\d+", texto_nota))
    numeros_fuente = set(re.findall(r"\d+", texto_fuente))
    anio_actual = str(datetime.now().year)
    return sorted(n for n in numeros_nota if n not in numeros_fuente and n != anio_actual)


def verificar(nota: NotaEstructurada, noticia: NoticiaCruda) -> ResultadoVerificacion:
    motivos: List[str] = []

    if len(nota.vinetas) != 3:
        motivos.append(f"Debe haber exactamente 3 viñetas, hay {len(nota.vinetas)}.")

    if not nota.titulo.strip():
        motivos.append("El título está vacío.")
    elif len(nota.titulo) > LONGITUD_MAXIMA_TITULO:
        motivos.append(f"Título de {len(nota.titulo)} caracteres, supera el máximo de {LONGITUD_MAXIMA_TITULO}.")

    if not nota.entrada.strip():
        motivos.append("La entrada (lede) está vacía.")

    parrafos = _parrafos(nota.cuerpo)
    if not (PARRAFOS_MIN <= len(parrafos) <= PARRAFOS_MAX):
        motivos.append(f"El cuerpo tiene {len(parrafos)} párrafos, debe tener entre {PARRAFOS_MIN} y {PARRAFOS_MAX}.")

    if noticia.link in nota.cuerpo:
        motivos.append("El enlace a la fuente no debe estar dentro del cuerpo.")

    anio_actual = str(datetime.now().year)
    if anio_actual not in f"{nota.entrada} {nota.cuerpo}":
        motivos.append(f"No se menciona el año en curso ({anio_actual}) en la nota.")

    if _tiene_copia_literal(nota.cuerpo, noticia.texto_bruto):
        motivos.append("El cuerpo contiene una copia casi literal de la fuente (posible plagio).")

    numeros_sospechosos = _numeros_no_respaldados(nota, noticia)
    if numeros_sospechosos:
        motivos.append(
            f"Posible alucinación: los números {', '.join(numeros_sospechosos)} no aparecen en la fuente original."
        )

    return ResultadoVerificacion(aprobado=len(motivos) == 0, motivos=motivos)
