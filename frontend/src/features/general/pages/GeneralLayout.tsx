import { Outlet } from "react-router-dom"
import { useToggleSidebar } from "@/contexts/sidebarContext"
import GeneralSidebar from "./GeneralSidebar"
import GeneralHeader from "./GeneralHeader"

export default function GeneralLayout() {
    const { isOpen } = useToggleSidebar()
    return (
        <div className="flex transition-all duration-300">
            <div
                className={` bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 antialiased shrink-0 flex flex-col h-screen fixed left-0 top-0 z-50  w-64  transition-all duration-300 border-r border-slate-200 ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
                <GeneralSidebar />
            </div>
            <div className={`flex-1 ${isOpen ? "ml-64" : "ml-0"} flex flex-col min-h-screen`}>
                <GeneralHeader />
                <div className="w-full p-5 ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
