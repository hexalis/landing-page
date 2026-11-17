/* =========================================================
   CONFIGURACIÓN — enlaces, equipo y cursores.
   Un enlace vacío ('') oculta su botón hasta que tenga destino.
   ========================================================= */
/* Idioma: el mismo código sirve a / (español) y a /en/ (inglés); tr(es, en) elige el texto */
const LANG = (document.documentElement.lang || 'es').startsWith('en') ? 'en' : 'es';
const tr = (es, en) => LANG === 'en' ? en : es;

const LINKS = {
  github:    'https://github.com/hexalis',
  dsFigma:   'https://www.figma.com/design/8Fg5IHgcKSlgQefIhm2MxQ',
  opsFigma:  'https://www.figma.com/design/bebQIgCgYTS57nV4rSV6UP',
  btFigma:   'https://www.figma.com/design/ecEfN0sdN1inIc7Iexn4YC',
  dsRepo:    'https://github.com/hexalis/design-system',
  dsStorybook: 'https://hexalis.github.io/design-system/',
  opsRepo:   '',
  spaceApps: 'https://milanko.hexalis.org/app/',
  contact:   ''
};
/* Datos en vivo. Todo es opcional: si un servicio no responde, la página usa su contenido estático. */
const LIVE = {
  presenceUrl: '',                   // WebSocket de presencia (p. ej. una sala de PartyKit). Vacío: solo entre pestañas del mismo navegador
  github: { org: 'hexalis', repos: [] } // repos públicos para el muro de contribuidores, p. ej. ['design-system']
};
/* Cada integrante es un cursor y una celda del panal (paleta dataviz del Design System).
   La ficha habla de la persona, no de los proyectos. Todo lo que quede vacío ('' o []) no se muestra.
   - role: disciplina · bio: una frase en primera persona, escrita por la persona
   - skills: 3 a 5 habilidades · talk: temas de los que se le puede escribir · city: ciudad
   Fuentes actuales: propuesta de Milanko (rol y LinkedIn), perfiles públicos de GitHub (bio, ciudad) y los créditos de las librerías. */
const TEAM = [
  /* links: github (usuario, también da la foto), linkedin y portfolio (URL completas) */
  { name: 'Jorge Alberto Ramos Tellez', cursor: 'Jorge', role: tr('Diseño de producto e ingeniería de diseño · líder del equipo', 'Product design and design engineering · team lead'),
    bio: tr('Diseño productos de principio a fin y uso IA y código para hacerlos realidad.', 'I design products end to end and use AI and code to make them real.'), city: '',
    skills: [tr('Diseño de producto y UI/UX', 'Product design and UI/UX'), tr('Sistemas de diseño y DesignOps', 'Design systems and DesignOps'), tr('Investigación UX', 'UX research'), tr('IA e ingeniería de diseño', 'AI and design engineering'), 'Figma'],
    talk: [tr('sistemas de diseño agénticos', 'agentic design systems'), tr('diseño a código', 'design-to-code'), tr('interacción humano-computadora', 'human-computer interaction')],
    initials: 'JR', color: '#3987E5', ink: '#0D121D', links: { github: 'JorgeRamos-UX', linkedin: 'https://www.linkedin.com/in/jorge-ramos-tellez/', portfolio: 'https://github.com/JorgeRamos-UX/Portafolio-UX' } },
  { name: 'Roger Fernando Guido Cisneros', cursor: 'Roger', role: tr('Desarrollo de software', 'Software development'),
    bio: '', city: '',
    skills: [tr('Ingeniería electrónica', 'Electronic engineering'), tr('Desarrollo web', 'Web development'), 'Astro'], talk: [],
    initials: 'RG', color: '#9085E9', ink: '#0D121D', links: { github: 'RogerG03', linkedin: 'https://www.linkedin.com/in/roger-0113-guido/', portfolio: '' } },
  { name: 'Anthony Alexander Aguilar Parrales', cursor: 'Anthony', role: tr('Investigación de producto', 'Product research'),
    bio: '', city: '',
    skills: [], talk: [],
    initials: 'AA', color: '#1BAF7A', ink: '#0D121D', links: { github: '', linkedin: 'https://www.linkedin.com/in/anthony-alexander-aguilar-parrales-755447267/', portfolio: '' } },
  { name: 'Carlos Andrés Perez Ubeda', cursor: 'Carlos', role: tr('Ingeniería de software', 'Software engineering'),
    bio: '', city: 'Jalapa, Nueva Segovia',
    skills: [tr('Desarrollo web', 'Web development'), 'Frontend', 'TypeScript'], talk: [],
    initials: 'CU', color: '#EDA100', ink: '#0D121D', links: { github: 'cswni', linkedin: 'https://www.linkedin.com/in/cswni/', portfolio: '' } },
  { name: 'Marlon José Baltodano Delgadillo', cursor: 'Marlon', role: tr('Ingeniería de software', 'Software engineering'),
    bio: tr('Construyo sistemas robustos y escalables, y me muevo por todo el stack.', 'I build robust, scalable systems and work across the whole stack.'), city: '',
    skills: ['Backend', tr('Bases de datos', 'Databases'), tr('Integraciones', 'Integrations'), 'Frontend'], talk: [],
    initials: 'MB', color: '#E87BA4', ink: '#0D121D', links: { github: 'marlonbaltodano11', linkedin: 'https://www.linkedin.com/in/marlon-baltodano/', portfolio: '' } },
  { name: 'Francelia Michell López Alonzo', cursor: 'Michelle', role: tr('Desarrollo de software', 'Software development'),
    bio: '', city: '',
    skills: ['HTML', 'CSS', 'C#', 'Git'], talk: [],
    initials: 'FL', color: '#EB6834', ink: '#0D121D', links: { github: 'FranceMLopez', linkedin: 'https://www.linkedin.com/in/francelia-l%C3%B3pez-97b706339/', portfolio: '' } }
];
const PALETTES = {
  espectral: ['Espectral', '#7A9FEB', '#4064C6', '#2E4383', '#4064C6', '#6B5BD6'],
  laguna:    ['Laguna',    '#4AA8F0', '#0B6FB3', '#062F52', '#0B6FB3', '#15A3A6'],
  aurora:    ['Aurora',    '#2BB8A3', '#0C7A6C', '#073F3B', '#0F8A7A', '#5B6FD6'],
  ciruela:   ['Ciruela',   '#B07CF2', '#8A3FD1', '#331A68', '#7A3FD0', '#D4547E'],
  magma:     ['Magma',     '#FF7A52', '#C2401F', '#3A1310', '#B8361D', '#F08C2E'],
  campo:     ['Campo',     '#8FB0FF', '#1B47B8', '#0D1A3D', '#1B47B8', '#1B47B8'],
  opalo:     ['Ópalo',     '#B5AEF1', '#5146CB', '#2F2B6D', '#5146CB', '#9389E8'],
  arcilla:   ['Arcilla',   '#9FE0BF', '#1F8455', '#23305A', '#1F8455', '#9FE0BF']
};


/* =========================================================
   SOLO DESARROLLO — datos extremos para probar la interfaz (break-ui).
   Se activa únicamente en localhost con ?data=worst | one | empty.
   ========================================================= */
const DEV_DATA = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) ? new URLSearchParams(location.search).get('data') : null;
if (DEV_DATA === 'worst') TEAM.splice(0, TEAM.length,
  { name: 'Aleksandra Wiśniewska-Kowalczyk', cursor: 'Aleksandra W.', role: 'Ingeniera de accesibilidad y sistemas de diseño multiplataforma · Design System, Design Ops Toolkit y Space Apps', city: 'San Juan de Limay, Estelí', bio: 'Diseño interfaces que funcionan con lector de pantalla, teclado, voz y cualquier combinación que se te ocurra, en cualquier tamaño de pantalla.', skills: ['Accesibilidad', 'Sistemas de diseño multiplataforma', 'Investigación con personas usuarias', 'Internacionalización (i18n)', 'Figma'], talk: ['WCAG 2.2', 'tokens de diseño', 'lectores de pantalla', 'documentación técnica bilingüe'], initials: 'AW', color: '#3987E5', ink: '#0D121D' },
  { name: 'Jo', cursor: 'Jo', role: '', initials: 'J', color: '#9085E9', ink: '#0D121D' },
  { name: 'José Ángel Hernández Montgomery III', cursor: 'Investigación de usuarios', role: 'Research', initials: 'JH', color: '#1BAF7A', ink: '#0D121D' },
  { name: 'Nguyễn Thị Thu Hương', cursor: 'Hương', role: 'Documentación técnica', initials: 'NH', color: '#EDA100', ink: '#0D121D' },
  { name: 'bartholomew.fitzgerald@northwind-industries-holdings.example.com', cursor: 'Bartholomew', role: 'Comunidad', initials: '', color: '#E87BA4', ink: '#0D121D' },
  { name: 'Camila Pérez', cursor: 'Camila', role: 'Frontend', initials: 'CP', color: '#EB6834', ink: '#0D121D' });
if (DEV_DATA === 'one' || DEV_DATA === 'empty') TEAM.splice(1);
/* en inglés: disciplinas y roles traducidos (los nombres propios no cambian) */
if (LANG === 'en') TEAM.forEach(m => {
  m.cursor = ({ Datos: 'Data', Comunidad: 'Community', 'Investigación': 'Research' })[m.cursor] || m.cursor;
  m.role = m.role.replace(' y ', ' and ').replace('Rol por confirmar', 'Role to be confirmed');
});

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
/* iniciales por grafemas (tildes y emoji incluidos), con respaldo si faltan */
const graphemes = t => Intl.Segmenter ? [...new Intl.Segmenter('es', { granularity: 'grapheme' }).segment(t)].map(x => x.segment) : [...t];
const initialsOf = m => m.initials || (w => (graphemes(w[0] || '?')[0] + (w.length > 1 ? graphemes(w[w.length - 1])[0] : '')).toUpperCase())(m.name.split(/[\s.@_-]+/).filter(Boolean));
/* avatar pequeño: mismas iniciales que el resto del portal, texto escapado */
const faceHTML = m => {
  const e = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  return `<i style="--c:${m.color};--ink:${m.ink}" title="${e(m.cursor)}">${e(initialsOf({ ...m, name: m.name || m.cursor || '?' }))}</i>`;
};
const clamp01 = v => Math.min(1, Math.max(0, v));

/* ---------- Enlaces ---------- */
$$('[data-link]').forEach(a => {
  const url = LINKS[a.dataset.link];
  if (url) { a.href = url; if (/^https?:/.test(url)) { a.target = '_blank'; a.rel = 'noopener'; } }
  else { (a.parentElement.tagName === 'LI' ? a.parentElement : a).hidden = true; }
});

/* ---------- Equipo ---------- */
['#heroFaces', '#chFaces', '#pgFaces'].forEach(id => { $(id).innerHTML = TEAM.map(faceHTML).join(''); });
$('#liveCount').textContent = tr(`${TEAM.length} en el equipo`, `${TEAM.length} on the team`);
/* los textos que cuentan personas siguen a los datos */
$('#pgTeamCount').textContent = TEAM.length === 1 ? tr('1 integrante', '1 member') : tr(`${TEAM.length} integrantes`, `${TEAM.length} members`);
{ const W = tr(['Ninguna persona', 'Una persona', 'Dos personas', 'Tres personas', 'Cuatro personas', 'Cinco personas', 'Seis personas', 'Siete personas', 'Ocho personas'], ['No one', 'One person', 'Two people', 'Three people', 'Four people', 'Five people', 'Six people', 'Seven people', 'Eight people']);
  const h = $('#ch1Title'); if (h && TEAM.length !== 6) h.textContent = `${W[TEAM.length] || TEAM.length + tr(' personas', ' people')}${tr(', un mismo panal', ', one hive')}`; }
