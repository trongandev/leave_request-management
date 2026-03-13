import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
    return (
        <div>
            <Outlet />
            <Toaster position="top-center" />
        </div>
    )
}
