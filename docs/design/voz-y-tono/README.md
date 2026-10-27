# Manual de voz y tono de Hexalis

Para diseño, desarrollo y redacción. Versión 0.1 (25 de octubre de 2026), escrita a partir de los textos reales de la landing (commit `4a791b4`).

> **Pendiente de decisión.** El propósito de la sección 1 usa lo que hoy dice la landing. Si el posicionamiento oficial es «tecnología abierta para entender la Tierra», con Ada Lovelace y Margaret Hamilton como inspiración (decisiones 1 y 4 de la auditoría), se cambian la frase de propósito y el arco de la sección 10. El resto del manual no depende de esa decisión.

---

## 1. Esencia

**Propósito**

> El conocimiento es universal. Hexalis diseña y programa proyectos open source para que cualquiera pueda usar, estudiar y mejorar lo que hacemos.

**Rasgos de personalidad** (propuestos a partir de lo que ya dice la página):

| Rasgo | Qué significa | Dónde ya se nota |
|---|---|---|
| **Abierta** | Mostramos el proceso, las decisiones y lo que falta. | «Archivos de Figma, código, documentación y las decisiones detrás de cada pieza quedan públicos». |
| **Precisa** | Cada cifra tiene fuente; cada afirmación se puede comprobar. | «Fechas reales, tomadas del historial de cambios de cada una». |
| **Cercana** | Hablamos de tú, con frases cortas, como una colega que explica. | «Ahora el cursor es tuyo». |
| **Constructora** | Hablamos de lo que hacemos y de cómo encaja, no de lo que soñamos. | «Dos librerías que encajan entre sí». |
| **Generosa** | Lo que hacemos es para que otras personas lo usen y lo mejoren. | «Todo lo que construimos es open source y queda para la comunidad». |

**Qué NO somos**
- No somos una startup: no vendemos ni usamos «disrupción», «escalar» ni «revolucionar».
- No somos un manifiesto: la visión se cuenta con hechos, no con adjetivos.
- No somos una agencia: no hablamos de «soluciones» ni de «clientes».
- No somos un homenaje: nuestras inspiraciones nos guían, pero no son decoración.
- No somos jerga técnica: quien no programa también tiene que entendernos.

---

## 2. Principios de voz

**1. Primero el hecho, después el adjetivo.**
- ✅ «85 componentes en claro y oscuro, con 6 paletas».
- ❌ «Un sistema de diseño potente, moderno y completo».

**2. Prometemos solo lo que ya existe.** Lo que viene se dice con fecha o con «pronto», nunca en presente.
- ✅ «Los repositorios se abren en noviembre».
- ❌ «Todo empieza en nuestros archivos y repositorios públicos» (texto actual, cuando todavía no son públicos).

**3. Una idea por frase y el verbo al principio.**
- ✅ «Duplica el archivo en Figma y empieza en la página Map».
- ❌ «La duplicación del archivo de Figma es el punto de partida recomendado».

**4. Español primero; el inglés solo para nombres propios.**
- ✅ «Elige una tarea abierta (issue)».
- ❌ «Revisa los issues abiertos».

**5. Una metáfora por idea.** El panal y la celda son el eje; la pieza es un componente; el lienzo y el cursor solo aparecen en la prueba en vivo y en la presencia de visitantes.
- ✅ «Cada celda es alguien del equipo».
- ❌ «Súmate al lienzo y sé la siguiente pieza del panal» (tres metáforas en una frase).

---

## 3. Mapa de tono por contexto

La voz no cambia; el tono sí. Escala: entusiasmo (0–3), formalidad (0–3), detalle (0–3).

