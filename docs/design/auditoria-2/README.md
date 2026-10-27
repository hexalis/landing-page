# Auditoría 2 · Landing de Hexalis

**Estado auditado:** rama `experimental`, commit `4a791b4` (25 de octubre de 2026).
**Alcance:** `index.html` (2 787 líneas, 216 KB), `README.md`, `docs/`, `plans/`, `assets/`, `og.html`, `propuesta-panal.html` y el historial de git (28 commits).
**Modo:** solo lectura. Este informe no cambia el sitio; el plan de la Fase 6 espera aprobación.

> **Cómo se hizo.** Capturas con Chrome headless por el protocolo DevTools, con WebGL por software. Por eso los fps y el tiempo de bloqueo en móvil son **peores** que en un teléfono real con GPU, y el LCP móvil de 25 s es un artefacto del scroll programático (el LCP real del hero es 2,7 s con CPU ×4 y red lenta). De las skills pedidas se ejecutó `/ponytail-audit` en esta ronda y `/break-ui` en la anterior; las demás (`/impeccable`, `/improve-animations`, `/find-animation-opportunities`, `/review-animations`, `/animation-performance`, `/mobile-native`, `/dataviz`, `/emil-design-eng`, `/apple-design`, `/design-taste-frontend`, `/security-review`, `/code-review`, `/simplify`, `/ponytail-debt`) se aplicaron como criterios, sin lanzarlas. `/simplify` aplica cambios por sí sola, así que no correspondía en una fase de solo lectura. No hizo falta `/find-skills`.

---

## Resumen ejecutivo

La landing está bien construida y su identidad es clara: la celda Hexalis, el recorrido 3D, los dos temas, la paleta de comandos y el movimiento reducido funcionan. La ronda anterior dejó resueltos el sistema de hexágonos, la prueba en vivo en teléfono, los tamaños táctiles y los datos extremos.

**Lo que impide publicar hoy es contenido, no código:**

1. **El texto promete cosas que todavía no existen.** Repositorios públicos («Todo empieza en nuestros archivos y repositorios públicos», «Elige una tarea abierta»), el Toolkit «en Figma Community» (el enlace apunta a un archivo de diseño, no a Community) y un equipo de «seis personas» con un solo perfil real.
2. **El brief de esta auditoría describe otra landing.** Habla de una organización «centroamericana de tecnología abierta para entender la Tierra», inspirada en Ada Lovelace y Margaret Hamilton, con secciones de ruta, patrocinio y apoyo en especie, y con tipografías Unbounded y Onest. Nada de eso está en este repositorio: la página dice «organización sin fines de lucro de Nicaragua», «El conocimiento es universal», y carga **Inter y JetBrains Mono** (lo mismo que dice el README). Hay que decidir cuál es el posicionamiento real antes de reescribir textos.
3. **Faltan metadatos de publicación.** `og:image` relativa, sin `og:url` ni `canonical`, y una descripción que repite «seis personas».

**Dos fallos técnicos de severidad alta:**
- **Sin WebGL,** la portada del Design System ocupa toda la pantalla detrás del título y los dos textos se encima ([captura](img/pruebas/sin-webgl-hero.jpg)).
- **En cada visita** la página consulta la API de GitHub por los miembros de la organización `hexalis`, que no está confirmada como tuya. Si ese nombre es de otra persona, sus miembros aparecerían como «También en GitHub».

**Rendimiento:**
- **Escritorio:** bien (LCP 0,64 s, CLS 0,02).
- **Móvil de gama media** (CPU ×4, red lenta): el contenido llega rápido (2,7 s) pero el hilo principal queda bloqueado 4,7 s y la interacción más lenta tarda 424 ms. La causa es el arranque del 3D. Se puede bajar sin quitar el recorrido.

**El plan de cierre (Fase 6)** tiene 8 bloqueantes, 10 importantes y 10 de pulido. Los bloqueantes son en su mayoría de contenido y dependen de 10 decisiones tuyas, listadas al final.

---

## Fase 0 · Punto de partida

**Capturas:** cada sección a 1440 px y 375 px, en oscuro y claro, en [`img/oscuro/`](img/oscuro/) y [`img/claro/`](img/claro/) (68 imágenes; `d-` es escritorio, `m-` es móvil). Pruebas extra en [`img/pruebas/`](img/pruebas/): sin WebGL, 2560 px y 320 px.

**Inconsistencias que pediste verificar:**

