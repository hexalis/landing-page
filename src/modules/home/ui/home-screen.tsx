import Link from "next/link";

const repository = "https://github.com/hexalis/landing-page";
const signals = [
  { name: "Océano", detail: "Temperatura de la superficie marina", color: "#ef826f" },
  { name: "Criósfera", detail: "Extensión del hielo marino", color: "#9bcce4" },
  { name: "Tierra", detail: "Estado de la vegetación", color: "#abc993" },
];
const places = ["Mar de Beaufort", "Amazonas", "Gran Barrera de Coral", "Taiga siberiana"];

function Mark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="size-8" aria-hidden="true">
      <path d="M20 2 36 11v18L20 38 4 29V11L20 2Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="m11 13 9 5 9-5M11 27l9-5 9 5M20 8v24" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2.8" fill="currentColor" />
    </svg>
  );
}

function Earth() {
  return (
    <div className="earth" aria-hidden="true">
      <svg className="earth-map" viewBox="0 0 600 600" fill="#8bb8b0">
        <path d="M-28 116c80-26 124-19 160 2l43 7 29 28-16 27 31 28-11 41-38 3-17 35-31 16-12 52-38 16-23-23-9-53-30-34-38-3-26-52Z" />
        <path d="m174 317 48 10 36 49 1 48-26 42-7 58-31 59-27-2-13-52-24-43 13-44-23-29 11-54Z" />
        <path d="m252 103 54-33 61 11 38-25 79 6 33 26 72-10 46 35-31 34-55 1-33 27-60-12-26 29-61-2-27 34-45-18-23-42-49-5-17-29Z" />
        <path d="m330 231 56-11 39 31 14 64-32 61-27 70-44 31-34-35-3-51-24-35 18-59 37-66Z" />
        <path d="m485 375 41-20 49 12 53 38-17 48-49 23-62-18-30-40Z" />
        <path d="m8 531 107-17 130 34 115-12 112 17 140-20 28 78H0Z" />
      </svg>
      <span className="earth-shade" />
      <i className="earth-point p1" />
      <i className="earth-point p2" />
      <i className="earth-point p3" />
      <i className="earth-point p4" />
    </div>
  );
}

