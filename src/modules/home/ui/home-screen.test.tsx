import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeScreen } from "./home-screen";

describe("HomeScreen", () => {
  it("presents the project, labels the concept preview, and links to the repository", () => {
    render(<HomeScreen />);

    expect(
      screen.getByRole("heading", { level: 1, name: "La Tierra nos está hablando." }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: /Del dato aislado a una historia visible/ }),
    ).toBeVisible();
    expect(screen.getByText("VISTA CONCEPTUAL · SIN DATOS EN VIVO")).toBeVisible();
    expect(screen.getByText(/no representan mediciones actuales/)).toBeVisible();
    expect(screen.getByRole("link", { name: /Explorar el repositorio/ })).toHaveAttribute(
      "href",
      "https://github.com/hexalis/landing-page",
    );
  });
});
