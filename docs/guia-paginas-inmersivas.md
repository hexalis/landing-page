# Guía para crear páginas inmersivas con scroll y Remotion

Esta guía registra el patrón usado en la landing de Red Lace Core para mantener una escena visual continua mientras el contenido avanza con el scroll normal del navegador. La misma estructura sirve para narrativas de equipos, proyectos, productos y portafolios.

## Tecnologías del proyecto

- Next.js 16 y React 19 para la página y sus componentes.
- TypeScript para las interfaces de composición y reproductor.
- Tailwind CSS 4 para utilidades de layout y CSS para las escenas y tokens visuales.
- Remotion 4 y `@remotion/player` para dibujar una composición basada en fotogramas dentro de React.
- SVG para los trazos vectoriales de la escena. No se usa Three.js ni un render 3D: la profundidad aparente se calcula con una proyección matemática y se dibuja en SVG.
- Vitest y Testing Library para las preferencias de movimiento, la composición de la página y los filtros del portafolio.

## Estructura narrativa

1. **Acordar el foco:** decidir a quién presenta la página y qué debe entender al terminar. Para Red Lace Core, el foco es el colectivo; cada proyecto tiene su propia ficha.
2. **Ordenar el relato:** abrir con una idea breve, explicar el propósito, presentar a las personas, mostrar el trabajo, contar el proceso y cerrar con un siguiente paso.
3. **Separar hechos y recursos visuales:** mantener nombres, estados, afirmaciones y enlaces en los datos reales. Etiquetar como conceptual cualquier maqueta sin datos o producto disponible.
4. **Definir voz y sistema visual:** crear tokens de color y tipografía, acordar términos y escribir los textos antes de animar. La escena acompaña el contenido, no lo reemplaza.
5. **Diseñar una escena que conecte:** definir qué transformación representa la narración. Aquí, hebras conectadas se trenzan, se despliegan en líneas y terminan como un flujo de ideas, diseño, código y aporte.
6. **Conservar el HTML como contenido principal:** los títulos, párrafos, integrantes, fichas y controles viven en React/HTML accesible. El SVG de Remotion es decorativo.

## Arquitectura del recorrido

El montaje separa responsabilidades en tres archivos:

- `src/modules/home/ui/core-journey.tsx` comprueba `prefers-reduced-motion`, dibuja el control de pausa y carga el reproductor solo cuando el movimiento está activo o se solicita de forma explícita.
- `src/modules/home/ui/journey-player.tsx` mide el área visible, calcula el progreso del scroll y busca el fotograma correspondiente con `PlayerRef.seekTo`.
- `src/modules/home/ui/core-journey-composition.tsx` describe el arte en función del fotograma. Remotion vuelve a dibujar la escena cuando cambia el fotograma.

`HomeScreen` coloca la escena dentro de `.core-journey` junto con las primeras secciones narrativas. El escenario mide una altura de viewport, usa `position: sticky` y `margin-bottom: -100svh`; el texto pasa por encima con una capa superior. El wrapper exterior conserva `overflow: clip`, que evita desbordamiento sin romper el comportamiento sticky. No añadir `overflow: hidden` a un ancestro de la escena.

La escena tiene `pointer-events: none`; enlaces y controles interactivos recuperan `pointer-events: auto`. De esta forma el arte no intercepta el scroll ni los clics del contenido.

## Sincronización de scroll y fotogramas

La composición dura 900 fotogramas a 30 fps. Los primeros 90 presentan la trama en unos 2,6 segundos. El resto cubre el progreso de scroll del contenedor narrativo:

```ts
const distance = Math.max(1, section.offsetHeight - window.innerHeight);
const progress = clamp(-section.getBoundingClientRect().top / distance, 0, 1);
const targetFrame = progress > 0.001 ? 90 + progress * (900 - 91) : introFrame;
```

El fotograma objetivo se alcanza gradualmente para que los cambios de posición del scroll no produzcan saltos. Se calcula un factor que depende del tiempo entre fotogramas y se solicita una actualización solo mientras el reproductor necesita acercarse al objetivo:

```ts
const delta = Math.min(64, Math.max(1, now - lastTime));
frame += (targetFrame - frame) * (1 - Math.exp(-delta / 75));
playerRef.current?.seekTo(Math.round(frame));
```

