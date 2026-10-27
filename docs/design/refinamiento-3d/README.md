# Refinamiento del recorrido 3D · fases A y B

Alcance: refinamiento, no rediseño. Se conservan la identidad, los textos, la narrativa y el código. Las fases A y B son de solo lectura; no se tocó código.

Secciones (las cuatro del recorrido): **1 Origen** (cristal del hero) · **2 Principios** · **3 Equipo y sistema** · **4 Ciclo y planeta**.

Notas de método:
- El cargador de contexto de Impeccable no se ejecutó (regla del proyecto). Tampoco su detector, así que la crítica es de un solo contexto y sin la evaluación B automática.
- `design-taste-frontend` se usó como criterio («¿qué se siente de plantilla?»), sin sus scripts, que sirven para construir páginas nuevas.

## Fase A · Diagnóstico

### Medición base (medida, gráficos por software)

Archivo: `medicion-antes.json`. El móvil se simula con CPU ×4 y red lenta, siempre con gráficos por software, así que no es representativo de una GPU real.

| Métrica | Escritorio | Móvil simulado |
|---|---|---|
| LCP | 540 ms | 24 020 ms\* |
| CLS | 0,022 | 0,014 |
| TBT | 688 ms | 4 277 ms |
| Interacción más lenta (≈INP) | 72 ms | 280 ms |
| fps durante el scroll | 124 | 52 |
| Cuadros con tirón | 4 de 914 | 38 de 1 281 |

\* El LCP móvil es un artefacto del scroll automático: el último elemento grande aparece a los 24 s, mientras el script baja por la página. En el primer pantallazo el LCP real es el titular.

Contraste de las caras impresas, calculado con la fórmula WCAG a partir de los colores del código:
- Fases en oscuro: #e8fbf8 sobre #0c2a29 = 14,2:1.
- Texto secundario en oscuro: #86c7bf sobre #0c2a29 = 7,9:1.
- Fases en claro: #06302c sobre #e6f5f3 = 12,8:1.
- Texto secundario en claro: #3f6f6a sobre #e6f5f3 = 5,1:1.
- Iniciales: blanco sobre #0b1022 = 18,9:1.

Todo pasa AA. El problema no es el contraste, sino el **tamaño**: los textos pequeños de las caras quedan por debajo de unos 9 px en pantalla (estimado).

### Crítica por sección

| Heurística (0–4) | 1 Origen | 2 Principios | 3 Equipo/sistema | 4 Ciclo/planeta |
|---|---|---|---|---|
| Visibilidad del estado | 2 | 3 | 3 | 3 |
| Relación con el mundo real | 2 | 4 | 3 | 3 |
| Control y libertad | n/a | n/a | n/a | 2 (el planeta no se puede tocar) |
| Consistencia | 2 («Tú» tiene dos significados) | 3 | 3 | 3 |
| Prevención de errores | n/a | n/a | n/a | n/a |
| Reconocer antes que recordar | 3 | 3 | 2 (las iniciales desaparecen en el sistema) | 3 |
| Flexibilidad | n/a | n/a | n/a | n/a |
| Estética y minimalismo | 3 | 3 | 3 | 2 (suelo y planeta recargados) |
| Recuperación de errores | n/a | n/a | n/a | n/a |
| Ayuda | n/a | n/a | n/a | n/a |

¿Se siente de plantilla? La pregunta es si una marca cualquiera podría usar la escena tal cual:
- **Principios y equipo:** son específicos de Hexalis (la licencia real, el contraste medido, las iniciales) y ya no se sienten de plantilla.
- **Cristal brillante del hero y planeta de celdas:** son recursos comunes en las landings 3D. El planeta es lo más genérico: tres tonos repartidos al azar, placas oscuras que parecen agujeros y bloques de proyecto que sobresalen sin etiqueta.

Recorrido emocional:
- **El pico** está en el equipo y el ciclo.
- **El valle** está en el sistema, donde el equipo pierde las iniciales y vuelve a ser «columnas de color».
- **El final** (el planeta) es el momento más recargado y el menos explicado. Por la regla pico-final, es el que más pesa en el recuerdo.

### Detalles invisibles que fallan

