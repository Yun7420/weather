export type GeoPlace = {
  name: string;
  lat: number;
  lon: number;
};

export type GeocodeHit = {
  name: string;
  lat: number;
  lon: number;
  country?: string;
  admin1?: string;
};