/* La celda Hexalis en SVG: hexágono de punta arriba con cada vértice suavizado (t = largo del corte) */
function hexD(cx, cy, R, t = R * .156) {
  const V = Array.from({ length: 6 }, (_, k) => [cx + R * Math.cos(-Math.PI / 2 + k * Math.PI / 3), cy + R * Math.sin(-Math.PI / 2 + k * Math.PI / 3)]);
  const mv = (P, Q) => { const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]); return [P[0] + (Q[0] - P[0]) / d * t, P[1] + (Q[1] - P[1]) / d * t]; };
  const f = v => v[0].toFixed(1) + ' ' + v[1].toFixed(1);
  const c = V.map((P, i) => [mv(P, V[(i + 5) % 6]), P, mv(P, V[(i + 1) % 6])]);
  return 'M' + f(c[0][2]) + [...c.slice(1), c[0]].map(([a, P, b]) => ` L${f(a)} Q${f(P)} ${f(b)}`).join('') + 'Z';
}
/* Prisma: sombra de contacto, canto, cara, brillo, placa y filo de luz. Lo usan el equipo y el cierre. */
function prism(cx, cy, R, depth) {
  return `<ellipse class="shadow" cx="${cx}" cy="${(cy + R * .86 + depth).toFixed(1)}" rx="${(R * .82).toFixed(1)}" ry="${(R * .16).toFixed(1)}" fill="url(#hxShadow)"/>` +
    `<path class="side" d="${hexD(cx, cy + depth, R)}"/><path class="top" d="${hexD(cx, cy, R)}"/>` +
    `<path class="sheen" d="${hexD(cx, cy, R)}" fill="url(#hxSheen)"/><path class="plate" d="${hexD(cx, cy, R * .62)}"/>` +
    `<path class="rim" d="${hexD(cx, cy, R - .6)}" fill="none" stroke="url(#hxRim)" stroke-width="1.2"/>`;
}
const HEX = 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)';
const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const CELL = `<svg class="cell" viewBox="0 0 104 129">${prism(52, 60, 58, 9)}</svg>`;
/* el panal: seis celdas alrededor de la libre; las que aún no tienen perfil muestran su disciplina */
const RING = [[-.5, -1], [.5, -1], [1, 0], [.5, 1], [-.5, 1], [-1, 0]];
const SLOT_HEX = `<svg viewBox="0 0 104 129"><path class="slot-line" d="${hexD(52, 60, 56)}"/></svg>`;
const HIVE = TEAM.slice(0, 6).map(m => m.tbd
  ? { tag: m.cursor, name: tr('Perfil en camino', 'Profile on its way'), role: tr('Su nombre y su trabajo se publican cuando estén listos.', 'Their name and work will be published when ready.'), m }
  : { tag: m.cursor, name: m.name, role: [m.role, m.city].filter(Boolean).join(' · '), m });
/* la celda libre es la protagonista: le habla a quien visita y le da tres formas concretas de entrar */
HIVE.push({ tag: tr('Tú', 'You'), name: tr('Esta celda es tuya', 'This cell is yours'), role: tr('Al panal le falta una persona para estar completo.', 'The hive is one person short of complete.'), note: tr('Hay tres formas de empezar:', 'There are three ways to start:'), slot: true,
  ways: [
    ['ds', tr('Diseña', 'Design'), tr('Usa las librerías en Figma y propón componentes o mejoras.', 'Use the libraries in Figma and propose components or improvements.')],
    ['ops', tr('Programa', 'Code'), tr('Aporta variables, componentes y proyectos en GitHub.', 'Contribute variables, components and projects on GitHub.')],
    ['org', tr('Trae una idea', 'Bring an idea'), tr('Cuéntanos qué problema quieres resolver y lo construimos juntos.', 'Tell us the problem you want to solve and we will build it together.')]
  ] });
$('#team').innerHTML = RING.map(([x, y], i) => {
  const it = HIVE[i];
  if (!it || it.slot) return `<span class="member empty" style="--x:${x};--y:${y}" aria-hidden="true"><span class="avatar">${SLOT_HEX}</span></span>`;
  const m = it.m;
  return `<button class="member${m.tbd ? ' tbd' : ''}${x > 0 ? ' r' : ''}" type="button" data-i="${i}" style="--x:${x};--y:${y};--c:${m.color};--ink:${m.ink}" aria-pressed="false" aria-controls="teamCard" aria-label="${esc(it.name)}, ${esc(it.role)}">
    <span class="avatar" aria-hidden="true">${CELL}<b>${esc(initialsOf(m))}</b></span>
    <span class="cur" aria-hidden="true"><svg><use href="#arrow"/></svg><b>${esc(it.tag)}</b></span></button>`;
}).join('') + `<button class="member slot" type="button" data-i="${HIVE.length - 1}" style="--x:0;--y:0;--c:var(--accent);--ink:var(--on-accent)" aria-pressed="false" aria-controls="teamCard" aria-label="${tr('Tu lugar, la séptima celda', 'Your place, the seventh cell')}">
    <span class="avatar" aria-hidden="true">${SLOT_HEX}<b>+</b></span>
    <span class="cur" aria-hidden="true"><svg><use href="#arrow"/></svg><b>${tr('Tú', 'You')}</b></span></button>`;
const teamCard = $('#teamCard'), hiveBtns = [...$$('#team button.member')];
/* la ficha abre en la celda libre: lo primero que se lee es la invitación */
let hiveShown = -1, hivePinned = HIVE.length - 1;
function showMember(i, animate) {
  if (i === hiveShown || !HIVE[i]) return;
  hiveShown = i;
  const it = HIVE[i], c = it.slot ? 'var(--accent)' : it.m.color, ink = it.slot ? 'var(--on-accent)' : it.m.ink;
  hiveBtns.forEach(b => { const on = +b.dataset.i === i; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
  const P = (!it.slot && it.m) || {};
  const L = P.links || {}, gh = (L.github || '').replace(/^@/, '');
  const links = [gh && ['https://github.com/' + encodeURIComponent(gh), 'GitHub'], L.linkedin && [L.linkedin, 'LinkedIn'], L.portfolio && [L.portfolio, tr('Portafolio', 'Portfolio')]].filter(Boolean)
    .map(([u, t], k) => `<a class="btn ${k === 0 ? 'btn-primary' : 'btn-ghost'}" href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`).join('');
  const face = it.slot ? '' : `<span class="hc-face" style="--c:${c};--ink:${ink}" aria-hidden="true">${gh ? `<img src="https://avatars.githubusercontent.com/${encodeURIComponent(gh)}?s=160" alt="" loading="lazy" width="64" height="64">` : esc(initialsOf(it.m))}</span>`;
  teamCard.innerHTML = `<div class="hc-head">${face}<div><span class="hc-tag" style="--c:${c};--ink:${ink}">${esc(it.tag)}</span><h3>${esc(it.name)}</h3></div></div>${it.role ? `<p class="hc-role">${esc(it.role)}</p>` : ''}${it.note ? `<p class="hc-note">${esc(it.note)}</p>` : ''}${P.bio ? `<p class="hc-bio">${esc(P.bio)}</p>` : ''}${P.skills && P.skills.length ? `<ul class="hc-skills" style="--c:${c}" aria-label="${tr('Habilidades', 'Skills')}">${P.skills.map(k => `<li>${esc(k)}</li>`).join('')}</ul>` : ''}${P.talk && P.talk.length ? `<p class="hc-talk"><strong>${tr('Háblame de:', 'Talk to me about:')}</strong> ${esc(P.talk.join(', '))}</p>` : ''}${links ? `<div class="hc-links">${links}</div>` : ''}${it.ways ? `<ul class="hc-ways">${it.ways.map(([k, t, d]) => `<li class="${k}"><strong>${esc(t)}</strong> <span>${esc(d)}</span></li>`).join('')}</ul>` : ''}${it.slot ? `<a class="btn btn-primary" href="#sumate">${tr('Elegir cómo participar', 'Choose how to take part')} <span class="arr" aria-hidden="true">→</span></a>` : ''}`;
  $('#team').classList.toggle('has-on', true);
  /* cambio de ficha: un relevo corto, no una entrada */
  if (animate) teamCard.animate([{ opacity: .4, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 200, easing: 'cubic-bezier(.23, 1, .32, 1)' });
}
hiveBtns.forEach(b => {
  const i = +b.dataset.i;
  b.addEventListener('click', () => { hivePinned = i; showMember(i, !still()); });
  b.addEventListener('focus', () => { hivePinned = i; showMember(i, !still()); });
  if (finePointer) b.addEventListener('pointerenter', () => showMember(i, !still()));
});
if (finePointer) $('#team').addEventListener('pointerleave', () => showMember(hivePinned, !still()));
/* con teclado, las flechas recorren las celdas (el foco ya abre su ficha) */
$('#team').addEventListener('keydown', e => {
  const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return;
  const at = hiveBtns.indexOf(document.activeElement); if (at < 0) return;
  e.preventDefault(); hiveBtns[(at + k + hiveBtns.length) % hiveBtns.length].focus();
});
showMember(hivePinned, false);

/* en Mac el atajo es ⌘ K */
if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) $$('kbd').forEach(k => { k.textContent = k.textContent.replace('Ctrl', '⌘'); });

/* respaldo sin WebGL: siete celdas con las paletas de marca */
(function fallbackArt() {
  const svg = $('#stageFallback'); if (!svg) return;
  const s = 62, w = Math.sqrt(3) * s, P = [[0, 0], [w, 0], [-w, 0], [w / 2, 1.5 * s], [-w / 2, 1.5 * s], [w / 2, -1.5 * s], [-w / 2, -1.5 * s]];
  const C = ['--p300', '--p600', '--h1', '--ops', '--h3', '--h1', '--p600'];
  svg.innerHTML = P.map(([x, y], i) => `<g class="c" style="--c:var(${C[i]})">${prism(260 + x, 270 + y, s - 4, 11)}</g>`).join('');
})();

/* ---------- Movimiento: preferencia del sistema + control «Pausar movimiento» ---------- */
let motionPaused = false;
try { motionPaused = localStorage.getItem('hx-motion') === 'paused'; } catch (_) {}
const still = () => reduceMotion || motionPaused;
const motionBtn = $('#motionBtn');
function setMotion(paused) {
  motionPaused = paused;
  root.dataset.motion = paused ? 'paused' : 'on';
  motionBtn.setAttribute('aria-pressed', String(paused));
  motionBtn.querySelector('span').textContent = paused ? tr('Reanudar movimiento', 'Resume motion') : tr('Pausar movimiento', 'Pause motion');
  try { localStorage.setItem('hx-motion', paused ? 'paused' : 'on'); } catch (_) {}
  document.dispatchEvent(new CustomEvent('hx:motion'));
}
setMotion(motionPaused);
motionBtn.addEventListener('click', () => { setMotion(!motionPaused); if (typeof requestScrollFrame === 'function') requestScrollFrame(); });
if (reduceMotion) motionBtn.hidden = true;

/* ---------- Paletas y playground ---------- */
const pg = { palette: 'espectral', theme: 'dark', style: 'neutral' };
/* Pasos de la prueba: se completan con lo que hace quien visita (o el guía) */
const stepsDone = new Set();
function markStep(k) {
  if (!document.getElementById('pgSteps')) return;
  stepsDone.add(k); const li = $(`#pgSteps [data-step="${k}"]`); if (li) li.classList.add('done');
  if (!window.__pgDemo && stepsDone.size === 3 && !markStep.done) {
    markStep.done = true;
    $('#pgTurn').innerHTML = tr('<strong>Listo.</strong> Así se ve tu marca con Hexalis: lo que cambiaste son variables que puedes llevar a tu código.', '<strong>Done.</strong> This is your brand with Hexalis: what you changed are variables you can take to your code.');
    $('#pgSteps').setAttribute('aria-label', tr('Tres pasos completados', 'Three steps completed'));
    /* un momento poco frecuente: las placas se encienden en cascada y el escenario destella una vez */
    if (!still()) {
      $$('#pgSteps li').forEach((li, i) => li.animate([{ transform: 'none' }, { transform: 'translateY(-3px)' }, { transform: 'none' }], { duration: 420, delay: i * 80, easing: 'cubic-bezier(.23, 1, .32, 1)' }));
      $('#stage').classList.add('celebrate'); setTimeout(() => $('#stage').classList.remove('celebrate'), 950);
    }
  }
}
function setPalette(key) {
  const p = PALETTES[key]; if (!p) return;
  pg.palette = key;
  [['--p300', p[1]], ['--p600', p[2]], ['--h1', p[3]], ['--h2', p[4]], ['--h3', p[5]]].forEach(([k, v]) => root.style.setProperty(k, v));
  $$('#swatches .swatch').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.key === key)));
  $('#pgPalName').textContent = p[0];
  document.dispatchEvent(new CustomEvent('hx:colors'));
}
$('#swatches').innerHTML = Object.entries(PALETTES).map(([k, p]) =>
  `<button class="swatch" type="button" data-key="${k}" aria-pressed="false" aria-label="${p[0]}" title="${p[0]}"><i><b style="background:${p[3]}"></b><b style="background:${p[4]}"></b><b style="background:${p[1]}"></b></i></button>`).join('');
