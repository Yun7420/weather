"use client";

import { useDeferredValue, useState } from "react";
import { useGeocodeSearch } from "../hooks/useGeocode";
import { useLocationStore } from "../store/useLocationStore";

export function LocationSearch({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "bar" | "glass";
}) {
  const [raw, setRaw] = useState("");
  const deferred = useDeferredValue(raw);
  const setPlace = useLocationStore((s) => s.setPlace);
  const { data, isFetching, isError } = useGeocodeSearch(deferred, true);

  const inputClass =
    variant === "bar"
      ? "w-full rounded-full border border-white/[0.08] bg-[#1e1f26] px-5 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-white/15 focus:ring-1 focus:ring-cyan-500/20"
      : variant === "glass"
        ? "w-full rounded-xl border border-white/[0.12] bg-black/25 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35 backdrop-blur-md focus:border-white/25 focus:ring-1 focus:ring-cyan-400/25"
        : "w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-white/20 focus:ring-1 focus:ring-cyan-500/30";

  const panelClass =
    variant === "glass"
      ? "border border-white/10 bg-black/80 shadow-2xl backdrop-blur-xl"
      : "border border-white/8 bg-[#1e1f26] shadow-2xl";

  return (
    <div className={`relative w-full min-w-0 ${className ?? ""}`}>
      <label className="sr-only" htmlFor="place-search">
        장소 검색
      </label>
      <input
        id="place-search"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder="도시 또는 지역 검색"
        className={inputClass}
      />
      {isError && (
        <p
          className={`absolute left-0 right-0 top-full z-[60] mt-1 rounded-xl px-3 py-2 text-xs text-rose-300 ${panelClass}`}
          role="alert"
        >
          검색에 실패했습니다.
        </p>
      )}
      {data && data.length > 0 && (
        <ul
          className={`absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto overflow-x-hidden rounded-xl ${panelClass}`}
        >
          {data.map((hit) => (
            <li key={`${hit.name}-${hit.lat}-${hit.lon}`}>
              <button
                type="button"
                onClick={() => {
                  const label = [hit.name, hit.admin1, hit.country]
                    .filter(Boolean)
                    .join(", ");
                  setPlace({ name: label, lat: hit.lat, lon: hit.lon });
                  setRaw("");
                }}
                className={
                  variant === "glass"
                    ? "flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left text-sm text-white/90 transition hover:bg-white/10"
                    : "flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left text-sm text-zinc-200 transition hover:bg-white/5"
                }
              >
                <span className="font-medium">{hit.name}</span>
                {(hit.admin1 || hit.country) && (
                  <span
                    className={
                      variant === "glass" ? "text-xs text-white/45" : "text-xs text-zinc-500"
                    }
                  >
                    {[hit.admin1, hit.country].filter(Boolean).join(" · ")}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
      {data && data.length === 0 && deferred.trim().length >= 2 && !isFetching && (
        <p
          className={`absolute left-0 right-0 top-full z-50 mt-1 rounded-xl px-3 py-2 text-xs ${variant === "glass" ? "text-white/50" : "text-zinc-600"} ${panelClass}`}
        >
          결과 없음
        </p>
      )}
    </div>
  );
}
