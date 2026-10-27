import type { Locale } from '../lib/routes';
const es = {
  title: 'Hexalis · Diseño y código open source',
  description: 'Hexalis es una organización sin fines de lucro que diseña y programa proyectos open source: un sistema de diseño, un kit para documentar y proyectos para la comunidad.',
  shareDescription: 'El conocimiento es universal. Hexalis Design System, Hexalis Design Ops Toolkit y proyectos open source para cualquier persona.',
  missing: 'Página no encontrada', missingText: 'La dirección no existe. Puedes continuar desde el inicio.', back: 'Volver al inicio',
};
type Dictionary = { [K in keyof typeof es]: string };
const en: Dictionary = {
  title: 'Hexalis · Open source design and code',
  description: 'Hexalis is a non-profit that designs and builds open source projects: a design system, a documentation kit and projects for the community.',
  shareDescription: 'Knowledge is universal. Hexalis Design System, Hexalis Design Ops Toolkit and open source projects for anyone.',
  missing: 'Page not found', missingText: 'This address does not exist. Continue from the home page.', back: 'Back to home',
};
export function ui(locale: Locale): Dictionary { return locale === 'es' ? es : en; }
