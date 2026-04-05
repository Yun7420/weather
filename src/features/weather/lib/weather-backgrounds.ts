import { weatherVisualFromCode, type WeatherVisual } from "./weather-visual";

/**
 * 날씨 분위기별 풍경 사진 (Unsplash · 무료 사용, 링크만으로 표기).
 * w=2400으로 큰 화면에서도 선명하게.
 */
const BY_VISUAL: Record<WeatherVisual, string> = {
  clear: "https://images.unsplash.com/photo-1691848746386-d5de9f5c05a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  partly: "https://images.unsplash.com/photo-1724480157827-f406b0fd0d6f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  cloud: "https://images.unsplash.com/photo-1679152794259-9bc9a51af8fa?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  fog: "https://plus.unsplash.com/premium_photo-1675824629278-e072280ea44f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  drizzle: "https://images.unsplash.com/photo-1602755139240-dbbf8bb0c92f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  rain: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  snow: "https://plus.unsplash.com/premium_photo-1664299693424-a59fb1082c2f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  storm: "https://plus.unsplash.com/premium_photo-1695559212601-f799f6cc0f8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export function backgroundImageUrlForWeatherCode(code: number): string {
  const visual = weatherVisualFromCode(code);
  return BY_VISUAL[visual];
}
