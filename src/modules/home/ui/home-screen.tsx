import Link from "next/link";
import { tv } from "tailwind-variants";

const REPO_URL = "https://github.com/hexalis/landing-page";
const PROPOSAL_URL = `${REPO_URL}/issues/new?title=${encodeURIComponent("Propuesta: ")}`;
const FUNDING_URL = `${REPO_URL}/issues/new?title=${encodeURIComponent("Funding: ")}`;

const navLinks = [
  { href: "#vision", label: "Visión" },
  { href: "#iniciativas", label: "Iniciativas" },
  { href: "#hoja-de-ruta", label: "Hoja de ruta" },
  { href: "#participa", label: "Participa" },
  { href: "#funding", label: "Funding" },
];

const principles = [
  {
    title: "Datos públicos, alcance público",
    body: "Las agencias ya publican datos del espacio, la Tierra, el clima y la economía. Nuestro trabajo es que lleguen a más personas en interfaces que se entiendan.",
  },
  {
    title: "Código abierto desde el primer commit",
    body: "Todo vive en GitHub. Cualquiera puede leer, proponer, corregir o construir su propia plataforma sobre nuestros paquetes.",
  },
  {
    title: "Gobernanza de quien contribuye",
    body: "Las decisiones se toman en público y quienes aportan conservan su acceso y su voz en la iniciativa.",
  },
];

const initiatives = [
  {
    name: "NASA Open Science",
    body: "Política de ciencia abierta de NASA y su programa TOPS para que datos, código y publicaciones sean accesibles.",
    href: "https://science.nasa.gov/open-science/",
  },
  {
    name: "NASA Earthdata",
    body: "Acceso abierto a los datos de observación de la Tierra de las misiones de NASA.",
    href: "https://www.earthdata.nasa.gov/",
  },
  {
    name: "Copernicus",
    body: "Programa europeo de observación de la Tierra con datos libres y abiertos.",
    href: "https://www.copernicus.eu/",
  },
  {
    name: "NOAA Open Data Dissemination",
    body: "Datos ambientales de NOAA publicados en la nube para uso público.",
    href: "https://www.noaa.gov/nodd",
  },
  {
    name: "UNESCO · Ciencia Abierta",
    body: "Recomendación internacional que define principios comunes de ciencia abierta.",
    href: "https://www.unesco.org/en/open-science",
  },
  {
    name: "Banco Mundial · Open Data",
    body: "Indicadores económicos y de desarrollo de libre acceso para todos los países.",
    href: "https://data.worldbank.org/",
  },
];

const roadmapItem = tv({
  base: "grid gap-2 rounded-2xl border p-6",
  variants: {
    stage: {
      now: "border-amber-400 bg-amber-50",
      next: "border-stone-300 bg-white",
    },
  },
  defaultVariants: { stage: "next" },
});

const roadmap = [
  {
    stage: "now",
    tag: "Primera plataforma",
    title: "NASA Space Apps Challenge 2026",
    body: "Una plataforma para conocer los retos, los datos y los proyectos del challenge.",
  },
  {
    stage: "next",
    tag: "Plataforma",
    title: "La Tierra en 20 años",
    body: "Eventos y anomalías del planeta en las últimas dos décadas, explorables en el tiempo y en el mapa.",
  },
  {
    stage: "next",
    tag: "Base",
    title: "Design system Hexalis",
    body: "Componentes y lineamientos visuales compartidos por todas las plataformas.",
  },
  {
    stage: "next",
    tag: "Base",
    title: "Paquetes core en npm",
    body: "Clientes de datos, utilidades y visualizaciones reutilizables, publicados y versionados.",
  },
  {
    stage: "next",
    tag: "Ecosistema",
    title: "Plataformas de la comunidad",
    body: "Cada plataforma en su propio repositorio, construida sobre el design system y los paquetes core.",
  },
] as const;

const steps = [
  {
    title: "Propón",
    body: "Abre un issue con la plataforma que quieres crear y los datos que usaría.",
  },
  {
    title: "Conversa",
    body: "La comunidad revisa la propuesta en público y la ajusta antes de construir.",
  },
  {
    title: "Construye",
    body: "Usa el design system y los paquetes core. Tu plataforma vive en su repositorio.",
  },
  {
    title: "Difunde",
    body: "La landing la enlaza como punto de entrada para que llegue a más personas.",
  },
];

const ctaLink = tv({
  base: "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
  variants: {
    intent: {
      primary: "bg-amber-400 text-stone-950 hover:bg-amber-300 focus-visible:outline-amber-300",
      ghost: "border border-white/25 text-white hover:border-white/60 focus-visible:outline-white",
    },
  },
  defaultVariants: { intent: "primary" },
});

function HexMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <path
        d="M16 2 28.1 9v14L16 30 3.9 23V9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M16 9.5 21.6 12.75v6.5L16 22.5l-5.6-3.25v-6.5Z" fill="currentColor" />
    </svg>
  );
}

