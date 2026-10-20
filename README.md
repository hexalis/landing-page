# Red Lace Core · Explorador Global de Anomalías Terrestres

Landing conceptual de Red Lace Core para NASA Space Apps Challenge 2026. Presenta la propuesta de un portal para detectar, comparar y comprender anomalías del océano, el hielo marino y la vegetación mediante datos abiertos de la NASA.

La vista del explorador es **ilustrativa**. Los puntos, las regiones y la línea de tendencia no contienen mediciones en vivo ni valores científicos. Esta landing no representa a la NASA ni implica patrocinio.

## Recorrido

El scroll pasa del espacio profundo a una vista de la Tierra y después a una maqueta del explorador. La interfaz plantea tres formas de exploración (mapa, globo y nube de puntos), capas por tipo de señal, casos regionales, desviación frente a lo habitual, confianza del dato y series de tiempo. El contenido esencial permanece en HTML y la animación se reduce cuando el usuario lo solicita.

El proyecto usa Next.js 16, React 19, TypeScript y Tailwind CSS 4. El arte del planeta, los indicadores y la maqueta están hechos con CSS y SVG; la landing no necesita un runtime 3D ni bibliotecas de animación.

## Desarrollo

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Abre http://localhost:3000. Para comprobar el proyecto:

```bash
pnpm check
pnpm build
pnpm test:e2e
```

`pnpm build` genera una exportación estática en `out/` para GitHub Pages. El repositorio conserva las reglas de arquitectura y calidad en [AGENTS.md](AGENTS.md).

## Lo siguiente

La selección del reto oficial, las fuentes NASA concretas, el stack del explorador y los perfiles públicos del equipo quedan pendientes de confirmación. La landing evita presentar esos datos como definidos.
