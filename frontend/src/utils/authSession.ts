import { useAuthStore } from "@/store/useAuthStore"
import { getJwtExpirationTime, hasValidJwt, isJwtExpired } from "@/utils/jwt"
import { storage } from "@/utils/storage"

let logoutTimer: ReturnType<typeof window.setTimeout> | null = null

function clearLogoutTimer() {
    if (logoutTimer) {
        clearTimeout(logoutTimer)
        logoutTimer = null
    }
}

function redirectToLogin(reason?: string) {
    if (typeof window === "undefined") return
    if (window.location.pathname.startsWith("/auth/login")) return

    const loginUrl = new URL("/auth/login", window.location.origin)
    loginUrl.searchParams.set("redirect", `${window.location.pathname}${window.location.search}`)

    if (reason) {
        loginUrl.searchParams.set("reason", reason)
    }

    window.location.replace(loginUrl.toString())
}

export function logoutClient(options?: { redirectToLogin?: boolean; reason?: string }) {
    clearLogoutTimer()
    useAuthStore.getState().logout()

    if (options?.redirectToLogin !== false) {
        redirectToLogin(options?.reason)
    }
}

export function startJwtSession(token: string) {
    clearLogoutTimer()

    const expirationTime = getJwtExpirationTime(token)
    if (!expirationTime) {
        logoutClient({ reason: "invalid-token" })
        return false
    }

    const remainingTime = expirationTime - Date.now()
    if (remainingTime <= 0 || isJwtExpired(token)) {
        logoutClient({ reason: "expired" })
        return false
    }

    logoutTimer = window.setTimeout(() => {
        logoutClient({ reason: "expired" })
    }, remainingTime)

    return true
}

export function syncJwtSession(options?: { redirectToLogin?: boolean }) {
    const token = storage.getCookieToken()

    if (!hasValidJwt(token)) {
        clearLogoutTimer()

        if (useAuthStore.getState().isAuthenticated) {
            logoutClient({ redirectToLogin: options?.redirectToLogin, reason: "expired" })
        } else if (options?.redirectToLogin) {
            redirectToLogin("expired")
        }

        return false
    }

    if (!token) {
        return false
    }

    return startJwtSession(token)
}

export function stopJwtSession() {
    clearLogoutTimer()
}