El scroll sigue siendo nativo: el navegador conserva anclas, rueda, trackpad, teclado y su propia barra de progreso. El código solo escucha el evento pasivo `scroll`, calcula el progreso y actualiza Remotion. No se bloquean eventos ni se impone una duración al desplazamiento.

El ciclo usa `requestAnimationFrame`, se detiene cuando alcanza el fotograma objetivo, cuando la escena sale del viewport o cuando la pestaña queda oculta. Los eventos y el ciclo se limpian al desmontar. `ResizeObserver` ajusta el tamaño de la composición al viewport.

## Diseñar la composición

1. Mantener la composición determinista: toda posición, opacidad y transición deriva de `useCurrentFrame()` y `useVideoConfig()`.
2. Dividir la escena en etapas con intervalos expresados en fotogramas. En la composición actual, las hebras aparecen entre 0–90, se transforman entre 270–650 y se expanden entre 630–899.
3. Aplicar `interpolate` con límites y una curva de easing para que la transformación sea reversible al desplazarse hacia arriba.
4. Usar elementos SVG ligeros (`path`, `circle`, `polygon`, gradientes) cuando la profundidad se pueda dibujar sin geometría 3D. Los seis trazos actuales calculan una forma de nudo con coordenadas parametrizadas y luego la proyectan a SVG.
5. Reducir la cantidad de detalle móvil y componer la cámara según `width` y `height`. No escalar texto pequeño dentro del arte; dejar rótulos esenciales en HTML.
6. Evitar audio, reproducción de fondo y dependencias gráficas pesadas mientras la escena sea decorativa.

## Movimiento reducido, pausa y accesibilidad

- Leer `window.matchMedia("(prefers-reduced-motion: reduce)")` en el cliente.
- Si la preferencia está activa, mostrar el póster estático y no montar Remotion inicialmente. Ofrecer un botón para activar el movimiento de forma explícita.
- Mantener el botón de pausa disponible durante el recorrido; pausar la escena no debe impedir el scroll.
- Marcar la capa del reproductor como decorativa (`aria-hidden="true"`). Mantener títulos y textos como HTML seleccionable e indexable.
- Usar controles nativos con nombre accesible, foco visible, estado y operación por teclado.
- No expresar diferencias importantes solo mediante el color. Cumplir contraste suficiente y mantener tamaños legibles en las etiquetas secundarias.

## Adaptar el concepto NASA sin convertirlo en la identidad del equipo

La propuesta del Explorador Global de Anomalías Terrestres se conserva como proyecto independiente. El concepto incluye filtros de temperatura marina, hielo marino y vegetación; vistas de mapa, globo de puntos y nube de puntos; regiones como el mar de Beaufort, el Amazonas, la Gran Barrera de Coral y la taiga siberiana; desviación frente a lo habitual, confianza del dato y series históricas. Su visualización ilustrativa vive dentro de la ficha del proyecto.

La landing anterior centrada en NASA imaginaba un descenso del espacio hacia la Tierra: fondo oscuro con estrellas deterministas, cámara de aproximación, planeta Blue Marble, trayectorias orbitales, anillos de señal y una transición hacia una vista atmosférica. La secuencia terminaba en la interfaz del explorador con mapa, regiones y tendencia ilustrativa. En esa versión se usó una imagen Blue Marble WebP optimizada a 1536 px; el archivo se retiró al convertir la landing en una presentación del equipo, así que hay que recuperar el recurso y su atribución antes de reutilizarlo. Esta dirección queda archivada para una futura página del proyecto NASA. La composición más reciente conserva el recorrido por scroll, la continuidad de Remotion y los trazos vectoriales; la marca global ahora presenta al equipo y su proceso.

Reto oficial, fuentes NASA específicas, métricas reales, stack del explorador, roles y perfiles públicos siguen sin confirmarse. No presentarlos como datos definidos. El proyecto no representa ni implica patrocinio de la NASA.

## Revisión antes de publicar

1. Recorrer la página con teclado y con enlaces de ancla.
2. Probar escritorio y un ancho móvil real; confirmar que no haya desbordamiento y que botones y textos se lean.
3. Activar `prefers-reduced-motion` y comprobar que el póster estático aparece sin montar el reproductor.
4. Pausar y reanudar durante el recorrido; subir el scroll y comprobar que la composición vuelve a fotogramas anteriores.
5. Mirar la consola, compilar Next y comprobar la exportación estática.
6. Revisar que las afirmaciones del proyecto distingan claramente propuesta, maqueta y producto implementado.