| Contexto | Entusiasmo | Formalidad | Detalle | Cómo suena | Ejemplo |
|---|---|---|---|---|---|
| Hero | 2 | 1 | 1 | Afirmación corta y una frase que explica. | «El conocimiento es universal.» + qué hacemos en una frase. |
| Explicación de proyectos | 1 | 1 | 2 | Qué es, para quién, en qué estado. | «Una herramienta para explorar datos abiertos de eventos naturales. En desarrollo.» |
| Documentación técnica | 0 | 2 | 3 | Pasos numerados, verbos al inicio. | «Lleva los valores al código como variables `--hx-*`.» |
| Llamado a patrocinar | 1 | 2 | 2 | Qué se apoya, qué recibe la comunidad, cómo contactar. | «Tu aporte paga horas de documentación abierta. Escríbenos a…» |
| Llamado a contribuir | 2 | 0 | 1 | Invitación concreta, primer paso pequeño. | «Elige una tarea marcada como "primera contribución".» |
| Error | 0 | 1 | 2 | Qué pasó, por qué, qué hacer. Sin culpa. | «No pudimos cargar el recorrido 3D. Tu navegador no tiene WebGL; el resto de la página funciona igual.» |
| Estado de carga | 0 | 0 | 0 | Dos o tres palabras, con puntos suspensivos. | «Armando el panal…» |
| Estado vacío | 1 | 0 | 1 | Invitación, no disculpa. | «Aquí aparecerá tu proyecto. Proponlo.» |
| Aviso «en construcción» | 1 | 1 | 1 | Qué falta y cuándo, con honestidad. | «Los perfiles del equipo se publican en noviembre.» |

---

## 4. Vocabulario

**Usamos:** abierto, comunidad, construir, encajar, aprender, documentar, compartir, proponer, pieza, celda, panal, librería, sistema de diseño, open source, licencia, sin fines de lucro.

**Evitamos:**

| En vez de | Usamos |
|---|---|
| código abierto / en abierto / diseño abierto | open source (decisión de marca: es el término que la comunidad reconoce; «abierto» queda para datos abiertos y tareas abiertas) |
| design system (en texto corrido) | sistema de diseño |
| issue / pull request (solos) | tarea abierta (issue) / propuesta de cambio (pull request) |
| solución, ecosistema, sinergia | lo que hace la cosa, con sus palabras |
| revolucionario, disruptivo, potente | el hecho que lo demuestra |
| simplemente, fácil, solo tienes que | (quitarlo) |
| usuarios | personas, quien visita, quien diseña |
| ¡Increíble!, ¡Genial! | (quitarlo) |

**Glosario: forma única**

| Término | Forma correcta | Notas |
|---|---|---|
| Hexalis | **Hexalis** | Nunca HEXALIS ni hexalis en texto. «Hexalis ORG» solo en el logo. |
| Hexalis Design System | **Hexalis Design System** | Nombre propio, no se traduce. Abreviado: «el Design System». No: «HDS», «Hexalis DS» (salvo en interfaces de ejemplo). |
| Hexalis Design Ops Toolkit | **Hexalis Design Ops Toolkit** | Abreviado: «el Toolkit». No: «Design Ops Kit». |
| Las dos librerías | **las librerías** | En femenino plural. |
| Panal | **panal** | El conjunto: la organización, el sistema o el recorrido. |
| Celda | **celda** | La unidad: una persona del equipo, un principio o un proyecto. |
| Pieza | **pieza** | Un componente o una contribución concreta. |
| Lienzo | **lienzo** | Solo para la prueba en vivo y el espacio de trabajo compartido. |
| Prueba en vivo | **Prueba en vivo** | No: «Playground». |
| Bitácora | **Bitácora** | Con tilde. |
| Space Apps | **NASA Space Apps Challenge 2026** la primera vez, después «Space Apps». | Siempre con la aclaración de no afiliación cerca. |
| Licencias | **MIT** y **CC BY 4.0** | Con espacio antes de 4.0. |
| WCAG | **WCAG 2.2 AA** | Se presenta como «objetivo», no como certificación. |

---

## 5. Reglas de estilo

- **Trato:** de **tú** en toda la página, también para patrocinadores. En documentos formales (convenios, cartas) se usa usted.
- **Mayúsculas:** solo la primera palabra y los nombres propios en títulos, botones y menús. ✅ «Lo que estamos construyendo». ❌ «Lo Que Estamos Construyendo».
- **Puntuación:**
  - los títulos de sección no llevan punto, salvo las frases-manifiesto del hero y del cierre («El conocimiento es universal.»);
  - los botones nunca llevan punto;
  - signos de apertura siempre: ¿¡;
  - comillas angulares « » en el texto; las comillas rectas, solo en código.