| Afirmación | Resultado |
|---|---|
| El README dice Inter y el HTML carga Unbounded, Onest y JetBrains Mono | **No se confirma.** El HTML carga Inter (eje óptico 14–32) y JetBrains Mono (línea 25). Coincide con el README y con `og.html`. No hay rastro de Unbounded ni de Onest. |
| El equipo muestra «Integrante 2 a 6» sin nombre | **Resuelto a medias.** Ya no se muestran «Integrante N»: las cinco celdas dicen su disciplina y «Perfil en camino». Pero `TEAM` sigue con datos de relleno y el texto dice «Seis personas». |
| Falta el caso de estudio de Space Apps | **Confirmado.** El README lo deja pendiente a propósito; `LINKS.spaceApps` está vacío. |
| No existe versión en inglés | **Confirmado.** No hay `hreflang`, ni textos separados del HTML. |

**Desajustes del README con el sitio actual:** describe efectos que ya no existen (hilos entre secciones, números 01–07 con paralaje, playground inclinado en 3D, cinta que acelera). También dice que el globo usa EONET, que un enlace vacío muestra «pronto» (ahora se oculta) y que el modo claro está «en el pie». Ver B-8.

---

## Fase 1 · Código y rendimiento

### Mediciones

| Escenario | LCP | CLS | Bloqueo total (TBT) | Interacción más lenta | fps al hacer scroll |
|---|---|---|---|---|---|
| Escritorio, sin límite | 0,64 s | 0,022 | 739 ms | 64 ms | 131 |
| Móvil, CPU ×4 + red lenta | 2,7 s (lede) | 0,008 | 4 680 ms | 424 ms | 43 |

**Peso de la primera visita (comprimido con gzip):**

| Recurso | Peso | Notas |
|---|---|---|
| `index.html` | 58 KB (211 KB sin comprimir) | — |
| Three.js r160 | 162 KB (654 KB sin comprimir) | Desde jsDelivr |
| RoomEnvironment | 4 KB | Desde jsDelivr |
| Fuentes | ~100–150 KB | Inter variable + JetBrains Mono, desde Google |
| Portadas PNG | 130–200 KB cada una | Se cargan dos al llegar a Obras |

**Total estimado:** ~350 KB antes de bajar y ~750 KB con las portadas.

**Resto:** memoria JS ~11 MB y 1 177 nodos DOM. La memoria de GPU del recorrido no se puede medir con GL por software.

### Presupuesto de rendimiento propuesto

| Métrica | Presupuesto | Hoy |
|---|---|---|
| LCP (móvil 4G de gama media) | ≤ 2,5 s | 2,7 s ⚠️ |
| CLS | ≤ 0,05 | 0,02 ✅ |
| INP | ≤ 200 ms | 424 ms (simulado) ❌ |
| TBT (móvil de gama media) | ≤ 600 ms | 4 680 ms (simulado) ❌ |
| JS total, gzip | ≤ 250 KB | ~224 KB ✅ |
| Fuentes | ≤ 120 KB | ~100–150 KB ⚠️ |
| Imágenes, cada una | ≤ 120 KB (AVIF/WebP) | 130–200 KB PNG ❌ |
| fps en scroll con 3D (gama media real) | ≥ 50 | sin medir con GPU real |

### Hallazgos

Cada hallazgo indica dónde está, qué falla, por qué importa, su severidad y cómo arreglarlo.

**C-01 · Sin WebGL, la portada se encima con el título** — Hero y recorrido · CSS de `.stage-fallback` (líneas 180–185) · **Alta**
- **Qué falla:** si el navegador no tiene WebGL (navegadores bloqueados, equipos viejos, modo de ahorro), se muestra `ds-cover-dark.png` a pantalla completa detrás de «El conocimiento es universal». Los textos de la portada («Hexalis Design System», «Tokens, components…») chocan con el h1 ([captura](img/pruebas/sin-webgl-hero.jpg)). Además, la consola registra un error no capturado.
- **Por qué importa:** es la primera pantalla. Quien llega sin 3D ve un hero ilegible y en inglés.
- **Cómo arreglarlo:** reemplazar el respaldo por una composición fija pensada para eso: un panal SVG con las celdas de marca a la derecha (las piezas ya existen), sin texto. Quitar el `throw e` de la línea 2235.

**C-02 · Consulta a la API de GitHub de una organización no confirmada** — `contributors()`, línea 1955 · **Alta**
- **Qué falla:** con `LIVE.github.repos` vacío, la página igual llama en cada visita a `api.github.com/orgs/hexalis/public_members` (lo verifiqué en las peticiones de red). El README dice que el enlace oficial de GitHub aún no está confirmado.
- **Por qué importa:**
  - si `hexalis` es de otra persona, sus miembros aparecerían en la sección Equipo;
  - cada visita gasta del límite de 60 llamadas por hora por IP;
  - GitHub recibe la IP de cada visitante sin que haga falta.
