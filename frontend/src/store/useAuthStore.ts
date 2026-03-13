import type { User } from "@/types/user"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
interface UserState {
    user: User | null
    isAuthenticated: boolean
    setUser: (user: User | null) => void
    logout: () => void
}

export const useAuthStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user) => set({ user, isAuthenticated: true }),
            logout: () => {
                set({ user: null, isAuthenticated: false })
                // Xóa thêm cookie hoặc token thủ công nếu cần
                localStorage.removeItem("auth-storage")
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
