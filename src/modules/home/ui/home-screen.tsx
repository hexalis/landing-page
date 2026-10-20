import Link from "next/link";
import { CoreJourney } from "./core-journey";
import { TeamSection } from "./team-section";
import { ProjectsSection } from "./projects-section";

const repository = "https://github.com/hexalis/landing-page";

const contributions = [
  { name: "Comprender", detail: "Hacer accesible el conocimiento.", color: "#3b82f6" },
  {
    name: "Construir",
    detail: "Crear herramientas reutilizables.",
    color: "#cbd5e1",
  },
  {
    name: "Colaborar",
    detail: "Compartir aprendizajes y procesos.",
    color: "#64748b",
  },
];

function Mark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="size-8" aria-hidden="true">
      <path d="M20 2 36 11v18L20 38 4 29V11L20 2Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="m11 13 9 5 9-5M11 27l9-5 9 5M20 8v24" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2.8" fill="currentColor" />
    </svg>
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
            <span className="text-sm leading-tight font-bold tracking-[.12em] uppercase">
              Red Lace
              <br />
              <span className="font-normal tracking-[.3em]">Core</span>
            </span>
          </Link>
          <nav
            aria-label="Navegación principal"
            className="hidden gap-8 text-sm font-semibold tracking-[.08em] uppercase md:flex"
          >
            <a href="#mision">Propósito</a>
            <a href="#equipo">El equipo</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#manual">Manifiesto</a>
          </nav>
          <a className="nav-cta" href={repository} target="_blank" rel="noopener noreferrer">
            Ver repositorio <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
      <main id="contenido">
        <div className="core-journey" data-core-journey>
          <CoreJourney />
          <div className="journey-content">
            <section className="cosmos scene" aria-labelledby="hero-title">
              <div className="page-wrap hero-grid">
                <div className="hero-copy">
                  <p className="eyebrow">
                    <span className="signal-dot" />
                    Red Lace Core · Diseño, tecnología y ciencia abierta
                  </p>
                  <h1 id="hero-title" className="font-display hero-title">
                    Crear en equipo.
                    <br />
                    <em>Compartir conocimiento.</em>
                  </h1>
                  <p className="intro">
                    Un colectivo que combina diseño, tecnología y ciencia abierta para crear
                    herramientas claras, útiles y abiertas a nuevas contribuciones.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a className="button-primary" href="#equipo">
                      Ver el equipo <span aria-hidden="true">↗</span>
                    </a>
                    <a className="button-secondary" href="#proyectos">
                      Ver proyectos <span aria-hidden="true">↓</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="page-wrap scroll-cue">
                <span /> Del concepto al aporte
              </div>
            </section>

            <section id="mision" className="mission-section scene" aria-labelledby="mission-title">
              <div className="page-wrap mission-grid">
                <div>
                  <p className="eyebrow">01 / Lo que nos mueve</p>
                  <h2 id="mission-title" className="font-display section-title">
                    La tecnología aporta valor <em>cuando es útil.</em>
                  </h2>
                </div>
                <div className="mission-copy">
                  <p className="lead">
                    El conocimiento y las herramientas pueden ser útiles cuando están al alcance de
                    quienes los necesitan.
                  </p>
                  <p>
                    El trabajo incluye experiencias que ayudan a comprender la ciencia, además de
                    componentes y documentación para otros equipos.
                  </p>
                  <p>
                    Cada proyecto permite aprender durante el proceso y aportar recursos a la
                    comunidad.
                  </p>
                </div>
              </div>
              <div className="page-wrap signal-grid">
                {contributions.map((item, index) => (
                  <article
                    className="signal-card"
                    key={item.name}
                    style={{ borderTopColor: item.color }}
                  >
                    <span className="frame-label">0{index + 1} / APORTE</span>
                    <span className="signal-icon" style={{ backgroundColor: item.color }} />
                    <h3 className="font-display">{item.name}</h3>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="contribution-section scene" aria-labelledby="contribution-title">
              <div className="page-wrap contribution-layout">
                <div className="contribution-copy">
                  <p className="eyebrow">02 / Una mirada compartida</p>
                  <h2 id="contribution-title" className="font-display section-title">
                    El conocimiento crece <em>cuando se comparte.</em>
                  </h2>
                  <p className="intro">
                    Una idea puede ayudar a comprender mejor el entorno, ofrecer una base para el
                    desarrollo o permitir que otro equipo continúe el trabajo.
                  </p>
                  <a className="text-link" href="#equipo">
                    Ver quiénes integran el equipo <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>

        <TeamSection />

        <ProjectsSection />

        <section id="manual" className="process-section scene" aria-labelledby="process-title">
          <div className="page-wrap process-grid">
            <div>
              <p className="eyebrow">05 / Manifiesto y manual abierto</p>
              <h2 id="process-title" className="font-display section-title">
                Así pensamos.
                <br />
                <em>Así trabajamos.</em>
              </h2>
              <p className="intro">
                Un manual vivo para que el propósito se traduzca en decisiones. Estos principios
                orientan cómo investigamos, colaboramos y compartimos.
              </p>
            </div>
            <div className="process-list">
              <article>
                <span>01</span>
                <div>
                  <h3>Empezar por las personas</h3>
                  <p>
                    Antes de construir, se define a quién sirve el proyecto y qué barrera puede
                    reducir. FigJam reúne la problemática y la investigación.
                  </p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Decidir con contexto</h3>
                  <p>
                    El decision log registra qué se decidió, por qué, cuándo y quién participó.
                    Documentar el proceso permite revisarlo y mejorarlo.
                  </p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Compartir lo que puede servir</h3>
                  <p>
                    Hexalis y Design Ops Toolkit reúnen componentes, tokens y documentación que
                    pueden servir como base para otros equipos.
                  </p>
                </div>
              </article>
              <article>
                <span>04</span>
                <div>
                  <h3>Aprender mientras hacemos</h3>
                  <p>
                    Figma acompaña el paso de preguntas y flujos a pruebas, prototipos y handoff.
                    Cada etapa permite conversar, corregir y aprender durante el proceso.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="final-section scene" aria-labelledby="final-title">
          <div className="page-wrap final-grid">
            <div>
              <p className="eyebrow">Red Lace Core · Un trabajo compartido</p>
              <h2 id="final-title" className="font-display section-title">
                El trabajo continúa.
                <br />
                <em>Las ideas pueden crecer.</em>
              </h2>
              <p className="intro">
                Las colaboraciones comienzan con preguntas, intercambio de conocimiento y objetivos
                compartidos.
              </p>
              <a
                className="button-primary"
                href={repository + "/issues/new?title=Conversemos"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir una conversación <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="final-core" aria-hidden="true">
              <Mark />
              <span>RED / LACE / CORE</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="page-wrap footer-grid">
          <div className="flex items-center gap-3 font-semibold tracking-widest uppercase">
            <Mark /> Red Lace Core
          </div>
          <p>Red Lace Core · Diseño, tecnología y ciencia abierta al servicio de las personas.</p>
          <a href={repository} target="_blank" rel="noopener noreferrer">
            Código en GitHub ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