- **Cómo arreglarlo:** salir de la función si `repos` está vacío, o mientras la organización no esté confirmada. Es una línea.

**C-03 · Código muerto de EONET** — líneas 1876–1905 y `mapEvents`/`eventCells` en el módulo 3D · **Media**
- **Qué falla:** la función `eonet()` termina en la segunda línea porque `#eoStatus` ya no existe en el HTML, y el globo ya no muestra eventos.
- **Por qué importa:** son unas 45 líneas que se leen, se mantienen y pueden confundir (el README todavía dice que EONET «funciona»).
- **Cómo arreglarlo:** borrarlas, o moverlas a una rama si se quiere conservar la idea. Decisión 8.

**C-04 · CSS sin uso** — `.b-try`, `.big-lbl`, `.cap`, `.hexm`, `.license`, `.pg-controls`, `.pips`, `.s-alert`, `.s-radio` · **Baja**
- **Qué falla:** son 9 clases que no aparecen en el HTML ni en el JS (verificado con búsqueda en todo el archivo, incluidas las plantillas de JS).
- **Cómo arreglarlo:** borrarlas (~25 líneas).

**C-05 · Archivos sobrantes en el repositorio** — `propuesta-panal.html` (100 KB), `plans/` (10 planes ya aplicados), `.impeccable/` · **Baja**
- **Por qué importa:** si el repositorio se publica tal cual, estos archivos confunden a quien contribuya.
- **Cómo arreglarlo:** borrar la propuesta y mover `plans/` y `.impeccable/` a `docs/historial/`, o dejarlos fuera del repositorio público.

**C-06 · Dos funciones calculan iniciales** — `faceHTML` (línea 1302) e `initialsOf` (~línea 1320) · **Baja**
- **Qué falla:** aplican la misma regla escrita dos veces; la primera se agregó en la Fase 4 para evitar un problema de orden de declaración.
- **Cómo arreglarlo:** declarar `initialsOf` antes y que `faceHTML` la use.

**C-07 · ¿Separar CSS y JS?** — **Media, recomendado**
- **Qué falla:** el HTML lleva unos 70 KB de CSS, 66 KB de JS y 38 KB del módulo 3D. Comprimido pesa 58 KB, así que no es un problema de peso.
- **Por qué importa:**
  - **caché:** las visitas siguientes no vuelven a bajar CSS y JS;
  - **seguridad:** permite una política de contenido estricta (`script-src 'self'`) sin `unsafe-inline`;
  - **mantenimiento:** hoy cada cambio toca un archivo de casi 2 800 líneas.
- **Cómo arreglarlo:** separar en `styles.css`, `app.js` y `scene.js`, sin herramientas de build. El orden y el código no cambian.

**C-08 · Arranque del 3D en móvil** — módulo, líneas 2223 en adelante · **Alta para móvil**
- **Qué falla:** con CPU ×4 hay 29 tareas largas y 4,7 s de bloqueo, y la interacción más lenta (cambiar de paleta) tarda 424 ms. La geometría redondeada de la ronda anterior suma vértices.
- **Por qué importa:** en un teléfono de gama media, los primeros toques se sienten trabados.
- **Cómo arreglarlo:**
  - arrancar el 3D en el teléfono cuando el navegador esté libre y después del primer pintado (`requestIdleCallback` con un tope de 1,5 s);
  - en el teléfono, usar `curveSegments: 2` en las celdas lejanas y una resolución de 1,25×;
  - al cambiar de paleta, no recompilar materiales.

### Seguridad y privacidad

**S-01 · Dependencias de CDN sin verificación de integridad** — líneas 23–25 y 2225 · **Media**
- **Qué falla:** Three.js y RoomEnvironment vienen de jsDelivr sin `integrity`, y las fuentes de Google.
- **Por qué importa:** si el CDN sirviera un archivo alterado, se ejecutaría en tu dominio. Además, Google recibe la IP de cada visitante, algo relevante para docentes, estudiantes y comunidades.
- **Cómo arreglarlo:** alojar en `/vendor` `three.module.min.js`, `RoomEnvironment.js` y las fuentes (woff2 solo del alfabeto latino). También mejora la robustez sin red externa.

**S-02 · Sin política de seguridad de contenido (CSP)** · **Media**
- **Cómo arreglarlo:** después de C-07 y S-01, agregar una CSP en el servidor (o un `<meta>`) con `default-src 'self'`; `connect-src` para la sala de presencia y la API de GitHub si se usan, e `img-src` con `avatars.githubusercontent.com`.

