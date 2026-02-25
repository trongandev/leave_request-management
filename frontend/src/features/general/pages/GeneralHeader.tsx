import { Button } from "@/components/ui/button"
import { useToggleSidebar } from "@/contexts/sidebarContext"
import { Menu } from "lucide-react"

export default function GeneralHeader() {
    const { toggleSidebar } = useToggleSidebar()
    return (
        <header className="h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-8 shrink-0 z-40">
            <div className="flex gap-2 items-center">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu />
                </Button>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Dashboard Overview</h1>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-neutral-500 hover:text-primary transition-colors">
                    <span className="material-icons">notifications</span>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block">{new Date().toLocaleString()}</span>
            </div>
        </header>
    )
}
