import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CoreJourney } from "./core-journey";

vi.mock("next/dynamic", () => ({
  default: () =>
    function PlayerStub({ isMotionEnabled }: { isMotionEnabled: boolean }) {
      return <div data-testid="player" data-motion-enabled={isMotionEnabled} />;
    },
}));

afterEach(() => vi.unstubAllGlobals());

describe("CoreJourney", () => {
  it("starts without the player for reduced motion and allows a deliberate opt-in and pause", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      addEventListener: vi.fn<() => void>(),
      removeEventListener: vi.fn<() => void>(),
    }));
    render(<CoreJourney />);
    expect(screen.queryByTestId("player")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Activar movimiento de la escena" }));
    expect(screen.getByTestId("player")).toHaveAttribute("data-motion-enabled", "true");
    fireEvent.click(screen.getByRole("button", { name: "Pausar movimiento de la escena" }));
    expect(screen.getByTestId("player")).toHaveAttribute("data-motion-enabled", "false");
  });
});
