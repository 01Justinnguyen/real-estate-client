import { create } from 'zustand'

interface UserStore {
  profile: null
}

export const useUserStore = create<UserStore>(() => ({
  profile: null
}))
