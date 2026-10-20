import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectsSection } from "./projects-section";

describe("ProjectsSection", () => {
  it("filters the portfolio by category and restores every project", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("3 proyectos")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Herramientas" }));
    expect(screen.getByText("2 proyectos")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Hexalis" })).toBeVisible();
    expect(screen.queryByRole("heading", { name: /Explorador Global/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Experiencias" }));
    expect(screen.getByText("1 proyecto")).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Hexalis" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Todos" }));
    expect(screen.getByText("3 proyectos")).toBeVisible();
  });
});
