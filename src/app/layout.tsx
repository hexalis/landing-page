import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Red Lace Core · Crear en equipo, compartir conocimiento",
  description:
    "Colectivo que combina diseño, tecnología y ciencia abierta para crear herramientas útiles y compartir conocimiento. Proyectos, equipo y forma de trabajo de Red Lace Core.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
