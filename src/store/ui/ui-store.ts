import { create } from 'zustand';

interface State {
    isSiteMenuOpen: boolean;
    openSiteMenu: () => void;
    closeSiteMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isSiteMenuOpen: false,
    openSiteMenu: () => set({ isSiteMenuOpen: true }),
    closeSiteMenu: () => set({ isSiteMenuOpen: false })
}))