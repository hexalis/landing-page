# Red Lace Core · Crear en equipo, compartir conocimiento

Landing del equipo Red Lace Core: propósito humanista, integrantes, manifiesto y proyectos que combinan diseño, tecnología y ciencia abierta. El explorador para NASA Space Apps es uno de sus proyectos, junto con Hexalis y Design Ops Toolkit.

La vista del explorador es **ilustrativa**. Los puntos, las regiones y la línea de tendencia no contienen mediciones en vivo ni valores científicos. Esta landing no representa a la NASA ni implica patrocinio.

## Recorrido

El scroll transforma una trama de conexiones en un flujo de ideas, diseño, código y aportes. Después presenta a las personas del equipo, un conector visual hacia el portafolio y el manual de trabajo. La identidad toma la paleta azul y neutral del [Prisma Design System](https://github.com/hexalis/prisma-design-system). El contenido esencial permanece en HTML y la animación respeta la preferencia de movimiento reducido.

El proyecto usa Next.js 16, React 19, TypeScript, Tailwind CSS 4 y Remotion Player. Una composición de Remotion permanece en el viewport durante el recorrido inicial: el scroll controla la trama de hilos y su transformación en un proceso. El contenido avanza con el desplazamiento normal del navegador.

La composición se carga en el cliente de forma diferida y deja de actualizarse al salir del recorrido. La introducción dura menos de tres segundos; después el movimiento depende del scroll. El botón de pausa congela la escena. Con `prefers-reduced-motion`, la página comienza con una imagen estática y no monta el reproductor hasta que el visitante active el movimiento.

El portafolio se define en `src/modules/home/ui/projects-section.tsx`: una colección de proyectos genera una cuadrícula responsive con filtros por categoría. Cada ficha usa `details/summary` nativos; solo una se expande a la vez. El explorador conserva su demostración dentro de su ficha, sin dominar el resto del catálogo.

Para replicar el flujo y su sincronización con Remotion, consulta la [guía de páginas inmersivas](docs/guia-paginas-inmersivas.md). La [guía de voz y tono](docs/voz-y-tono.md) conserva los criterios editoriales. El concepto original de NASA Space Apps está preservado como una idea de proyecto independiente para retomar más adelante.

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

Los seis integrantes y la frase de Roger fueron facilitados por el equipo. Las demás frases llevan un placeholder explícito. Quedan pendientes los roles, fotos y enlaces personales, además de la selección del reto oficial, las fuentes NASA concretas y el stack del explorador.
