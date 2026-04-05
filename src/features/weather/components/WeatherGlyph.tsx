import { weatherVisualFromCode, type WeatherVisual } from "../lib/weather-visual";

type Props = {
  weatherCode: number;
  size?: number;
  className?: string;
};

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-sun`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id={`${id}-cloud`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e4e4e7" />
        <stop offset="100%" stopColor="#71717a" />
      </linearGradient>
      <linearGradient id={`${id}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
  );
}

function CloudBlob({
  id,
  cx,
  cy,
  scale = 1,
}: {
  id: string;
  cx: number;
  cy: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <ellipse cx={0} cy={4} rx={28} ry={18} fill={`url(#${id}-cloud)`} opacity={0.95} />
      <ellipse cx={-18} cy={8} rx={18} ry={14} fill={`url(#${id}-cloud)`} opacity={0.88} />
      <ellipse cx={18} cy={6} rx={20} ry={15} fill={`url(#${id}-cloud)`} opacity={0.9} />
    </g>
  );
}

function GlyphInner({ v, uid }: { v: WeatherVisual; uid: string }) {
  switch (v) {
    case "clear":
      return (
        <g>
          <circle cx={60} cy={58} r={26} fill={`url(#${uid}-sun)`} opacity={0.95} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1={60}
              y1={58}
              x2={60 + Math.cos((deg * Math.PI) / 180) * 38}
              y2={58 + Math.sin((deg * Math.PI) / 180) * 38}
              stroke="#fcd34d"
              strokeWidth={3}
              strokeLinecap="round"
              opacity={0.55}
            />
          ))}
        </g>
      );
    case "partly":
      return (
        <g>
          <circle cx={42} cy={44} r={22} fill={`url(#${uid}-sun)`} opacity={0.9} />
          <CloudBlob id={uid} cx={68} cy={72} scale={1.05} />
        </g>
      );
    case "cloud":
      return <CloudBlob id={uid} cx={60} cy={62} scale={1.15} />;
    case "fog":
      return (
        <g opacity={0.85}>
          <CloudBlob id={uid} cx={60} cy={52} scale={0.9} />
          <rect x={18} y={78} width={84} height={6} rx={3} fill="#64748b" opacity={0.5} />
          <rect x={24} y={90} width={72} height={5} rx={2.5} fill="#64748b" opacity={0.35} />
        </g>
      );
    case "drizzle":
      return (
        <g>
          <CloudBlob id={uid} cx={60} cy={50} scale={1} />
          {[44, 58, 72].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={72}
              x2={x - 4}
              y2={96}
              stroke={`url(#${uid}-accent)`}
              strokeWidth={2.5}
              strokeLinecap="round"
              opacity={0.7}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </g>
      );
    case "rain":
      return (
        <g>
          <CloudBlob id={uid} cx={60} cy={48} scale={1.05} />
          {[32, 46, 60, 74, 88].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={68}
              x2={x - 8}
              y2={102}
              stroke="#38bdf8"
              strokeWidth={2.2}
              strokeLinecap="round"
              opacity={0.65 + (i % 2) * 0.15}
            />
          ))}
        </g>
      );
    case "snow":
      return (
        <g>
          <CloudBlob id={uid} cx={60} cy={48} scale={1.02} />
          {[
            [48, 78],
            [62, 88],
            [76, 74],
            [54, 96],
            [70, 100],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.5} fill="#e0f2fe" opacity={0.9} />
          ))}
        </g>
      );
    case "storm":
      return (
        <g>
          <CloudBlob id={uid} cx={58} cy={46} scale={1.08} />
          <path
            d="M52 72 L62 72 L56 88 L72 88 L48 108 L54 90 L40 90 Z"
            fill="#c4b5fd"
            opacity={0.95}
          />
        </g>
      );
    default:
      return <CloudBlob id={uid} cx={60} cy={62} scale={1.1} />;
  }
}

export function WeatherGlyph({ weatherCode, size = 112, className }: Props) {
  const v = weatherVisualFromCode(weatherCode);
  const uid = `wg-${v}-${weatherCode}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden
    >
      <Defs id={uid} />
      <GlyphInner v={v} uid={uid} />
    </svg>
  );
}
