"use client";

import { WeatherDashboard } from "@/features/weather";

export function DashboardPage() {
  return (
    <div className="relative flex h-dvh max-h-dvh w-full flex-col overflow-hidden text-zinc-100">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% -30%, rgba(34, 120, 130, 0.35), transparent 55%), radial-gradient(ellipse 70% 50% at 100% 20%, rgba(30, 58, 95, 0.4), transparent 50%), linear-gradient(180deg, #0a1218 0%, #06090e 50%, #05070c 100%)",
        }}
      />
      <div className="flex h-full min-h-0 w-full flex-1 flex-col px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4">
        <main className="flex min-h-0 w-full flex-1 flex-col">
          <WeatherDashboard />
        </main>
      </div>
    </div>
  );
}
