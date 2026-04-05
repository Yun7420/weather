import { useQuery } from "@tanstack/react-query";
import { searchPlaces } from "../api/geocoding";

export function useGeocodeSearch(query: string, enabled: boolean) {
  return useQuery({
    queryKey: ["geocode", query],
    queryFn: () => searchPlaces(query),
    enabled: enabled && query.trim().length >= 2,
    staleTime: 10 * 60_000,
  });
}
