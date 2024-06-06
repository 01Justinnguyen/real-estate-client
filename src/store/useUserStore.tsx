import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
interface UserStore {
  profile: any
  test: any
}

const fakeStorage = {
  getItem: (name: string) => null,
  setItem: (name: string, value: string) => {},
  removeItem: (name: string) => {}
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      profile: null,
      test: null
    }),
    {
      name: 'liam',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : fakeStorage)),
      partialize: (state) => ({ profile: state.profile })
    }
  )
)
