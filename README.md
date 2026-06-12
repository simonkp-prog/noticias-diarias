# 📰 Noticias Diarias

Resumen diario de noticias para informarse rápido, sin leer artículos completos.
Titulares + resúmenes de máximo 50 palabras, agrupados por categoría:

- 🌍 Economía Mundial
- 🇨🇱 Economía Chile
- 🏠 Inmobiliario Chile
- 🏛️ Política Chile
- ✍️ Columna en profundidad (Daniel Matamala)
- 💻 Tecnología

## Cómo funciona

El sitio es **estático** (HTML/CSS/JS) y vive en GitHub Pages. Toda la app solo
lee un archivo de datos: [`data/noticias.json`](data/noticias.json).

Cada mañana, un **agente automático de Claude** sigue el
[brief editorial](BRIEF-EDITORIAL.md): busca las noticias del día, las resume con
el filtro acordado (sin farándula política, con mirada de fondo) y reemplaza
`data/noticias.json`. El cambio se publica solo en GitHub Pages.

```
noticias-diarias/
├── index.html          # estructura de la página
├── styles.css          # diseño (modo claro/oscuro, mobile-first)
├── app.js              # carga y pinta el boletín
├── manifest.json       # PWA: instalable en el celular
├── sw.js               # service worker (funciona offline)
├── data/
│   └── noticias.json   # ← el boletín del día (lo único que cambia a diario)
├── BRIEF-EDITORIAL.md  # línea editorial que sigue el agente
└── README.md
```

## Editar la línea editorial

¿Quieres otra categoría, más noticias por sección, otro tono? Edita
[`BRIEF-EDITORIAL.md`](BRIEF-EDITORIAL.md). El agente lo lee cada vez que corre.

## Desarrollo local

```bash
python -m http.server 3100 --directory .
# abrir http://localhost:3100
```
