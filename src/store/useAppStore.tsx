import { create } from 'zustand'

interface AppStore {
  isShowModal: boolean
  setShowModal: (show: boolean) => void
  pathname: string | null
}

export const useAppStore = create<AppStore>()((set) => ({
  isShowModal: false,
  pathname: null,
  setShowModal: (show: boolean) => set({ isShowModal: show })
}))