export function HomeScreen() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="page-wrap flex items-center justify-between gap-5 py-5">
          <Link
            href="/"
            className="brand flex items-center gap-3"
            aria-label="Red Lace Core, inicio"
          >
            <Mark />
            <span className="text-xs leading-tight font-bold tracking-[.16em] uppercase">
              Red Lace
              <br />
              <span className="font-normal tracking-[.3em]">Core</span>
            </span>
          </Link>
          <nav
            aria-label="Navegación principal"
            className="hidden gap-8 text-xs font-semibold tracking-[.13em] uppercase md:flex"
          >
            <a href="#mision">La misión</a>
            <a href="#explorador">El explorador</a>
            <a href="#proceso">Cómo lo hacemos</a>
          </nav>
          <a className="nav-cta" href={repository} target="_blank" rel="noopener noreferrer">
            Ver repositorio <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
      <main id="contenido">
        <section className="cosmos scene" aria-labelledby="hero-title">
          <div className="stars" aria-hidden="true" />
          <div className="page-wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="signal-dot" />
                NASA Space Apps Challenge 2026 · Concepto en desarrollo
              </p>
              <h1 id="hero-title" className="font-display hero-title">
                La Tierra nos está <em>hablando.</em>
              </h1>
              <p className="intro">
                Convertimos datos abiertos de observación terrestre en señales que cualquiera pueda
                explorar, comparar y comprender.
              </p>
              <div className="flex flex-wrap gap-3">
                <a className="button-primary" href="#explorador">
                  Explorar la idea <span aria-hidden="true">↗</span>
                </a>
                <a className="button-secondary" href="#mision">
                  Descubrir la misión <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="orbit orbit-outer" />
              <div className="orbit orbit-inner" />
              <div className="hero-core" />
              <span className="orbit-label top">51° N / 112° W</span>
              <span className="orbit-label bottom">SEÑAL / SISTEMA TIERRA</span>
            </div>
          </div>
          <div className="page-wrap scroll-cue">
            <span /> Desplázate para seguir la señal
          </div>
        </section>

        <section id="mision" className="mission-section scene" aria-labelledby="mission-title">
          <div className="page-wrap mission-grid">
            <div>
              <p className="eyebrow">01 / De la distancia a la evidencia</p>
              <h2 id="mission-title" className="font-display section-title">
                El cambio se ve cuando sabemos <em>dónde mirar.</em>
              </h2>
            </div>
            <div className="mission-copy">
              <p className="lead">
                Una anomalía es una diferencia frente a lo habitual. Ponerla en contexto ayuda a
                hacer preguntas mejores.
              </p>
              <p>
                Red Lace Core propone un Explorador Global de Anomalías Terrestres: un lugar para
                observar cambios en el océano, el hielo y la vegetación a partir de datos abiertos
                de la NASA.
              </p>
              <p>
                Queremos acercar esas señales a personas que no trabajan con herramientas de ciencia
                de datos.
              </p>
            </div>
          </div>
          <div className="page-wrap signal-grid">
            {signals.map((item, index) => (
              <article
                className="signal-card"
                key={item.name}
                style={{ borderTopColor: item.color }}
              >
                <span className="frame-label">0{index + 1} / SEÑAL</span>
                <span className="signal-icon" style={{ backgroundColor: item.color }} />
                <h3 className="font-display">{item.name}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="earth-section scene" aria-labelledby="earth-title">
          <div className="page-wrap earth-grid">
            <div className="earth-copy">
              <p className="eyebrow">02 / El planeta entra en foco</p>
              <h2 id="earth-title" className="font-display section-title">
                Un planeta.
                <br />
                <em>Muchas señales.</em>
              </h2>
              <p className="intro">
                De una vista global a una región concreta. El recorrido revela qué cambia, cómo
                evoluciona y qué tan confiable es cada lectura.
              </p>
              <a className="text-link" href="#explorador">
                Conoce el explorador <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="earth-stage">
              <div className="earth-ring outer" />
              <div className="earth-ring inner" />
              <Earth />
              <span className="earth-caption">
                OBSERVACIÓN GLOBAL <b>●</b> DATOS ABIERTOS
              </span>
            </div>
          </div>
        </section>

        <section
          id="explorador"
          className="explorer-section scene"
          aria-labelledby="explorer-title"
        >
          <div className="page-wrap">
            <div className="section-intro">
              <div>
                <p className="eyebrow">03 / Una forma de explorar</p>
                <h2 id="explorer-title" className="font-display section-title">
                  Del dato aislado a una <em>historia visible.</em>
                </h2>
              </div>
              <p className="intro">
                El portal está pensado para pasar de un mapa de anomalías a casos regionales y
                tendencias históricas, sin perder de vista el origen y la confianza del dato.
              </p>
            </div>
            <div
              className="explorer-frame"
              aria-label="Vista conceptual del Explorador Global de Anomalías Terrestres"
            >
              <div className="frame-top">
                <div className="flex items-center gap-3">
                  <Mark />
                  <span>
                    EXPLORADOR GLOBAL
                    <br />
                    <small>ANOMALÍAS TERRESTRES</small>
                  </span>
                </div>
                <span className="concept-tag">VISTA CONCEPTUAL · SIN DATOS EN VIVO</span>
              </div>
              <div className="frame-body">
                <div className="frame-sidebar">
                  <span className="frame-label">CAPAS DE OBSERVACIÓN</span>
                  <div className="layer-list">
                    {signals.map((item) => (
                      <div className="layer-row" key={item.name}>
                        <i style={{ backgroundColor: item.color }} />
                        {item.name}
                        <span>○</span>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <span className="frame-label">FORMAS DE VER</span>
                  <div className="view-list">
                    <span className="active">Mapa</span>
                    <span>Globo</span>
                    <span>Nube</span>
                  </div>
                  <p>Un mismo sistema, distintas perspectivas para encontrar patrones.</p>
                </div>
                <div className="frame-map">
                  <div className="map-grid" />
                  <div className="map-ring one" />
                  <div className="map-ring two" />
                  <i className="map-point one" />
                  <i className="map-point two" />
                  <i className="map-point three" />
                  <i className="map-point four" />
                  <i className="map-point five" />
                  <span className="map-coordinate">GLOBAL / EXPLORACIÓN</span>
                  <span className="map-note">
                    Selecciona una señal.
                    <br />
                    Descubre su contexto.
                  </span>
                </div>
                <div className="frame-cases">
                  <span className="frame-label">REGIONES PARA EXPLORAR</span>
                  <div className="case-list">
                    {places.map((place, index) => (
                      <div className="case-row" key={place}>
                        <small>0{index + 1}</small>
                        {place}
                        <span>↗</span>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <span className="frame-label">AL ABRIR UN CASO</span>
                  <p>Desviación frente a lo habitual, confianza del dato y serie de tiempo.</p>
                  <div className="chart-placeholder">
                    <svg viewBox="0 0 240 70" preserveAspectRatio="none" aria-hidden="true">
                      <path
                        d="M0 53 27 48 52 55 76 36 100 41 128 31 150 39 176 19 201 27 222 12 240 17"
                        fill="none"
                        stroke="#e8796b"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="frame-label">ESQUEMA ILUSTRATIVO · SIN VALORES</span>
                </div>
              </div>
            </div>
            <p className="frame-disclaimer">
              Este esquema muestra la experiencia propuesta. Las visualizaciones y regiones son
              ejemplos; no representan mediciones actuales.
            </p>
          </div>
        </section>

        <section id="proceso" className="process-section scene" aria-labelledby="process-title">
          <div className="page-wrap process-grid">
            <div>
              <p className="eyebrow">04 / Cómo toma forma</p>
              <h2 id="process-title" className="font-display section-title">
                Diseñar también es <em>hacer visible el proceso.</em>
              </h2>
              <p className="intro">
                Nuestro trabajo conecta investigación, decisiones documentadas y una interfaz que
                pueda crecer con el proyecto.
              </p>
            </div>
            <div className="process-list">
              <article>
                <span>01</span>
                <div>
                  <h3>Investigar el problema</h3>
                  <p>
                    FigJam reúne la problemática y la investigación para definir preguntas antes de
                    diseñar respuestas.
                  </p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Registrar las decisiones</h3>
                  <p>Un decision log conserva qué se decidió, por qué, cuándo y quién participó.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Diseñar un sistema coherente</h3>
                  <p>
                    Hexalis aporta componentes y tokens de interfaz; Design Ops Toolkit documenta su
                    uso.
                  </p>
                </div>
              </article>
              <article>
                <span>04</span>
                <div>
                  <h3>Pasar de concepto a interfaz</h3>
                  <p>
                    El trabajo en Figma avanza por producto, design system, laboratorio visual,
                    prototipo y handoff.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="final-section scene" aria-labelledby="final-title">
          <div className="page-wrap final-grid">
            <div>
              <p className="eyebrow">El siguiente paso empieza aquí</p>
              <h2 id="final-title" className="font-display section-title">
                Mirar la Tierra de otra <em>manera.</em>
              </h2>
              <p className="intro">
                Red Lace Core trabaja en una puerta de entrada para entender las señales del
                planeta. Sigue el proyecto y participa en su construcción abierta.
              </p>
              <a
                className="button-primary"
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explorar el repositorio <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="final-earth">
              <Earth />
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="page-wrap footer-grid">
          <div className="flex items-center gap-3 font-semibold tracking-widest uppercase">
            <Mark /> Red Lace Core
          </div>
          <p>
            Proyecto independiente para NASA Space Apps Challenge 2026. No afiliado ni patrocinado
            por la NASA.
          </p>
          <a href={repository} target="_blank" rel="noopener noreferrer">
            Código en GitHub ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
