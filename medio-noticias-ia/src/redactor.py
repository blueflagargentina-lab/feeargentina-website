"""Agente de Redacción: convierte una noticia cruda en una nota estructurada.

Antes de generar texto, SIEMPRE relee `manual_estilo.md` (no se cachea entre
llamadas) para que cualquier cambio editorial se refleje en la próxima nota,
y lo inyecta en el system prompt junto con las reglas de estructura.

Nota sobre alucinaciones: en `claude-opus-5` los parámetros de muestreo
(`temperature`/`top_p`/`top_k`) fueron removidos por la API (devuelven 400),
así que el control de fidelidad a la fuente se hace por prompt (instrucción
explícita de no inventar datos que no estén en el texto bruto) y se refuerza
después con el Agente Verificador, no con temperatura baja.
"""

import logging
from typing import Optional

import anthropic

from .config import ANTHROPIC_MODEL, ANTHROPIC_TIMEOUT_SECONDS, MANUAL_ESTILO_PATH
from .models import NoticiaCruda, NotaEstructurada

logger = logging.getLogger(__name__)


def _leer_manual_estilo() -> str:
    with open(MANUAL_ESTILO_PATH, encoding="utf-8") as f:
        return f.read()


def _construir_system_prompt(manual_estilo: str) -> str:
    return f"""Eres el Agente de Redacción de Blue Flag News, un medio digital sobre \
el programa de certificación Blue Flag y tendencias de blue economy.

Seguí estrictamente el siguiente manual de estilo del medio:

---
{manual_estilo}
---

Reglas adicionales para esta tarea:
- Redactá una nota 100% original a partir del texto bruto que te pasa el usuario. \
No copies frases textuales de la fuente.
- No inventes datos, cifras, nombres ni citas que no estén respaldados por el \
texto bruto provisto. Si un dato no está disponible, omitilo en vez de inferirlo.
- La nota debe tener: un título, un párrafo de entrada (lede), un cuerpo en \
Markdown de 3 a 5 párrafos, y exactamente 3 viñetas con los puntos clave.
- No incluyas el enlace a la fuente dentro del cuerpo."""


def _construir_user_prompt(noticia: NoticiaCruda) -> str:
    return f"""Fuente: {noticia.source_name}
Título original: {noticia.title}
Enlace original: {noticia.link}
Fecha original: {noticia.published or "no disponible"}

Texto bruto (resumen/extracto obtenido vía RSS):
\"\"\"
{noticia.texto_bruto}
\"\"\"

Redactá la nota estructurada siguiendo las reglas del system prompt."""


def redactar(client: anthropic.Anthropic, noticia: NoticiaCruda) -> Optional[NotaEstructurada]:
    """Llama al modelo y devuelve la nota estructurada, o None si la llamada falla.

    El SDK ya reintenta automáticamente errores de conexión, 429 y 5xx
    (`max_retries`, default 2); acá sólo distinguimos el tipo de error para
    loguearlo y decidir si el orquestador debe seguir con la próxima noticia.
    """

    manual_estilo = _leer_manual_estilo()
    system_prompt = _construir_system_prompt(manual_estilo)
    user_prompt = _construir_user_prompt(noticia)

    try:
        response = client.with_options(timeout=ANTHROPIC_TIMEOUT_SECONDS).messages.parse(
            model=ANTHROPIC_MODEL,
            max_tokens=4096,
            output_config={"effort": "high"},
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}],
            output_format=NotaEstructurada,
        )
    except anthropic.AuthenticationError:
        logger.error("Redactor: ANTHROPIC_API_KEY inválida o ausente.")
        return None
    except anthropic.PermissionDeniedError:
        logger.error("Redactor: la API key no tiene permiso para usar el modelo %s.", ANTHROPIC_MODEL)
        return None
    except anthropic.NotFoundError:
        logger.error("Redactor: modelo inválido (%s).", ANTHROPIC_MODEL)
        return None
    except anthropic.RateLimitError as exc:
        retry_after = exc.response.headers.get("retry-after", "desconocido")
        logger.warning("Redactor: rate limit alcanzado, reintentar en %s s.", retry_after)
        return None
    except anthropic.BadRequestError as exc:
        logger.error("Redactor: request inválido para '%s': %s", noticia.title, exc.message)
        return None
    except anthropic.APIConnectionError as exc:
        logger.warning("Redactor: error de red al contactar la API: %s", exc)
        return None
    except anthropic.APIStatusError as exc:
        logger.error("Redactor: error de la API (%s) para '%s': %s", exc.status_code, noticia.title, exc.message)
        return None

    nota = response.parsed_output
    logger.info("Redactor: nota generada para '%s'", noticia.title)
    return nota
