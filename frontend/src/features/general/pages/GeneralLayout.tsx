import { hasValidJwt } from "@/utils/jwt"
import { storage } from "@/utils/storage"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import GeneralSidebar from "./GeneralSidebar"
import GeneralHeader from "./GeneralHeader"
import { useAuthStore } from "@/store/useAuthStore"
import { useSidebarStore } from "@/store/useSidebarStore"

export default function GeneralLayout() {
    const { isSidebarOpen } = useSidebarStore((state) => state)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const location = useLocation()
    const hasValidToken = hasValidJwt(storage.getCookieToken())

    if (!isAuthenticated || !hasValidToken) {
        return <Navigate to="/auth/login" state={{ from: location }} />
    }
    return (
        <div className="flex transition-all duration-300 bg-background">
            <div
                className={` font-display text-background antialiased shrink-0 flex flex-col h-screen fixed left-0 top-0 z-50  w-64  transition-all duration-300 border-r bg-card ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
                <GeneralSidebar />
            </div>
            <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} flex flex-col min-h-screen overflow-hidden transition-all duration-300  `}>
                <GeneralHeader />
                <div className="w-full p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
