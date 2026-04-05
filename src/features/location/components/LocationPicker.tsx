"use client";

import { LocationSearch } from "./LocationSearch";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

export function LocationPicker({
  placeName,
  className,
}: {
  placeName: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full min-w-0 flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3 ${className ?? ""}`}
    >
      <div
        className="flex w-full max-w-full shrink-0 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-black/25 px-3 py-2.5 backdrop-blur-md sm:w-auto sm:max-w-[min(100%,16rem)] sm:justify-start lg:max-w-xs"
        title={placeName}
      >
        <PinIcon className="shrink-0 text-cyan-300/90" />
        <span className="min-w-0 truncate text-sm font-medium text-white">{placeName}</span>
      </div>
      <div className="relative z-30 w-full min-w-0 sm:flex-1">
        <LocationSearch variant="glass" className="w-full min-w-0" />
      </div>
    </div>
  );
}