| Antes | Después | Por qué |
| --- | --- | --- |
| Dos «Tú»: la etiqueta del cursor del visitante y «Tú · la séptima celda» | Uno solo: el cursor del visitante sin etiqueta dentro del recorrido, o «Tú» reservado para la celda | El mismo nombre con dos significados rompe la consistencia y deja una píldora suelta en cada escena |
| «LICENSE» y «2 plantillas» a 24–26 px en un lienzo de 256 px (≈7–9 px en pantalla) | Al menos unos 12 px en pantalla, o quitar «LICENSE» | El texto que no se puede leer es ruido |
| La flecha del ciclo queda a la altura de las celdas y la tapa la fase activa | La flecha sobre el anillo exterior, dibujada siempre encima | Hoy a veces desaparece o pisa «Review» |
| Contorno del sistema con líneas de 1 px (WebGL no permite más grosor) | Un anillo plano con algo de grosor | A 1 px el contorno casi no se ve |
| Cursores del equipo reflejados que apuntan hacia afuera | La flecha apunta a su celda, o solo píldora con línea guía | El puntero debe señalar a quién pertenece |
| El suelo del ciclo y el planeta con placas brillantes | Placas del suelo más apagadas que las fases | Las fases tienen que dominar; hoy el suelo compite |
| Placas de color `--surface` en el planeta que parecen agujeros | Un tono base más claro y solo dos tonos más los proyectos | En oscuro esas placas se leen como huecos |
| Las caras impresas aparecen con una opacidad lineal | Curva de salida (0.23, 1, 0.32, 1) | La aparición lineal se siente plana |
| Las iniciales solo se ven en el capítulo del equipo | Iniciales pequeñas también en el sistema | Así se mantiene quién es cada celda |

## Fase B · Propuestas (de conservadora a ambiciosa)

### 1 Origen
- **1A Limpiar.** Un solo «Tú». El cristal se alinea con la celda central de la retícula, para que se lea literalmente como la primera celda.
- **1B Asentarse.** Al primer scroll, el cristal baja y encaja en la retícula, y esa celda de la retícula se ilumina. Es una transición de continuidad: el fondo y el cristal cuentan lo mismo.
- **1C El hilo «Tú».** Junto al cristal aparece una celda punteada «Tú» que acompaña todo el recorrido: es la séptima celda en el equipo, «Tu proyecto» en el ciclo y una celda encendida en el planeta. Es el hilo narrativo más fuerte.

### 2 Principios
- **2A Ajustar.** Textos de las caras a un tamaño legible, quitar «LICENSE», triángulo regular entre las tres celdas y líneas guía del mismo largo.
- **2B Contar una vez.** Al entrar al capítulo, cada pieza se completa una sola vez: la rama de la licencia se dibuja, la cota «16px» se extiende y el contraste cuenta hasta su valor. Con movimiento reducido se muestran ya completas.
- **2C Voltear.** Al tocar una celda, gira y muestra el detalle real (las primeras líneas de la licencia, la ficha del componente, el par de colores medido).

### 3 Equipo y sistema
- **3A Continuidad mínima.** Iniciales pequeñas también en el sistema, contorno más visible y la etiqueta «Tú» bajo la celda vacía, sin tapar nada.
- **3B El sistema crece del equipo.** Las seis celdas viajan del anillo al centro con su color y sus iniciales, y el panal aparece por anillos desde ellas, con un pequeño escalonado por distancia.
- **3C Autoría visible.** En el sistema, cada integrante enciende por turnos las celdas que hizo: una onda que sale de su celda.

### 4 Ciclo y planeta
- **4A Ordenar.** Flecha sobre el anillo exterior, suelo más apagado y el planeta con dos tonos más los tres proyectos, todos con su etiqueta.
- **4B Progreso y continuidad.** Un arco sobre el anillo se dibuja de la fase 01 a la activa, avanzando con el scroll. «Tu proyecto» viaja del centro del ciclo al planeta y queda como celda encendida con etiqueta.
- **4C Planeta que se toca.** El planeta se puede arrastrar con inercia. Al soltarlo conserva la velocidad del dedo y se detiene con un resorte sin rebote. Los proyectos se pueden tocar.

### Qué merece moverse

| # | Dónde | Hoy | Propósito | Frecuencia | Movimiento propuesto |
| --- | --- | --- | --- | --- | --- |
| 1 | `scene.js` · celda «Tú» (1C) | No existe | Consistencia espacial | Una vez por visita | Movimiento ligado al scroll, sin tiempo propio; con movimiento reducido, posiciones fijas por capítulo |
| 2 | `scene.js` · caras de los principios (2B) | Estáticas | Indicar estado | Una vez por visita | Dibujo de línea y contador, 600 ms, curva (0.23, 1, 0.32, 1), una sola vez |
| 3 | `scene.js` · equipo → sistema (3B) | Las celdas cambian de forma con el resto | Consistencia espacial | Una vez por visita | Transición de elemento compartido y escalonado de 40 ms por anillo, ligados al scroll |
| 4 | `scene.js` · arco del ciclo (4B) | Solo crece la fase activa | Indicar estado | Una vez por visita | Movimiento ligado al scroll; con movimiento reducido, el arco completo y estático |
| 5 | `scene.js` · arrastre del planeta (4C) | Gira solo | Respuesta al gesto | Ocasional | Resorte sin rebote (amortiguación 1,0, respuesta 0,4 s), velocidad del dedo al soltar, inercia con desaceleración 0,998 |