- **Números:**
  - del uno al nueve en palabras dentro del texto corrido, salvo cifras de producto («6 paletas»);
  - miles con punto: **1.614**;
  - decimales con coma: **2,5 s**;
  - fechas: «19 oct» en interfaz y «19 de octubre de 2026» en texto.
- **Siglas:** se explican la primera vez, salvo las conocidas (NASA, MIT). ✅ «WCAG 2.2 AA (la guía internacional de accesibilidad)».
- **Emojis:** no, en ninguna parte de la interfaz. En redes, máximo uno y nunca en lugar de una palabra.
- **Largos máximos:**
  - botón: 3 palabras o 24 caracteres;
  - título de sección: 7 palabras o 2 líneas;
  - h1: 2 líneas;
  - entrada de sección: 2 frases;
  - texto de tarjeta: 1 frase.

---

## 6. Patrones de microcopy

**Botones:** verbo + objeto, en infinitivo o imperativo de tú.
- ✅ «Abrir en Figma», «Proponer un proyecto», «Ver las librerías».
- ❌ «Haz clic aquí», «Más información», «Enviar».

**Formularios:**
- **Etiqueta:** el dato («Correo»).
- **Ayuda:** para qué lo usamos («Solo para avisarte cuando abramos los repositorios»).
- **Marcador:** un ejemplo real («nombre@correo.com»), nunca la etiqueta repetida.

**Errores: qué pasó, por qué y qué hacer.**
- ✅ «No pudimos enviar tu mensaje. Parece que no hay conexión. Revisa tu red e inténtalo de nuevo; no perdiste lo que escribiste.»
- ❌ «Error 500», «Algo salió mal».

**Carga:** presente continuo, máximo tres palabras, con puntos suspensivos.
- ✅ «Armando el panal…», «Cargando proyectos…».

**Avisos breves (toasts):** el hecho en pasado, sin «exitosamente».
- ✅ «Componentes publicados», «Paleta cambiada a Ciruela».
- ❌ «¡Tus componentes se publicaron exitosamente!».

**Estados vacíos:** invitación con un verbo.
- ✅ «Todavía no hay proyectos en esta categoría. Propón el primero.»

---

## 7. Accesibilidad del lenguaje

- **Nivel de lectura:** que lo entienda alguien de 14 años sin formación técnica. Frases de menos de 25 palabras y párrafos de 3 frases como máximo.
- **Texto alternativo:** describe lo que la imagen aporta, no cómo se ve.
  - ✅ «Portada de Hexalis Design System: panal de hexágonos con botones, interruptores y campos».
  - Si una imagen es decorativa, lleva `alt=""` y nunca «imagen de…».
- **Etiquetas de controles:** dicen la acción y el objeto. ✅ «Mover Botones», «Cambiar a tema claro». Un botón de solo ícono siempre lleva `aria-label`.
- **Enlaces:** el texto dice el destino. ✅ «Abrir en Figma». ❌ «aquí».
- **Lenguaje inclusivo:**
  - preferimos palabras sin género: «quien visita», «el equipo», «las personas»;
  - no usamos «@», «x» ni «e» como marcas de género;
  - con roles: «la persona que diseña».
- **Números y siglas en lector de pantalla:** «1.614» se lee bien; «v1.0.0» se escribe como «versión 1.0.0» cuando no es una etiqueta visual.
- **Movimiento:** ningún texto depende de una animación para entenderse.

---

## 8. Antes y después (textos reales de la landing)

