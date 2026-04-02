import { storage } from "@/utils/storage"
import type { LeaveBalance, User } from "@/types/user"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
interface UserState {
    user: User | null
    lb: LeaveBalance | null
    isAuthenticated: boolean
    setUser: (user: User | null) => void
    setLeaveBalance: (lb: LeaveBalance | null) => void
    logout: () => void
}

export const useAuthStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            lb: null,
            isAuthenticated: false,
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setLeaveBalance: (lb) => set({ lb }),
            logout: () => {
                storage.clearAll()
                set({ user: null, isAuthenticated: false, lb: null })
                localStorage.removeItem("auth-storage")
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