/* al cambiar de paleta la página funde los colores en 200 ms en vez de saltar (View Transitions: una captura, sin recalcular cada elemento) */
function swapPalette(key) {
  if (!document.startViewTransition || still() || key === pg.palette) { setPalette(key); return; }
  root.classList.add('vt-fade');
  document.startViewTransition(() => setPalette(key)).finished.finally(() => root.classList.remove('vt-fade'));
}
$('#swatches').addEventListener('click', e => { const b = e.target.closest('.swatch'); if (b) { swapPalette(b.dataset.key); markStep('palette'); } });
setPalette('espectral');

const stage = $('#stage');
function segControl(id, key, attr) {
  const box = $(id);
  box.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const btns = [...box.querySelectorAll('button')];
    btns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    box.dataset.v = btns.indexOf(b);
    pg[key] = b.dataset.v; stage.setAttribute(attr, b.dataset.v);
  });
}
segControl('#stageTheme', 'theme', 'data-stage');
segControl('#stageStyle', 'style', 'data-style');
let toastTimer = 0;
stage.addEventListener('click', e => {
  const opt = e.target.closest('.s-opt');
  if (!opt) return;
  const on = opt.getAttribute('aria-checked') !== 'true';
  opt.setAttribute('aria-checked', String(on));
  /* visión segura rojo-verde del Design System (data-vision="cvd"): ok pasa a azul, error a naranja, info a pizarra */
  if (opt.id === 'pgVision') { if (on) stage.dataset.vision = 'cvd'; else delete stage.dataset.vision; }
});
stage.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && e.target.classList.contains('s-opt')) { e.preventDefault(); e.target.click(); } });
/* ---------- Acciones rápidas: cada pieza se cambia, se añade o se edita en el sitio ---------- */
const EASE_OUT = 'cubic-bezier(.23, 1, .32, 1)';
const enter = el => { if (!still()) el.animate([{ opacity: 0, transform: 'scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 180, easing: EASE_OUT }); };
const leave = el => {
  el.classList.add('gone');
  if (still()) { el.remove(); return; }
  el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.95)' }], { duration: 150, easing: EASE_OUT }).finished.then(() => el.remove());
};
const swapText = (el, text) => { el.textContent = text; if (!still()) el.animate([{ opacity: .2, transform: 'translateY(3px)' }, { opacity: 1, transform: 'none' }], { duration: 180, easing: EASE_OUT }); };
const chipVal = (btn, text) => swapText(btn.querySelector('b'), text);
const cycle = (el, list) => { const i = (Number(el.dataset.i || 0) + 1) % list.length; el.dataset.i = i; return list[i]; };

const BTN_STATES = [['default', tr('Normal', 'Default')], ['loading', tr('Cargando', 'Loading')], ['disabled', tr('Desactivado', 'Disabled')]];
const FIELD_STATES = [
  ['default', tr('Normal', 'Default'), tr('Campo de ejemplo con su estado de foco.', 'Sample field with its focus state.')],
  ['error', 'Error', tr('Revisa el formato: falta la @.', 'Check the format: the @ is missing.')],
  ['disabled', tr('Desactivado', 'Disabled'), tr('Este campo no se puede editar ahora.', 'This field cannot be edited right now.')]];
const CARD_STATES = [['warn', tr('Prototipo', 'Prototype')], ['ok', tr('En vivo', 'Live')], ['info', tr('Archivado', 'Archived')]];
const NEW_BADGES = [['info', tr('Revisión', 'Review')], ['ok', tr('Aprobado', 'Approved')], ['warn', tr('Beta', 'Beta')]];
const NEW_OPTS = [tr('Notificaciones por correo', 'Email notifications'), tr('Movimiento reducido', 'Reduced motion')];
const ADD_BADGE = tr('+ Insignia', '+ Badge'), ADD_OPT = tr('+ Opción', '+ Option'), RESET = tr('Reiniciar', 'Reset');
$$('#pgChart i').forEach((b, i) => b.style.setProperty('--n', i));

stage.addEventListener('click', e => {
  const act = e.target.closest('.s-act'); if (!act) return;
  const tile = act.closest('.s-tile');
  switch (act.dataset.act) {
    case 'state': {
      const [k, label] = cycle(act, BTN_STATES); chipVal(act, label);
      tile.dataset.state = k;
      tile.querySelectorAll('.s-row .s-btn').forEach(b => { b.disabled = k === 'disabled'; });
      tile.querySelector('.s-btn.primary').setAttribute('aria-busy', String(k === 'loading'));
      break;
    }
    case 'field': {
      const [k, label, help] = cycle(act, FIELD_STATES); chipVal(act, label);
      const f = tile.querySelector('.s-field'), input = f.querySelector('.s-input');
      f.dataset.state = k; input.disabled = k === 'disabled';
      input.setAttribute('aria-invalid', String(k === 'error')); input.setAttribute('aria-describedby', 'pgEmailHelp');
      if (k === 'error' && !input.value) input.value = tr('nombre.correo.com', 'name.email.com');
      if (k === 'default' && /\.correo\.com$|\.email\.com$/.test(input.value)) input.value = '';
      swapText($('#pgEmailHelp'), help);
      break;
    }
    case 'badge': {
      const row = tile.querySelector('.s-row'), added = row.querySelectorAll('button.s-badge:not(.gone)');
      if (added.length >= NEW_BADGES.length) { added.forEach(leave); chipVal(act, ADD_BADGE); break; }
      const [tone, text] = NEW_BADGES[added.length];
      const b = document.createElement('button'); b.type = 'button'; b.className = `s-badge ${tone}`; b.textContent = text;
      b.setAttribute('aria-label', tr(`Quitar insignia ${text}`, `Remove badge ${text}`));
      row.appendChild(b); enter(b);
      if (added.length + 1 >= NEW_BADGES.length) chipVal(act, RESET);
      break;
    }
    case 'option': {
      const added = tile.querySelectorAll('.s-opt.added:not(.gone)');
      if (added.length >= NEW_OPTS.length) { added.forEach(leave); chipVal(act, ADD_OPT); break; }
      const o = document.createElement('div'); o.className = 's-opt added'; o.setAttribute('role', 'checkbox'); o.tabIndex = 0; o.setAttribute('aria-checked', 'false');
      o.innerHTML = '<span class="s-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></span>';
      o.append(NEW_OPTS[added.length]); tile.appendChild(o); enter(o);
      if (added.length + 1 >= NEW_OPTS.length) chipVal(act, RESET);
      break;
    }
    case 'status': {
      const [tone, label] = cycle(act, CARD_STATES); chipVal(act, label);
      const b = $('#pgCardStatus'); b.className = `s-badge ${tone}`; swapText(b, label);
      break;
    }
    case 'data': {
      const chart = $('#pgChart'); chart.classList.add('live');
      chart.querySelectorAll('i').forEach(b => b.style.setProperty('--v', (.25 + Math.random() * .73).toFixed(2)));
      break;
    }
  }
});
/* las insignias añadidas se quitan con un toque */
stage.addEventListener('click', e => {
  const b = e.target.closest('button.s-badge'); if (!b || b.classList.contains('gone')) return;
  const tile = b.closest('.s-tile'); leave(b); chipVal(tile.querySelector('.s-act'), ADD_BADGE);
});

/* edición de textos en el sitio: doble clic o F2; Enter o salir guarda, Escape deshace */
function editText(el) {
  if (el.isContentEditable) return;
  const before = el.textContent;
  el.contentEditable = 'true'; el.spellcheck = false; el.focus();
  const sel = getSelection(), r = document.createRange(); r.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(r);
  const done = keep => {
    el.removeEventListener('keydown', onKey); el.removeEventListener('blur', onBlur);
    el.contentEditable = 'false'; el.removeAttribute('contenteditable');
    const t = el.textContent.replace(/\s+/g, ' ').trim();
    el.textContent = keep && t ? t.slice(0, 40) : before;
  };
  const onKey = e => {
    e.stopPropagation();
    if (e.key === 'Enter') { e.preventDefault(); done(true); el.focus(); }
    else if (e.key === 'Escape') { e.preventDefault(); done(false); el.focus(); }
  };
  const onBlur = () => done(true);
  el.addEventListener('keydown', onKey); el.addEventListener('blur', onBlur);
}
stage.addEventListener('dblclick', e => { const el = e.target.closest('[data-edit]'); if (el) { e.preventDefault(); editText(el); } });
stage.addEventListener('keydown', e => { if (e.key === 'F2' && e.target.matches('[data-edit]')) { e.preventDefault(); editText(e.target); } });
/* un botón en edición no se pulsa: el Espacio escribe un espacio */
stage.addEventListener('keyup', e => { if (e.target.isContentEditable) e.preventDefault(); }, true);
stage.addEventListener('click', e => { if (e.target.closest('[contenteditable="true"]')) e.preventDefault(); }, true);
$('#pgPublish').addEventListener('click', () => {
  const t = $('#pgToast'); t.classList.add('pop'); markStep('publish');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('pop'), 2600);
});

/* ---------- El lienzo: las piezas se mueven con puntero, toque o teclado ---------- */
const canvas = $('#pgCanvas'), pgLive = $('#pgLive');
const tiles = () => [...canvas.children];
const announce = t => { pgLive.textContent = tr(`${t.dataset.name}, posición ${tiles().indexOf(t) + 1} de ${tiles().length}.`, `${t.dataset.name}, position ${tiles().indexOf(t) + 1} of ${tiles().length}.`); };
/* FLIP: se mide antes y después del cambio y cada pieza viaja desde donde se veía (interrumpible) */
function flip(mutate, skip) {
  const els = tiles(), first = new Map(els.map(el => [el, el.getBoundingClientRect()]));
  mutate();
  els.forEach(el => {
    if (el === skip) return;
    const a = first.get(el); el.getAnimations().forEach(x => x.cancel());
    const b = el.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top;
    if ((dx || dy) && !still()) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 280, easing: 'cubic-bezier(.23, 1, .32, 1)' });
  });
}
function moveTile(t, to, skip) {
  const list = tiles(), from = list.indexOf(t);
  to = Math.max(0, Math.min(list.length - 1, to)); if (to === from) return false;
  flip(() => { const ref = list[to]; if (to > from) ref.after(t); else ref.before(t); }, skip);
  return true;
}
let drag = null, kb = null, scrollRaf = 0;
/* el hueco donde caerá la pieza: un contorno que la sigue de lugar en lugar */
const dropSlot = document.createElement('div'); dropSlot.className = 's-drop'; dropSlot.setAttribute('aria-hidden', 'true'); stage.appendChild(dropSlot);
function placeSlot(t, instant) {
  dropSlot.classList.toggle('instant', !!instant);
  dropSlot.style.width = t.offsetWidth + 'px'; dropSlot.style.height = t.offsetHeight + 'px';
  dropSlot.style.transform = `translate(${t.offsetLeft}px, ${t.offsetTop}px)`;
}
/* posición de cada pieza según la rejilla, sin contar las animaciones en curso: así no hay intercambios dobles */
const layoutRect = (o, par) => ({ left: par.left + o.offsetLeft, top: par.top + o.offsetTop, right: par.left + o.offsetLeft + o.offsetWidth, bottom: par.top + o.offsetTop + o.offsetHeight, width: o.offsetWidth, height: o.offsetHeight });
function placeDrag() {
  const { t, gx, gy, x, y } = drag, par = t.offsetParent.getBoundingClientRect();
  t.style.transform = `translate(${x - gx - (par.left + t.offsetLeft)}px, ${y - gy - (par.top + t.offsetTop)}px) scale(1.02)`;
}
function autoScroll() {
  scrollRaf = requestAnimationFrame(() => {
    if (!drag) return;
    const edge = 90, y = drag.y, v = y < edge ? -(edge - y) / 6 : y > innerHeight - edge ? (y - innerHeight + edge) / 6 : 0;
    if (v) { scrollBy({ top: v, behavior: 'instant' }); placeDrag(); } /* el arrastre desplaza la página al instante, sin suavizado */
    autoScroll();
  });
}
canvas.addEventListener('pointerdown', e => {
  const grip = e.target.closest('.s-grip'); if (!grip || e.button > 0 || kb) return;
  e.preventDefault();
  const t = grip.closest('.s-tile'), par = t.offsetParent.getBoundingClientRect();
  t.getAnimations().forEach(a => a.cancel());
  drag = { t, id: e.pointerId, gx: e.clientX - (par.left + t.offsetLeft), gy: e.clientY - (par.top + t.offsetTop), x: e.clientX, y: e.clientY, from: tiles().indexOf(t) };
  grip.setPointerCapture(e.pointerId);
  t.classList.add('lifted'); document.body.classList.add('pg-dragging');
  placeSlot(t, true); stage.classList.add('dragging');
  placeDrag(); autoScroll();
});
canvas.addEventListener('pointermove', e => {
  if (!drag || e.pointerId !== drag.id) return;
  drag.x = e.clientX; drag.y = e.clientY;
  /* cambia de lugar solo cuando el puntero entra en la zona central de otra pieza: sin parpadeos en los bordes */
  const par = drag.t.offsetParent.getBoundingClientRect();
  const over = tiles().find(o => { if (o === drag.t) return false; const r = layoutRect(o, par), mx = r.width * .2, my = r.height * .2; return e.clientX > r.left + mx && e.clientX < r.right - mx && e.clientY > r.top + my && e.clientY < r.bottom - my; });
  /* tras un cambio, la pieza desplazada no vuelve a cambiar hasta que el puntero sale de ella */
  if (over && over !== drag.last) { drag.last = over; if (moveTile(drag.t, tiles().indexOf(over), drag.t)) placeSlot(drag.t); }
  else if (!over) drag.last = null;
  placeDrag();
});
function drop(cancel) {
  if (!drag) return;
  const { t, from } = drag; drag = null; cancelAnimationFrame(scrollRaf);
  if (cancel) moveTile(t, from, t);
  const a = t.getBoundingClientRect();
  t.style.transform = ''; t.classList.remove('lifted'); document.body.classList.remove('pg-dragging'); stage.classList.remove('dragging');
  const b = t.getBoundingClientRect(), dx = a.left + a.width / 2 - (b.left + b.width / 2), dy = a.top + a.height / 2 - (b.top + b.height / 2);
  /* al soltar, la pieza se asienta en su lugar */
  if (!still() && (dx || dy)) t.animate([{ transform: `translate(${dx}px, ${dy}px) scale(1.02)` }, { transform: 'none' }], { duration: 200, easing: 'cubic-bezier(.23, 1, .32, 1)' });
  if (tiles().indexOf(t) !== from) markStep('move');
  announce(t);
}
canvas.addEventListener('pointerup', e => { if (drag && e.pointerId === drag.id) drop(false); });
canvas.addEventListener('pointercancel', e => { if (drag && e.pointerId === drag.id) drop(true); });
canvas.addEventListener('keydown', e => {
  const grip = e.target.closest('.s-grip'); if (!grip) return;
  const t = grip.closest('.s-tile'), on = grip.getAttribute('aria-pressed') === 'true';
  const release = () => { grip.setAttribute('aria-pressed', 'false'); t.classList.remove('lifted'); kb = null; };
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (!on) { kb = { t, from: tiles().indexOf(t) }; grip.setAttribute('aria-pressed', 'true'); t.classList.add('lifted'); pgLive.textContent = tr(`${t.dataset.name} tomada. Usa las flechas para moverla.`, `${t.dataset.name} picked up. Use the arrow keys to move it.`); }
    else { if (tiles().indexOf(t) !== kb.from) markStep('move'); release(); pgLive.textContent = tr(`${t.dataset.name} soltada en la posición ${tiles().indexOf(t) + 1} de ${tiles().length}.`, `${t.dataset.name} dropped at position ${tiles().indexOf(t) + 1} of ${tiles().length}.`); }
    return;
  }
  if (!on) return;
  const d = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[e.key];
  if (d) { e.preventDefault(); if (moveTile(t, tiles().indexOf(t) + d)) { grip.focus(); announce(t); } }
  else if (e.key === 'Escape') { e.preventDefault(); moveTile(t, kb.from); grip.focus(); release(); pgLive.textContent = tr('Movimiento cancelado.', 'Move cancelled.'); }
});
/* si el foco sale del lienzo con una pieza tomada, se suelta donde está (mover la pieza en el DOM también dispara focusout: se comprueba después) */
canvas.addEventListener('focusout', () => setTimeout(() => { if (kb && !canvas.contains(document.activeElement)) { kb.t.querySelector('.s-grip').setAttribute('aria-pressed', 'false'); kb.t.classList.remove('lifted'); kb = null; } }, 0));

