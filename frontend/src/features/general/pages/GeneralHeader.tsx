import CAvatarName from "@/components/etc/CAvatarName"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/themeContext"
import { useAuthStore } from "@/store/useAuthStore"
import { useSidebarStore } from "@/store/useSidebarStore"
import { Languages, LogOut, Menu, MoonIcon, SunIcon, User } from "lucide-react"
import PopoverNotification from "../components/PopoverNotification"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
export default function GeneralHeader() {
    const { t, i18n } = useTranslation()
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar)
    const { theme, setTheme } = useTheme()
    const { user } = useAuthStore()
    const navigate = useNavigate()
    const handleChangeLng = () => {
        i18n.changeLanguage(i18n.language === "en" ? "vi" : "en")
    }
    return (
        <header className="h-16 bg-card border-b  flex items-center justify-between p-3 md:px-8 shrink-0 z-40">
            <div className="flex gap-2 items-center">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu />
                </Button>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">{t("general.header.overview")}</h1>
            </div>
            <div className="flex items-center gap-5">
                <div className="items-center gap-2 hidden md:flex">
                    <PopoverNotification />
                    <Button variant={"ghost"} className=" text-primary" onClick={handleChangeLng}>
                        <Languages />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative text-primary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                        {theme === "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </div>
                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 mx-2 hidden md:block"></div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 hidden md:block">{new Date().toLocaleString()}</span>
                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 mx-2   hidden md:block"></div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <CAvatarName user={user} className="flex-row-reverse" isDisabledLink />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate("/profile")}>
                                <User /> Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleChangeLng}>
                                <Languages />
                                {i18n.language === "en" ? "Tiếng Việt" : "English"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                                {theme === "light" ? <MoonIcon /> : <SunIcon />}
                                {theme === "light" ? "Dark Mode" : "Light Mode"}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive">
                                <LogOut /> Logout
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
