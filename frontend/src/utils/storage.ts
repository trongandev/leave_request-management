import type { User } from "@/types/user"

// Token storage utilities với bảo mật cao
export const storage = {
    // Sử dụng sessionStorage cho accessToken (tự động xóa khi đóng tab)

    getCookieToken: () => {
        const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"))
        if (match) {
            return match[2]
        }
        return null
    },
    setCookieToken: (token: string) => {
        document.cookie = `token=${token}; path=/;expires=${new Date(Date.now() + 3600 * 1000 * 24 * 7).toUTCString()}` // 7 day expiry
    },
    removeAccessToken: () => {
        sessionStorage.removeItem("accessToken")
    },

    // Sử dụng localStorage cho refreshToken (httpOnly cookie sẽ tốt hơn trong production)
    setRefreshToken: (token: string) => {
        localStorage.setItem("refreshToken", token)
    },
    getRefreshToken: (): string | null => {
        return localStorage.getItem("refreshToken")
    },
    removeRefreshToken: () => {
        localStorage.removeItem("refreshToken")
    },

    // User data trong localStorage
    setUser: (user: User) => {
        localStorage.setItem("user", JSON.stringify(user))
    },
    getUser: (): User | null => {
        const userData = localStorage.getItem("user")
        return userData ? JSON.parse(userData) : null
    },
    removeUser: () => {
        localStorage.removeItem("user")
    },
    removeCookieToken: () => {
        document.cookie = "token=; Max-Age=0; path=/;"
    },

    // Clear all tokens và user data
    clearAll: () => {
        storage.removeAccessToken()
        storage.removeRefreshToken()
        storage.removeUser()
        storage.removeCookieToken()
    },
}
