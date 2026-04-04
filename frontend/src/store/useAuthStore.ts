import type { LeaveBalance, User } from "@/types/user"
import { create } from "zustand"
import authService from "@/services/authService"
import { storage } from "@/utils/storage"

interface UserState {
    user: User | null
    lb: LeaveBalance | null
    isAuthenticated: boolean
    isLoading: boolean
    setUser: (user: User, lb?: LeaveBalance) => void
    setLeaveBalance: (lb: LeaveBalance | null) => void
    loadProfile: () => Promise<void>
    logout: () => void
}

export const useAuthStore = create<UserState>((set) => ({
    user: null,
    lb: null,
    isAuthenticated: false,
    isLoading: true,
    setUser: (user, lb) => set({ user, isAuthenticated: true, lb: lb || null, isLoading: false }),
    setLeaveBalance: (lb) => set({ lb }),
    loadProfile: async () => {
        try {
            const user = await authService.getProfile()
            console.log(user)
            set({ user: user.user, isAuthenticated: true, isLoading: false, lb: user.lb })
        } catch (error) {
            console.error("Failed to load profile:", error)
            set({ isAuthenticated: false, isLoading: false })
        }
    },
    logout: () => {
        set({ user: null, isAuthenticated: false, lb: null })
        storage.removeAllToken()
    },
}))
