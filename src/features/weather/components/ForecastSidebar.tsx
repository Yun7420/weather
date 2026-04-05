"use client";

import { useState } from "react";
import { describeWmoCode } from "@/shared/lib";
import type { DailyRow } from "../types";
import { buildOutingMapsSearchUrl } from "../lib/weather-outing-suggestion";
import { formatWindKorean } from "../lib/wind-format";
import { WeatherGlyph } from "./WeatherGlyph";

/** 1주 = 7일. 이번 달 = 예보 첫 날이 속한 달력 달에 해당하는 일만(데이터에 있는 범위). */
type PeriodTab = "thisWeek" | "nextWeek" | "thisMonth";

function daysInSameCalendarMonthAs(
  daily: DailyRow[],
  anchorIso: string,
): DailyRow[] {
  const parts = anchorIso.split("-").map(Number);
  const y = parts[0];
  const m = parts[1];
  if (y == null || m == null) return [];
  return daily.filter((row) => {
    const r = row.date.split("-").map(Number);
    return r[0] === y && r[1] === m;
  });
}

function DailyList({
  days,
  todayIso,
}: {
  days: DailyRow[];
  todayIso?: string;
}) {
  if (!days.length) return <p className="text-sm text-white/50">데이터 없음</p>;
  return (
    <ul className="flex flex-col gap-2">
      {days.map((day) => {
        const d = new Date(day.date);
        const weekday = d.toLocaleDateString("ko-KR", { weekday: "long" });
        const dateStr = d.toLocaleDateString("ko-KR", {
          month: "long",
          day: "numeric",
        });
        const isToday = todayIso != null && day.date === todayIso;
        return (
          <li
            key={day.date}
            className={`flex items-center gap-3 rounded-2xl border px-3 py-3 transition ${
              isToday
                ? "border-white/[0.14] bg-white/[0.08]"
                : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06]"
            }`}
          >
            <WeatherGlyph
              weatherCode={day.weatherCode}
              size={36}
              className="shrink-0 opacity-95"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">
                {weekday}, {dateStr}
              </p>
              <p className="truncate text-xs text-white/55">
                {describeWmoCode(day.weatherCode)}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold tabular-nums text-white">
                {Math.round(day.maxC)}°
              </p>
              <p className="text-xs tabular-nums text-white/45">
                {Math.round(day.minC)}°
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const TABS: { id: PeriodTab; label: string }[] = [
  { id: "thisWeek", label: "이번 주" },
  { id: "nextWeek", label: "다음 주" },
  {
    id: "thisMonth",
    label: "이번 달",
  },
];

function OutingSuggestionButton({
  placeName,
  weatherCode,
}: {
  placeName: string;
  weatherCode: number;
}) {
  const url = buildOutingMapsSearchUrl(weatherCode, placeName);
  return (
    <div className="shrink-0 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.08] px-3 py-2.5 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
        className="w-full text-left transition hover:opacity-90"
      >
        <span className="text-sm font-medium text-cyan-100">
          오늘 날씨에 맞는 장소 찾기
        </span>
      </button>
    </div>
  );
}

export function ForecastSidebar({
  daily,
  placeName,
  currentWeatherCode,
  windDirDeg,
  windSpeedKmh,
}: {
  daily: DailyRow[];
  placeName: string;
  currentWeatherCode: number;
  windDirDeg: number | null;
  windSpeedKmh: number | null;
}) {
  const [tab, setTab] = useState<PeriodTab>("thisWeek");
  const windLine = formatWindKorean(windDirDeg, windSpeedKmh);
  const hasWind = windLine !== "—";

  const anchorIso = daily[0]?.date ?? "";
  const listDays =
    tab === "thisWeek"
      ? daily.slice(0, 7)
      : tab === "nextWeek"
        ? daily.slice(7, 14)
        : anchorIso
          ? daysInSameCalendarMonthAs(daily, anchorIso)
          : [];

  return (
    <aside className="flex min-h-0 min-w-0 w-full flex-[2] basis-0 flex-col gap-3 rounded-2xl border border-white/12 bg-white/[0.07] p-4 shadow-xl shadow-black/30 backdrop-blur-2xl sm:gap-4 sm:p-5 lg:w-[min(100%,28rem)] lg:max-w-[30rem] lg:shrink-0 lg:flex-none lg:basis-auto lg:self-stretch xl:w-[30rem]">
      {hasWind && (
        <div className="shrink-0 rounded-xl border border-white/[0.08] bg-black/15 px-3 py-2.5 backdrop-blur-sm">
          <p className="text-center text-sm leading-snug text-white/70 sm:text-left">
            {windLine}
          </p>
        </div>
      )}

      <OutingSuggestionButton
        placeName={placeName}
        weatherCode={currentWeatherCode}
      />

      <div className="shrink-0 flex flex-col gap-1.5">
        <div className="flex rounded-full border border-white/[0.08] bg-black/20 p-1">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex-1 rounded-full px-2 py-2 text-center text-xs font-medium transition sm:text-sm ${
                tab === id
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/45 hover:text-white/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pr-1 [scrollbar-gutter:stable] [scrollbar-width:thin]">
        <DailyList days={listDays} todayIso={daily[0]?.date} />
      </div>
    </aside>
  );
}
