import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Red Lace Core · Explorador Global de Anomalías Terrestres",
  description:
    "Una nueva forma de explorar anomalías del océano, el hielo y la vegetación con datos abiertos de la NASA. Concepto de Red Lace Core para NASA Space Apps Challenge 2026.",
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
