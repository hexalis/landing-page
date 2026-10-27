import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const HX = window.HX;
const host = document.getElementById('stage3d');
const canvas = document.getElementById('hex3d');
const labelsBox = document.getElementById('labels3d');
const phone = matchMedia('(max-width: 760px)').matches;
const SIDE = matchMedia('(min-width: 961px)'); /* mismo corte que las etiquetas laterales en styles.css */

let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !phone, alpha: true, powerPreference: 'high-performance' }); }
catch (e) { host.classList.add('no-gl'); throw e; }
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, phone ? 1.25 : 1.5)); /* más de 1,5 cuesta mucho en pantallas grandes y apenas se nota */
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = phone ? 1 : .82;
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, .1, 400);
const camDir = new THREE.Vector3(0, -.62, 1).normalize();
scene.fog = new THREE.Fog(0x06080f, 40, 92);
/* Reflejos de estudio: dan el brillo de material pulido sin texturas externas */
/* se genera después del primer cuadro, en un momento ocioso, para no bloquear la carga */
const makeEnv = () => { const pmrem = new THREE.PMREMGenerator(renderer); scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), .04).texture; pmrem.dispose(); warm().then(() => render(true)); }; /* los reflejos cambian los shaders: se vuelven a preparar todos */
/* compileAsync solo prepara lo visible: las piezas de capítulos posteriores se muestran un instante (sin dibujar) para no compilarlas en pleno scroll */
const warm = () => {
  const hidden = []; scene.traverse(o => { if (!o.visible) { hidden.push(o); o.visible = true; } });
  const ready = renderer.compileAsync ? renderer.compileAsync(scene, camera) : Promise.resolve();
  hidden.forEach(o => { o.visible = false; });
  return ready.catch(() => {});
};

/* Luz: clave fría desde arriba a la izquierda, contraluz azul y una luz que sigue al puntero */
const hemi = new THREE.HemisphereLight(0xdfe7ff, 0x141a2c, .7); scene.add(hemi);
const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(-14, -18, 30); scene.add(key);
const rim = new THREE.DirectionalLight(0x9fb8ff, 1.6); rim.position.set(14, 22, 6); scene.add(rim);
const glow = new THREE.PointLight(0x7a9feb, 220, 34, 1.4); glow.position.set(0, 0, 9); scene.add(glow);

/* Celdas: rejilla hexagonal (vértice arriba) ordenada del centro hacia afuera */
const RAD = phone ? 6 : 8;
const SQ3 = Math.sqrt(3);
const RING1 = [[1, -1], [1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1]]; /* arriba a la derecha, en sentido horario */
const cells = [{ q: 0, r: 0, d: 0 }];
RING1.forEach(([q, r]) => cells.push({ q, r, d: 1 }));
for (let d = 2; d <= RAD; d++) {
  const ring = [];
  for (let q = -d; q <= d; q++) for (let r = Math.max(-d, -q - d); r <= Math.min(d, -q + d); r++) if ((Math.abs(q) + Math.abs(r) + Math.abs(q + r)) / 2 === d) ring.push({ q, r, d });
  ring.sort((a, b) => Math.atan2(-1.5 * a.r, SQ3 * (a.q + a.r / 2)) - Math.atan2(-1.5 * b.r, SQ3 * (b.q + b.r / 2)));
  cells.push(...ring);
}
const N = cells.length;
const hash = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
cells.forEach((c, i) => { c.x = SQ3 * (c.q + c.r / 2); c.y = -1.5 * c.r; c.h = hash(i); c.delay = (c.d / RAD) * .3 + hash(i + 99) * .08; });

/* Geometría: prisma hexagonal biselado, base en z = 0 */
/* la misma celda que el resto del portal: cada vértice se suaviza con una curva */
const roundHex = (R, t = R * .156) => {
  const sh = new THREE.Shape(), V = Array.from({ length: 6 }, (_, k) => [R * Math.cos(Math.PI / 2 + k * Math.PI / 3), R * Math.sin(Math.PI / 2 + k * Math.PI / 3)]);
  const mv = (P, Q) => { const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]); return [P[0] + (Q[0] - P[0]) / d * t, P[1] + (Q[1] - P[1]) / d * t]; };
  V.forEach((P, i) => { const a = mv(P, V[(i + 5) % 6]), b = mv(P, V[(i + 1) % 6]); if (i) sh.lineTo(a[0], a[1]); else sh.moveTo(a[0], a[1]); sh.quadraticCurveTo(P[0], P[1], b[0], b[1]); });
  sh.closePath(); return sh;
};
const shape = roundHex(.9);
const geo = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: true, bevelThickness: .07, bevelSize: .06, bevelSegments: phone ? 1 : 3, curveSegments: phone ? 2 : 4 });
const mat = phone
  ? new THREE.MeshStandardMaterial({ roughness: .45, metalness: .04 })
  : new THREE.MeshPhysicalMaterial({ roughness: .42, metalness: .1, clearcoat: .55, clearcoatRoughness: .3 });
mat.envMapIntensity = .14;
const mesh = new THREE.InstancedMesh(geo, mat, N);
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
const plateShape = roundHex(.6);
const plateMat = new THREE.MeshStandardMaterial({ roughness: .38, metalness: .05 });
plateMat.envMapIntensity = .1;
/* luz propia: las celdas emiten una parte de su color, así se leen en el cielo oscuro */
const emitU = { value: .12 };
const addEmit = (m, k) => { m.onBeforeCompile = sh => {
  sh.uniforms.uEmit = emitU; sh.uniforms.uEmitK = { value: k };
  sh.fragmentShader = 'uniform float uEmit; uniform float uEmitK;\n' + sh.fragmentShader.replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n#if defined( USE_COLOR )\n  totalEmissiveRadiance += vColor.rgb * uEmit * uEmitK;\n#endif');
}; };
addEmit(mat, 1); addEmit(plateMat, 1.7);
const plates = new THREE.InstancedMesh(new THREE.ShapeGeometry(plateShape), plateMat, N);
plates.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
const world = new THREE.Group(); world.add(mesh); world.add(plates); scene.add(world);

/* Los tres principios: cada celda enmarca una pieza real del producto, para que se entiendan sin leer.
   Open source: la licencia. Documentado: una página del Toolkit con su anotación. Accesible: un botón con su contraste medido. */
const extF = (sh, d) => new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: true, bevelThickness: .05, bevelSize: .04, bevelSegments: phone ? 1 : 2, curveSegments: phone ? 2 : 4 });
const FW = 468, FH = 540; /* proporción del hexágono con vértice arriba */
const FORMS = {};
{
  const slab = extF(roundHex(.9), .34), face = new THREE.ShapeGeometry(roundHex(.84), phone ? 4 : 8);
  face.computeBoundingBox(); { const bb = face.boundingBox, uv = face.attributes.uv, ps = face.attributes.position;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (ps.getX(i) - bb.min.x) / (bb.max.x - bb.min.x), (ps.getY(i) - bb.min.y) / (bb.max.y - bb.min.y)); }
  [1, 3, 5].forEach(key => {
    const g = new THREE.Group(), m = phone ? new THREE.MeshStandardMaterial({ roughness: .4, metalness: .05 }) : new THREE.MeshPhysicalMaterial({ roughness: .36, metalness: .08, clearcoat: .7, clearcoatRoughness: .25 });
    m.envMapIntensity = .18;
    const cv = document.createElement('canvas'); cv.width = FW; cv.height = FH;
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const fm = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
    const body = new THREE.Mesh(slab, m), front = new THREE.Mesh(face, fm); front.position.z = .4;
    g.add(body, front); g.visible = false; g.userData = { mat: m, cv, tex }; world.add(g); FORMS[key] = g;
  });
}
/* contraste WCAG medido con los colores reales del tema */
const rgbOf = (() => { const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true }); c.canvas.width = c.canvas.height = 1;
  return col => { c.clearRect(0, 0, 1, 1); c.fillStyle = col; c.fillRect(0, 0, 1, 1); return [...c.getImageData(0, 0, 1, 1).data].slice(0, 3); }; })();
