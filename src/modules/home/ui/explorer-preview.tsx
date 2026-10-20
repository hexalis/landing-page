const signals = [
  { name: "Océano", detail: "Temperatura de la superficie marina", color: "#3b82f6" },
  { name: "Criósfera", detail: "Extensión del hielo marino", color: "#cbd5e1" },
  { name: "Tierra", detail: "Estado de la vegetación", color: "#64748b" },
];
const places = ["Mar de Beaufort", "Amazonas", "Gran Barrera de Coral", "Taiga siberiana"];

export function ExplorerPreview() {
  return (
    <div
      className="explorer-frame"
      aria-label="Vista conceptual del Explorador Global de Anomalías Terrestres"
    >
      <div className="frame-top">
        <div className="flex items-center gap-3">
          <span className="frame-label">RLC</span>
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
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="frame-label">ESQUEMA ILUSTRATIVO · SIN VALORES</span>
        </div>
      </div>
    </div>
  );
}