/* ---------- Menú móvil ---------- */
const drawer = $('#drawer');
function setDrawer(open) { drawer.classList.toggle('open', open); drawer.inert = !open; drawer.setAttribute('aria-hidden', String(!open)); $$('.menu-btn').forEach(x => x.setAttribute('aria-expanded', String(open))); }
setDrawer(false);
$$('.menu-btn').forEach(b => b.addEventListener('click', () => setDrawer(!drawer.classList.contains('open'))));
drawer.addEventListener('click', e => { if (e.target.tagName === 'A') setDrawer(false); });
addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false); });
{ let y0 = 0; addEventListener('scroll', () => { if (!drawer.classList.contains('open')) { y0 = scrollY; return; } if (Math.abs(scrollY - y0) > 48) setDrawer(false); }, { passive: true }); }

/* ---------- Tema con revelado circular ---------- */
const isLight = () => root.dataset.theme ? root.dataset.theme === 'light' : matchMedia('(prefers-color-scheme: light)').matches;
try { const saved = localStorage.getItem('hx-theme'); if (saved) root.dataset.theme = saved; } catch (_) {}
/* barra de estado del teléfono del mismo color que la página, también con el tema elegido a mano */
function syncThemeColor() { if (!root.dataset.theme) return; const c = root.dataset.theme === 'light' ? '#F3F4F8' : '#06080F'; $$('meta[name="theme-color"]').forEach(m => m.setAttribute('content', c)); }
syncThemeColor();
$$('.theme-btn').forEach(btn => btn.addEventListener('click', e => {
  const next = isLight() ? 'dark' : 'light';
  const flip = () => { root.dataset.theme = next; try { localStorage.setItem('hx-theme', next); } catch (_) {} syncThemeColor(); document.dispatchEvent(new CustomEvent('hx:colors')); };
  /* revelado circular solo con puntero fino: en móvil el cambio es inmediato */
  /* el círculo solo con un clic real de ratón (e.detail > 0): con teclado o desde Ctrl K el cambio es instantáneo */
  if (document.startViewTransition && !still() && finePointer && e.detail > 0) {
    const r = Math.hypot(Math.max(e.clientX, innerWidth - e.clientX), Math.max(e.clientY, innerHeight - e.clientY));
    document.startViewTransition(flip).ready.then(() => root.animate({ clipPath: [`circle(0 at ${e.clientX}px ${e.clientY}px)`, `circle(${r}px at ${e.clientX}px ${e.clientY}px)`] }, { duration: 480, easing: 'cubic-bezier(.77, 0, .175, 1)', pseudoElement: '::view-transition-new(root)' })).catch(() => {});
  } else flip();
}));