const lum = rgb => { const [r, g, b] = rgb.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
const ratio = (x, y) => { const [a, b] = [lum(rgbOf(x)), lum(rgbOf(y))].sort((m, n) => n - m); return (a + .05) / (b + .05); };
function drawFrags(t) {
  const SANS = 'Inter, system-ui, sans-serif', MONO = '"JetBrains Mono", ui-monospace, monospace';
  const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };
  Object.entries(FORMS).forEach(([k, f]) => {
    const g = f.userData.cv.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = t.screen; g.fillRect(0, 0, FW, FH); g.textBaseline = 'alphabetic';
    if (k === '1') {
      g.fillStyle = t.ink; g.font = `500 156px ${MONO}`; g.fillText('MIT', 46, 280);
      g.fillStyle = t.soft; g.font = `500 46px ${MONO}`; g.fillText('CC BY 4.0', 58, 344);
      /* una bifurcación: cualquiera puede copiar y seguir */
      g.lineWidth = 8; g.strokeStyle = t.a1; g.beginPath(); g.moveTo(80, 410); g.lineTo(388, 410); g.moveTo(230, 410); g.lineTo(320, 370); g.stroke();
      [[80, 410, t.a1], [230, 410, t.a1], [388, 410, t.a1], [320, 370, t.a2]].forEach(([x, y, c]) => { g.fillStyle = c; g.beginPath(); g.arc(x, y, 15, 0, 7); g.fill(); });
    } else if (k === '3') {
      g.fillStyle = t.paper; rr(g, 46, 128, 376, 290, 22); g.fill();
      g.fillStyle = t.a2; rr(g, 74, 156, 190, 62, 31); g.fill();
      g.fillStyle = ratio('#ffffff', t.a2) >= ratio('#0b0b14', t.a2) ? '#ffffff' : '#0b0b14'; g.font = `600 30px ${SANS}`; g.textAlign = 'center'; g.fillText('Button', 169, 198); g.textAlign = 'start';
      g.fillStyle = t.line; [[74, 258, 320], [74, 298, 250], [74, 338, 290], [74, 378, 190]].forEach(([x, y, w]) => { rr(g, x, y, w, 18, 9); g.fill(); });
      /* la anotación: así se documenta cada pieza */
      g.strokeStyle = t.note; g.lineWidth = 4; g.setLineDash([10, 7]); g.beginPath(); g.moveTo(270, 187); g.lineTo(320, 187); g.stroke(); g.setLineDash([]);
      g.fillStyle = t.note; g.font = `500 30px ${MONO}`; g.fillText('16px', 326, 198);
    } else {
      const onBtn = ratio('#ffffff', t.btn) >= ratio('#0b0b14', t.btn) ? '#ffffff' : '#0b0b14', r = ratio(onBtn, t.btn);
      g.textAlign = 'center';
      g.fillStyle = t.btn; rr(g, 54, 140, 360, 112, 56); g.fill();
      g.fillStyle = onBtn; g.font = `600 46px ${SANS}`; g.fillText(tr('Súmate', 'Join us'), 234, 212);
      g.strokeStyle = t.a1; g.lineWidth = 4; g.fillStyle = t.chip; rr(g, 54, 282, 360, 84, 42); g.fill(); g.stroke();
      g.fillStyle = t.ink; g.font = `500 36px ${MONO}`; g.fillText(`${r.toFixed(1)}:1 · ${r >= 7 ? 'AAA' : 'AA'} ✓`, 234, 337);
      g.fillStyle = t.muted; g.font = `500 32px ${SANS}`; g.fillText(tr('contraste medido', 'measured contrast'), 234, 414);
      g.textAlign = 'start';
    }
    f.userData.tex.needsUpdate = true;
  });
}

/* 2. Fondo con profundidad: un campo lejano de celdas planas que se mueve con el scroll */
const DUST = phone ? 80 : 200;
const dustMat = new THREE.MeshBasicMaterial({ color: 0x4064c6, transparent: true, opacity: .09, depthWrite: false });
const dust = new THREE.InstancedMesh(new THREE.ShapeGeometry(plateShape), dustMat, DUST);
const dustGroup = new THREE.Group(); dustGroup.add(dust); scene.add(dustGroup);
{
  const dm = new THREE.Matrix4(), dq = new THREE.Quaternion(), de = new THREE.Euler(), dp = new THREE.Vector3(), ds = new THREE.Vector3();
  for (let i = 0; i < DUST; i++) {
    const r1 = hash(i + 500), r2 = hash(i + 900), r3 = hash(i + 1300), r4 = hash(i + 1700);
    dp.set((r1 - .5) * 170, (r2 - .5) * 150, -40 - r3 * 70);
    de.set((r4 - .5) * .9, (r1 - .5) * .9, r2 * Math.PI); dq.setFromEuler(de);
    const sc = .4 + r3 * 1.1; ds.set(sc, sc, sc);
    dm.compose(dp, dq, ds); dust.setMatrixAt(i, dm);
  }
  dust.instanceMatrix.needsUpdate = true;
}

/* El cielo: estrellas finas en tres capas de profundidad, con un parpadeo leve */
const STARS = phone ? 650 : 1700;
const sPos = new Float32Array(STARS * 3), sSize = new Float32Array(STARS), sSeed = new Float32Array(STARS), sLayer = new Float32Array(STARS);
for (let i = 0; i < STARS; i++) {
  const layer = i % 3, r1 = hash(i + 3000), r2 = hash(i + 3700), r3 = hash(i + 4400), r4 = hash(i + 5100);
  const z = -16 - layer * 22 - r3 * 14;
  sPos.set([(r1 - .5) * (170 - layer * 20), (r2 - .5) * (120 - layer * 10) - z * .62, z], i * 3);
  sSize[i] = (layer === 0 ? 2.3 : layer === 1 ? 1.6 : 1.1) * (.55 + r4 * .9) * (hash(i + 5800) > .986 ? 2.2 : 1);
  sSeed[i] = hash(i + 6500); sLayer[i] = layer;
}
const sGeo = new THREE.BufferGeometry();
sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
sGeo.setAttribute('aSize', new THREE.BufferAttribute(sSize, 1));
sGeo.setAttribute('aSeed', new THREE.BufferAttribute(sSeed, 1));
sGeo.setAttribute('aLayer', new THREE.BufferAttribute(sLayer, 1));
const starMat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(1, 1, 1) }, uTint: { value: new THREE.Color(0x7a9feb) }, uOpacity: { value: .85 }, uScroll: { value: 0 }, uPx: { value: renderer.getPixelRatio() }, uTwinkle: { value: 1 } },
  vertexShader: `attribute float aSize; attribute float aSeed; attribute float aLayer;
    uniform float uTime; uniform float uScroll; uniform float uPx; uniform float uTwinkle;
    varying float vA; varying float vTint;
    void main() {
      vec3 p = position; p.y += uScroll * (3.0 - aLayer);
      vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
      float tw = 1.0 - uTwinkle * 0.5 * (0.5 + 0.5 * sin(uTime * (0.0007 + aSeed * 0.0016) + aSeed * 40.0));
      vA = tw * (1.0 - aLayer * 0.2); vTint = fract(aSeed * 7.31);
      gl_PointSize = aSize * uPx * (46.0 / -mv.z);
    }`,
  fragmentShader: `uniform vec3 uColor; uniform vec3 uTint; uniform float uOpacity; varying float vA; varying float vTint;
    void main() {
      float r = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, r); a *= a;
      vec3 c = mix(uColor, uTint, step(0.7, vTint) * 0.85);
      gl_FragColor = vec4(c, a * vA * uOpacity);
    }`
});
const stars = new THREE.Points(sGeo, starMat); stars.frustumCulled = false; scene.add(stars);

/* Fondo: la retícula del panal. Detrás de todo, pegada a la cámara; con cada capítulo se dibujan más celdas
   alrededor de la forma activa, y al llegar al planeta está completa. Sustituye al cielo de estrellas. */