| # | Dónde | Antes | Después | Por qué |
|---|---|---|---|---|
| 1 | Súmate, entrada | Elige cómo quieres participar. Todo empieza en nuestros archivos y repositorios públicos. | Elige cómo quieres participar. Las librerías ya están en Figma; los repositorios se abren en noviembre. | Principio 2. |
| 2 | Súmate, programar | Contribuye en los repositorios: variables de diseño, componentes y proyectos. | Cuando abramos los repositorios podrás aportar variables de diseño, componentes y proyectos. | Principio 2. |
| 3 | Obras, Toolkit | Duplica el Toolkit desde Figma Community. | Duplica el Toolkit en Figma. | El enlace no es de Community. |
| 4 | Capítulo del equipo | Seis personas, un mismo lienzo | Seis celdas, un mismo panal | Principio 5. Si el equipo no está listo: «Un equipo de seis; los perfiles llegan pronto». |
| 5 | Meta descripción | Hexalis es una organización sin fines de lucro de Nicaragua. Seis personas en el mismo lienzo creando librerías de Figma, documentación y proyectos open source. | Hexalis es una organización sin fines de lucro de Nicaragua. Diseñamos y programamos proyectos open source: un sistema de diseño, un kit para documentar y proyectos para la comunidad. | Sin metáfora; dice qué hacemos. |
| 6 | `<title>` | Hexalis · Organización open source | Hexalis · Diseño y código open source | Español primero; coincide con og:title. |
| 7 | Bitácora | Nace como Oblivion: un método para documentar productos en Figma. | Nace el kit de documentación, entonces con otro nombre: un método para documentar productos en Figma. | Sin nombres internos. |
| 8 | Bitácora | Oblivion pasa a llamarse Grimspace | El kit cambia de nombre | Ídem. |
| 9 | Bitácora | Arranca el design system | Arranca el sistema de diseño | Español primero. |
| 10 | Pie | Organización open source sin fines de lucro con sede en Nicaragua. | Organización open source y sin fines de lucro. Nacimos en Nicaragua. | Español primero. |
| 11 | Cierre | Súmate al lienzo | Súmate | Más corto; sin metáfora en el botón principal. |
| 12 | Súmate, organización | Hablemos en GitHub | Escríbenos | Una organización no conversa por GitHub. |
| 13 | Capítulo del mundo | Todo lo anterior existe para construir cosas útiles. Cada celda encendida es un proyecto en marcha; las que laten esperan su turno, y una de ellas puede ser la tuya. | Todo lo anterior sirve para construir cosas útiles. Cada celda encendida es un proyecto en marcha, y una puede ser el tuyo. | Una idea por frase; quita la tercera imagen. |
| 14 | Obras, Design System | Lleva los valores al código como variables `--hx-*`. | Copia los valores a tu código: son variables CSS que empiezan con `--hx-`. | Explica la jerga. |
| 15 | Prueba en vivo | Cambia la marca, mueve las piezas y publica. Solo cambian variables: los componentes y su legibilidad se mantienen. | Cambia la marca, mueve las piezas y publica. Cambian los colores y las formas; los componentes siguen siendo legibles. | Sin «variables» para quien no programa. |
| 16 | Preguntas | Para código, revisa las tareas abiertas (issues) de nuestros repositorios. | Para código, sigue la organización en GitHub: avisaremos cuando abramos las primeras tareas. | Principio 2. |
| 17 | Pie (teléfono) | Pulsa Ctrl K para las acciones rápidas | (ocultar en pantallas táctiles; ⌘K en Mac) | El texto debe aplicar a quien lo lee. |

---

## 9. Checklist de revisión (10 puntos)

1. ¿Se puede comprobar hoy todo lo que afirma?
2. ¿Dice primero el hecho y después el adjetivo?
3. ¿Usa tú, español primero y las formas del glosario?
4. ¿Tiene una sola metáfora (o ninguna)?
5. ¿Cada frase tiene menos de 25 palabras y una sola idea?
6. ¿El botón dice verbo + objeto en 3 palabras o menos?
7. ¿Los números siguen las reglas (1.614, 2,5 s) y cada cifra tiene fuente?
8. Si es un error: ¿dice qué pasó, por qué y qué hacer?
9. ¿Funciona leído en voz alta por un lector de pantalla, sin la imagen ni la animación?
10. ¿Lo entendería una docente, un periodista y una persona que programa?

---

## 10. Guía de narrativa

**Arco del visitante**

