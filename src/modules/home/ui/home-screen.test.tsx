import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeScreen } from "./home-screen";

describe("HomeScreen", () => {
  it("presents the team, portfolio and invitation to collaborate", () => {
    render(<HomeScreen />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Crear en equipo.*Compartir conocimiento/ }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: /Del proceso.*al proyecto/ })).toBeVisible();
    expect(screen.getByRole("heading", { name: /Ninguna idea llega lejos/ })).toBeVisible();
    expect(screen.getByRole("link", { name: /Abrir una conversación/ })).toHaveAttribute(
      "href",
      "https://github.com/hexalis/landing-page/issues/new?title=Conversemos",
    );
  });
});
