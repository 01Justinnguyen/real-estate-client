import { create } from 'zustand'

interface AppStore {
  isHomePage: boolean
  setIsHomePage: (isHomePage: boolean) => void
}

export const useAppStore = create<AppStore>()((set) => ({
  isHomePage: false,
  setIsHomePage: (isHomePage) => set({ isHomePage })
}))
