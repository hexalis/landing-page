"use client";

import { useState } from "react";
import { ExplorerPreview } from "./explorer-preview";

const projects = [
  {
    id: "explorer",
    title: "Explorador Global de Anomalías Terrestres",
    category: "Experiencias",
    description:
      "Una forma de explorar cambios del planeta sin conocimientos especializados en ciencia de datos.",
    status: "Concepto en desarrollo",
    medium: "Visualización / Datos abiertos",
    details:
      "Propuesta para NASA Space Apps Challenge 2026. El concepto reúne anomalías del océano, el hielo marino y la vegetación, casos regionales y tendencias históricas con datos abiertos de la NASA.",
  },
  {
    id: "hexalis",
    title: "Hexalis",
    category: "Herramientas",
    description: "Componentes y tokens para que diseñar y desarrollar compartan un mismo lenguaje.",
    status: "Base compartida",
    medium: "Interfaz / Sistema de diseño",
    details:
      "Librería propia y open source de componentes y tokens de interfaz. Da una base coherente al trabajo de diseño y desarrollo, y permite reutilizar decisiones visuales.",
  },
  {
    id: "design-ops",
    title: "Design Ops Toolkit",
    category: "Herramientas",
    description: "Documentación para compartir prácticas y decisiones de diseño.",
    status: "Documentación del equipo",
    medium: "Diseño / Documentación",
    details:
      "Librería para documentar el trabajo de diseño y el uso del sistema. Acompaña los flujos, los componentes y el contexto necesario para continuar el trabajo.",
  },
];
const filters = ["Todos", "Experiencias", "Herramientas"] as const;

export function ProjectsSection() {
  const [category, setCategory] = useState<(typeof filters)[number]>("Todos");
  const visibleProjects = projects.filter(
    (project) => category === "Todos" || project.category === category,
  );

  return (
    <section id="proyectos" className="work-section scene" aria-labelledby="projects-title">
      <div className="work-gateway">
        <div className="page-wrap">
          <p className="eyebrow">04 / Nuestro trabajo</p>
          <svg className="gateway-paths" viewBox="0 0 1200 230" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="gateway-thread">
                <stop stopColor="#3b82f6" stopOpacity="0" />
                <stop offset=".45" stopColor="#2563eb" />
                <stop offset=".55" stopColor="#dbeafe" />
                <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[30, 64, 98, 132, 166, 200].map((y, index) => (
              <path
                key={y}
                d={`M0 ${y}H170C370 ${y} 380 115 555 115M645 115C820 115 830 ${y} 1030 ${y}H1200`}
                stroke="url(#gateway-thread)"
                strokeWidth={index % 2 ? "1" : "1.5"}
                pathLength="1"
              />
            ))}
            <path
              d="m600 64 44 25v52l-44 25-44-25V89Z"
              fill="#1b161b"
              stroke="#3b82f6"
              strokeWidth="1.3"
            />
            <path
              d="m579 99 21 12 21-12m-42 32 21-12 21 12m-21-48v64"
              stroke="#dbeafe"
              strokeWidth="1"
            />
            <circle cx="600" cy="115" r="4" fill="#ffffff" />
            <circle cx="600" cy="115" r="69" stroke="#64748b" strokeOpacity=".12" />
            <path
              d="M225 20v190M975 20v190"
              stroke="#ddd6df"
              strokeOpacity=".08"
              strokeDasharray="2 9"
            />
          </svg>
          <div className="gateway-copy">
            <h2 id="projects-title" className="font-display">
              Del proceso <br />
              <em>al proyecto.</em>
            </h2>
            <p>
              Las ideas se prueban, toman forma y encuentran a otras personas. Aquí compartimos
              productos, herramientas y experiencias desarrollados por el equipo.
            </p>
          </div>
        </div>
      </div>
      <div className="page-wrap">
        <div className="portfolio-toolbar">
          <fieldset className="project-filters" aria-label="Filtrar proyectos">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={category === filter}
                onClick={() => setCategory(filter)}
              >
                {filter}
              </button>
            ))}
          </fieldset>
          <p className="portfolio-count" aria-live="polite">
            {visibleProjects.length} {visibleProjects.length === 1 ? "proyecto" : "proyectos"}
          </p>
        </div>
        <div className="portfolio-grid">
          {visibleProjects.map((project, index) => (
            <details className="project-card" name="portfolio-project" key={project.id}>
              <summary className="project-summary">
                <div className={"project-art project-art-" + project.id} aria-hidden="true">
                  {project.id === "explorer" ? (
                    <svg viewBox="0 0 360 220" fill="none">
                      <path
                        d="M0 55h360M0 110h360M0 165h360M90 0v220M180 0v220M270 0v220"
                        stroke="currentColor"
                        strokeOpacity=".12"
                      />
                      <ellipse
                        cx="180"
                        cy="110"
                        rx="107"
                        ry="72"
                        stroke="currentColor"
                        strokeOpacity=".45"
                      />
                      <ellipse
                        cx="180"
                        cy="110"
                        rx="107"
                        ry="25"
                        stroke="currentColor"
                        strokeOpacity=".25"
                      />
                      <ellipse
                        cx="180"
                        cy="110"
                        rx="40"
                        ry="72"
                        stroke="currentColor"
                        strokeOpacity=".25"
                      />
                      {[
                        { x: 135, y: 85 },
                        { x: 212, y: 130 },
                        { x: 240, y: 72 },
                      ].map((p) => (
                        <g key={p.x}>
                          <circle cx={p.x} cy={p.y} r="13" stroke="#3b82f6" strokeOpacity=".4" />
                          <circle cx={p.x} cy={p.y} r="3" fill="#3b82f6" />
                        </g>
                      ))}
                    </svg>
                  ) : project.id === "hexalis" ? (
                    <div className="design-preview">
                      <span className="design-type">Aa</span>
                      <div className="design-swatches">
                        <i />
                        <i />
                        <i />
                      </div>
                      <span className="design-button">Construir ↗</span>
                      <span className="design-token">space / type / color</span>
                    </div>
                  ) : (
                    <div className="docs-preview">
                      <span className="docs-title">
                        Design Ops <b>↗</b>
                      </span>
                      <span>
                        01 <i /> Principios
                      </span>
                      <span>
                        02 <i /> Componentes
                      </span>
                      <span>
                        03 <i /> Decisiones
                      </span>
                    </div>
                  )}
                  <span className="project-art-label">VISTA CONCEPTUAL</span>
                </div>
                <div className="project-card-copy">
                  <div className="project-card-meta">
                    <span>{project.category}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <h3 className="font-display">{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-medium">{project.medium}</span>
                  <div className="project-card-bottom">
                    <span className="project-state">
                      <i />
                      {project.status}
                    </span>
                    <span className="project-toggle">
                      <span className="when-closed">Abrir ficha</span>
                      <span className="when-open">Cerrar ficha</span>
                      <b aria-hidden="true">+</b>
                    </span>
                  </div>
                </div>
              </summary>
              <div className="project-detail">
                <p>{project.details}</p>
                {project.id === "explorer" && (
                  <>
                    <ExplorerPreview />
                    <p className="frame-disclaimer">
                      Vista ilustrativa, sin mediciones en vivo. Proyecto independiente, sin
                      afiliación ni patrocinio de la NASA.
                    </p>
                  </>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
