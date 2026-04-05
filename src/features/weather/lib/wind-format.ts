const DIRS_KO = ["북", "북동", "동", "남동", "남", "남서", "서", "북서"];

export function formatWindKorean(deg: number | null | undefined, speedKmh: number | null | undefined): string {
  if (speedKmh == null || Number.isNaN(speedKmh)) return "—";
  const rounded = Math.round(speedKmh * 10) / 10;
  if (deg == null || Number.isNaN(deg)) {
    return `${rounded} km/h`;
  }
  const i = Math.round(deg / 45) % 8;
  const dir = DIRS_KO[i] ?? "북";
  return `${dir}, ${rounded} km/h`;
}
