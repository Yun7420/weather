import type { GeocodeHit } from "../types";

type OpenMeteoGeocodeResponse = {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
  }>;
};

export async function searchPlaces(query: string): Promise<GeocodeHit[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", q);
  url.searchParams.set("count", "8");
  url.searchParams.set("language", "ko");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("지오코딩 요청 실패");
  const data = (await res.json()) as OpenMeteoGeocodeResponse;
  const rows = data.results ?? [];
  return rows.map((r) => ({
    name: r.name,
    lat: r.latitude,
    lon: r.longitude,
    country: r.country,
    admin1: r.admin1,
  }));
}
