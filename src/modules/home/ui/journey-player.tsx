import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState } from "react";
import { CoreJourneyComposition, JOURNEY_DURATION } from "./core-journey-composition";

export function JourneyPlayer({ isMotionEnabled }: { isMotionEnabled: boolean }) {
  const playerRef = useRef<PlayerRef>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const hasIntroduced = useRef(false);
  const [size, setSize] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.max(1, Math.round(entry.contentRect.width));
      const height = Math.max(1, Math.round(entry.contentRect.height));
      setSize((previous) =>
        previous.width === width && previous.height === height ? previous : { width, height },
      );
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMotionEnabled) return;
    const section = hostRef.current?.closest<HTMLElement>("[data-core-journey]");
    if (!section) return;
    let animation = 0;
    const startedAt = performance.now();
    let lastTime = startedAt;

    const update = (now: number) => {
      animation = 0;
      if (document.hidden) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const intro = Math.min(1, (now - startedAt) / 2600);
      if (intro === 1) hasIntroduced.current = true;
      const target =
        progress > 0.001
          ? 90 + progress * (JOURNEY_DURATION - 91)
          : hasIntroduced.current
            ? 90
            : intro * 90;
      const delta = Math.min(64, Math.max(1, now - lastTime));
      lastTime = now;
      frameRef.current += (target - frameRef.current) * (1 - Math.exp(-delta / 75));
      const frame = Math.round(frameRef.current);
      if (playerRef.current?.getCurrentFrame() !== frame) {
        playerRef.current?.seekTo(frame);
        hostRef.current?.setAttribute("data-journey-frame", String(frame));
      }
      if (!hasIntroduced.current || Math.abs(target - frameRef.current) > 0.2) {
        animation = requestAnimationFrame(update);
      }
    };
    const schedule = () => {
      if (!animation) {
        lastTime = performance.now();
        animation = requestAnimationFrame(update);
      }
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [isMotionEnabled]);

  return (
    <div ref={hostRef} className="absolute inset-0" data-journey-frame="0">
      <Player
        ref={playerRef}
        component={CoreJourneyComposition}
        compositionWidth={size.width}
        compositionHeight={size.height}
        durationInFrames={JOURNEY_DURATION}
        fps={30}
        initialFrame={0}
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        numberOfSharedAudioTags={0}
        style={{ width: "100%", height: "100%" }}
        errorFallback={() => null}
      />
    </div>
  );
}