stars.visible = false;
const GRID_D = 90;
const gridMat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false,
  uniforms: { uColor: { value: new THREE.Color(0x7a9feb) }, uOpacity: { value: .16 }, uCell: { value: 4.6 }, uReveal: { value: 6 }, uCenter: { value: new THREE.Vector2() }, uOff: { value: 0 }, uFront: { value: 1 } },
  vertexShader: `varying vec2 vP; void main() { vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `uniform vec3 uColor; uniform float uOpacity; uniform float uCell; uniform float uReveal; uniform vec2 uCenter; uniform float uOff; uniform float uFront;
    varying vec2 vP;
    float hexD(vec2 q) { q = abs(q); return max(dot(q, normalize(vec2(1.0, 1.7320508))), q.x); }
    void main() {
      vec2 q = (vP - uCenter + vec2(0.0, uOff)) / uCell;
      vec2 r = vec2(1.0, 1.7320508), h = r * 0.5;
      vec2 a = mod(q, r) - h, b = mod(q - h, r) - h;
      vec2 g = dot(a, a) < dot(b, b) ? a : b;
      float d = 0.5 - hexD(g), w = fwidth(d);
      float line = 1.0 - smoothstep(w * 0.6, w * 1.8, d);
      /* cada celda entra entera según la distancia de su centro, no por un círculo que corta líneas */
      float cd = length((q - g) * uCell);
      float on = 1.0 - smoothstep(uReveal - uCell * 0.9, uReveal, cd);
      float front = exp(-abs(cd - uReveal + uCell * 0.6) / (uCell * 0.9)) * uFront;
      float vig = 1.0 - smoothstep(26.0, 60.0, length(vP));
      gl_FragColor = vec4(uColor, line * uOpacity * (on + front * 1.4) * vig);
    }`
});
const grid = new THREE.Mesh(new THREE.PlaneGeometry(260, 160), gridMat);
grid.position.z = -GRID_D; grid.renderOrder = -1; grid.frustumCulled = false;
camera.add(grid); scene.add(camera);
const gridC = new THREE.Vector3();

/* Nebulosa: tres manchas de luz muy tenues en los colores de la paleta */
const glowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.35, 'rgba(255,255,255,.38)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
const glowSprite = (o) => new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, opacity: o, depthWrite: false, blending: THREE.AdditiveBlending }));
const NEB = [[-34, 18, -58, 78, "p600", .2], [42, 30, -68, 86, "h3", .15], [8, -14, -46, 52, "p300", .07]].map(([x, y, z, sz, key, o]) => {
  const sp = glowSprite(o); sp.position.set(x, y - z * .62, z); sp.scale.set(sz, sz * .62, 1); sp.userData = { key, o, y: y - z * .62, x }; scene.add(sp); return sp; });

/* El origen: un hexágono de cristal facetado con un núcleo de luz que late despacio */
const crystalGeo = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: true, bevelThickness: .12, bevelSize: .09, bevelSegments: phone ? 1 : 2, curveSegments: phone ? 2 : 4 });
crystalGeo.translate(0, 0, -.5);
const crystalMat = phone
  ? new THREE.MeshPhysicalMaterial({ color: 0x8fb0ff, emissive: 0x4064c6, emissiveIntensity: 1.25, roughness: .12, metalness: 0, transparent: true, opacity: .8, clearcoat: 1, clearcoatRoughness: .08, depthWrite: false })
  : new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .05, metalness: 0, transmission: 1, thickness: 1.6, ior: 1.5, iridescence: .5, iridescenceIOR: 1.3, clearcoat: 1, clearcoatRoughness: .04, attenuationColor: new THREE.Color(0x7a9feb), attenuationDistance: 2.4 });
crystalMat.envMapIntensity = 1.3;
const crystal = new THREE.Mesh(crystalGeo, crystalMat);
const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .32, depthWrite: false });
crystal.add(new THREE.LineSegments(new THREE.EdgesGeometry(crystalGeo, 25), edgeMat));
world.add(crystal);
const coreHalo = glowSprite(.85), coreDot = glowSprite(1);
coreHalo.material.depthTest = false; coreDot.material.depthTest = false;
world.add(coreHalo); world.add(coreDot);
/* estelas de la primera división: una por principio */
const trails = [1, 3, 5].map(() => { const t = glowSprite(0); world.add(t); return t; });
/* órbitas del ciclo */
const orbitMat = new THREE.LineBasicMaterial({ color: 0x8fe3da, transparent: true, opacity: 0, depthWrite: false });
const orbitRing = r => { const pts = []; for (let k = 0; k <= 96; k++) { const a = k / 96 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, .35)); } return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), orbitMat); };
const orbits = new THREE.Group(); orbits.add(orbitRing(Math.sqrt(3) * 3.5)); orbits.add(orbitRing(Math.sqrt(3) * 5.4)); world.add(orbits);

/* Estados */
const S = 6, GLOBE = 5; /* 0 celda · 1 abierto · 2 seis · 3 panal · 4 ciclo · 5 planeta */
const P = [...Array(S)].map(() => new Float32Array(N * 3));
const Q = [...Array(S)].map(() => new Float32Array(N * 4));
const SC = [...Array(S)].map(() => new Float32Array(N * 3));
const C = [...Array(S)].map(() => new Float32Array(N * 3));
const GLOBE_V = new Float32Array(N * 3); /* dirección de cada celda en el planeta */
const tmpQ = new THREE.Quaternion(), tmpE = new THREE.Euler(), Z = new THREE.Vector3(0, 0, 1), tmpV = new THREE.Vector3();
const setP = (s, i, x, y, z) => { P[s].set([x, y, z], i * 3); };
const setS = (s, i, x, y, z) => { SC[s].set([x, y, z], i * 3); };
const setQ = (s, i, q) => { Q[s].set([q.x, q.y, q.z, q.w], i * 4); };
const ident = new THREE.Quaternion();
const HIDE = .001;
const YOU_HOLE = 7; /* primera celda del segundo anillo: queda libre en el sistema */

const layout = () => {
  const wide = innerWidth > 960;
  return {
    hero: wide ? [11.4, 6.1] : [0, 9.6],
    left: wide ? [-6.5, 0] : [0, 8.4],    /* panel a la derecha → forma a la izquierda */
    right: wide ? [6.5, 0] : [0, 8.4],    /* panel a la izquierda → forma a la derecha */
    globe: wide ? [6.5, 0] : [0, 10.4],
    globeR: wide ? 7.6 : 5.4
  };
};

const wideHero = () => innerWidth > 960;
function buildShapes() {
  const L = layout();
  /* 0 · una celda: la idea */
  tmpE.set(.95, -.42, .18); tmpQ.setFromEuler(tmpE);
  for (let i = 0; i < N; i++) {
    setP(0, i, L.hero[0], L.hero[1], 0);
    setQ(0, i, tmpQ);
    setS(0, i, HIDE, HIDE, HIDE); /* el origen lo dibuja el cristal */
  }
  /* 1 · abierto: la celda se abre en tres principios que flotan hacia quien mira */
  tmpE.set(.6, -.28, .08); tmpQ.setFromEuler(tmpE);
  const OPEN = { 1: [0, 3.7, .9], 3: [-3.2, -1.85, .9], 5: [3.2, -1.85, .9] }; /* triángulo regular, misma profundidad */
  for (let i = 0; i < N; i++) {
    const o = OPEN[i];
    const k = wideHero() ? 1 : .74, up = wideHero() ? 0 : 1.1; /* en el teléfono, más compacto y más arriba */
    if (o) { setP(1, i, L.right[0] + o[0] * k, L.right[1] + o[1] * k + up, o[2]); setS(1, i, 2.7 * k, 2.7 * k, 1.05); }
    else if (i === 0) { setP(1, i, L.right[0], L.right[1] + up, 0); setS(1, i, HIDE, HIDE, HIDE); } /* el cristal vacío queda en el centro */
    else { setP(1, i, L.right[0], L.right[1], 0); setS(1, i, HIDE, HIDE, HIDE); }
    setQ(1, i, tmpQ);
  }
  /* 2 · seis personas alrededor de un lugar vacío */
  for (let i = 0; i < N; i++) {
    const c = cells[i];
    if (i >= 1 && i <= 6) { setP(2, i, L.left[0] + c.x * 2.35, L.left[1] + c.y * 2.35, 0); setS(2, i, 2.1, 2.1, 1 + c.h * 1.6); }
    else { setP(2, i, L.left[0], L.left[1], 0); setS(2, i, HIDE, HIDE, HIDE); }
    setQ(2, i, ident);
  }
  /* 3 · el panal: el sistema completo */
  for (let i = 0; i < N; i++) {
    const c = cells[i];
    const wave = .5 + .5 * Math.sin(c.x * .55 + 1.3) * Math.cos(c.y * .5 - .4);
    const h = i === 0 ? 3.9 : i <= 6 ? 3.3 + c.h * .3 : .2 + wave * .8 + c.h * .3; /* el equipo sobresale del panal */
    setP(3, i, L.right[0] + c.x * 1.02, L.right[1] + c.y * 1.02, 0);
    const hole = i === YOU_HOLE; /* un hueco junto al equipo: el lugar de quien visita */
    setS(3, i, hole ? HIDE : 1, hole ? HIDE : 1, hole ? HIDE : h);
    setQ(3, i, ident);
  }
  /* 4 · el ciclo: seis fases sobre un suelo de celdas */
  for (let i = 0; i < N; i++) {
    const c = cells[i];
    if (i >= 1 && i <= 6) { setP(4, i, L.left[0] + c.x * 3.5, L.left[1] + c.y * 3.5, .2); setS(4, i, 2.75, 2.75, 1.15); } /* la fase activa crece en el bucle, según el scroll */
    else if (i === 0) { setP(4, i, L.left[0], L.left[1], .1); setS(4, i, 1.7, 1.7, .5); }
    else { setP(4, i, L.left[0] + c.x * 1.02, L.left[1] + c.y * 1.02, -.6); setS(4, i, .96, .96, .1 + c.h * .12); }
    setQ(4, i, ident);
  }
  /* 5 · el planeta: el suelo del ciclo plegado en una esfera, cada celda mira hacia afuera */
  for (let i = 0; i < N; i++) {
    const v = tmpV.fromArray(globeDir(i));
    GLOBE_V.set([v.x, v.y, v.z], i * 3);
    const sz = GEO_D * L.globeR * .95 / (.9 * Math.sqrt(3)) * GSZ[i]; /* ancho de cara a cara = distancia a la vecina, con una junta fina */
    const pk = PROJ.indexOf(i);
    if (pk === 2 || !GON[i]) setS(GLOBE, i, HIDE, HIDE, HIDE); /* «Tu proyecto» es un hueco que espera; las celdas que sobran se recogen */
    else if (pk >= 0) setS(GLOBE, i, sz, sz, .85); /* proyectos: misma celda, apenas más alta y encendida */
    else setS(GLOBE, i, sz, sz, UPCOMING.has(i) ? .55 : .2 + cells[i].h * .1);
    setP(GLOBE, i, L.globe[0], L.globe[1], 0); /* el centro; la posición real se calcula con el giro */
    setQ(GLOBE, i, tmpQ.fromArray(GQ, i * 4));
  }
}

const phaseHi = new THREE.Color();
const lightNow0 = () => document.documentElement.dataset.theme === 'light' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: light)').matches);
/* Colores desde las variables CSS (cambian con la paleta y el tema) */
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const col = new THREE.Color();
const setC = (s, i, hex) => { col.set(hex); C[s].set([col.r, col.g, col.b], i * 3); };
function buildColors() {
  const p300 = css('--p300'), p600 = css('--p600'), h1 = css('--h1'), h3 = css('--h3'), s2 = css('--surface-2'), surf = css('--surface'), ops = css('--ops'), opsSolid = css('--ops-solid'), bg = css('--bg');
  const cat = { warn: css('--warn'), ds: p300, vol: css('--vol'), ops: ops, mut: css('--muted') };
  const teamColor = i => HX.TEAM[i - 1] ? HX.TEAM[i - 1].color : s2; /* con menos de seis integrantes, las celdas sobrantes quedan libres, en tono neutro */
  const PRINC = { 1: p600, 3: ops, 5: h3 };
  for (let i = 0; i < N; i++) {
    setC(0, i, p600);
    setC(1, i, PRINC[i] || p300);
    setC(2, i, i >= 1 && i <= 6 ? teamColor(i) : p300);
    setC(3, i, i === 0 ? '#ffffff' : i <= 6 ? teamColor(i) : (cells[i].h > .55 ? s2 : surf)); /* panal neutro: el equipo queda a la vista */
    setC(4, i, i >= 1 && i <= 6 ? opsSolid : i === 0 ? '#ffffff' : surf);
    const pk = PROJ.indexOf(i);
    setC(GLOBE, i, pk === 0 ? css('--warn') : pk === 1 ? p300 : pk === 2 ? '#ffffff' : UPCOMING.has(i) ? opsSolid : (cells[i].h > .5 ? p600 : h1)); /* base del planeta en dos azules: sin placas que parezcan agujeros */
  }
  phaseHi.set(lightNow0() ? ops : '#bff3ec');
  paintDecals(lightNow0() ? { light: true, face: '#ffffff', phase: '#e6f5f3', phaseInk: '#06302c', phaseMuted: '#3f6f6a' }
                         : { light: false, face: '#0b1022', phase: '#0c2a29', phaseInk: '#e8fbf8', phaseMuted: '#86c7bf' });
  sysMat.color.set(lightNow0() ? p600 : '#dfe6ff'); youMat.color.set(lightNow0() ? p600 : '#dfe6ff'); youFillMat.color.set(lightNow0() ? p600 : '#dfe6ff'); arrowMat.color.set(ops); arcMat.color.set(ops);
  [css('--warn'), p300].forEach((c, k) => beams[k].material.color.set(c));
  [[1, p600], [3, ops], [5, h3]].forEach(([k, c]) => { const m = FORMS[k].userData.mat; m.color.set(c); m.emissive.set(c).multiplyScalar(.12); });
  { const lt = document.documentElement.dataset.theme === 'light' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: light)').matches);
    drawFrags(lt ? { screen: '#e9edf6', ink: '#0d1226', soft: '#3a4466', muted: '#6b7594', a1: p600, a2: ops, paper: '#ffffff', line: '#cfd6e6', note: '#b4581c', btn: h3, chip: '#ffffff' }
                 : { screen: '#0d1328', ink: '#f2f4ff', soft: '#c3cbea', muted: '#8590b3', a1: p300, a2: ops, paper: '#eaf6f4', line: '#a9c6c1', note: '#e07a2e', btn: h3, chip: '#1b2140' }); }
  scene.fog.color.set(bg);
  dustMat.color.set(p600);
  glow.color.set(p300);
  const lightNow = document.documentElement.dataset.theme === 'light' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: light)').matches);
  /* en claro el cielo es un polvo luminoso muy tenue: sin estrellas negras ni brillos aditivos */
  starMat.blending = lightNow ? THREE.NormalBlending : THREE.AdditiveBlending; starMat.needsUpdate = true;
  starMat.uniforms.uColor.value.set(lightNow ? p600 : '#ffffff'); starMat.uniforms.uTint.value.set(lightNow ? h3 : p300);
  gridMat.uniforms.uColor.value.set(lightNow ? p600 : p300); gridMat.uniforms.uOpacity.value = lightNow ? .09 : .17;
  starMat.uniforms.uOpacity.value = lightNow ? .35 : .85; starMat.uniforms.uTwinkle.value = HX.still() ? 0 : 1;
  NEB.forEach(sp => { sp.material.color.set(sp.userData.key === 'h3' ? h3 : sp.userData.key === 'p300' ? p300 : p600); sp.material.opacity = sp.userData.o * (lightNow ? .35 : 1); });
  emitU.value = lightNow ? .04 : .12;
  [1, 3, 5].forEach(k => FORMS[k].userData.mat.emissive.multiplyScalar(lightNow ? .35 : 1));
  coreHalo.material.color.set(p300); coreDot.material.color.set(lightNow ? p600 : '#ffffff');
  trails[0].material.color.set(p600); trails[1].material.color.set(ops); trails[2].material.color.set(h3);
  orbitMat.color.set(ops);
  if (crystalMat.attenuationColor) crystalMat.attenuationColor.set(p300);
  render(true);
}



/* Celdas del planeta que representan proyectos (dirección fija en la esfera) */
/* El planeta es el suelo plegado: cada celda conserva su ángulo en el plano y se aleja del polo (que mira a quien visita) según su anillo; φ por índice reparte la misma área a cada celda */
const planeDir = i => { const cz = 1 - 2 * (i + .5) / N, sp = Math.sqrt(1 - cz * cz), th = i ? Math.atan2(cells[i].y, cells[i].x) : 0; return [Math.cos(th) * sp, Math.sin(th) * sp, cz]; };
/* Panal esférico (poliedro de Goldberg): los centros son los vértices de un icosaedro subdividido. Todas las celdas tienen seis vecinas
   salvo doce, que tienen cinco: esas van un poco más pequeñas para que no se note. Cada celda del plano toma el vértice libre más cercano
   a donde ya caía al plegarse; las que sobran en el borde del plano se recogen. */
const GEO_M = phone ? 3 : 4, GDIR = new Float32Array(N * 3), GQ = new Float32Array(N * 4), GSZ = new Float32Array(N), GON = new Uint8Array(N);
let GEO_D = 0; /* distancia entre centros vecinos en la esfera unitaria */
{
  const t = (1 + Math.sqrt(5)) / 2;
  const V = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]].map(v => new THREE.Vector3(...v).normalize());
  const F = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
  const pole = new THREE.Quaternion().setFromUnitVectors(V[5].clone(), new THREE.Vector3(0, 0, 1)); /* un vértice de cinco mira a quien visita */
  const pts = [], seen = new Map(), m = GEO_M;
  F.forEach(([a, b, c]) => { for (let i = 0; i <= m; i++) for (let j = 0; j <= m - i; j++) {
    const v = new THREE.Vector3().addScaledVector(V[a], i).addScaledVector(V[b], j).addScaledVector(V[c], m - i - j).normalize().applyQuaternion(pole);
    const k = v.toArray().map(x => Math.round(x * 1e4)).join(','); if (!seen.has(k)) { seen.set(k, 1); pts.push(v); } } });
  const M = pts.length, near = pts.map((pt, a) => { let best = -1, bd = 9; pts.forEach((o, b) => { if (b !== a) { const d = pt.distanceTo(o); if (d < bd) { bd = d; best = b; } } }); return [best, bd]; });
  GEO_D = near.reduce((s, n) => s + n[1], 0) / M;
  const deg = pts.map(pt => pts.filter(o => o !== pt && pt.distanceTo(o) < GEO_D * 1.35).length);
  const used = new Uint8Array(M), bx = new THREE.Vector3(), by = new THREE.Vector3(), mb = new THREE.Matrix4(), qb = new THREE.Quaternion();
  for (let i = 0; i < N; i++) {
    const d = planeDir(i);
    if (i >= M) { GDIR.set(d, i * 3); GQ.set([0, 0, 0, 1], i * 4); continue; }
    let best = -1, bd = -2; for (let k = 0; k < M; k++) if (!used[k]) { const dt = pts[k].x * d[0] + pts[k].y * d[1] + pts[k].z * d[2]; if (dt > bd) { bd = dt; best = k; } }
    used[best] = 1; const pt = pts[best], nb = pts[near[best][0]];
    /* +x local hacia una vecina: con seis vecinas a 60°, los bordes quedan alineados con los de al lado */
    bx.copy(nb).addScaledVector(pt, -pt.dot(nb)).normalize(); by.crossVectors(pt, bx); mb.makeBasis(bx, by, pt); qb.setFromRotationMatrix(mb);
    GDIR.set([pt.x, pt.y, pt.z], i * 3); GQ.set([qb.x, qb.y, qb.z, qb.w], i * 4); GSZ[i] = deg[best] === 5 ? .86 : 1; GON[i] = 1;
  }
}
const globeDir = i => [GDIR[i * 3], GDIR[i * 3 + 1], GDIR[i * 3 + 2]];
const nearestCell = d => { let best = 0, bd = -2; for (let i = 0; i < N; i++) { if (!GON[i]) continue; const v = globeDir(i), dt = v[0] * d[0] + v[1] * d[1] + v[2] * d[2]; if (dt > bd) { bd = dt; best = i; } } return best; };
const PROJ = [nearestCell([.42, .5, .76]), nearestCell([-.55, .05, .83]), nearestCell([.2, -.55, .81])];
const UPCOMING = new Set(); for (let i = 0; i < N; i++) if (hash(i + 77) > .93 && !PROJ.includes(i)) UPCOMING.add(i);
const topNeed = new Uint8Array(N); for (let i = 0; i <= 6; i++) topNeed[i] = 1; PROJ.forEach(i => { topNeed[i] = 1; });

/* Etiquetas proyectadas: los tres principios (estado 1), los seis cursores (estado 2), las seis fases (estado 4) y los proyectos (estado 5) */
const tr = HX.tr || (es => es), TPL = n => n === 1 ? tr('1 plantilla', '1 template') : tr(`${n} plantillas`, `${n} templates`);
const PHASES = [['Set up', TPL(2)], ['Discover', TPL(2)], ['Design', TPL(6)], ['Deliver', TPL(3)], ['Share', TPL(2)], ['Review', TPL(1)]];
const labs = [];
[[1, 'Open source', tr('por defecto', 'by default')], [3, tr('Documentado', 'Documented'), tr('de principio a fin', 'end to end')], [5, tr('Accesible', 'Accessible'), 'WCAG 2.2 AA']].forEach(([cell, t, sub]) => {
  const el = document.createElement('div'); el.className = `lab phase side ${cell === 3 ? 'below' : 'right'}`; /* el panel de texto va a la izquierda: Documentado cuelga bajo su celda */
  el.innerHTML = `<b>${t}<small>${sub}</small></b>`;
  labelsBox.appendChild(el); labs.push({ el, cell, state: 1 });
});
[[0, 'Space Apps', tr('En desarrollo', 'In development')], [1, 'Portal Hexalis', tr('En diseño', 'In design')], [2, tr('Tu proyecto', 'Your project'), tr('Abierto', 'Open')]].forEach(([k, t, sub]) => {
  const el = document.createElement('div'); el.className = 'lab phase projlab' + (k === 2 ? ' open' : '');
  el.innerHTML = `<b>${t}<small>${sub}</small></b>`;
  labelsBox.appendChild(el); labs.push({ el, cell: PROJ[k], state: GLOBE, globe: true });
});
for (let k = 0; k < Math.min(6, HX.TEAM.length); k++) { /* solo las celdas con persona llevan cursor */
  const m = HX.TEAM[k];
  const a = document.createElement('div'); a.className = 'lab';
  a.innerHTML = `<span class="cur" style="--c:${m.color};--ink:${m.ink};position:static"><svg><use href="#arrow"/></svg><b>${m.cursor}</b></span>`;
  labelsBox.appendChild(a); labs.push({ el: a, cell: k + 1, state: 2, team: true });
}
/* «Tú»: una celda libre que acompaña todo el recorrido (junto al origen, entre los principios, la séptima del equipo, el hueco del sistema, tu proyecto en el ciclo y en el planeta) */
const youLab = document.createElement('div'); youLab.className = 'lab phase you'; youLab.style.opacity = '0';
const YOU_SUB = [null, null, tr('la séptima celda', 'the seventh cell'), tr('tu lugar en el sistema', 'your place in the system'), null, null];
let youSub = -1;
labelsBox.appendChild(youLab);

/* Calcas: caras impresas sobre la placa de una celda en un estado.
   Equipo: iniciales sobre cara oscura, el color queda en el canto. Ciclo: número, fase y plantillas; el centro es «Tu proyecto». */
const DW = 256, DH = 296;
const decalGeo = new THREE.ShapeGeometry(roundHex(.6), phone ? 4 : 8);
decalGeo.computeBoundingBox(); { const bb = decalGeo.boundingBox, uv = decalGeo.attributes.uv, ps = decalGeo.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (ps.getX(i) - bb.min.x) / (bb.max.x - bb.min.x), (ps.getY(i) - bb.min.y) / (bb.max.y - bb.min.y)); }
const decalOf = new Map(), decals = [];
const addDecal = (cell, state, draw, same) => { /* same: otra calca cuya textura se reutiliza (sin lienzo nuevo) */
  const cv = same ? null : document.createElement('canvas'); if (cv) { cv.width = DW; cv.height = DH; }
  const tex = same ? same.tex : new THREE.CanvasTexture(cv); if (!same) { tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4; }
  const mesh = new THREE.Mesh(decalGeo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, toneMapped: false, depthWrite: false }));
  mesh.matrixAutoUpdate = false; mesh.visible = false; world.add(mesh);
  const d = { cell, state, draw: same ? null : draw, cv, tex, mesh }; decals.push(d);
  if (!decalOf.has(cell)) decalOf.set(cell, []); decalOf.get(cell).push(d); return d;
};
const hexPath = (g, k) => { const W = DW, H = DH; g.beginPath();
  [[W / 2, k], [W - k * .87, H / 4 + k / 2], [W - k * .87, H * 3 / 4 - k / 2], [W / 2, H - k], [k * .87, H * 3 / 4 - k / 2], [k * .87, H / 4 + k / 2]].forEach(([x, y], j) => j ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); };
const D_SANS = 'Inter, system-ui, sans-serif', D_MONO = '"JetBrains Mono", ui-monospace, monospace';
const teamFace = k => (g, t) => {
  const m = HX.TEAM[k];
  g.fillStyle = t.face; g.fillRect(0, 0, DW, DH);
  hexPath(g, 14); g.strokeStyle = m.color; g.lineWidth = 6; g.stroke();
  g.fillStyle = t.light ? m.ink || '#0d121d' : '#ffffff'; g.textAlign = 'center'; g.font = `700 104px ${D_SANS}`;
  g.fillText(m.initials || m.cursor.slice(0, 2).toUpperCase(), DW / 2, DH / 2 + 36);
};
for (let k = 0; k < Math.min(6, HX.TEAM.length); k++) addDecal(k + 1, 3, null, addDecal(k + 1, 2, teamFace(k))); /* las iniciales siguen en el sistema, con la misma textura */
for (let k = 0; k < 6; k++) addDecal(k + 1, 4, (g, t) => {
  g.fillStyle = t.phase; g.fillRect(0, 0, DW, DH); g.textAlign = 'center';
  g.fillStyle = t.phaseMuted; g.font = `500 36px ${D_MONO}`; g.fillText(String(k + 1).padStart(2, '0'), DW / 2, 98);
  g.fillStyle = t.phaseInk; g.font = `700 ${PHASES[k][0].length > 7 ? 46 : 54}px ${D_SANS}`; g.fillText(PHASES[k][0], DW / 2, 164);
  g.fillStyle = t.phaseMuted; g.font = `600 34px ${D_SANS}`; g.fillText(PHASES[k][1], DW / 2, 212);
});
addDecal(0, 4, (g, t) => {
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, DW, DH); g.textAlign = 'center'; g.fillStyle = '#0c3a36';
  g.font = `700 52px ${D_SANS}`; tr('Tu proyecto', 'Your project').split(' ').forEach((w, j) => g.fillText(w, DW / 2, 140 + j * 58));
});
/* la primera vez se pintan en un momento ocioso: no hacen falta hasta el capítulo del equipo y no deben retrasar el primer cuadro */
let decalTheme = null, decalReady = false;
const paintDecals = t => {
  if (decalReady) return drawDecals(t);
  const first = !decalTheme; decalTheme = t;
  if (first) (window.requestIdleCallback || (f => setTimeout(f, 200)))(() => { decalReady = true; drawDecals(decalTheme); render(true); }, { timeout: 1500 });
};
function drawDecals(t) { decals.forEach(d => { if (!d.draw) return; const g = d.cv.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, DW, DH); g.textAlign = 'start'; d.draw(g, t); d.tex.needsUpdate = true; }); }

/* Contorno del sistema: dibuja el hexágono grande que forman el equipo y la celda central */
const hexLoop = (R, rot, m) => { const pts = []; for (let k = 0; k <= 6; k++) { const a = rot + k * Math.PI / 3; pts.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0)); } const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), m); l.computeLineDistances(); return l; };
const hexPts = (R, rot) => Array.from({ length: 6 }, (_, k) => new THREE.Vector2(Math.cos(rot + k * Math.PI / 3) * R, Math.sin(rot + k * Math.PI / 3) * R));
const sysMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });
const sysShape = new THREE.Shape(hexPts(3.12, 0)); sysShape.holes.push(new THREE.Path(hexPts(2.98, 0).reverse()));
const sysRing = new THREE.Mesh(new THREE.ShapeGeometry(sysShape), sysMat); world.add(sysRing);
/* La celda vacía del equipo: un lugar para quien visita */
const youMat = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: .3, gapSize: .24, transparent: true, opacity: 0, depthWrite: false });
const youCell = new THREE.Group(); youCell.add(hexLoop(1.85, Math.PI / 6, youMat));
const youFillMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });
youCell.add(new THREE.Mesh(new THREE.ShapeGeometry(roundHex(1.85)), youFillMat)); world.add(youCell);
const youPos = new THREE.Vector3(), youA = new THREE.Vector4(), youB = new THREE.Vector4();
const youAnchor = (s, LL, out) => { /* x, y, z y escala de la celda libre en cada estado */
  const kh = wideHero() ? 1 : .74, up = wideHero() ? 0 : 1.1;
  if (s === 0) return out.set(LL.hero[0] - 3.4 * kh, LL.hero[1] - 5.5 * kh, .2, 1.05 * kh);
  if (s === 1) return out.set(LL.right[0], LL.right[1] - 3.7 * kh + up, .9, 1.25 * kh);
  if (s === 2) return out.set(LL.left[0], LL.left[1], 1.4, 1);
  if (s === 3) return out.set(LL.right[0] + cells[YOU_HOLE].x * 1.02, LL.right[1] + cells[YOU_HOLE].y * 1.02, .3, .52);
  if (s === 4) return out.set(LL.left[0], LL.left[1], .9, .92);
  return out.set(youTop.x, youTop.y, youTop.z, .62); /* el hueco, apenas sobre la superficie del planeta */
};
/* Pilares de luz: los proyectos en marcha del planeta se ven desde lejos (el tercero es el hueco «Tu proyecto») */
const beamGeo = new THREE.CylinderGeometry(.05, .05, 1, 8, 1, true); beamGeo.translate(0, .5, 0);
const beams = [0, 1].map(() => { const m = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })); m.visible = false; world.add(m); return m; });
const beamTop = [new THREE.Vector3(), new THREE.Vector3()], beamN = [new THREE.Vector3(), new THREE.Vector3()];
const youQ = new THREE.Quaternion(), youTop = new THREE.Vector3(), YAX = new THREE.Vector3(0, 1, 0);
/* La flecha del ciclo: avanza entre fases con el scroll */
const arrowMat = new THREE.MeshBasicMaterial({ color: 0x4fc4b8, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
const arrow = new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape([new THREE.Vector2(.42, 0), new THREE.Vector2(-.3, .32), new THREE.Vector2(-.14, 0), new THREE.Vector2(-.3, -.32)])), arrowMat);
world.add(arrow);
const PH_A = [1, 2, 3, 4, 5, 6].map(i => Math.atan2(cells[i].y, cells[i].x));
const PH_S = Math.sign(Math.atan2(Math.sin(PH_A[1] - PH_A[0]), Math.cos(PH_A[1] - PH_A[0]))) || 1; /* sentido del ciclo */
/* Arco de progreso sobre el anillo exterior: de la fase 01 a la activa */
const ARC_R = Math.sqrt(3) * 5.4, ARC_SEG = 144;
const arcMat = new THREE.MeshBasicMaterial({ color: 0x4fc4b8, transparent: true, opacity: 0, depthWrite: false });
const arc = new THREE.Mesh(new THREE.RingGeometry(ARC_R - .07, ARC_R + .07, ARC_SEG, 1, PH_S * (PH_A[0] - PH_S * Math.PI / 6), Math.PI * 2), arcMat);
arc.scale.y = PH_S; arc.renderOrder = 2; world.add(arc);
let phaseT = 0; /* fase activa continua, 0 a 6 */
/* Camino de luz: las celdas del suelo que caen bajo el anillo exterior se encienden una a una, de la fase 01 a la activa */
const PATH_U = new Float32Array(N).fill(-1);
for (let i = 7; i < N; i++) { const r = Math.hypot(cells[i].x, cells[i].y) * 1.02; if (Math.abs(r - ARC_R) < 1) {
  const a0 = PH_A[0] - PH_S * Math.PI / 6, d = PH_S * (Math.atan2(cells[i].y, cells[i].x) - a0); PATH_U[i] = (((d % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2); } }
let arcFrac = 0;

/* Interpolación */
const m4 = new THREE.Matrix4(), qa = new THREE.Quaternion(), qb = new THREE.Quaternion(), qs = new THREE.Quaternion(), spin = new THREE.Quaternion();
const pos = new THREE.Vector3(), scl = new THREE.Vector3(), tops = new Float32Array(N * 3), colTmp = new THREE.Color();
const plateM = new THREE.Matrix4(), plateP = new THREE.Vector3(), plateS = new THREE.Vector3(), plateTint = new THREE.Color(0xffffff), nrm = new THREE.Vector3();
const easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
let globeAngle = 0, time = 0, spinV = 0, spinDrag = null;
/* Girar el planeta: arrastre horizontal fuera del panel; al soltar conserva la velocidad y frena despacio */
{ const sp = document.getElementById('space');
  if (sp) {
    sp.classList.add('globe-drag');
    sp.addEventListener('pointerdown', e => { if (cur < 4.7 || e.button > 0 || e.target.closest('.panel, a, button')) return; spinDrag = { x: e.clientX, t: performance.now() }; spinV = 0; sp.setPointerCapture(e.pointerId); });
    sp.addEventListener('pointermove', e => { if (!spinDrag) return; const now = performance.now(), dx = e.clientX - spinDrag.x, da = dx * .006;
      globeAngle += da; spinV = da / Math.max(8, now - spinDrag.t); spinDrag.x = e.clientX; spinDrag.t = now; kick(); });
    const end = () => { if (!spinDrag) return; spinDrag = null; if (HX.still()) spinV = 0; kick(); };
    sp.addEventListener('pointerup', end); sp.addEventListener('pointercancel', end);
  } }
const gRot = new THREE.Quaternion(), gTilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(.38, 0, -.12));

function stateTo(s, i, outP, outQ) {
  if (s !== GLOBE) { outP.fromArray(P[s], i * 3); outQ.fromArray(Q[s], i * 4); return; }
  outP.fromArray(GLOBE_V, i * 3).applyQuaternion(gRot).multiplyScalar(globeR); outP.x += P[GLOBE][i * 3]; outP.y += P[GLOBE][i * 3 + 1];
  outQ.fromArray(Q[GLOBE], i * 4).premultiply(gRot);
}
const pA = new THREE.Vector3(), pB = new THREE.Vector3();
const foldN = new THREE.Vector3(), foldG = new THREE.Quaternion(), foldQ = new THREE.Quaternion(), foldT = new THREE.Quaternion(), IDQ = new THREE.Quaternion();
/* Dobla el plano: la celda recorre el mismo arco sobre una curvatura que crece de 0 (plano) a 1/R (esfera) */
function foldTo(i, e, LL, outP, outQ) {
  const R = globeR, d = globeDir(i), phi = Math.acos(Math.max(-1, Math.min(1, d[2]))), thG = Math.atan2(d[1], d[0]);
  const ox = pA.x - LL.left[0], oy = pA.y - LL.left[1], r0 = Math.hypot(ox, oy), thP = r0 > 1e-3 ? Math.atan2(oy, ox) : thG;
  /* la celda sale con el ángulo que tiene en el suelo y solo al final se corrige al de su lugar en el panal: el plano no se baraja */
  const th = thP + Math.atan2(Math.sin(thG - thP), Math.cos(thG - thP)) * e * e * e;
  const sArc = r0 + (phi * R - r0) * e, k = e / R;
  const rad = k > 1e-4 ? Math.sin(sArc * k) / k : sArc, zz = k > 1e-4 ? -(1 - Math.cos(sArc * k)) / k + R * e : 0, ang = sArc * k;
  outP.set(Math.cos(th) * rad, Math.sin(th) * rad, zz);
  foldN.set(Math.sin(ang) * Math.cos(th), Math.sin(ang) * Math.sin(th), Math.cos(ang)); outQ.setFromUnitVectors(Z, foldN).slerp(foldG.fromArray(GQ, i * 4), GON[i] ? e : 0);
  foldT.slerpQuaternions(IDQ, gRot, e); outP.applyQuaternion(foldT); outQ.premultiply(foldT);
  outP.x += LL.left[0] + (LL.globe[0] - LL.left[0]) * e; outP.y += LL.left[1] + (LL.globe[1] - LL.left[1]) * e; outP.z += pA.z * (1 - e);
}

let cur = HX.journey(), globeR = layout().globeR;
const Y = new THREE.Vector3(0, 1, 0);
const trailP = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
const lerpN = (x, y, t) => x + (y - x) * t;
function render(force) {
  const p = Math.min(S - 1, Math.max(0, cur));
  const LL = layout(), kk = wideHero() ? 1 : .74, up = wideHero() ? 0 : 1.1;
  const w4 = Math.max(0, 1 - Math.abs(p - 4) * 1.4), w2c = Math.max(0, 1 - Math.abs(p - 2) * 2.2), w3 = Math.max(0, 1 - Math.abs(p - 3) * 2.4);
  phaseT = HX.still() ? .5 : Math.min(5.999, Math.max(0, (p - 3.7) / .75 * 6)); /* una fase por cada ~1/8 de capítulo: el ciclo se recorre con calma, sin girar */
  arcFrac = Math.min(1, (phaseT + .5) / 6);
  const wG = Math.min(1, Math.max(0, (p - 4.55) / .4)); /* peso del planeta: pilares, hueco «Tu proyecto» */
  gRot.setFromAxisAngle(Y, globeAngle).premultiply(gTilt);
  const a = Math.min(S - 2, Math.floor(p)), f = p - a, b = a + 1;
  for (let i = 0; i < N; i++) {
    const c = cells[i];
    const grow = a === 2 && b === 3, growPanal = grow && i > 6; /* el sistema crece del equipo: primero llegan las seis celdas, después el panal por anillos */
    const folding = a === 4 && b === GLOBE; /* el suelo se pliega entero a la vez: sin retrasos por celda, para que no se rasgue */
    const t = folding ? f : grow ? (i <= 6 ? Math.min(1, f / .55) : Math.min(1, Math.max(0, (f - .38 - (c.d - 2) / Math.max(1, RAD - 2) * .42) / .2)))
                   : Math.min(1, Math.max(0, (f - c.delay) / (1 - .38)));
    const e = easeIO(t);
    stateTo(a, i, pA, qa); stateTo(b, i, pB, qb);
    if (folding) foldTo(i, e, LL, pos, foldQ);
    else pos.lerpVectors(pA, pB, e);
    if (growPanal) {
      /* cada celda del panal nace en el centro del equipo, que todavía viaja, y se abre hacia su lugar */
      const ce = easeIO(Math.min(1, f / .55)), cx = LL.left[0] + (LL.right[0] - LL.left[0]) * ce, cy = LL.left[1] + (LL.right[1] - LL.left[1]) * ce;
      pos.set(cx + (pB.x - LL.right[0]) * e, cy + (pB.y - LL.right[1]) * e, pB.z * e);
    }
    if (a === 0 && (i === 1 || i === 3 || i === 5)) trailP[(i - 1) / 2].copy(pos);
    if (b !== GLOBE && a !== GLOBE && !growPanal) pos.z += Math.sin(e * Math.PI) * (1.4 + c.h * 2.2); /* cada celda salta al cambiar de forma */
    if (folding) qs.copy(foldQ); else qs.slerpQuaternions(qa, qb, e);
    const flight = folding ? 0 : Math.sin(e * Math.PI); /* 0 en reposo, 1 a mitad del viaje */
    if (flight > .001 && !growPanal) { spin.setFromAxisAngle(Z, flight * (c.h > .5 ? 1.05 : -1.05)); qs.multiply(spin); }
    if (i === 0 && p < 1) { spin.setFromAxisAngle(Z, time * .00035); qs.multiply(spin); } /* la celda del inicio gira sobre sí misma */
    scl.set(
      SC[a][i * 3] + (SC[b][i * 3] - SC[a][i * 3]) * e,
      SC[a][i * 3 + 1] + (SC[b][i * 3 + 1] - SC[a][i * 3 + 1]) * e,
      SC[a][i * 3 + 2] + (SC[b][i * 3 + 2] - SC[a][i * 3 + 2]) * e);
    if (flight > .001) { scl.x *= 1 - flight * .18; scl.y *= 1 - flight * .18; }
    if ((a === GLOBE || b === GLOBE) && UPCOMING.has(i)) scl.z *= 1 + .35 * Math.sin(time * .0018 + i) * (b === GLOBE ? e : 1 - e); /* las celdas por construir laten despacio */
    let topDone = false;
    if (i === 1 || i === 3 || i === 5) {
      const f = FORMS[i], w = easeIO(Math.min(1, Math.max(0, (1 - Math.abs(p - 1) * 2.2) * 1.4)));
      if (w > .001) {
                (SIDE.matches && i !== 3 ? tmpV.set(.86 * scl.x * w, 0, .42 * scl.z) : tmpV.set(0, -.98 * scl.y * w, .42 * scl.z)).applyQuaternion(qs).add(pos); tops.set([tmpV.x, tmpV.y, tmpV.z], i * 3); topDone = true; /* al borde de la celda (a un lado en escritorio, debajo en pantallas angostas): la etiqueta no tapa la pieza */
        f.visible = true; f.position.copy(pos); f.quaternion.copy(qs); f.scale.set(scl.x * w, scl.y * w, scl.z * (.4 + .6 * w));
        scl.multiplyScalar(1 - w);
      } else f.visible = false;
    }
    let act = 0;
    if (w4 > 0 && i >= 1 && i <= 6) { act = Math.max(0, 1 - Math.abs(phaseT - (i - 1) - .5)) * w4; scl.z *= 1 + act * 1.1; }
    else if (w4 > 0 && PATH_U[i] >= 0) { act = Math.min(1, Math.max(0, (arcFrac - PATH_U[i]) * 30)) * w4 * .85; scl.z *= 1 + act * 2.2; } /* el camino de luz sube un poco */
    m4.compose(pos, qs, scl); mesh.setMatrixAt(i, m4);
    nrm.set(0, 0, 1).applyQuaternion(qs); plateP.copy(pos).addScaledVector(nrm, 1.07 * scl.z + .04); plateS.set(scl.x, scl.y, 1);
    plateM.compose(plateP, qs, plateS); plates.setMatrixAt(i, plateM); /* la placa flota a distancia fija: sin parpadeo en celdas bajas */
    const ce = Math.min(1, Math.max(0, (e - .35) / .3)); /* el color cambia rápido a mitad del vuelo: sin tonos grises intermedios */
    colTmp.setRGB(C[a][i * 3] + (C[b][i * 3] - C[a][i * 3]) * ce, C[a][i * 3 + 1] + (C[b][i * 3 + 1] - C[a][i * 3 + 1]) * ce, C[a][i * 3 + 2] + (C[b][i * 3 + 2] - C[a][i * 3 + 2]) * ce);
    if (act > 0) colTmp.lerp(phaseHi, act);
    mesh.setColorAt(i, colTmp);
    colTmp.lerp(plateTint, .14); if (w4 > 0 && i > 6) colTmp.multiplyScalar(1 - .38 * w4); /* el suelo del ciclo se apaga: mandan las fases */
    plates.setColorAt(i, colTmp);
    if (topNeed[i] && !topDone) {
      tmpV.set(0, 0, 1.1).applyQuaternion(qs).multiplyScalar(scl.z).add(pos);
      /* equipo: el cursor sale hacia afuera de su celda y no tapa las iniciales */
      if (i >= 1 && i <= 6 && w2c > 0) { const dx = pos.x - LL.left[0], dy = pos.y - LL.left[1], dl = Math.hypot(dx, dy) || 1; tmpV.x += dx / dl * 1.5 * scl.x * w2c; tmpV.y += dy / dl * 1.5 * scl.x * w2c; }
      tops.set([tmpV.x, tmpV.y, tmpV.z], i * 3);
    }
    { const pk = PROJ.indexOf(i); if (pk === 2) { youQ.copy(qs); youTop.copy(pos).addScaledVector(tmpV.set(0, 0, 1).applyQuaternion(qs), .35); } else if (pk >= 0) { beamN[pk].set(0, 0, 1).applyQuaternion(qs); beamTop[pk].copy(pos).addScaledVector(beamN[pk], 1.07 * scl.z); } }
    const dls = decalOf.get(i);
    if (dls) for (const d of dls) {
      const dw = Math.min(1, Math.max(0, (1 - Math.abs(p - d.state) * 2.2) * 2.4 - .5)); /* opaca en casi todo el capítulo y fuera antes de que la celda vuele */
      d.mesh.visible = dw > .01 && scl.x > .05;
      if (d.mesh.visible) { plateP.addScaledVector(nrm, .025); d.mesh.matrix.compose(plateP, qs, plateS); d.mesh.matrixWorldNeedsUpdate = true; d.mesh.material.opacity = dw; plateP.addScaledVector(nrm, -.025); }
    }
  }
  mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor.needsUpdate = true;
  plates.instanceMatrix.needsUpdate = true; if (plates.instanceColor) plates.instanceColor.needsUpdate = true;
  /* el fondo sube con el recorrido, más lento que las formas: profundidad */
  dustGroup.position.y = p * 3.2; dustGroup.rotation.z = time * .000012;
  starMat.uniforms.uScroll.value = p * 1.4; starMat.uniforms.uTime.value = time;
  NEB.forEach((sp, k) => { sp.position.y = sp.userData.y + p * 2; sp.position.x = sp.userData.x + Math.sin(time * .00004 + k * 2) * 3; });

  /* el cristal: grande en el origen, pequeño y vacío cuando la luz sale, y se apaga después */
  {
    const t1 = easeIO(Math.min(1, p)), fade = 1 - easeIO(Math.min(1, Math.max(0, (p - .9) * 3.2)));
    crystal.visible = fade > .01;
    if (crystal.visible) {
      tmpE.set(lerpN(.95, .6, t1), lerpN(-.42, -.28, t1), lerpN(.18, .08, t1)); crystal.quaternion.setFromEuler(tmpE);
      spin.setFromAxisAngle(Z, time * .00035); crystal.quaternion.multiply(spin);
      crystal.position.set(lerpN(LL.hero[0], LL.right[0], t1), lerpN(LL.hero[1], LL.right[1] + up, t1), 0);
      const sc = lerpN(wideHero() ? 3.3 : 3.2, 1.5 * kk, t1) * fade; crystal.scale.set(sc, sc, sc * .42);
      edgeMat.opacity = .32 * fade;
    }
    /* el núcleo: dentro del cristal, después en el centro del panal; en el ciclo se atenúa para dejar leer «Tu proyecto»; dentro del mundo */
    const CORE = [[LL.hero[0], LL.hero[1], 0, 1, 1], [LL.right[0], LL.right[1] + up, 0, .35, .6], [LL.left[0], LL.left[1], 0, 0, .3], [LL.right[0], LL.right[1], 3.6, .75, .8], [LL.left[0], LL.left[1], 1, .18, .9], [LL.globe[0], LL.globe[1], 0, .25, .7]];
    const ca = Math.min(S - 2, Math.floor(p)), cf = easeIO(p - ca), A = CORE[ca], B = CORE[ca + 1];
    const pulse = 1 + .07 * Math.sin(time * .0026);
    coreHalo.position.set(lerpN(A[0], B[0], cf) + sm.x * .5, lerpN(A[1], B[1], cf) - sm.y * .4, lerpN(A[2], B[2], cf));
    coreDot.position.copy(coreHalo.position);
    const cs = lerpN(A[4], B[4], cf) * pulse, co = lerpN(A[3], B[3], cf);
    coreHalo.scale.set(5.2 * cs, 5.2 * cs, 1); coreDot.scale.set(1.3 * cs, 1.3 * cs, 1);
    coreHalo.material.opacity = .55 * co; coreDot.material.opacity = co;
    /* estelas de la división */
    const fl = p < 1 ? Math.sin(Math.min(1, p) * Math.PI) : 0;
    trails.forEach((tr, k) => { tr.position.copy(trailP[k]); tr.material.opacity = fl * .9; const ts = 2.6 * (.6 + fl * .6); tr.scale.set(ts, ts, 1); });
    /* órbitas */
    orbitMat.opacity = w4 * .3; orbits.position.set(LL.left[0], LL.left[1], 0); orbits.visible = w4 > .01;
    arrow.visible = w4 > .01; arc.visible = false; arrowMat.opacity = w4 * .95; arcMat.opacity = w4 * .9;
    if (arrow.visible) {
      /* el arco crece fase a fase con el scroll y la flecha va en su punta */
      const frac = arcFrac, head = PH_A[0] - PH_S * Math.PI / 6 + PH_S * frac * Math.PI * 2;
      arc.geometry.setDrawRange(0, Math.max(6, Math.round(frac * ARC_SEG) * 6)); arc.position.set(LL.left[0], LL.left[1], .45);
      arrow.position.set(LL.left[0] + Math.cos(head) * ARC_R, LL.left[1] + Math.sin(head) * ARC_R, .5); arrow.scale.setScalar(1.3); arrow.rotation.z = head + PH_S * Math.PI / 2;
    }
    /* contorno del sistema y celda vacía del equipo */
    /* pilares: suben al cerrarse el planeta */
    beams.forEach((m, k) => { m.visible = wG > .01; if (!m.visible) return; m.position.copy(beamTop[k]); m.quaternion.setFromUnitVectors(YAX, beamN[k]); m.scale.set(1, 3.4 * easeIO(wG), 1); m.material.opacity = .55 * wG; });
    sysMat.opacity = w3 * .55; sysRing.visible = w3 > .01; sysRing.position.set(LL.right[0], LL.right[1], 4.3);
    /* la celda libre viaja de estado en estado con el mismo scroll; en el ciclo abraza «Tu proyecto» y en el planeta se funde con él */
    { const ya = Math.min(S - 2, Math.floor(p)), yf = HX.still() ? Math.round(p - ya) : easeIO(p - ya);
      youAnchor(ya, LL, youA); youAnchor(ya + 1, LL, youB); youA.lerp(youB, yf);
      youPos.set(youA.x, youA.y, youA.z); youCell.position.copy(youPos); youCell.scale.setScalar(youA.w);
      youCell.quaternion.slerpQuaternions(IDQ, youQ, wG); /* en el planeta, el hueco se apoya en la superficie */
      const ow = wideHero() || p > .5 ? 1 : 0;
      youMat.opacity = ow * .8; youFillMat.opacity = ow * (.07 + .2 * wG); /* en el planeta el hueco brilla un poco: espera un proyecto */ youCell.visible = ow > .01; }
  }

  /* luz de acento: acompaña la forma activa */
  const L = layout();
  const focus = p < .5 ? L.hero : (Math.round(p) % 2 ? L.right : L.left);
  glow.position.x += (focus[0] - glow.position.x) * .08;
  glow.position.y += (focus[1] - 3 - glow.position.y) * .08;

  /* la retícula crece alrededor de la forma activa: una celda en la idea, completa en el planeta */
  { const k = HX.still() ? 1 : .08; gridC.x += (focus[0] - gridC.x) * k; gridC.y += (focus[1] - gridC.y) * k; gridC.z = 0; }
  tmpV.copy(gridC).applyMatrix4(camera.matrixWorldInverse);
  gridMat.uniforms.uCenter.value.set(tmpV.x, tmpV.y).multiplyScalar(GRID_D / -tmpV.z);
  { const gp = Math.min(S - 1, Math.max(0, cur)) / (S - 1); gridMat.uniforms.uReveal.value = gridMat.uniforms.uCell.value * (.75 + Math.pow(gp, 2.2) * 24); gridMat.uniforms.uFront.value = 1 - gp * .7; gridMat.uniforms.uOff.value = gp * 6; }
  renderer.render(scene, camera);

  /* etiquetas */
  const w = host.clientWidth, h = host.clientHeight;
  world.updateMatrixWorld();
  { /* «Tú»: visible del origen al sistema; en el ciclo y el planeta habla la celda «Tu proyecto» */
    const settle = HX.still() ? 1 : Math.min(1, Math.max(0, (1 - Math.abs(p - Math.round(p)) * 2.6) * 2 - .3)); /* entre capítulos se apaga: no flota suelta mientras las celdas viajan */
    const lw = (wideHero() || p > .5 ? 1 : 0) * (1 - Math.min(1, Math.max(0, (p - 3.45) * 2.5))) * settle;
    const si = Math.round(p), sub = si >= 0 && si < 6 ? YOU_SUB[si] : null;
    if (si !== youSub) { youSub = si; youLab.innerHTML = `<b>${tr('Tú', 'You')}${sub ? `<small>${sub}</small>` : ''}</b>`; }
    youLab.style.opacity = lw.toFixed(3);
    if (lw > .001) { tmpV.copy(youPos).applyMatrix4(world.matrixWorld).project(camera); youLab.style.transform = `translate3d(${((tmpV.x * .5 + .5) * w).toFixed(1)}px, ${((-tmpV.y * .5 + .5) * h).toFixed(1)}px, 0)`; }
  }
  for (const l of labs) {
    let wgt = Math.min(1, Math.max(0, (1 - Math.abs(p - l.state) * 2.6) * 2 - .3)); /* casi siempre del todo visible o apagada: sin etiquetas a medias sobre las celdas */
    if (l.globe && wgt > 0) { nrm.fromArray(GLOBE_V, l.cell * 3).applyQuaternion(gRot); wgt *= Math.min(1, Math.max(0, (nrm.dot(camDir) - .58) * 6)); }
    if (wgt <= .001) { if (l.el.style.opacity !== '0') l.el.style.opacity = '0'; continue; }
    tmpV.fromArray(tops, l.cell * 3).applyMatrix4(world.matrixWorld).project(camera);
    const x = (tmpV.x * .5 + .5) * w, y = (-tmpV.y * .5 + .5) * h;
    if (l.team) l.el.classList.toggle('flip', tops[l.cell * 3] < LL.left[0] - .5);
    l.el.style.opacity = wgt.toFixed(3);
    if (!l.hw) l.hw = (l.el.firstElementChild ? l.el.firstElementChild.offsetWidth : 120) / 2 + 10;
    const cx = l.el.classList.contains('right') && SIDE.matches ? Math.min(w - l.hw * 2 - 112, x) /* la etiqueta lateral no se sale por la derecha */
      : l.el.classList.contains('phase') ? Math.min(w - l.hw, Math.max(l.hw, x)) : l.el.classList.contains('flip') ? Math.max(l.hw * 2, x) : Math.min(w - l.hw * 2, x);
    l.el.style.transform = `translate3d(${cx.toFixed(1)}px, ${(y + (1 - wgt) * 10).toFixed(1)}px, 0)`;
  }
}

/* Cámara y tamaño */
function resize() {
  const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  const dist = w / h < 1 ? 46 * Math.min(1.5, .9 / (w / h) * .62 + .4) : 46;
  camera.position.copy(camDir).multiplyScalar(dist);
  /* la niebla empieza detrás de las formas a cualquier distancia de cámara (en el teléfono la cámara está más lejos) */
  scene.fog.near = dist - 6; scene.fog.far = dist + 46;
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  globeR = layout().globeR;
  buildShapes(); render(true);
}

/* Puntero: la escena se inclina hacia él con un resorte */
const ptr = { x: 0, y: 0 }, sm = { x: 0, y: 0, vx: 0, vy: 0 };
if (matchMedia('(hover: hover) and (pointer: fine)').matches) addEventListener('pointermove', e => { ptr.x = e.clientX / innerWidth - .5; ptr.y = e.clientY / innerHeight - .5; kick(); }, { passive: true });

/* Bucle: solo mientras el recorrido está en pantalla */
let visible = true, raf = 0, last = performance.now(), fading = false, lastDraw = 0, wasMoving = true;
if (HX.still()) cur = Math.round(cur);
function frame(now) {
  raf = 0; if (!visible) return;
  /* en reposo (solo el giro lento) basta con ~30 fps; al hacer scroll o mover el puntero, todos los cuadros */
  if (!wasMoving && Math.abs(HX.journey() - cur) < .0005 && now - lastDraw < 33) { raf = requestAnimationFrame(frame); return; }
  lastDraw = now;
  const dt = Math.min(120, now - last); last = now; /* en equipos lentos la forma no se queda atrás del scroll */
  const still = HX.still();
  const target = HX.journey();
  if (still) {
    const next = Math.round(target);
    if (next !== Math.round(cur) && !fading) { fading = true; canvas.style.opacity = '0'; setTimeout(() => { cur = next; render(); canvas.style.opacity = ''; fading = false; }, 220); }
  }
  else cur += (target - cur) * (1 - Math.exp(-dt / 160)); /* el scroll arrastra la forma con algo de peso */
  if (!still) {
    time += dt;
    if (cur < 4.5) { globeAngle = 0; spinV = 0; } /* el pliegue siempre cierra con el polo mirando a quien visita */
    else if (!spinDrag && cur > 4.95) { globeAngle += dt * (.00012 + spinV); spinV *= Math.pow(.996, dt); if (Math.abs(spinV) > 1e-6) wasMoving = true; }
    const k = 120, d = 22, s = dt / 1000; /* amortiguación 2·√k: llega sin pasarse */
    sm.vx += ((ptr.x - sm.x) * k - sm.vx * d) * s; sm.vy += ((ptr.y - sm.y) * k - sm.vy * d) * s;
    sm.x += sm.vx * s; sm.y += sm.vy * s;
    world.rotation.y = sm.x * .16; world.rotation.x = sm.y * .1;
    glow.position.z = 9 + sm.y * -3;
  }
  render();
  const moving = Math.abs(target - cur) > .0005 || Math.abs(sm.vx) + Math.abs(sm.vy) > .0005 || Math.abs(ptr.x - sm.x) + Math.abs(ptr.y - sm.y) > .001;
  const idleAnim = !still && (cur < 1.05 || cur > 3.55); /* el cristal late, las fases orbitan y el planeta rota */
  wasMoving = moving;
  if (moving || idleAnim) raf = requestAnimationFrame(frame);
}
function kick() { wasMoving = true; if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(frame); } }
new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }, { rootMargin: '100px 0px' }).observe(document.getElementById('historia'));
document.addEventListener('hx:scroll', kick);
document.addEventListener('hx:motion', () => { starMat.uniforms.uTwinkle.value = HX.still() ? 0 : 1; kick(); });
document.addEventListener('hx:colors', () => setTimeout(buildColors, 30));
new ResizeObserver(resize).observe(host);

buildShapes();
for (let i = 0; i < N; i++) { mesh.setColorAt(i, col.set(0x000000)); plates.setColorAt(i, col); }
buildColors();
if (document.fonts) Promise.all([document.fonts.load('500 40px "JetBrains Mono"'), document.fonts.load('600 40px Inter')]).then(buildColors, () => {});
resize();
warm().then(() => {
  render(true);
  requestAnimationFrame(() => { host.classList.remove('no-gl'); host.classList.add('gl-ready'); kick(); });
  (window.requestIdleCallback || (f => setTimeout(f, 400)))(makeEnv, { timeout: 2000 });
});