/* ---------- Etiqueta «Tú» que sigue al puntero (resorte) ---------- */
const me = $('.me');
if (finePointer && !reduceMotion) {
  let tx = -100, ty = -100, x = -100, y = -100, vx = 0, vy = 0, following = false, last = 0;
  const step = now => {
    const dt = Math.min(32, now - (last || now)) / 1000; last = now;
    /* resorte críticamente amortiguado: rigidez 260, amortiguación 2·√260 ≈ 32 */
    vx += ((tx - x) * 260 - vx * 32) * dt; vy += ((ty - y) * 260 - vy * 32) * dt;
    x += vx * dt; y += vy * dt;
    me.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    if (Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(vx) + Math.abs(vy) > .5) requestAnimationFrame(step); else { following = false; last = 0; }
  };
  addEventListener('pointermove', e => {
    tx = e.clientX + 16; ty = e.clientY + 18; document.body.classList.add('has-me');
    if (motionPaused) { x = tx; y = ty; me.style.transform = `translate3d(${x}px, ${y}px, 0)`; return; }
    if (!following) { following = true; requestAnimationFrame(step); }
  }, { passive: true });
  document.addEventListener('pointerleave', () => document.body.classList.remove('has-me'));

  /* portadas de las obras: inclinación de hasta 3° que sigue al puntero */
  /* resorte críticamente amortiguado (rigidez 170, amortiguación 2·√170 ≈ 26): sigue al puntero sin retraso ni rebote */
  $$('.tilt').forEach(w => {
    const st = { tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0, rect: null, run: false, last: 0 };
    const step = now => {
      const dt = Math.min(32, now - (st.last || now)) / 1000; st.last = now;
      st.vx += ((st.tx - st.x) * 170 - st.vx * 26) * dt; st.vy += ((st.ty - st.y) * 170 - st.vy * 26) * dt;
      st.x += st.vx * dt; st.y += st.vy * dt;
      const rest = Math.abs(st.tx - st.x) + Math.abs(st.ty - st.y) + Math.abs(st.vx) + Math.abs(st.vy) < .01;
      if (rest && !st.tx && !st.ty) { w.style.transform = ''; st.run = false; st.last = 0; return; }
      w.style.transform = `perspective(1200px) rotateX(${st.x.toFixed(2)}deg) rotateY(${st.y.toFixed(2)}deg)`;
      if (rest) { st.run = false; st.last = 0; return; }
      requestAnimationFrame(step);
    };
    const kickTilt = () => { if (!st.run) { st.run = true; requestAnimationFrame(step); } };
    w.addEventListener('pointerenter', () => { st.rect = w.getBoundingClientRect(); });
    w.addEventListener('pointermove', e => {
      if (motionPaused) return; const r = st.rect || (st.rect = w.getBoundingClientRect());
      st.tx = -((e.clientY - r.top) / r.height - .5) * 3; st.ty = ((e.clientX - r.left) / r.width - .5) * 4; kickTilt();
    });
    w.addEventListener('pointerleave', () => { st.tx = 0; st.ty = 0; st.rect = null; kickTilt(); });
  });
}

/* ---------- Entradas, contadores ---------- */
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
$$('.rise').forEach(el => [...el.children].forEach((c, i) => c.style.setProperty('--i', i)));
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target; io.unobserve(el);
  if (el.classList.contains('rise')) { el.classList.add('in'); if (el.classList.contains('cover')) setTimeout(() => el.classList.add('revealed'), 900); }
  if (el.dataset.count && !still()) {
    const end = +el.dataset.count, t0 = performance.now();
    const dur = +el.dataset.dur || 1400;
    const step = t => { const k = clamp01((t - t0) / dur), e = 1 - Math.pow(1 - k, 4); el.textContent = fmt(Math.round(end * e)); if (k < 1) requestAnimationFrame(step); else el.textContent = fmt(end); };
    requestAnimationFrame(step);
  }
}), { threshold: 0, rootMargin: '0px 0px -4% 0px' }); /* entra apenas asoma: el texto ya está legible al llegar al centro */
$$('.rise, [data-count]').forEach(el => io.observe(el));
if (reduceMotion) $$('.rise').forEach(el => el.classList.add('in'));

/* Manifiesto: palabras que se encienden con el scroll */
const quote = $('#manifestoQuote');
if (quote) (function split(node, acc) {
  [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
        else { const s = document.createElement('span'); s.className = 'w' + (acc ? ' acc' : ''); s.textContent = part; frag.appendChild(s); }
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1) split(n, acc || n.classList.contains('acc'));
  });
})(quote, false);
const words = quote ? [...quote.querySelectorAll('.w')] : [];
if (reduceMotion) words.forEach(w => w.classList.add('on'));

/* ---------- Bitácora: ramas ---------- */
const logRows = [...$$('.log-row')];
(function bitacora() {
  const X = { ds: 16, org: 48, ops: 80 };
  const first = lane => logRows.findIndex(r => r.dataset.lane === lane);
  const mergeAt = logRows.findIndex(r => r.classList.contains('merge'));
  const fDs = first('ds'), fOps = first('ops');
  logRows.forEach((r, i) => {
    let html = '';
    const line = (lane, cls = '') => { html += `<i class="ln ${lane} ${cls}" style="left:${X[lane]}px"></i>`; };
    line('org', i === 0 ? 'start' : (i === logRows.length - 1 ? 'end' : ''));
    /* mientras las dos ideas van por separado, el tronco de la organización queda en pausa (punteado) */
    if (i > Math.min(fDs, fOps) && i < mergeAt) html = html.replace('class="ln org ', 'class="ln org quiet ');
    if (i >= fDs && i < mergeAt) line('ds', i === fDs ? 'start' : '');
    if (i >= fOps && i < mergeAt) line('ops', i === fOps ? 'start' : '');
    /* cada rama sale del tronco con una curva, como en un historial de git */
    const out = lane => `<path class="${lane}" d="M ${X.org} 0 C ${X.org} 14, ${X[lane]} 18, ${X[lane]} 32"/>`;
    if (i === fDs || i === fOps) html += `<svg aria-hidden="true">${i === fDs ? out('ds') : ''}${i === fOps ? out('ops') : ''}</svg>`;
    if (i === mergeAt) html += `<svg aria-hidden="true"><path class="ds" d="M ${X.ds} 0 C ${X.ds} 18, ${X.org} 12, ${X.org} 32"/><path class="ops" d="M ${X.ops} 0 C ${X.ops} 18, ${X.org} 12, ${X.org} 32"/></svg>`;
    const lanes = document.createElement('span'); lanes.className = 'lanes'; lanes.setAttribute('aria-hidden', 'true'); lanes.innerHTML = html;
    r.prepend(lanes);
    r.querySelector('.node').style.left = X[r.dataset.lane] + 'px';
  });
  if (reduceMotion) logRows.forEach(r => r.classList.add('lit'));
})();

/* ---------- Cierre: panal con una celda libre ---------- */
(function comb() {
  const svg = $('#comb'), s = 46, w = Math.sqrt(3) * s, cells = [];
  const rows = [[1, 4], [0, 5], [0, 5], [1, 4]];
  let html = '', slot = null;
  rows.forEach(([a, b], r) => { for (let q = a; q <= b; q++) { const cx = 46 + q * w + (r % 2 ? w / 2 : 0), cy = 60 + r * s * 1.5; if (r === 2 && q === 3) { slot = [cx, cy]; continue; } cells.push([cx, cy]); } });
  cells.forEach(([cx, cy], i) => { const k = (i * 7) % 11; html += `<g class="c${k === 0 ? ' lit3' : k < 3 ? ' lit' : k < 5 ? ' lit2' : ''}">${prism(cx, cy, s - 3, 9)}</g>`; });
  html += `<path class="slot-glow" d="${hexD(slot[0], slot[1], s - 3)}"/><path class="slot" d="${hexD(slot[0], slot[1], s - 6)}"/>`;
  html += `<foreignObject x="${slot[0] + 6}" y="${slot[1] + 2}" width="120" height="60"><span class="cur" style="--c:var(--accent);--ink:var(--on-accent)" xmlns="http://www.w3.org/1999/xhtml"><svg><use href="#arrow"/></svg><b>Tú</b></span></foreignObject>`;
  svg.innerHTML = html;
  if (still()) return;
  const lit = [...svg.querySelectorAll('.c')]; lit.forEach((c, i) => c.style.transitionDelay = `${i * 45}ms`);
  svg.classList.add('waiting');
  const curEl = svg.querySelector('.cur');
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting) return; o.disconnect();
    svg.classList.remove('waiting');
    curEl.animate([{ transform: 'translate(-220px, -160px)', opacity: 0 }, { transform: 'translate(-60px, -90px)', opacity: 1, offset: .6 }, { transform: 'none', opacity: 1 }], { duration: 1300, delay: lit.length * 45 + 200, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'backwards' });
  }, { threshold: .4 }).observe(svg);
})();

/* =========================================================
   Un solo bucle de scroll: barra de progreso, menú, recorrido 3D,
   manifiesto, bitácora y el nombre del cierre.
   ========================================================= */