**S-03 · Presencia por WebSocket sin validar** — `presence()`, líneas 1911–1952 · **Media (crítica si se activa `presenceUrl`)**
- **Qué falla:** hoy solo funciona entre pestañas del mismo navegador. Si se conecta una sala:
  - el color de cada mensaje entra sin validar como variable CSS (un `url(...)` haría que todos los visitantes carguen una dirección externa);
  - las coordenadas no se acotan;
  - no hay tope de visitantes.
  - Además, se comparte la posición vertical de lectura (`pageY`), no solo el puntero.
- **Cómo arreglarlo:**
  - aceptar solo colores de `TEAM`;
  - acotar `x` entre 0 y 1 e `y` a la altura de la página;
  - limitar a 12 visitantes;
  - ignorar mensajes de más de 200 bytes;
  - en la sala, validar el origen y limitar el ritmo de mensajes;
  - decir en el pie qué se comparte.

**S-04 · Metadatos** · **Alta (bloqueante para compartir)**
- **Qué falla:**
  - `og:image` es relativa (`assets/og.png`);
  - faltan `og:url`, `canonical`, `og:locale` y `apple-touch-icon`;
  - la descripción dice «Seis personas en el mismo lienzo»;
  - `og:title` («Diseño y código abiertos para todos») no coincide con `<title>` («Organización open source»).
- **Cómo arreglarlo:** URL absoluta del dominio final y un título y una descripción alineados con el manual de voz (B).

**Ya resuelto en rondas anteriores:** textos del equipo escapados, el selector de datos de prueba que solo aparece en localhost y `rel="noopener"` en los enlaces externos.

**Atajos pendientes (`/ponytail-debt`):** no hay comentarios `shortcut:` ni `TODO` en el código.

---

## Fase 2 · UI, diseño y accesibilidad

**U-01 · Tipografía: ¿cuál es la correcta?** — **Decisión 2**
- El sitio usa Inter con eje óptico (bien aprovechado: los titulares grandes toman el corte de display) y JetBrains Mono solo para código y el «ORG» del logo. Coincide con el README del Design System citado en el README del proyecto.
- **Recomendación:** mantener Inter, salvo que el Design System haya cambiado a Unbounded y Onest. En ese caso habría que cambiar también `og.html` y las portadas.

**U-02 · Las portadas están en inglés** — Obras y respaldo sin WebGL · **Media**
- **Qué falla:** «Tokens, components and patterns that fit together», «Process, flow and method for documenting any product», «Sister library».
- **Por qué importa:** es la única parte visible en inglés en una página en español; también se ve en el respaldo sin 3D.
- **Cómo arreglarlo:** exportar versiones en español de las portadas desde Figma, o dejarlas como imágenes de producto y decirlo en el texto alternativo.

**U-03 · Los proyectos se listan tres veces** — tarjeta del hero «Lo que estamos creando ahora», capítulo «Un mundo de proyectos» y la sección Proyectos · **Media (gusto)**
- **Qué falla:** Space Apps, Portal y «Tu proyecto» aparecen tres veces con casi el mismo texto.
- **Por qué importa:** diluye el ritmo; la tercera vez ya no informa.
- **Cómo arreglarlo:** dejar la tarjeta del hero como acceso rápido y convertir el capítulo 3D en una sola frase con el enlace «Ver proyectos». Decisión 9.

**U-04 · La línea de datos de Obras se descuadra** · **Baja**
- **Qué falla:** «claro y oscuro» queda más alto que «85 componentes» porque el número grande cambia la línea base.
- **Cómo arreglarlo:** `align-items: baseline` en `.facts-line`.

**U-05 · Enlaces del pie de 22 px de alto** · **Baja**
- **Qué falla:** WCAG 2.2 AA (2.5.8) pide 24 × 24 px o separación suficiente.
- **Cómo arreglarlo:** `padding-block: 2px` en los enlaces del pie.

**U-06 · El h1 se lee «conocimientoes»** · **Baja**
- **Qué falla:** las dos líneas del título son `span` sin espacio entre ellas; algunos lectores de pantalla las unen.
- **Cómo arreglarlo:** un espacio entre los `span`.

**U-07 · Atajos de teclado** · **Baja**
- **Qué falla:** «Ctrl K» aparece igual en Mac (debería decir ⌘K), y «Pulsa Ctrl K» se muestra también en el pie del teléfono, donde no aplica.

**U-08 · El riel queda lejos del contenido en pantallas muy anchas** · **Baja**
- **Qué falla:** a 2560 px el riel queda pegado al borde izquierdo, a ~450 px del contenido ([captura](img/pruebas/2560-hero.jpg)).
- **Cómo arreglarlo:** ubicarlo respecto a la columna de contenido.

