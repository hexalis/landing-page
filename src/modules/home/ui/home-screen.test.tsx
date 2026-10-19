import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeScreen } from "./home-screen";

describe("HomeScreen", () => {
  it("presents the open science vision and the proposal entry point", () => {
    render(<HomeScreen />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "La ciencia abierta, al alcance de toda la humanidad.",
      }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "NASA Space Apps Challenge 2026" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Proponer una plataforma" })).toHaveAttribute(
      "href",
      expect.stringContaining("https://github.com/hexalis/landing-page/issues/new"),
    );
  });
});
