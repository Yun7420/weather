"use client";

import { LocationPicker } from "@/features/location";
import { describeWmoCode } from "@/shared/lib";
import type { HourlyPoint } from "../types";
import { HourlyStrip } from "./HourlyStrip";

export function MainWeatherPanel({
  placeName,
  hourly,
  activeIndex,
}: {
  placeName: string;
  hourly: HourlyPoint[];
  activeIndex: number;
}) {
  const h = hourly[activeIndex];
  const conditionLabel = h ? describeWmoCode(h.weatherCode) : "—";
  const now = new Date();
  const dateLine = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeLine = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="relative flex w-full shrink-0 flex-col rounded-2xl border border-white/12 shadow-2xl shadow-black/40 lg:min-h-0 lg:min-w-0 lg:w-auto lg:shrink lg:flex-[2] lg:basis-0">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-black/45 via-black/20 to-black/55"
        style={{
          backdropFilter: "saturate(1.05)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22120%22%20height=%22120%22%20filter=%22url(%23n)%22%20opacity=%220.06%22/%3E%3C/svg%3E')]" />
      <div className="relative z-10 flex min-w-0 flex-col lg:min-h-0 lg:flex-1">
        <header className="relative z-20 flex shrink-0 flex-col items-center gap-3 px-4 pt-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
          <div className="shrink-0 text-center text-sm tabular-nums text-white/70 sm:text-left">
            {dateLine}{" "}
            <span className="text-white/40">|</span> {timeLine}
          </div>
          <LocationPicker placeName={placeName} className="min-w-0 w-full sm:flex-1" />
        </header>
        <div className="flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:py-0">
          <h2 className="line-clamp-3 text-center text-3xl font-extralight tracking-wide text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            {conditionLabel}
          </h2>
        </div>
        <div className="mt-auto border-t border-white/[0.08] bg-black/20 px-3 pb-4 pt-4 backdrop-blur-md sm:px-5">
          <HourlyStrip hourly={hourly} activeIndex={activeIndex} embedded />
        </div>
      </div>
    </div>
  );
}