| Etapa | Pregunta del visitante | Secciones | Qué debe decir | Qué debe sentir |
|---|---|---|---|---|
| Llegada | ¿Qué es esto? | Hero | Quiénes somos, dónde estamos y qué hacemos, en dos líneas. | Curiosidad y claridad. |
| Comprensión | ¿Por qué lo hacen así? | Por qué open source, equipo, sistema, ciclo | Los tres principios y quién está detrás. | «Esto tiene criterio». |
| Confianza | ¿Es real? | Obras, prueba en vivo, proyectos, bitácora | Producto con cifras y fuente, algo para tocar y fechas reales. | «Esto existe y funciona». |
| Acción | ¿Qué hago yo? | Súmate, preguntas, cierre | Un camino por tipo de visitante, con un primer paso pequeño. | «Hay un lugar para mí». |

**Qué dice cada sección**
- **Hero:** la convicción en tres palabras y la acción en una frase. Nada de lo que no exista hoy.
- **Principios:** cada uno con su prueba concreta (licencias, documentación, WCAG como objetivo).
- **Equipo:** personas reales con su rol; si faltan datos, decirlo.
- **Obras:** qué es cada librería y su primer paso; cifras con fuente.
- **Prueba en vivo:** invitar a tocar; explicar el resultado en lenguaje no técnico.
- **Proyectos:** estado honesto (en desarrollo, en diseño, abierto a propuestas).
- **Bitácora:** fechas y hechos, sin nombres internos.
- **Súmate:** un camino por perfil: diseño, código, organizaciones y apoyo o patrocinio.
- **Cierre:** devolver la convicción del hero convertida en invitación.

**Cómo contar a Ada Lovelace y Margaret Hamilton** (si se aprueba, decisión 4)
- **No:** retratos con cita inspiradora, «mujeres que cambiaron la historia» ni una línea de tiempo de biografías. Eso es homenaje genérico y cualquier organización podría ponerlo.
- **Sí:** contar **qué práctica concreta heredamos de cada una** y mostrar dónde se ve en nuestro trabajo:
  - **Ada Lovelace:** escribió las notas que explican la máquina mejor que la máquina misma, y entendió que podía hacer más que calcular. Nuestra práctica: documentar de principio a fin y pensar en lo que otras personas harán con nuestras piezas. Se conecta con el principio «Documentado».
  - **Margaret Hamilton:** diseñó el software del Apollo para que fallara de forma segura, y llamó a su oficio «ingeniería de software» para que se tomara en serio. Nuestra práctica: diseñar los estados de error, el peor caso y la accesibilidad como parte del producto. Se conecta con el principio «Accesible».
- **Dónde:** dentro del capítulo «Por eso lo hacemos en abierto», una línea por principio («Lo aprendimos de Ada Lovelace: …»). No como una sección aparte.
- **Regla:** cada mención termina en algo que hacemos hoy, nunca en un adjetivo sobre ellas.

---

## 11. Notas para la versión en inglés

| Se traduce | Se adapta | Se deja en español |
|---|---|---|
| Toda la interfaz, los botones, los textos de sección, las preguntas, los metadatos y los textos alternativos. | El tú pasa a un «you» directo y cálido. Los ejemplos con números siguen el formato inglés (1,614; 2.5 s). Las referencias locales («de Nicaragua») se mantienen y se explican si hace falta («a Nicaraguan non-profit»). | «Hexalis», los nombres de las librerías (ya están en inglés), los nombres de las paletas (Espectral, Laguna, Aurora, Ciruela, Magma, Campo: son marca) y los nombres del equipo. |
| «El conocimiento es universal» → «Knowledge is universal». | Las metáforas: panal → hive, celda → cell, pieza → piece. Revisar que «lienzo» → «canvas» no choque con la herramienta Canvas. | La Bitácora puede traducirse, pero las fechas siguen siendo las mismas. |

**Reglas para traducir**
- Primero cerrar el texto en español. Después separar los textos del HTML (decisión 7, I-10) y traducir con este manual al lado, no palabra por palabra.
- Agregar `hreflang="es"` y `hreflang="en"` en las dos versiones, y un selector de idioma en el pie, no en el menú principal.
- Los largos máximos del punto 5 también aplican en inglés. Probar los botones: el inglés suele ser más corto, el alemán no, y el francés un 15 % más largo.