const progressBar = $('.progress'), chapters = [...$$('.journey > .ch')], wordmark = $('#wordmark'), logBox = $('#log');
const logDay = $('#logDay'), logCount = $('#logCount');
const buildingEl = $('.building');
const journeyEl = $('#historia'), stage3dEl = $('#stage3d'), panels = [...$$('.journey .panel')];
const deepScroll = matchMedia('(min-width: 961px)').matches;
let lastExit = -1, railK = -1;
const rail = $('#rail'), railLinks = [...rail.querySelectorAll('a')];
let centers = [], journeyP = 0;
function measure() { centers = chapters.map(c => { const r = c.getBoundingClientRect(); return r.top + scrollY + r.height / 2; }); }
function computeJourney() {
  const vc = scrollY + innerHeight / 2;
  if (vc <= centers[0]) return 0;
  for (let i = 0; i < centers.length - 1; i++) {
    if (vc < centers[i + 1]) {
      const f = (vc - centers[i]) / (centers[i + 1] - centers[i]);
      /* meseta: el estado se sostiene mientras su panel está al centro y cambia entre paneles */
      return i + clamp01((f - .22) / .56);
    }
  }
  return centers.length - 1;
}
let scrollTick = false;
const vh_off = -1e5;
function onScrollFrame() {
  scrollTick = false;
  const h = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.transform = `scaleX(${h > 0 ? (scrollY / h).toFixed(4) : 0})`;
  document.body.classList.toggle('scrolled', scrollY > 40);
  journeyP = computeJourney();
  if (buildingEl) buildingEl.style.opacity = (1 - clamp01(scrollY / (innerHeight * .3))).toFixed(3);
  {
    /* el riel de capítulos funciona siempre, también con movimiento reducido */
    const jr = journeyEl.getBoundingClientRect(), inJ = jr.top < innerHeight * .5 && jr.bottom > innerHeight * .5;
    rail.classList.toggle('on', inJ);
    document.body.classList.toggle('in-journey', inJ); /* dentro del recorrido «Tú» es la celda libre, no el puntero */
    if (inJ) { const k = Math.round(journeyP); if (k !== railK) { railK = k; railLinks.forEach((a, i) => a.toggleAttribute('aria-current', i === k)); } }
    /* la escena 3D se aleja y se apaga mientras el recorrido termina; con movimiento reducido solo se apaga, pero nunca queda sobre Obras */
    const exit = clamp01((innerHeight - jr.bottom) / (innerHeight * .35));
    if (Math.abs(exit - lastExit) > .002) {
      lastExit = exit; stage3dEl.style.opacity = (1 - exit).toFixed(3);
      stage3dEl.style.visibility = exit >= 1 ? 'hidden' : '';
      stage3dEl.style.transform = exit && !still() ? `scale(${(1 - exit * .08).toFixed(4)})` : '';
    }
  }
  if (!reduceMotion) {
    const calm = still();
    /* lecturas */
    const vh = innerHeight, q = quote ? quote.getBoundingClientRect() : { top: vh_off, bottom: vh_off, height: 0 }, lr = logBox.getBoundingClientRect(), wr = wordmark.getBoundingClientRect();
    const logTops = lr.top < vh && lr.bottom > 0 ? logRows.map(r => r.getBoundingClientRect().top) : null;
    const panelRects = deepScroll ? panels.map(pn => pn.getBoundingClientRect()) : null;
    /* escrituras */
    /* los paneles avanzan un poco más despacio que el scroll: profundidad frente a la escena */
    /* profundidad: los paneles avanzan un poco más despacio que el scroll (sin opacidad: el vidrio dejaría ver el 3D nítido detrás del texto) */
    if (panelRects) panelRects.forEach((r, i) => {
      if (r.bottom < -100 || r.top > vh + 100) return;
      const off = (r.top + r.height / 2) - vh / 2;
      panels[i].style.transform = calm ? '' : `translate3d(0, ${(off * -.08).toFixed(1)}px, 0)`;
    });
    if (q.top < vh && q.bottom > 0) { const lit = Math.round(clamp01((vh * .85 - q.top) / (q.height + vh * .35)) * words.length); words.forEach((w, i) => w.classList.toggle('on', i < lit)); }
    if (logTops) {
      let lastLit = -1;
      logRows.forEach((r, i) => { const on = logTops[i] < vh * .86; r.classList.toggle('lit', on); if (on) lastLit = i; });
      /* fecha grande fija: avanza con la historia */
      const row = logRows[Math.max(0, lastLit)], t = row.querySelector('time'), dt = t.getAttribute('datetime');
      const day = dt ? Math.round((Date.parse(dt) - Date.parse('2026-10-03')) / 864e5) + 1 : null;
      const label = dt ? t.textContent.replace(/,? 2026/, '') : tr('Hoy', 'Today'), count = dt ? tr(`Día ${day}`, `Day ${day}`) : tr('Seguimos', 'Ongoing');
      if (logDay.textContent !== label) { logDay.textContent = label; logCount.textContent = count; if (!calm) logDay.animate([{ opacity: .3, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: 'cubic-bezier(.23, 1, .32, 1)' }); }
    }
    if (wr.top < vh) wordmark.style.transform = calm ? '' : `translateY(${((1 - clamp01((vh - wr.top) / (vh * .6))) * 18).toFixed(2)}%)`;
  }
  document.dispatchEvent(new CustomEvent('hx:scroll'));
}
const requestScrollFrame = () => { if (!scrollTick) { scrollTick = true; requestAnimationFrame(onScrollFrame); } };
addEventListener('scroll', requestScrollFrame, { passive: true });
addEventListener('resize', () => { measure(); requestScrollFrame(); });
measure(); onScrollFrame();
if (document.fonts) document.fonts.ready.then(() => { measure(); requestScrollFrame(); });
addEventListener('load', () => { measure(); requestScrollFrame(); });

/* Sección activa en el menú: la cápsula se desliza (transform, no width) */
const navInk = document.createElement('span'); navInk.className = 'links-ink'; navInk.setAttribute('aria-hidden', 'true');
document.querySelector('.links').prepend(navInk);
function moveNavInk() {
  const a = document.querySelector('.links a[aria-current="true"]');
  if (!a || !a.offsetWidth) { navInk.style.opacity = '0'; return; }
  const first = navInk.style.opacity !== '1';
  if (first) navInk.style.transition = 'none'; /* la primera vez aparece en su sitio, sin viajar desde el borde */
  navInk.style.transform = `translateX(${a.parentElement.offsetLeft}px) scaleX(${(a.offsetWidth / 100).toFixed(3)})`;
  if (first) { void navInk.offsetWidth; navInk.style.transition = ''; }
  navInk.style.opacity = '1';
}
addEventListener('resize', moveNavInk);
/* solo escribe si algo cambia: tocar atributos en cada cuadro de scroll recalcula estilos del menú */
let outTick = false;
const scrolledOut = () => { outTick = false; if (scrollY < innerHeight * .5 && navInk.style.opacity !== '0') { navLinks.forEach(a => a.setAttribute('aria-current', 'false')); navInk.style.opacity = '0'; } };
addEventListener('scroll', () => { if (!outTick) { outTick = true; requestAnimationFrame(scrolledOut); } }, { passive: true });

const navLinks = [...$$('.links a')];
const secObs = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  navLinks.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id)));
  moveNavInk();
}), { rootMargin: '-45% 0px -50% 0px' });
['obras', 'playground', 'proyectos', 'bitacora', 'equipo', 'sumate'].forEach(id => secObs.observe(document.getElementById(id)));

/* Atajo según el sistema: ⌘ K en Mac, Ctrl K en el resto */
if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) $$('kbd').forEach(k => { if (k.textContent === 'Ctrl K') k.textContent = '⌘ K'; });

/* ---------- Paleta de comandos (instantánea) ---------- */
(function cmdk() {
  const box = $('#cmdk'), input = $('#cmdkInput'), list = $('#cmdkList');
  const go = id => () => document.getElementById(id).scrollIntoView({ behavior: 'instant' }); /* acción de teclado: llegada inmediata (sin el desplazamiento suave de los enlaces) */
  const ACTIONS = [
    [tr('Ir a', 'Go to'), tr('Inicio', 'Home'), '↑', go('inicio')], [tr('Ir a', 'Go to'), tr('La visión', 'The vision'), '→', go('abierto')], [tr('Ir a', 'Go to'), tr('Obras', 'Work'), '→', go('obras')], [tr('Ir a', 'Go to'), tr('Prueba en vivo', 'Live demo'), '→', go('playground')], [tr('Ir a', 'Go to'), tr('Proyectos', 'Projects'), '→', go('proyectos')],
    [tr('Ir a', 'Go to'), tr('Bitácora', 'Log'), '→', go('bitacora')], [tr('Ir a', 'Go to'), tr('Cómo trabajamos', 'How we work'), '→', go('metodo')], [tr('Ir a', 'Go to'), tr('Equipo', 'Team'), '→', go('equipo')], [tr('Ir a', 'Go to'), tr('Súmate', 'Join'), '→', go('sumate')], [tr('Ir a', 'Go to'), tr('Preguntas frecuentes', 'FAQ'), '→', go('preguntas')],
    ...Object.entries(PALETTES).map(([k, p]) => [tr('Paleta', 'Palette'), p[0], p[2], () => setPalette(k)]),
    [tr('Tema', 'Theme'), tr('Cambiar entre claro y oscuro', 'Switch between light and dark'), '◐', () => $('.theme-btn').click()],
    [tr('Movimiento', 'Motion'), tr('Pausar o reanudar el movimiento', 'Pause or resume motion'), '‖', () => setMotion(!motionPaused)],
    [tr('Enlaces', 'Links'), tr('Abrir GitHub', 'Open GitHub'), '↗', () => LINKS.github && window.open(LINKS.github, '_blank', 'noopener')]
  ];
  let items = [], sel = 0, lastFocus = null;
  function render() {
    const q = input.value.trim().toLowerCase();
    items = ACTIONS.filter(a => (a[0] + ' ' + a[1]).toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(0, items.length - 1));
    if (!items.length) { list.innerHTML = tr('<li class="cmdk-empty">Sin resultados. Prueba con «paleta», «tema» o el nombre de una sección.</li>', '<li class="cmdk-empty">No results. Try “palette”, “theme” or a section name.</li>'); return; }
    let html = '', group = '';
    items.forEach((a, i) => {
      if (a[0] !== group) { group = a[0]; html += `<li class="cmdk-group" role="presentation">${group}</li>`; }
      const icon = a[0] === tr('Paleta', 'Palette') ? `<i style="background:${a[2]}"></i>` : `<i>${a[2]}</i>`;
      html += `<li class="cmdk-item" role="option" id="cmdk-${i}" data-i="${i}" aria-selected="${i === sel}">${icon}<span>${a[1]}</span>${i === sel ? '<small>Enter</small>' : ''}</li>`;
    });
    list.innerHTML = html;
    input.setAttribute('aria-activedescendant', 'cmdk-' + sel);
    const cur = list.querySelector('[aria-selected="true"]'); if (cur) cur.scrollIntoView({ block: 'nearest' });
  }
  function open() { lastFocus = document.activeElement; box.hidden = false; input.value = ''; sel = 0; render(); input.focus(); }
  function close() { if (box.hidden) return; box.hidden = true; if (lastFocus) lastFocus.focus(); }
  function run(i) { const a = items[i]; if (!a) return; close(); a[3](); }
  $$('[data-cmdk]').forEach(b => b.addEventListener('click', open));
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); box.hidden ? open() : close(); return; }
    if (box.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % items.length; render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + items.length) % items.length; render(); }
    else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
    else if (e.key === 'Tab') { e.preventDefault(); input.focus(); }
  });
  input.addEventListener('input', () => { sel = 0; render(); });
  list.addEventListener('click', e => { const it = e.target.closest('.cmdk-item'); if (it) run(+it.dataset.i); });
  box.addEventListener('click', e => { if (e.target === box) close(); });
})();

const whenIdle = fn => (window.requestIdleCallback || (f => setTimeout(f, 300)))(fn, { timeout: 2500 });

/* ---------- Presencia en vivo: cursores de otros visitantes ----------
   Sin servidor funciona entre pestañas del mismo navegador (BroadcastChannel).
   Con LIVE.presenceUrl usa un WebSocket que reenvía los mensajes a la sala.
   Solo se comparte la posición del puntero; ningún dato personal. */
whenIdle(function presence() {
  if (!finePointer) return;
  const id = Math.random().toString(36).slice(2, 8);
  const COLORS = TEAM.map(m => m.color);
  const myColor = COLORS[(Math.random() * COLORS.length) | 0];
  const layer = document.createElement('div'); layer.id = 'peersLayer'; layer.setAttribute('aria-hidden', 'true'); document.body.appendChild(layer);
  const peers = new Map(), out = [];
  let wake = () => {};
  let bc = null, ws = null;
  try { bc = new BroadcastChannel('hexalis-presence'); out.push(m => bc.postMessage(m)); } catch (_) {}
  if (LIVE.presenceUrl) { try { ws = new WebSocket(LIVE.presenceUrl); out.push(m => ws.readyState === 1 && ws.send(JSON.stringify(m))); ws.onmessage = e => { if (typeof e.data !== 'string' || e.data.length > 200) return; try { receive(JSON.parse(e.data)); } catch (_) {} }; } catch (_) {} }
  if (!out.length) return;
  if (bc) bc.onmessage = e => receive(e.data);
  const send = m => out.forEach(f => f(Object.assign({ id, c: myColor }, m)));
  const count = $('#peers');
  function updateCount() { const n = peers.size; count.hidden = !n; count.textContent = n === 1 ? tr('· 1 visitante contigo ahora', '· 1 visitor here with you') : tr(`· ${n} visitantes contigo ahora`, `· ${n} visitors here with you`); }
  /* lo que llega de otros visitantes no se usa sin validar: color de la lista del equipo, coordenadas acotadas y como máximo 12 cursores */
  function receive(m) {
    if (!m || typeof m.id !== 'string' || m.id === id || m.id.length > 12) return;
    if (m.t !== 'bye') {
      if (!COLORS.includes(m.c) || !Number.isFinite(m.x) || !Number.isFinite(m.y)) return;
      m.x = Math.min(1, Math.max(0, m.x)); m.y = Math.min(document.documentElement.scrollHeight, Math.max(0, m.y));
      if (!peers.has(m.id) && peers.size >= 12) return;
    }
    if (m.t === 'bye') { const p = peers.get(m.id); if (p) { p.el.remove(); peers.delete(m.id); updateCount(); } return; }
    let p = peers.get(m.id);
    if (!p) {
      const el = document.createElement('span'); el.className = 'cur'; el.style.setProperty('--c', m.c); el.innerHTML = `<svg><use href="#arrow"/></svg><b>${tr('Visitante', 'Visitor')}</b>`;
      layer.appendChild(el); p = { el, x: m.x * innerWidth, y: m.y, tx: 0, ty: 0, seen: 0 }; peers.set(m.id, p); updateCount();
    }
    p.tx = m.x * document.documentElement.clientWidth; p.ty = m.y; p.seen = performance.now(); wake();
  }
  let lastSend = 0;
  addEventListener('pointermove', e => { const now = performance.now(); if (now - lastSend < 50) return; lastSend = now; send({ t: 'move', x: e.pageX / document.documentElement.clientWidth, y: e.pageY }); }, { passive: true });
  addEventListener('pagehide', () => send({ t: 'bye' }));
  let ticking = false;
  function tick() {
    const now = performance.now();
    peers.forEach((p, pid) => {
      if (now - p.seen > 8000) { p.el.remove(); peers.delete(pid); updateCount(); return; }
      const k = motionPaused ? 1 : .2; p.x += (p.tx - p.x) * k; p.y += (p.ty - p.y) * k;
      p.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
      p.el.style.opacity = now - p.seen > 3000 ? .35 : 1;
    });
    if (peers.size) requestAnimationFrame(tick); else ticking = false;
  }
  wake = () => { if (!ticking) { ticking = true; requestAnimationFrame(tick); } };
});