**Vidrio en cada tema:**
- **Oscuro:** bien.
- **Claro:** se ve correcto en los paneles. Sobre el WebGL en movimiento, el desenfoque de 22 px se recalcula en cada cuadro; ver A-02.
- `prefers-reduced-transparency` quita el desenfoque (línea 106). ✅

**Accesibilidad que aguantó la revisión:**
- un enlace «Saltar al contenido»;
- un h1 y luego los h2 en orden;
- ningún botón sin nombre;
- las etiquetas 3D y los cursores con `aria-hidden`;
- foco visible global;
- contraste del texto secundario de ~9:1 en oscuro y ~7:1 en claro;
- reordenar con teclado en la prueba en vivo;
- menú móvil con `inert`.

**¿Alguna sección se siente de plantilla?** Preguntas es un acordeón estándar, y está bien: es la sección donde el visitante espera lo conocido. El resto ya tiene composición propia desde la ronda 4. El hero es fuerte; su debilidad es U-03 (repite contenido), no la composición.

**Ya resuelto:** sistema unificado de celdas, tamaños táctiles en el teléfono, hover solo con puntero fino y espaciado de letras de los titulares.

---

## Fase 3 · Animación y scroll

**A-01 · El README describe movimientos que ya no existen** · **Media (documentación)**
- **Qué falla:** «hilos entre secciones» (un trazo que se dibuja con el scroll), «paralaje de números de sección», «playground que entra inclinado» (inclinación 3D) y «cinta que acelera» (un marquee ligado a la velocidad de scroll) se quitaron en el rediseño. **No conviene volver a ponerlos:** competirían con el recorrido 3D.
- **Cómo arreglarlo:** actualizar el README (B-8).

**A-02 · Vidrio sobre el 3D en el teléfono** — `.panel` con `backdrop-filter: blur(14px)` (línea 757) · **Media**
- **Qué falla:** el desenfoque detrás de un lienzo WebGL que cambia en cada cuadro obliga a recomponer la capa en cada cuadro. En gama baja es una de las causas de los 43 fps.
- **Cómo arreglarlo:** en `(pointer: coarse)`, usar un fondo sólido al 92 % sin desenfoque. La lectura no cambia.

**A-03 · El fondo calcula todas las celdas en cada cuadro** — `hive()`, bucle de dibujo · **Baja**
- **Qué falla:** ya pinta la retícula como patrón (Fase 3 de la ronda anterior), pero sigue evaluando las escenas en unas 1 200 celdas por cuadro.
- **Cómo arreglarlo:** evaluar solo las celdas dentro del rectángulo de la sección activa.

**A-04 · El 3D tarda en aparecer con red lenta** · **Media**
- **Qué falla:** si Three.js tarda más de 6 s, se muestra el respaldo de C-01 y después el 3D lo reemplaza de golpe.
- **Cómo arreglarlo:** cuando el respaldo sea el panal SVG, fundir de uno a otro en 400 ms (*crossfade*).

**Oportunidades:**
- **Aceptada:** la de A-04.
- **Rechazadas** (con el criterio de `/find-animation-opportunities`):
  - devolver el paralaje de números: decoración que compite con el 3D;
  - animar la paleta de comandos: se abre con teclado;
  - mover las cifras: son datos para leer.

**Revisión de estándares:** sin `transition: all`, sin `ease-in`, sin `will-change` permanente, sin animar ancho ni alto (salvo la apertura de Preguntas, que es intencional), y con movimiento reducido respetado (verificado en la ronda anterior).

**Ya resuelto:** entradas cortas, equipo en ~1,2 s, contadores solo en el 3D, fundido de paleta y bucles pausados fuera de pantalla.

---

## Fase 4 · Robustez, móvil y cifras

| Prueba | Resultado |
|---|---|
| Sin red externa (CDN o Google caídos) | Las fuentes caen a la del sistema (bien). Sin Three.js se cumple C-01 a los 6 s. |
| API de GitHub caída | No falla en silencio con datos rotos: no muestra nada (bien), pero ver C-02. |
| Sin WebGL | C-01. |
| Nombres largos y emojis | Bien, corregido en la ronda anterior. |
| Texto en otro idioma | No probado con traducción real. Todo el texto está fijo en el HTML y en el JS, así que la versión en inglés necesita separar los textos primero (ver I-10). |
| 2560 px | Bien; el contenido se limita a 1 440 px. Detalle: U-08. |
| 320 px | **Desborde de 4 px**: la última muestra de paleta sobresale por el margen negativo del carrusel ([captura](img/pruebas/320-prueba-en-vivo.jpg)). |
| Zoom al 200 % | No verificado visualmente. Equivale a ~720 px, que entra en el diseño de tableta ya revisado. |
| Menú móvil abierto | La página se desplaza por debajo y el menú queda flotando. |

