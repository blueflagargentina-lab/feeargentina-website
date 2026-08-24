# Agente de Estilo y Filtro — Verificador

## Objetivo

Controlar que cada artículo generado por el Redactor cumpla la línea editorial de
`manual_estilo.md` antes de publicarse, y filtrar contenido que no corresponda.

## Entradas

- Objeto JSON del Redactor (uno por idioma) para una misma noticia.

## Checklist de verificación

1. **Originalidad**: el texto no contiene fragmentos copiados literalmente de la
   fuente ni de la nota en el otro idioma.
2. **Tono**: periodístico, objetivo, tercera persona, sin adjetivos exagerados ni
   opiniones personales.
3. **Vigencia**: el año en curso aparece mencionado en el cuerpo.
4. **SEO**: título ≤ 90 caracteres, meta descripción entre 140 y 160 caracteres.
5. **Estructura**: entre 3 y 5 párrafos, subtítulos coherentes con el contenido.
6. **Categoría**: pertenece a la lista permitida y es coherente con el tema.
7. **Consistencia bilingüe**: mismo `slug`, misma categoría y mismo país/región en
   ambas versiones.
8. **Relevancia temática**: la nota trata sobre Blue Flag, playas, marinas,
   certificaciones ambientales costeras o sostenibilidad marina; de lo contrario,
   se descarta.

## Resultado

- **Aprobado**: el artículo pasa a publicación (`content/articulos/{es,en}/*.md`).
- **Rechazado**: se descarta y se registra el motivo; no vuelve al Redactor
  automáticamente para evitar bucles.