/* ---------- Contribuidores públicos de GitHub ---------- */
whenIdle(function contributors() {
  const { org, repos } = LIVE.github; if (!org || !repos.length || !window.fetch) return; /* sin repos públicos no se consulta nada */
  const team = new Set(TEAM.map(m => (m.github || '').toLowerCase()).filter(Boolean));
  const get = url => fetch(url, { headers: { Accept: 'application/vnd.github+json' } }).then(r => r.ok ? r.json() : []).catch(() => []);
  Promise.all([get(`https://api.github.com/orgs/${org}/public_members`), ...repos.map(r => get(`https://api.github.com/repos/${org}/${r}/contributors?per_page=60`))])
    .then(lists => {
      const people = new Map();
      lists.flat().forEach(u => { if (u && u.login && u.type !== 'Bot' && !team.has(u.login.toLowerCase())) people.set(u.login, u); });
      if (!people.size) return;
      $('#contribFaces').innerHTML = [...people.values()].slice(0, 40).map(u => `<a href="${u.html_url}" target="_blank" rel="noopener" title="${u.login}"><img src="${u.avatar_url}&s=72" alt="${u.login}" loading="lazy" width="36" height="36"></a>`).join('');
      $('#contrib').hidden = false;
    });
});


/* Conmutador de datos (solo desarrollo) */
if (DEV_DATA !== null) {
  const bar = document.createElement('div');
  bar.setAttribute('style', 'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:300;display:flex;gap:2px;padding:3px;border-radius:999px;background:#d9dbe1;font:600 12px system-ui;box-shadow:0 2px 10px rgba(0,0,0,.25)');
  [['demo', 'Demo'], ['worst', 'Peor caso'], ['one', 'Uno'], ['empty', 'Vacío']].forEach(([k, label]) => {
    const a = document.createElement('a'); a.textContent = label; a.href = '?data=' + k + location.hash;
    const on = (DEV_DATA || 'demo') === k;
    a.setAttribute('style', 'padding:6px 12px;border-radius:999px;color:#111;' + (on ? 'background:#fff' : ''));
    bar.appendChild(a);
  });
  document.body.appendChild(bar);
}


/* =========================================================
   La prueba en vivo: un guía (el cursor de Jorge) la recorre una vez,
   después te cede el cursor. Se detiene en cuanto tocas algo.
   ========================================================= */
(function guideDemo() {
  const box = $('.pg'), turn = $('#pgTurn');
  turn.innerHTML = tr('Mira cómo se hace, o empieza tú cuando quieras.', 'Watch how it works, or start whenever you like.');
  const YOUR_TURN = tr('<strong>Tu turno:</strong> elige una paleta, prueba las acciones de cada pieza, edita un texto con doble clic y publica.', '<strong>Your turn:</strong> pick a palette, try each piece’s actions, double-click a text to edit it and publish.');
  if (still()) { turn.innerHTML = YOUR_TURN; return; }
  const m = TEAM[0];
  const g = document.createElement('span'); g.className = 'cur guide'; g.setAttribute('aria-hidden', 'true');
  g.style.cssText = `--c:${m.color};--ink:${m.ink}`; g.innerHTML = `<svg><use href="#arrow"/></svg><b>${m.cursor} · demo</b>`; /* es una demostración, no alguien conectado */
  box.appendChild(g);
  let gx = 0, gy = 0, stop = false, running = false;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const place = () => { g.style.transform = `translate3d(${gx}px, ${gy}px, 0)`; };
  async function moveTo(el, dur = 760) {
    if (stop) throw 0;
    const b = box.getBoundingClientRect(), r = el.getBoundingClientRect();
    /* la punta toca la esquina inferior derecha: la etiqueta queda fuera del control y no lo tapa */
    const x = r.right - b.left - Math.min(10, r.width * .2), y = r.bottom - b.top - Math.min(8, r.height * .2);
    g.classList.toggle('flip', x > b.width - 150); /* junto al borde derecho la etiqueta se voltea: no desborda la página */
    const a = g.animate([{ transform: `translate3d(${gx}px, ${gy}px, 0)` }, { transform: `translate3d(${x}px, ${y}px, 0)` }], { duration: dur, easing: 'cubic-bezier(.77, 0, .175, 1)' });
    gx = x; gy = y; place(); await a.finished; if (stop) throw 0;
  }
  async function press(el) {
    g.animate([{ transform: `translate3d(${gx}px, ${gy}px, 0) scale(1)` }, { transform: `translate3d(${gx}px, ${gy}px, 0) scale(.86)` }, { transform: `translate3d(${gx}px, ${gy}px, 0) scale(1)` }], { duration: 200, easing: 'cubic-bezier(.23, 1, .32, 1)' });
    el.click(); await wait(420); if (stop) throw 0;
  }
  const end = (msg) => {
    window.__pgDemo = false; g.classList.remove('on');
    $$('#pgSteps li').forEach(li => li.classList.remove('done')); stepsDone.clear();
    tiles().forEach(t => t.classList.remove('lifted'));
    turn.innerHTML = msg;
  };
  async function run() {
    running = true; window.__pgDemo = true;
    turn.innerHTML = tr(`<strong>${m.cursor}</strong> te muestra la prueba…`, `<strong>${m.cursor}</strong> is showing you around…`);
    const first = $('#swatches .swatch[data-key="ciruela"]');
    const b = box.getBoundingClientRect(), r = first.getBoundingClientRect();
    gx = r.left - b.left - 60; gy = r.top - b.top + 80; place(); g.classList.add('on');
    try {
      await moveTo(first, 640); await press(first);
      /* toma la primera pieza por su asa y la lleva al tercer lugar */
      const t0 = tiles()[0], grip0 = t0.querySelector('.s-grip'); await moveTo(grip0, 640);
      t0.classList.add('lifted'); await wait(160); if (stop) throw 0;
      const dest = tiles()[2], mv = moveTo(dest, 620); moveTile(t0, 2); await mv;
      t0.classList.remove('lifted'); await wait(240);
      const pub = $('#pgPublish'); await moveTo(pub, 700); await press(pub); await wait(500);
      const back = $('#swatches .swatch[data-key="espectral"]'); await moveTo(back, 640); await press(back);
      g.querySelector('b').textContent = tr('Ahora tú', 'Your turn'); await wait(800);
      end(YOUR_TURN);
    } catch (_) { end(YOUR_TURN); }
  }
  /* si quien visita toca algo, el guía se aparta y le cede el control */
  const takeOver = () => { if (running && window.__pgDemo) { stop = true; g.getAnimations().forEach(a => a.cancel()); } else stop = true; };
  box.addEventListener('pointerdown', e => { if (e.isTrusted) takeOver(); }, true);
  box.addEventListener('keydown', e => { if (e.isTrusted) takeOver(); }, true);
  /* con el puntero encima o al primer toque, el guía se aparta: nunca compite con quien visita */
  if (finePointer) box.addEventListener('pointerenter', e => { if (e.isTrusted && running) takeOver(); });
  box.addEventListener('touchstart', e => { if (e.isTrusted) takeOver(); }, { passive: true, capture: true });
  new IntersectionObserver(([e], o) => { if (e.isIntersecting && !stop && !still()) { o.disconnect(); setTimeout(() => { if (!stop) run(); }, 500); } }, { rootMargin: "-25% 0px -25% 0px" }).observe(box);
})();

/* =========================================================
   Equipo: seis cursores llegan desde fuera y encienden su celda;
   el séptimo, el tuyo, llega al final a la celda libre.
   ========================================================= */
(function teamArrival() {
  const team = $('#team'), members = [...team.querySelectorAll('.member')];
  if (still()) { members.forEach(mb => mb.classList.add('lit')); return; }
  team.classList.add('waiting');
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting) return; o.disconnect();
    members.forEach((mb, i) => {
      const cur = mb.querySelector('.cur'), av = mb.querySelector('.avatar');
      if (!cur) { setTimeout(() => mb.classList.add('lit'), i * 60 + 400); return; }
      const ang = (-150 + i * 50) * Math.PI / 180, dist = Math.min(innerWidth * .45, 560);
      const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist * .6 - 160;
      const mx = dx * .4 - dy * .25, my = dy * .4 + dx * .18; /* punto medio desplazado: trayectoria curva */
      const slot = mb.classList.contains('slot');
      const a = cur.animate([
        { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 },
        { transform: `translate(${mx}px, ${my}px)`, opacity: 1, offset: .55 },
        { transform: 'translate(0, 0)', opacity: 1 }
      ], { duration: slot ? 820 : 680, delay: slot ? members.length * 60 + 120 : i * 60, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'backwards' });
      a.finished.then(() => {
        cur.animate([{ transform: 'scale(1)' }, { transform: 'scale(.86)' }, { transform: 'scale(1)' }], { duration: 200, easing: 'cubic-bezier(.23, 1, .32, 1)' });
        mb.classList.add('lit');
        av.animate([{ transform: 'scale(.96)', opacity: .45 }, { transform: 'scale(1)', opacity: 1 }], { duration: 320, easing: 'cubic-bezier(.23, 1, .32, 1)' });
      }).catch(() => mb.classList.add('lit'));
    });
  }, { threshold: .35 }).observe(team);
})();

/* Títulos de sección: el texto sube desde su máscara (menos el de Súmate, que lleva un cursor) */
$$('.sec-head.rise > h2:not(.join-title)').forEach(h => { h.classList.add('masked'); h.innerHTML = `<span class="mask-in">${h.innerHTML}</span>`; });


/* =========================================================
   El panal de fondo: una retícula de celdas que se desplaza más lento que
   el contenido y se enciende según lo que cuenta cada sección.
   Sin bucle en reposo; las escenas que respiran van a ~30 fps.
   ========================================================= */