**R-01 · Desborde a 320 px** · **Baja**
- **Cómo arreglarlo:** `margin-inline: 0` en `.pg-bar .swatches` dentro del media query del teléfono.

**R-02 · Menú móvil abierto y scroll** · **Baja**
- **Cómo arreglarlo:** cerrar el menú al hacer scroll, o fijar el fondo mientras está abierto.

**Revisión de `/mobile-native`:** `100svh` ✅, zonas seguras del notch ✅, sin resaltado al tocar ✅, hover pegado evitado ✅, campos de 16 px que no hacen zoom ✅, `interactive-widget=resizes-content` ✅.

### Cifras (`/dataviz`)

| Cifra | Dónde aparece | Fuente visible en la página |
|---|---|---|
| 85 componentes | Capítulo 3D, Obras y Proyectos | No |
| 6 paletas | Capítulo 3D y Obras | No |
| 1.614 variantes | Capítulo 3D | No |
| 6 kits · 112 componentes · 16 plantillas | Obras y Proyectos | No |
| 2 + 2 + 6 + 3 + 2 + 1 plantillas por fase | Ciclo | Suma 16 ✅ |
| Fechas de la Bitácora | Bitácora | Sí: «CHANGELOG.md de cada repositorio» |

**D-01 · Las cifras no tienen fuente visible y la de la Bitácora no se puede comprobar** · **Media**
- **Qué falla:** la Bitácora cita los `CHANGELOG.md` de repositorios que aún no son públicos. Las demás cifras no dicen de dónde salen.
- **Cómo arreglarlo:** cuando los repositorios sean públicos, enlazar «Fuente: README de cada librería» bajo Obras y convertir «CHANGELOG.md» en enlace. Mientras tanto: «Fuente: historial interno de cada librería».

**D-02 · Dos cifras de «componentes» que significan cosas distintas** · **Baja**
- **Qué falla:** «85 componentes» (del Design System) y «112 componentes» (del Toolkit) aparecen juntas en Obras y se leen como si fueran comparables.
- **Cómo arreglarlo:** «112 piezas de documentación», o el término que use el README del Toolkit.

No hay gráficos de datos reales; el del lienzo dice «datos de ejemplo». ✅

---

## Fase 5 · Narrativa, voz y tono

**El arco visión → producto como prueba → súmate funciona:** hero («El conocimiento es universal»), por qué abierto, quiénes, qué construimos, cómo trabajamos, proyectos, prueba en vivo, historia, equipo, súmate y preguntas. Se entiende en una lectura qué hace Hexalis («Diseñamos y programamos en abierto para que cualquiera pueda usar, estudiar y mejorar lo que hacemos»).

**N-01 · Promesas que todavía no existen** · **Crítica para publicar**
- **Qué falla:**
  - «Todo empieza en nuestros archivos y repositorios públicos» (Súmate);
  - «Contribuye en los repositorios», «Elige una tarea abierta (issue)», «Propón tu cambio (pull request)»;
  - «revisa las tareas abiertas (issues) de nuestros repositorios» (Preguntas);
  - «Duplica el Toolkit desde Figma Community» (el enlace no es de Community);
  - «Fuente: CHANGELOG.md de cada repositorio».
- **Por qué importa:** quien quiere contribuir llega a GitHub y no encuentra nada. Es la forma más rápida de perder confianza.
- **Cómo arreglarlo:** publicar los repositorios antes del lanzamiento, o reescribir en tiempo futuro y con fecha («Los repositorios se abren en noviembre; deja tu correo o sigue la organización»). Decisión 6.

**N-02 · El posicionamiento del brief no está en la página** · **Crítica, decisión 1**
- **Qué falla:** «Entender la Tierra», «centroamericana», Ada Lovelace y Margaret Hamilton, ruta, patrocinio y apoyo en especie no aparecen en ninguna parte del sitio.
- **Por qué importa:** si ese es el posicionamiento real, el hero y la misión actuales no lo cuentan.
- **Cómo arreglarlo:** después de tu decisión, ajustar el hero, «Por eso lo hacemos en abierto» y el cierre siguiendo el manual (B, sección 10).

