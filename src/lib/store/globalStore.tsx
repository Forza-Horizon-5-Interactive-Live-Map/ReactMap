import { MessageDTO } from '@/Services/API/Models/MessageDTO';
import { create } from 'zustand';

type GlobalStore = {
  playerList: MessageDTO[];
  setPlayerList: (playerList: MessageDTO[]) => void;

  moveTo: {
    lat: number;
    lng: number;
  };
  setViewTo: (lat: number, lng: number) => void;
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  playerList: [],
  setPlayerList: (playerList: MessageDTO[]) => set({ playerList }),

  moveTo: {
    lat: 0,
    lng: 0,
  },
  setViewTo: (lat: number, lng: number) => set({ moveTo: { lat, lng } }),
}));