(function hive() {
  const cv = $('#bgHive'); if (!cv || !cv.getContext) return;
  const ctx = cv.getContext('2d');
  const small = matchMedia('(max-width: 760px)').matches;
  const R = small ? 30 : 38, W = Math.sqrt(3) * R, H = 1.5 * R, PAR = .35;
  const cell = new Path2D(hexD(0, 0, R - 3));
  let vw = 0, vh = 0, dpr = 1, col = {}, light = false;
  const hex2rgb = h => { h = h.trim().replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return `rgb(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255})`; };
  function readColors() {
    const cs = getComputedStyle(root), g = n => hex2rgb(cs.getPropertyValue(n) || '#7A9FEB');
    col = { p300: g('--p300'), p600: g('--p600'), ops: g('--ops'), ok: g('--ok'), warn: g('--warn'), h3: g('--h3'), accent: g('--accent'), fg: g('--fg') };
    TEAM.forEach((m, i) => { col['t' + i] = hex2rgb(m.color); });
    light = isLight(); basePat = null;
  }
  function size() { dpr = Math.min(devicePixelRatio || 1, small ? 1 : 1.5); vw = innerWidth; vh = innerHeight; cv.width = vw * dpr; cv.height = vh * dpr; basePat = null; }
  /* patrón de W × 2H con la retícula tenue: se repite solo, así no se rellenan ~1 200 celdas por cuadro */
  let basePat = null;
  function pattern() {
    const pc = document.createElement('canvas'); pc.width = Math.round(W * dpr); pc.height = Math.round(2 * H * dpr);
    const g = pc.getContext('2d'), kx = pc.width / W, ky = pc.height / (2 * H); g.fillStyle = col.fg; g.globalAlpha = .016;
    for (let r = -1; r <= 2; r++) for (let k = -1; k <= 1; k++) { g.setTransform(kx, 0, 0, ky, (k * W + (r & 1 ? W / 2 : 0)) * kx, r * H * ky); g.fill(cell); }
    basePat = ctx.createPattern(pc, 'repeat'); basePat.k = [W * dpr / pc.width, 2 * H * dpr / pc.height];
  }
  const hash = (c, r) => { const x = Math.sin(c * 127.1 + r * 311.7) * 43758.5453; return x - Math.floor(x); };
  const sstep = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const g2 = v => Math.exp(-v * v);

  /* escenas: devuelven [intensidad, color] para una celda en (x, y) de la pantalla */
  const lanes = [...$$('.board .lane')], slot = () => $('#comb .slot'), finaleEl = $('.finale'), teamEl = $('#team');
  let laneX = [], slotP = null, teamR = null;
  const SCENES = [
    { el: $('#obras'), f: (x, y, t) => { const d = (x / vw) * .7 + (y / vh) * .5 - (t * 1.5 - .25); return [.55 * g2(d * 3.7), x < vw * .5 ? 'p600' : 'ops']; } },
    { el: $('#proyectos'), f: (x, y, t) => {
        let best = 0, key = 'p300';
        /* los grupos van apilados: cada uno ilumina su franja horizontal */
        laneX.forEach(([ly, lh], k) => { const v = g2((y - ly) / (lh * .6)) * clamp01(t * 2.4 - k * .3) * .45; if (v > best) { best = v; key = ['ok', 'p300', 'ops'][k]; } });
        return [best, key]; }, time: false },
    { el: $('#bitacora'), f: (x, y, t, tm) => {
        const m = sstep(.15, .8, t), flow = .65 + .35 * Math.sin(y * .03 - tm * .003);
        const a = g2((x - (.18 + .32 * m) * vw) / 80) * flow * .5, b = g2((x - (.82 - .32 * m) * vw) / 80) * flow * .5;
        return a >= b ? [a, m > .96 ? 'accent' : 'p300'] : [b, m > .96 ? 'accent' : 'ops']; }, time: true },
    { el: $('#equipo'), f: (x, y, t, tm, c, r) => {
        const k = hash(c, r); if (k > .04 + .14 * t) return [0];
        if (teamR && x > teamR[0] - 40 && x < teamR[2] + 40 && y > teamR[1] - 40 && y < teamR[3] + 40) return [0];
        return [.55 * (.72 + .28 * Math.sin(tm * .002 + k * 40)), 't' + (Math.floor(k * 997) % TEAM.length)]; }, time: true },

  ];

  /* ondas: nacen de lo que toca quien visita */
  const ripples = [];
  const ripple = (el, key) => { if (still()) return; const r = el.getBoundingClientRect(); ripples.push({ x: r.left + r.width / 2, y: r.top + r.height / 2, t0: performance.now(), key }); kick(); };
  $('#swatches').addEventListener('click', e => { const b = e.target.closest('.swatch'); if (b) setTimeout(() => { readColors(); ripple(b, 'p300'); }, 40); });
  $('#pgPublish').addEventListener('click', e => ripple(e.currentTarget, 'ok'));
  $('#stageTheme').addEventListener('click', e => { const b = e.target.closest('button'); if (b) ripple(b, 'accent'); });

  let lastY = scrollY, vel = 0, raf = 0, lastDraw = 0, op = 0;
  function frame(now) {
    raf = 0;
    const calm = still();
    vel = calm ? 0 : vel * .82 + (scrollY - lastY) * .18; lastY = scrollY;
    /* el panal aparece cuando termina el recorrido 3D */
    const jb = journeyEl.getBoundingClientRect().bottom;
    const fin = finaleEl ? finaleEl.getBoundingClientRect().top : vh;
    /* aparece cuando termina el recorrido 3D y se apaga en el cierre, donde manda el panal propio */
    /* solo donde cuenta algo: Obras, Proyectos, Bitácora y Equipo; en el resto de la página se apaga */
    let cover = 0;
    for (const sc of SCENES) { if (!sc.el) continue; const r = sc.el.getBoundingClientRect(); cover += Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)) / vh; }
    const target = clamp01((vh * .95 - jb) / (vh * .6)) * (1 - clamp01((vh * .9 - fin) / (vh * .5))) * clamp01(cover * 1.6);
    if (Math.abs(target - op) > .005) { op = target; cv.style.opacity = op.toFixed(3); }
    const timeScene = !calm && op > 0;
    let active = [], needTime = false;
    if (op > 0) {
      for (const sc of SCENES) {
        if (!sc.el) continue;
        const r = sc.el.getBoundingClientRect(), ov = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)) / vh;
        if (ov <= .01) continue;
        active.push([sc, ov, clamp01((vh * .5 - r.top) / r.height)]);
        if (sc.time) needTime = true;
      }
      if (teamEl && active.some(a => a[0].el && a[0].el.id === 'equipo')) { const b = teamEl.getBoundingClientRect(); teamR = [b.left, b.top, b.right, b.bottom]; }
      if (active.some(a => a[0].el && a[0].el.id === 'proyectos')) laneX = lanes.map(l => { const b = l.getBoundingClientRect(); return [b.top + b.height / 2, b.height]; });
      const sl = slot(); if (sl && active.some(a => a[0].el && a[0].el.classList.contains('finale'))) { const b = sl.getBoundingClientRect(); slotP = [b.left + b.width / 2, b.top + b.height / 2]; }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    if (op > 0) {
      const tm = calm ? 0 : now, sy = scrollY * PAR, r0 = Math.floor(sy / H) - 1, rows = Math.ceil(vh / H) + 3, cols = Math.ceil(vw / W) + 2;
      const amp = light ? .6 : 1, maxA = .3 * amp, s = calm ? 0 : Math.min(1, Math.abs(vel) / 40);
      if (!light) {
        if (!basePat) pattern();
        const oy = (((-sy) % (2 * H)) + 2 * H) % (2 * H);
        basePat.setTransform(new DOMMatrix([basePat.k[0], 0, 0, basePat.k[1], 0, oy * dpr]));
        ctx.globalAlpha = 1; ctx.fillStyle = basePat; ctx.fillRect(0, 0, cv.width, cv.height);
      }
      for (let r = r0; r < r0 + rows; r++) {
        const y = r * H - sy, odd = r & 1;
        for (let c = -1; c < cols; c++) {
          const x = c * W + (odd ? W / 2 : 0);
          let I = 0, key = 'fg', best = 0;
          for (const [sc, w, t] of active) { const [v, k] = sc.f(x, y, t, tm, c, r); const vv = (v || 0) * w; if (vv > best) { best = vv; key = k; } I += vv; }
          if (s > 0) { const v = s * .35 * g2((y - (vel > 0 ? vh : 0)) / (vh * .3)); if (v > best) { best = v; key = 'p300'; } I += v; }
          for (const rp of ripples) { const age = now - rp.t0, d = Math.hypot(x - rp.x, y - rp.y), v = g2((d - age * .9) / 70) * (1 - age / 1100) * .7; if (v > 0) { if (v > best) { best = v; key = rp.key; } I += v; } }
          /* la retícula base apenas se nota (y en claro no se dibuja); una celda toma color solo si su escena aporta algo visible */
          if (I < .05) continue;
          ctx.globalAlpha = Math.min(1, I + .1) * maxA; ctx.fillStyle = col[key] || col.p300;
          ctx.setTransform(dpr, 0, 0, dpr, x * dpr, y * dpr); ctx.fill(cell);
        }
      }
      ctx.globalAlpha = 1;
    }
    for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].t0 > 1100) ripples.splice(i, 1);
    lastDraw = now;
    /* sigue solo si algo cambia: scroll con inercia, ondas o escenas que respiran (a ~30 fps) */
    if (!calm && (Math.abs(vel) > .3 || ripples.length)) raf = requestAnimationFrame(frame);
    else if (timeScene && needTime && !document.hidden) setTimeout(() => { if (!raf) raf = requestAnimationFrame(frame); }, 33);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }
  readColors(); size();
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', () => { size(); kick(); });
  document.addEventListener('hx:colors', () => setTimeout(() => { readColors(); kick(); }, 40));
  document.addEventListener('hx:motion', kick);
  document.addEventListener('visibilitychange', kick);
  kick();
})();

/* Bucles infinitos: en pausa cuando no se ven */
const loopIO = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('offscreen', !e.isIntersecting)));
['.log-row.now', '#comb'].forEach(sel => { const el = $(sel); if (el) loopIO.observe(el); });

/* Puente con la escena 3D (módulo) */
window.HX = Object.assign(window.HX || {}, { LANG, tr, TEAM, still, reduceMotion, journey: () => journeyP });
window.HX_OK = true;

/* El recorrido 3D (~140 KB y la compilación de shaders) espera a que la página termine de cargar y el navegador
   quede libre, para no competir con el primer pintado: hasta 1,5 s en pantallas táctiles, 500 ms en escritorio.
   Con ahorro de datos activado no se descarga: se queda el panal de respaldo. */
{
  const saveData = (navigator.connection && navigator.connection.saveData) || matchMedia('(prefers-reduced-data: reduce)').matches;
  const loadScene = () => import('./scene.js').catch(() => $('#stage3d').classList.add('no-gl'));
  const timeout = matchMedia('(pointer: coarse)').matches ? 1500 : 500;
  const whenIdle = () => (window.requestIdleCallback || (f => setTimeout(f, 200)))(loadScene, { timeout });
  if (saveData) $('#stage3d').classList.add('no-gl');
  else if (document.readyState === 'complete') whenIdle();
  else addEventListener('load', whenIdle, { once: true });
}
/* si la escena 3D no arranca (sin WebGL o sin red), se muestra el panal de respaldo */
setTimeout(() => { const st = $('#stage3d'); if (!st.classList.contains('gl-ready')) st.classList.add('no-gl'); }, 6000);
