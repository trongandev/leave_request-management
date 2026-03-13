import { Navigate, Outlet, useLocation } from "react-router-dom"
import GeneralSidebar from "./GeneralSidebar"
import GeneralHeader from "./GeneralHeader"
import { useAuthStore } from "@/store/useAuthStore"
import { useGenericStore } from "@/store/useGenericStore"

export default function GeneralLayout() {
    const { isSidebarOpen } = useGenericStore((state) => state.data)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const location = useLocation()
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} />
    }
    return (
        <div className="flex transition-all duration-300">
            <div
                className={` bg-white  font-display text-slate-800 dark:text-slate-200 antialiased shrink-0 flex flex-col h-screen fixed left-0 top-0 z-50  w-64  transition-all duration-300 border-r border-slate-200 ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
                <GeneralSidebar />
            </div>
            <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} flex flex-col min-h-screen`}>
                <GeneralHeader />
                <div className="w-full p-5 bg-gray-50/10! ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
