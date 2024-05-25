import { create } from 'zustand'

interface UserStore {
  profile: null
  token: string | null
}

export const useUserStore = create<UserStore>(() => ({
  profile: null,
  token: null
}))