**N-03 · No hay llamado para patrocinar ni para apoyo en especie** · **Alta, decisión 3**
- **Qué falla:** Súmate cubre a quien diseña, programa o representa una organización, pero quien quiere patrocinar no tiene un camino. «Hablemos en GitHub» no sirve a un patrocinador.
- **Cómo arreglarlo:** una cuarta fila, «Si quieres apoyarnos», con patrocinio, apoyo en especie (equipos, espacios, servicios) y alianzas, y un contacto real por correo (`LINKS.contact`).

**N-04 · El equipo dice «seis» y muestra uno** · **Alta**
- **Qué falla:** el capítulo dice «Seis personas, un mismo lienzo», la descripción dice «Seis personas…» y el panal solo tiene un perfil real.
- **Cómo arreglarlo:** datos reales antes de publicar, o un texto honesto («Somos seis; los perfiles se publican pronto»). Decisión 5.

**N-05 · Nombres internos en la Bitácora** · **Media**
- **Qué falla:** «Oblivion», «Grimspace» y «Prisma» son nombres de trabajo que el visitante no conoce.
- **Cómo arreglarlo:** «Primera versión del kit de documentación (entonces con otro nombre)», o explicar el cambio en una línea.

**N-06 · Metáforas acumuladas** · **Media, decisión 9**
- **Qué falla:** en la misma página conviven lienzo, celda, pieza, panal y cursor. Funcionan por separado, pero juntas piden traducir: «Súmate al lienzo», «Cada celda encendida…», «La siguiente pieza puede ser tuya».
- **Cómo arreglarlo:** el manual propone el panal y la celda como metáfora principal, la pieza para los componentes, y el lienzo y el cursor solo para la prueba en vivo y la presencia.

**N-07 · Jerga sin traducir** · **Baja**
- **Qué falla:** «open source» (título y pie), «design system» (Bitácora), «tokens», «variables `--hx-*`» y «página Map».
- **Cómo arreglarlo:** «código abierto»; «sistema de diseño» en el texto corrido; explicar las variables en una línea donde se usan.

**N-08 · Estados de carga y vacío sin texto** · **Baja**
- **Qué falla:** mientras carga el 3D no hay nada a la derecha del hero. Sin JavaScript, las secciones se ven bien (el contenido no depende del JS), pero la prueba en vivo y el equipo quedan vacíos sin aviso.
- **Cómo arreglarlo:** un `<noscript>` breve en esas dos secciones.

**Ya resuelto:** Playground → Prueba en vivo, fases traducidas, botones sin destino ocultos y los textos de conteo que siguen a los datos.

---

## Fase 6 · Plan de cierre

Una sola lista, sin duplicados. Esfuerzo: **S** (menos de 1 h), **M** (medio día), **L** (más de un día). Las decisiones se numeran al final.

### Bloqueantes para publicar

| # | Qué | Esfuerzo | Depende de | Hallazgos |
|---|---|---|---|---|
| B-1 | Alinear el posicionamiento (hero, misión, cierre, metadatos) | M | Decisión 1 | N-02, S-04 |
| B-2 | Corregir las promesas: repositorios, Figma Community, fuente de la Bitácora | S (texto) · L (publicar repos) | Decisión 6 | N-01, D-01 |
| B-3 | Equipo: datos reales o texto honesto | S | Decisión 5 | N-04 |
| B-4 | Metadatos: `og:image` absoluta, `og:url`, `canonical`, `og:locale`, título y descripción alineados, `apple-touch-icon` | S | Dominio final, B-1 | S-04 |
| B-5 | Respaldo sin WebGL: panal SVG sin texto, sin error en consola | M | — | C-01, A-04 |
| B-6 | No consultar GitHub hasta tener repos y organización confirmados | S | — | C-02 |
| B-7 | Contacto real (`LINKS.contact`) y llamado de apoyo/patrocinio | M | Decisión 3 | N-03 |
| B-8 | README al día (efectos, EONET, enlaces vacíos, tipografía) | S | B-1 | A-01 |

### Importantes

| # | Qué | Esfuerzo | Depende de | Hallazgos |
|---|---|---|---|---|
| I-1 | Alojar Three.js, RoomEnvironment y las fuentes en el propio dominio | M | — | S-01 |
| I-2 | Separar CSS y JS en archivos y agregar CSP | M | I-1 | C-07, S-02 |
| I-3 | Arranque del 3D más liviano en el teléfono; vidrio sólido con puntero táctil | M | — | C-08, A-02 |
| I-4 | Portadas en AVIF/WebP con tamaño fijo; versiones en español | M | Exportar desde Figma | U-02 |
| I-5 | Proyectos sin repetir tres veces | S | Decisión 9 | U-03 |
| I-6 | Bitácora sin nombres internos | S | — | N-05 |
| I-7 | Una metáfora principal en los textos | M | Decisión 9, manual B | N-06, N-07 |
| I-8 | Borrar el código y los archivos sobrantes (EONET, CSS sin uso, propuesta, plans) | S | Decisión 8 | C-03, C-04, C-05 |
| I-9 | Presencia validada antes de conectar una sala | S | Solo si se usa `presenceUrl` | S-03 |
| I-10 | Separar los textos para la versión en inglés y agregar `hreflang` | L | Decisión 7, B-1 | Fase 4 |

