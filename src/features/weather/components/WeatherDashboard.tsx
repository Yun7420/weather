"use client";

import { useLocationStore } from "@/features/location";
import { backgroundImageUrlForWeatherCode } from "../lib/weather-backgrounds";
import { indexOfHourClosestToNow } from "../lib/current-hour";
import { useForecast } from "../hooks/useForecast";
import { ForecastSidebar } from "./ForecastSidebar";
import { MainWeatherPanel } from "./MainWeatherPanel";

export function WeatherDashboard() {
  const place = useLocationStore((s) => s.place);
  const { data, isPending, isError, refetch, isFetching } = useForecast(
    place.lat,
    place.lon,
  );

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-16 text-sm text-white/50 backdrop-blur-xl lg:h-full lg:min-h-0 lg:flex-1">
        불러오는 중…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center overflow-y-auto rounded-2xl border border-rose-500/25 bg-rose-950/20 p-6 text-center text-sm text-rose-100 backdrop-blur-xl sm:p-10 lg:h-full lg:min-h-0 lg:flex-1">
        날씨 정보를 불러오지 못했습니다.
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 block w-full text-sm text-cyan-300 hover:underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const { daily, hourly } = data;
  const activeIndex = indexOfHourClosestToNow(hourly);
  const nowPoint = hourly[activeIndex];
  const windDirDeg = nowPoint?.windDirDeg ?? null;
  const windSpeedKmh = nowPoint?.windSpeedKmh ?? null;
  const backdropCode = nowPoint?.weatherCode ?? daily[0]?.weatherCode ?? 0;
  const backdropUrl = backgroundImageUrlForWeatherCode(backdropCode);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform [transform:translateZ(0)]"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-br from-slate-950/88 via-slate-900/72 to-slate-950/90"
      />
      <div className="relative z-10 flex w-full flex-col gap-1 lg:h-full lg:min-h-0 lg:flex-1">
        {isFetching && (
          <p className="shrink-0 text-center text-[10px] leading-tight text-white/35">갱신 중</p>
        )}
        <div className="flex min-w-0 w-full flex-col gap-3 lg:min-h-0 lg:flex-1 lg:flex-row lg:items-stretch lg:gap-4">
          <MainWeatherPanel
            placeName={place.name}
            hourly={hourly}
            activeIndex={activeIndex}
          />
          <ForecastSidebar
            daily={daily}
            placeName={place.name}
            currentWeatherCode={backdropCode}
            windDirDeg={windDirDeg}
            windSpeedKmh={windSpeedKmh}
          />
        </div>
      </div>
    </>
  );
}
