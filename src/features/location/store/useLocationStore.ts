import { create } from "zustand";
import type { GeoPlace } from "../types";

type LocationState = {
  place: GeoPlace;
  setPlace: (place: GeoPlace) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  place: { name: "서울", lat: 37.5665, lon: 126.978 },
  setPlace: (place) => set({ place }),
}));