### Pulido

| # | Qué | Esfuerzo |
|---|---|---|
| P-1 | Desborde de 4 px a 320 px | S |
| P-2 | Línea base de los datos de Obras | S |
| P-3 | ⌘K en Mac; sin «Pulsa Ctrl K» en el teléfono | S |
| P-4 | Enlaces del pie de 24 px | S |
| P-5 | Espacio entre las líneas del h1 | S |
| P-6 | Riel junto a la columna en pantallas anchas | S |
| P-7 | `faceHTML` usa `initialsOf` | S |
| P-8 | Menú móvil que se cierra al hacer scroll | S |
| P-9 | `<noscript>` en la prueba en vivo y en el equipo | S |
| P-10 | Fondo: evaluar solo las celdas de la sección activa | S |

**Orden de ejecución:**
1. Decisiones 1, 3, 5, 6 y 9.
2. B-6, B-5, P-1 a P-10 (no dependen de contenido).
3. I-1, I-2 e I-3 (técnicos).
4. B-1, B-2, B-3, B-7 e I-5 a I-7 (contenido, con el manual).
5. B-4 y B-8 (cierre).
6. I-4 cuando estén las portadas.
7. I-10 al final, con el texto ya cerrado.

### Checklist «listo para publicar»

- [ ] **Accesibilidad:** sin errores de axe; foco visible en todo; navegación completa con teclado; probado con NVDA y VoiceOver; contraste AA en los dos temas; objetivos táctiles de 24 px o más (44 px en controles principales).
- [ ] **Rendimiento:** LCP ≤ 2,5 s y INP ≤ 200 ms en un Android de gama media real; CLS ≤ 0,05; Lighthouse móvil ≥ 85.
- [ ] **Robustez:** se ve bien sin WebGL, sin JS, con red lenta y con zoom al 200 %.
- [ ] **Contenido real:** equipo, contacto, enlaces de Figma Community y repositorios públicos (o textos que no los prometan).
- [ ] **Sin promesas:** cada afirmación de la página se puede comprobar hoy.
- [ ] **Metadatos:** `og:image` con URL absoluta (1200 × 630), `og:url`, `canonical`, título y descripción probados en el validador de LinkedIn y en el de X.
- [ ] **Enlaces:** todos responden con 200; los externos abren en pestaña nueva con `noopener`.
- [ ] **Favicon:** SVG + `apple-touch-icon` de 180 px.
- [ ] **Idioma:** `lang="es"`; si hay inglés, `hreflang` en las dos versiones.
- [ ] **Privacidad:** sin peticiones a terceros que no hagan falta; el pie dice qué se comparte en la presencia.
- [ ] **README** al día y sin archivos de trabajo en el repositorio público.

---

## Decisiones que necesito

1. **Posicionamiento:** ¿«Organización sin fines de lucro de Nicaragua · El conocimiento es universal» (lo que dice la página) o «organización centroamericana de tecnología abierta para entender la Tierra» (lo que dice el brief)?
2. **Tipografía:** ¿se mantiene Inter + JetBrains Mono (lo que usan el sitio y el Design System) o el sistema cambió a Unbounded + Onest?
3. **Apoyo:** ¿se agrega «Si quieres apoyarnos» (patrocinio, en especie, alianzas)? ¿Con qué contacto?
4. **Ada Lovelace y Margaret Hamilton:** ¿se cuentan en la página? ¿Dónde: dentro de «Por eso lo hacemos en abierto», en el cierre, o en una sección propia?
5. **Equipo:** ¿esperar los datos reales o publicar con el texto honesto?
6. **Repositorios:** ¿se abren antes del lanzamiento o se reescriben los textos en futuro?
7. **Inglés:** ¿para este lanzamiento o después?
8. **Código de EONET:** ¿borrarlo o guardarlo en una rama?
9. **Metáfora principal y repetición de proyectos:** ¿panal y celda como eje (lienzo y cursor solo en la prueba en vivo)? ¿Se acorta el capítulo «Un mundo de proyectos»?
10. **Terceros:** ¿se puede alojar Three.js y las fuentes en el dominio de Hexalis (mejor privacidad y robustez)?
