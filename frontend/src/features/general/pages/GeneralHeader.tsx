import CAvatarName from "@/components/etc/CAvatarName"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/themeContext"
import { useAuthStore } from "@/store/useAuthStore"
import { useSidebarStore } from "@/store/useSidebarStore"
import { Menu, MoonIcon, SunIcon } from "lucide-react"
import PopoverNotification from "../components/PopoverNotification"

export default function GeneralHeader() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar)
    const { theme, setTheme } = useTheme()
    const { user } = useAuthStore()
    return (
        <header className="h-16 bg-background border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-8 shrink-0 z-40">
            <div className="flex gap-2 items-center">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu />
                </Button>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Dashboard Overview</h1>
            </div>
            <div className="flex items-center gap-4">
                <PopoverNotification />
                <Button variant="ghost" size="icon" className="relative text-primary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    {theme === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block">{new Date().toLocaleString()}</span>
                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
                <CAvatarName user={user} className="flex-row-reverse" />
            </div>
        </header>
    )
}
