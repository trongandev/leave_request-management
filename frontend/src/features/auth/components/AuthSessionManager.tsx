import { stopJwtSession, syncJwtSession } from "@/utils/authSession"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function AuthSessionManager() {
    const location = useLocation()

    useEffect(() => {
        const shouldRedirect = !location.pathname.startsWith("/auth/login")
        syncJwtSession({ redirectToLogin: shouldRedirect })

        return () => {
            stopJwtSession()
        }
    }, [location.pathname])

    return null
}
