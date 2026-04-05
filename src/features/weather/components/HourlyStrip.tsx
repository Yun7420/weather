"use client";

import type { HourlyPoint } from "../types";
import { WeatherGlyph } from "./WeatherGlyph";

export function HourlyStrip({
  hourly,
  activeIndex = 0,
  embedded = false,
}: {
  hourly: HourlyPoint[];
  activeIndex?: number;
  embedded?: boolean;
}) {
  const slice = hourly.slice(0, 48);
  if (!slice.length) return null;

  const inner = (
    <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 pt-1 [scrollbar-width:thin]">
      {slice.map((h, i) => {
        const d = new Date(h.time);
        const dayTag = d.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
        const label = d.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const active = i === activeIndex;
        return (
          <div
            key={h.time}
            className={`flex min-w-[76px] shrink-0 flex-col items-center rounded-2xl border px-2 py-3 transition ${
              active
                ? "border-white/25 bg-white/[0.18] shadow-lg shadow-black/20"
                : "border-white/[0.08] bg-black/25 hover:bg-white/[0.06]"
            }`}
          >
            <span className="mb-1 min-h-[14px] text-[10px] font-medium leading-none text-cyan-200/80">
              {dayTag}
            </span>
            <span className="text-[11px] tabular-nums text-white/55">{label}</span>
            <div className="my-2 opacity-95">
              <WeatherGlyph weatherCode={h.weatherCode} size={40} />
            </div>
            <span className="text-sm font-semibold tabular-nums text-white">{Math.round(h.tempC)}°</span>
            <span className="mt-1 inline-block min-h-[14px] text-center text-[10px] tabular-nums text-white/40">
              {h.precipProb != null ? `${h.precipProb}%` : "\u00a0"}
            </span>
          </div>
        );
      })}
    </div>
  );

  if (embedded) {
    return (
      <div>
        <p className="mb-3 text-xs font-medium tracking-wide text-white/50">시간별</p>
        {inner}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#16161a]/95 p-5 backdrop-blur-xl">
      <p className="mb-4 text-sm font-medium text-zinc-300">시간별</p>
      <p className="mb-3 text-xs text-zinc-500">48시간 · 가로로 스크롤</p>
      {inner}
    </div>
  );
}
