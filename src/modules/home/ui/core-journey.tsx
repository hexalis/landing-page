"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const JourneyPlayer = dynamic(
  () => import("./journey-player").then((module) => module.JourneyPlayer),
  { ssr: false },
);

export function CoreJourney() {
  const [isMotionEnabled, setIsMotionEnabled] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      const canAnimate = !preference.matches;
      setIsMotionEnabled(canAnimate);
      if (canAnimate) setHasStarted(true);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  const handleToggleMotion = () => {
    setIsMotionEnabled((previous) => !previous);
    setHasStarted(true);
  };

  return (
    <div className="journey-stage" data-motion={isMotionEnabled ? "active" : "static"}>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="journey-poster" />
        {hasStarted && <JourneyPlayer isMotionEnabled={isMotionEnabled} />}
        <div className="journey-vignette" />
      </div>
      <div className="journey-instrument" aria-hidden="true">
        <span className="journey-instrument-line" />
        <span>
          DE LA IDEA
          <br />
          <b>AL APORTE</b>
        </span>
      </div>
      <button
        type="button"
        onClick={handleToggleMotion}
        className="motion-control"
        aria-label={
          isMotionEnabled ? "Pausar movimiento de la escena" : "Activar movimiento de la escena"
        }
      >
        <span aria-hidden="true">{isMotionEnabled ? "Ⅱ" : "▷"}</span>
        {isMotionEnabled ? "Pausar movimiento" : "Activar movimiento"}
      </button>
    </div>
  );
}
