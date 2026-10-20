import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const JOURNEY_DURATION = 900;
const strands = Array.from({ length: 6 }, (_, index) => index);

export function CoreJourneyComposition() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isMobile = width < 768;
  const ease = (from: number, to: number, a = 0, b = 1) =>
    interpolate(frame, [from, to], [a, b], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
  const morph = ease(270, 650);
  const expansion = ease(630, 899, 1, 1.65);
  const radius = Math.min(width * (isMobile ? 0.205 : 0.132), height * 0.22);
  const cx = width * (isMobile ? 0.62 : 0.77) - ease(650, 899) * width * 0.12;
  const cy = height * (isMobile ? 0.78 : 0.55) + ease(650, 899) * height * 0.16;
  const angle = -0.55 + frame * 0.0015;
  const draw = ease(0, 90);
  const point = (u: number, strand: number) => {
    const t = u * Math.PI * 2;
    const phase = (strand * Math.PI) / 3;
    const tube = 2 + 0.48 * Math.cos(3 * t + phase);
    const x = tube * Math.cos(2 * t);
    const y = tube * Math.sin(2 * t);
    const z = 0.8 * Math.sin(3 * t + phase);
    const rotatedX = x * Math.cos(angle) + z * Math.sin(angle);
    const rotatedZ = z * Math.cos(angle) - x * Math.sin(angle);
    const depth = 6 / (6 + rotatedZ);
    const knotX = rotatedX * radius * depth;
    const knotY = (y * 0.8 + rotatedZ * 0.23) * radius * depth;
    const flowX = (u - 0.5) * radius * 5.6 * expansion;
    const flowY = (Math.sin(t + phase * 0.26) * 0.62 + (strand - 2.5) * 0.16) * radius;
    return [cx + knotX * (1 - morph) + flowX * morph, cy + knotY * (1 - morph) + flowY * morph];
  };

  return (
    <AbsoluteFill style={{ background: "#0f172a", overflow: "hidden" }}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <defs>
          <radialGradient id="core-glow">
            <stop offset="0" stopColor="#2563eb" stopOpacity=".18" />
            <stop offset=".5" stopColor="#3b82f6" stopOpacity=".06" />
            <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="core-thread" x1="0" x2="1">
            <stop offset="0" stopColor="#2563eb" stopOpacity=".1" />
            <stop offset=".35" stopColor="#3b82f6" />
            <stop offset=".6" stopColor="#dbeafe" />
            <stop offset="1" stopColor="#2563eb" stopOpacity=".1" />
          </linearGradient>
          <linearGradient id="core-shade">
            <stop offset="0" stopColor="#0f172a" stopOpacity=".94" />
            <stop offset=".37" stopColor="#0f172a" stopOpacity=".8" />
            <stop offset=".67" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="core-mobile-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0f172a" stopOpacity=".85" />
            <stop offset=".55" stopColor="#0f172a" stopOpacity=".55" />
            <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
          <pattern
            id="core-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${-frame * 0.025} ${-frame * 0.015})`}
          >
            <circle cx="1" cy="1" r=".65" fill="#64748b" opacity=".4" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#core-grid)" opacity={0.4 + morph * 0.3} />
        <ellipse cx={cx} cy={cy} rx={radius * 4} ry={radius * 3.2} fill="url(#core-glow)" />
        <g opacity={ease(160, 450) * 0.16} stroke="#64748b" strokeWidth=".5" fill="none">
          {strands.map((index) => (
            <path
              key={index}
              d={`M0 ${height * (0.5 + index * 0.12)}H${width}M${(width * index) / 5} 0V${height}`}
            />
          ))}
        </g>
        <g fill="none">
          {strands.map((strand) => {
            const path = Array.from({ length: 151 }, (_, index) => {
              const [x, y] = point(index / 150, strand);
              return (index === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2);
            }).join(" ");
            const [px, py] = point((frame * 0.001 + strand / 6) % 1, strand);
            return (
              <g key={strand}>
                <path
                  d={path}
                  stroke="url(#core-thread)"
                  strokeWidth={strand % 2 ? 1 : 1.65}
                  opacity={0.34 + strand * 0.1}
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - draw}
                />
                <circle
                  cx={px}
                  cy={py}
                  r="8"
                  fill="#3b82f6"
                  fillOpacity=".08"
                  stroke="#3b82f6"
                  strokeOpacity=".18"
                />
                <circle
                  cx={px}
                  cy={py}
                  r="2.5"
                  fill={strand % 2 ? "#dbeafe" : "#3b82f6"}
                  opacity={draw}
                />
              </g>
            );
          })}
        </g>
        <g transform={`translate(${cx} ${cy})`} opacity={draw * (1 - morph * 0.7)}>
          <polygon
            points="0,-48 42,-24 42,24 0,48 -42,24 -42,-24"
            fill="#334155"
            stroke="#3b82f6"
            strokeWidth=".9"
          />
          <path
            d="m-20-15 20 12 20-12M-20 15 20 3M0-28v56"
            fill="none"
            stroke="#dbeafe"
            strokeWidth=".9"
          />
          <circle r="3.5" fill="#ffffff" />
        </g>
        <g
          opacity={morph}
          fontFamily="ui-monospace, monospace"
          fontSize={isMobile ? 10 : 12}
          letterSpacing="2"
        >
          {["IDEA", "DISEÑO", "CÓDIGO", "APORTE"].map((label, index) => {
            const x = cx + (index - 1.5) * radius * 1.35;
            return (
              <g key={label}>
                <path d={`M${x} ${cy - radius * 0.85}v14`} stroke="#3b82f6" strokeWidth=".8" />
                <text x={x} y={cy - radius * 0.95} fill="#dbeafe" textAnchor="middle">
                  {label}
                </text>
              </g>
            );
          })}
        </g>
        <g opacity={ease(40, 100) * 0.5} stroke="#64748b" strokeWidth=".6" fill="none">
          <path
            d={`M${cx - radius * 2.5} ${cy - radius * 1.9}h-18v18M${cx + radius * 2.5} ${cy + radius * 1.9}h18v-18`}
          />
          <path d={`M${cx} ${cy - radius * 2.7}v-5m-3 2.5h6`} />
        </g>
        <rect
          width={width}
          height={height}
          fill={isMobile ? "url(#core-mobile-shade)" : "url(#core-shade)"}
        />
        <text
          x={width - (isMobile ? 140 : 200)}
          y={height * 0.15}
          fill="#cbd5e1"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          letterSpacing="2"
        >
          RLC / WORK IN FLOW
        </text>
      </svg>
    </AbsoluteFill>
  );
}
