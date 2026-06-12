# Brief editorial — Noticias Diarias

Estas son las instrucciones que sigue el agente automático cada mañana para
generar el boletín. Es la "línea editorial" del producto. Si quieres cambiar
qué noticias aparecen o cómo se redactan, edita este archivo.

---

## Tarea

Cada mañana, generar el archivo `data/noticias.json` con un resumen de las
noticias más relevantes del día, agrupadas por categoría. El objetivo del
lector (Simón) es **informarse rápido, sin leer artículos completos**, para:
- entender cómo se mueve la economía y poder **tomar decisiones de inversión**,
- estar al día en **política chilena con argumentos sólidos** para debatir,
- conocer avances de **tecnología** en el mundo.

## Categorías (en este orden)

| id | nombre | emoji | qué buscar |
|----|--------|-------|------------|
| `economia-mundial` | Economía Mundial | 🌍 | mercados, Fed/bancos centrales, inflación global, petróleo, FMI, shocks geopolíticos con impacto económico |
| `economia-chile` | Economía Chile | 🇨🇱 | IPC, dólar, TPM del Banco Central, empleo, crecimiento, medidas de Hacienda |
| `inmobiliario-chile` | Inmobiliario Chile | 🏠 | tasas hipotecarias, precios de vivienda, subsidios, CChC, permisos, mercado de arriendo |
| `politica-chile` | Política Chile | 🏛️ | gobierno, Congreso, reformas, leyes clave, debate político de fondo |
| `columna-matamala` | Columna en profundidad (Matamala) | ✍️ | la columna más reciente de Daniel Matamala en La Tercera (se publican sobre todo los domingos, #LTDomingo) |
| `tecnologia` | Tecnología | 💻 | IA, grandes lanzamientos, ciencia aplicada, gigantes tecnológicos |

## Reglas de redacción

1. **Resumen ≤ 50 palabras.** Cada noticia: un titular claro + un resumen de
   máximo 50 palabras que capture el qué, el dato clave y por qué importa.
2. **Sin clickbait ni "farándula política".** Nada de escándalos personales,
   infidelidades o polémicas de figuras que no aporten a un debate de fondo.
   Ejemplo de lo que se EXCLUYE: el caso de infidelidad de Camila Flores.
   Privilegiar análisis de **políticas públicas, economía y poder**, no chismes.
3. **Tono Matamala:** mirada de fondo sobre el acontecer político, sin buscar
   likes. Para `politica-chile`, preferir notas sustantivas sobre coyuntura real.
4. **Fuentes confiables:** Banco Central, El Mercurio/Emol, La Tercera/Pulso,
   Diario Financiero, El Mostrador, BioBioChile, CNN, Reuters, FMI, etc.
5. **2–3 noticias por categoría** (1 para la columna de Matamala). Si no hay
   columna nueva de Matamala, indicarlo y enlazar su última disponible.
6. **Datos concretos:** incluir cifras cuando existan (IPC %, TPM, tasa UF, US$).
7. **Español de Chile**, claro y directo.

## Formato de salida — `data/noticias.json`

```json
{
  "fecha": "AAAA-MM-DD",
  "fechaLegible": "Viernes 12 de junio de 2026",
  "actualizado": "AAAA-MM-DDTHH:MM:SSZ (UTC)",
  "categorias": [
    {
      "id": "economia-mundial",
      "nombre": "Economía Mundial",
      "emoji": "🌍",
      "noticias": [
        {
          "titular": "…",
          "resumen": "≤ 50 palabras",
          "fuente": "Nombre del medio",
          "url": "https://enlace-a-la-nota-original"
        }
      ]
    }
  ]
}
```

- Mantener exactamente los `id` y el orden de la tabla de categorías.
- `fechaLegible`: día de la semana + fecha, primera letra mayúscula.
- `actualizado`: marca de tiempo en UTC del momento de generación.
- Toda noticia debe tener `url` real a la nota original.

## Publicación

Tras generar el JSON, hacer `git add`, `commit` y `push` a la rama principal.
GitHub Pages publica el cambio automáticamente y el lector ve el boletín nuevo.

## Horario

Generación diaria ~07:00 hora de Chile. Chile en junio está en UTC-4, así que
07:00 local = 11:00 UTC. (En horario de verano, UTC-3, sería 10:00 UTC.)
