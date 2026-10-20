const members = [
  { name: "Francelia Michell Lopez Alonzo", initials: "FM", quote: null },
  { name: "Jorge Alberto Ramos Tellez", initials: "JA", quote: null },
  { name: "Marlon Jose Baltodano Delgadillo", initials: "MJ", quote: null },
  { name: "Carlos Andres Perez Ubeda", initials: "CA", quote: null },
  { name: "Roger Fernando Guido Cisneros", initials: "RF", quote: "Aprendemos para enseñar" },
  { name: "Anthony", initials: "A", quote: null },
];

export function TeamSection() {
  return (
    <section id="equipo" className="team-section scene" aria-labelledby="team-title">
      <div className="page-wrap">
        <div className="section-intro">
          <div>
            <p className="eyebrow">03 / Las personas primero</p>
            <h2 id="team-title" className="font-display section-title">
              Ninguna idea llega lejos <em>por sí sola.</em>
            </h2>
          </div>
          <p className="intro">
            Red Lace Core reúne a personas que investigan, diseñan, construyen y aprenden en
            colaboración. Cada proyecto refleja decisiones y aportes compartidos.
          </p>
        </div>
        <ul className="team-grid">
          {members.map((member) => (
            <li key={member.name} className="member-card">
              <div className="member-identity">
                <span className="member-avatar" aria-hidden="true">
                  {member.initials}
                </span>
                <span className="frame-label">RED LACE CORE</span>
              </div>
              <h3 className="font-display">{member.name}</h3>
              {member.quote ? (
                <blockquote>“{member.quote}”</blockquote>
              ) : (
                <p className="member-quote-pending">Frase por compartir</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
