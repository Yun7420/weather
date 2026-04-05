import type { HourlyPoint } from "../types";

export function indexOfHourClosestToNow(hourly: HourlyPoint[]): number {
  if (!hourly.length) return 0;
  const now = Date.now();
  let best = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < hourly.length; i += 1) {
    const t = new Date(hourly[i]!.time).getTime();
    const diff = Math.abs(t - now);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}
