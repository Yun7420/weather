import type { WeatherVisual } from "./weather-visual";
import { weatherVisualFromCode } from "./weather-visual";

/** 지도 검색에 쓸 키워드(현재 지역 이름 앞에 붙임). */
const MAP_QUERY_TAIL: Record<WeatherVisual, string> = {
  clear: "근처 공원 산책 명소",
  partly: "근처 야외 카페 전망",
  cloud: "근처 실내 카페 전시",
  fog: "근처 실내 데이트",
  drizzle: "근처 실내 카페 독서실",
  rain: "근처 실내 미술관 전시",
  snow: "근처 온천 실내 놀거리",
  storm: "근처 실내 쇼핑 영화관",
};

export function buildOutingMapsSearchUrl(
  weatherCode: number,
  placeLabel: string,
): string {
  const visual = weatherVisualFromCode(weatherCode);
  const head = placeLabel.split(",")[0]?.trim() || placeLabel.trim();
  const query = `${head} ${MAP_QUERY_TAIL[visual]}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
