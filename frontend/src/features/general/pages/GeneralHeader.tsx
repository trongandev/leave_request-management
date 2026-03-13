import CAvatarName from "@/components/etc/CAvatarName"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore"
import { useGenericStore } from "@/store/useGenericStore"
import { BellIcon, Menu } from "lucide-react"

export default function GeneralHeader() {
    const toggleValue = useGenericStore((state) => state.toggleValue)
    const { user } = useAuthStore()
    return (
        <header className="h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-8 shrink-0 z-40">
            <div className="flex gap-2 items-center">
                <Button variant="ghost" size="icon" onClick={() => toggleValue("isSidebarOpen")}>
                    <Menu />
                </Button>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Dashboard Overview</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-primary">
                    <BellIcon />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white "></span>
                    <span className="absolute animate-ping top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white "></span>
                </Button>
                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block">{new Date().toLocaleString()}</span>
                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
                <CAvatarName user={user} className="flex-row-reverse" />
            </div>
        </header>
    )
}
