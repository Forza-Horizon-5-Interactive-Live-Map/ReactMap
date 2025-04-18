import { create } from 'zustand';

type SidebarStore = {
  expandedId: string | null;
  setExpandedId: (expandedId: string | null) => void;
};

export const useSidebarStore = create<SidebarStore>(set => ({
  expandedId: null,
  setExpandedId: (expandedId: string | null) => set({ expandedId }),
}));
