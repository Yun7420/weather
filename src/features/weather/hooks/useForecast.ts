import { useQuery } from "@tanstack/react-query";
import { fetchForecast } from "../api/open-meteo";

export function useForecast(lat: number, lon: number) {
  return useQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: () => fetchForecast(lat, lon),
    staleTime: 5 * 60_000,
  });
}
