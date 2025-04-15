import { MessageDTO } from '@/Services/API/Models/MessageDTO';
import { create } from 'zustand';

type GlobalStore = {
  playerList: MessageDTO[];
  setPlayerList: (playerList: MessageDTO[]) => void;

  viewPort: {
    lat: number;
    lng: number;
    zoom: number;
  };
  setViewPort: (viewPort: { lat: number; lng: number; zoom: number }) => void;
  moveCenter: () => void;

  moveTo: {
    lat: number;
    lng: number;
  };
  setViewTo: (lat: number, lng: number) => void;
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  playerList: [],
  setPlayerList: (playerList: MessageDTO[]) => set({ playerList }),

  viewPort: {
    lat: -0,
    lng: 0,
    zoom: 3,
  },
  setViewPort: (viewPort: { lat: number; lng: number; zoom: number }) =>
    set({ viewPort }),

  moveCenter: () =>
    set({
      viewPort: {
        ...get().viewPort,
        lat: -128,
        lng: 128,
      },
    }),

  moveTo: {
    lat: 0,
    lng: 0,
  },
  setViewTo: (lat: number, lng: number) => set({ moveTo: { lat, lng } }),
}));
