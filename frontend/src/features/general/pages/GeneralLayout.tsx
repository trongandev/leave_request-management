import { Outlet, useNavigate } from "react-router-dom";
import GeneralSidebar from "./GeneralSidebar";
import GeneralHeader from "./GeneralHeader";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function GeneralLayout() {
    const { isSidebarOpen } = useSidebarStore((state) => state);
    const navigate = useNavigate();
    const { loadProfile, isAuthenticated, isLoading } = useAuthStore();
    useEffect(() => {
        // Khi app load, tự động load profile từ server
        loadProfile();
    }, []);

    // Hiển thị loading screen trong khi đang load profile
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 to-blue-50 dark:from-slate-950 dark:to-slate-900">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Nếu không có token hoặc load profile thất bại, chuyển hướng về trang login
        navigate("/auth/login");
        return null;
    }
    return (
        <div className="flex transition-all duration-300 bg-background">
            <div
                className={` font-display text-background antialiased shrink-0 flex flex-col h-screen fixed left-0 top-0 z-50  w-64  transition-all duration-300 border-r bg-card ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
                <GeneralSidebar />
            </div>
            <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} flex flex-col min-h-screen overflow-hidden transition-all duration-300  `}>
                <GeneralHeader />
                <div className="w-full p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
