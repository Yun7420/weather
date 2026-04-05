export type WeatherVisual =
  | "clear"
  | "partly"
  | "cloud"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "storm";

/** WMO 코드 → 부드러운 아이콘 팩 스타일 분류. */
export function weatherVisualFromCode(code: number): WeatherVisual {
  if (code === 0) return "clear";
  if (code <= 3) return code === 1 ? "partly" : code === 2 ? "partly" : "cloud";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "snow";
  if (code >= 95) return "storm";
  return "cloud";
}