function SectionHeading({ id, kicker, title }: { id: string; kicker: string; title: string }) {
  return (
    <div className="grid max-w-3xl gap-3">
      <p className="text-sm font-semibold tracking-[0.12em] text-amber-700 uppercase">{kicker}</p>
      <h2 id={id} className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export function HomeScreen() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <header className="bg-stone-950 text-white">
        <div className="mx-auto flex w-[min(100%-2rem,72rem)] items-center justify-between gap-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-3 font-bold tracking-tight text-amber-400"
          >
            <HexMark />
            <span className="text-lg text-white">Hexalis</span>
          </Link>
          <nav aria-label="Secciones" className="hidden gap-6 text-sm text-stone-300 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <a href={REPO_URL} className="text-sm font-semibold text-white hover:text-amber-300">
            GitHub <span aria-hidden="true">{"\u2197\uFE0E"}</span>
          </a>
        </div>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="bg-stone-950 pt-16 pb-24 text-white">
          <div className="mx-auto grid w-[min(100%-2rem,72rem)] gap-8">
            <p className="text-sm font-semibold tracking-[0.12em] text-amber-400 uppercase">
              Hexalis es una filosofía
            </p>
            <h1
              id="hero-title"
              className="max-w-[18ch] text-[clamp(2.5rem,7vw,5rem)] leading-[1] font-bold tracking-[-0.04em]"
            >
              La ciencia abierta, al alcance de toda la humanidad.
            </h1>
            <p className="max-w-[62ch] text-lg leading-8 text-stone-300">
              Las agencias que estudian el espacio, la Tierra y la economía comparten sus datos con
              el mundo. Construimos plataformas abiertas para que esos datos lleguen a la mayor
              cantidad de personas posible.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={PROPOSAL_URL} className={ctaLink()}>
                Proponer una plataforma
              </a>
              <a href="#funding" className={ctaLink({ intent: "ghost" })}>
                Apoyar el proyecto
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="vision" className="py-24">
          <div className="mx-auto grid w-[min(100%-2rem,72rem)] gap-12">
            <SectionHeading
              id="vision"
              kicker="Visión"
              title="Seguimos la visión de ciencia abierta que comparten NASA y otras entidades."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((principle) => (
                <article key={principle.title} className="grid content-start gap-3">
                  <h3 className="text-lg font-semibold">{principle.title}</h3>
                  <p className="leading-7 text-stone-600">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="iniciativas" className="border-y border-stone-200 bg-white py-24">
          <div className="mx-auto grid w-[min(100%-2rem,72rem)] gap-12">
            <SectionHeading
              id="iniciativas"
              kicker="Corrientes e iniciativas"
              title="Iniciativas que abren la ciencia y en las que nos inspiramos."
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {initiatives.map((initiative) => (
                <li key={initiative.name}>
                  <a
                    href={initiative.href}
                    className="grid h-full content-start gap-2 rounded-2xl border border-stone-200 p-6 transition-colors hover:border-amber-500 focus-visible:outline-2 focus-visible:outline-amber-500"
                  >
                    <span className="font-semibold">
                      {initiative.name} <span aria-hidden="true">{"\u2197\uFE0E"}</span>
                    </span>
                    <span className="leading-6 text-stone-600">{initiative.body}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="hoja-de-ruta" className="py-24">
          <div className="mx-auto grid w-[min(100%-2rem,72rem)] gap-12">
            <SectionHeading
              id="hoja-de-ruta"
              kicker="Hoja de ruta"
              title="Empezamos con una plataforma y una base compartida."
            />
            <ol className="grid gap-4 md:grid-cols-2">
              {roadmap.map((item) => (
                <li key={item.title} className={roadmapItem({ stage: item.stage })}>
                  <span className="text-xs font-semibold tracking-[0.1em] text-stone-500 uppercase">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="leading-7 text-stone-600">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="participa" className="bg-stone-950 py-24 text-white">
          <div className="mx-auto grid w-[min(100%-2rem,72rem)] gap-12">
            <div className="grid max-w-3xl gap-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-amber-400 uppercase">
                Participa
              </p>
              <h2 id="participa" className="text-3xl leading-tight font-bold sm:text-4xl">
                Somos seis personas. Queremos ser muchas más.
              </h2>
              <p className="text-lg leading-8 text-stone-300">
                Esta landing es el punto de entrada de las propuestas. Cualquier persona puede
                enviar la suya en GitHub.
              </p>
            </div>
            <ol className="grid gap-6 md:grid-cols-4">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid content-start gap-2 border-t border-white/15 pt-4"
                >
                  <span className="font-mono text-sm text-amber-400">0{index + 1}</span>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="leading-7 text-stone-300">{step.body}</p>
                </li>
              ))}
            </ol>
            <div>
              <a href={PROPOSAL_URL} className={ctaLink()}>
                Enviar una propuesta en GitHub
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="funding" className="py-24">
          <div className="mx-auto grid w-[min(100%-2rem,72rem)] gap-6 rounded-3xl border border-amber-300 bg-amber-50 p-8 sm:p-12">
            <SectionHeading
              id="funding"
              kicker="Funding"
              title="Buscamos financiamiento para esta etapa."
            />
            <p className="max-w-[62ch] text-lg leading-8 text-stone-700">
              El apoyo financiero nos permite construir el design system, publicar los paquetes core
              y lanzar las primeras plataformas. Si tu organización comparte esta visión,
              conversemos.
            </p>
            <div>
              <a
                href={FUNDING_URL}
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
              >
                Hablemos de funding
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 py-10 text-sm text-stone-500">
        <div className="mx-auto flex w-[min(100%-2rem,72rem)] flex-wrap items-center justify-between gap-4">
          <span>Hexalis · ciencia abierta para la humanidad.</span>
          <a href={REPO_URL} className="hover:text-stone-900">
            Código en GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