Descartados:
- **Giro automático del anillo del ciclo** (ya quitado): obliga a leer algo que se mueve.
- **Flotación o pulso de las celdas del equipo:** pura decoración; compite con leer los nombres.
- **Inclinación al pasar el cursor por los principios:** no existe en táctil, y se perdería consistencia entre escritorio y teléfono.
- **Brillo animado en la retícula de fondo:** sería un fondo de pantalla completa en movimiento, mala idea para quien se marea.
- **Acelerar el giro del planeta:** un giro lento ya cumple; más rápido distrae.

### Vocabulario

- **Continuity transition** (1B, 3A): el antes y el después quedan conectados visualmente.
- **Shared element transition** (3B, «Tu proyecto» en 4B): un elemento viaja y se transforma de una posición a otra.
- **Stagger** (3B): varias piezas aparecen una tras otra con un pequeño retraso.
- **Line drawing** (2B, el arco en 4B): un trazo que se dibuja solo.
- **Number ticker** (2B): las cifras cuentan hasta su valor.
- **Scroll-driven animation** (1C, 3B, 4B): el avance de la animación depende directamente del scroll.
- **3D tilt / Flip** (2C): giro en 3D.
- **Drag con Momentum, Spring e Interruptible animation** (4C): se arrastra, conserva la velocidad al soltar y se puede volver a agarrar a mitad de camino.

## Fases C y D · Aplicado y verificado

Aplicado: **1C, 2A, 3B y 4B** (commits `519b2fb` y siguiente).

### Antes y después (medido en escritorio, gráficos por software, mismo equipo y mismas condiciones)

La versión anterior se sirvió desde la etiqueta `respaldo-pre-fase-c` en otro puerto, alternando las ejecuciones.

| | LCP | TBT | fps en scroll |
|---|---|---|---|
| Antes (7 ejecuciones) | 524–720 ms; 1 de 7 a 16 s\* | 636–946 ms | 133 |
| Después (6 ejecuciones) | 536–1 100 ms; 3 de 6 a 16 s\* | 710–1 106 ms | 118–133 |

\* Cuando una tarea larga cae antes del titular, el LCP solo se registra durante el scroll automático. Le pasó también a la versión anterior, así que es variación del entorno de medición.

Conclusión: no hay una diferencia que se distinga del ruido de este entorno. La primera pintura de las caras impresas se pasó a un momento ocioso, para que no compita con el primer cuadro. El rendimiento real hay que confirmarlo en un teléfono.

### Revisión

- **Rendimiento:** solo cambian transformaciones y opacidades de la escena; las etiquetas usan `translate3d`. El texto «Tú» se reescribe solo al cambiar de capítulo. Las iniciales del sistema reutilizan la textura del equipo, sin lienzos nuevos.
- **Datos extremos (`?data=worst`):** aguantan los nombres largos (se recortan con puntos suspensivos), las iniciales vacías (se toman las del cursor) y «J».
- **Con un solo integrante (`?data=one`):** las celdas sin persona quedan libres, en tono neutro, sin iniciales ni cursor (corregido).
- **Teléfono:** el viewport, el resaltado al tocar, `touch-action` y `theme-color` ya estaban bien. En el hero del teléfono la celda «Tú» no se muestra, para no tapar el titular.
- **Revisión de código (nivel bajo):** sin hallazgos.
- **Simplificación:** variables `hole` y `growPanal` en lugar de condiciones repetidas, y se quitó un comentario desactualizado.

## Ciclo y planeta · «Del plano al mundo»

- **Camino de luz:** las celdas del suelo bajo el anillo exterior se encienden y suben una a una, de la fase 01 a la activa; la flecha va en la punta.
- **El pliegue:** el suelo se curva con el scroll hasta cerrarse en el planeta. Cada celda conserva su ángulo y su orden por anillos, y el polo del planeta es el centro del ciclo («Tu proyecto»).
- **Planeta:** la base es de dos azules, sin placas que parezcan agujeros. Space Apps y Portal Hexalis tienen pilares de luz, y «Tu proyecto» es un hueco punteado que brilla un poco.
- **Arrastre:** el planeta se gira arrastrando en horizontal fuera del panel. Al soltarlo conserva la velocidad y frena despacio; con movimiento reducido no hay inercia. El scroll vertical sigue siendo de la página.
- **Sin aplicar:** «cada integrante en la fase que lidera», porque no hay datos de quién lidera cada fase y no quise inventarlos.
- **Panal esférico (poliedro de Goldberg):** el planeta se reconstruyó sobre los vértices de un icosaedro subdividido, con 162 celdas en escritorio y 92 en teléfono. Las celdas encajan borde con borde y no hay huecos, solapes ni interior visible desde ningún ángulo. Las 12 celdas que la geometría obliga a ser pentágonos van como hexágonos un 14 % más pequeños. Los proyectos dejan de ser cajas: son celdas del mismo tamaño, apenas más altas y encendidas. Las celdas que sobran en el borde del plano se recogen al plegarse.
