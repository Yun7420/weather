export type DailyRow = {
  date: string;
  maxC: number;
  minC: number;
  weatherCode: number;
};

export type HourlyPoint = {
  time: string;
  tempC: number;
  precipProb: number | null;
  weatherCode: number;
  windSpeedKmh: number | null;
  windDirDeg: number | null;
};

export type WeatherBundle = {
  daily: DailyRow[];
  hourly: HourlyPoint[];
};
