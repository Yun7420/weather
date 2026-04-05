import type { DailyRow, HourlyPoint, WeatherBundle } from "../types";

type OpenMeteoForecast = {
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability?: number[];
    weather_code?: number[];
    wind_speed_10m?: number[];
    wind_direction_10m?: number[];
  };
};

export async function fetchForecast(lat: number, lon: number): Promise<WeatherBundle> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("windspeed_unit", "kmh");
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min",
  );
  url.searchParams.set("forecast_days", "16");
  url.searchParams.set(
    "hourly",
    "temperature_2m,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m",
  );
  url.searchParams.set("forecast_hours", "48");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("날씨 요청 실패");
  const data = (await res.json()) as OpenMeteoForecast;

  const daily: DailyRow[] = [];
  const d = data.daily;
  if (d?.time?.length) {
    for (let i = 0; i < d.time.length; i += 1) {
      daily.push({
        date: d.time[i]!,
        maxC: d.temperature_2m_max[i]!,
        minC: d.temperature_2m_min[i]!,
        weatherCode: d.weather_code[i]!,
      });
    }
  }

  const hourly: HourlyPoint[] = [];
  const h = data.hourly;
  if (h?.time?.length && h.temperature_2m?.length) {
    const prob = h.precipitation_probability;
    const codes = h.weather_code;
    const windSp = h.wind_speed_10m;
    const windDir = h.wind_direction_10m;
    for (let i = 0; i < h.time.length; i += 1) {
      hourly.push({
        time: h.time[i]!,
        tempC: h.temperature_2m[i]!,
        precipProb: prob?.[i] ?? null,
        weatherCode: codes?.[i] ?? 0,
        windSpeedKmh: windSp?.[i] ?? null,
        windDirDeg: windDir?.[i] ?? null,
      });
    }
  }

  if (!hourly.length && !daily.length) {
    throw new Error("예보 데이터 없음");
  }

  return { daily, hourly };
}
