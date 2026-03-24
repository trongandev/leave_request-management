import CSelectOptions from "@/components/etc/CSelectOptions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/contexts/themeContext"
import { CheckCircle2Icon } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
export default function CAppearancePage() {
    const { t, i18n } = useTranslation()
    const { theme, setTheme } = useTheme()
    const dateFormats = [
        { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
        { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
        { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
    ]
    const systemFonts = [
        { value: "Inter", label: "Inter" },
        { value: "Roboto", label: "Roboto" },
        { value: "Open Sans", label: "Open Sans" },
    ]
    const accentColors = [
        { value: "blue", label: "Ocean Blue", bgDot: "bg-primary", borderColor: "border-primary", className: "text-primary! bg-primary/5" },
        { value: "green", label: "Emerald Green", bgDot: "bg-green-500", borderColor: "border-emerald-500", className: "text-green-700! hover:border-emerald-500" },
        { value: "purple", label: "Royal purple", bgDot: "bg-purple-500", borderColor: "border-purple-500", className: "text-purple-700! hover:border-purple-500  " },
    ]
    const themeData = [
        { value: "light", label: "Light Mode", bgColor: "bg-slate-50", bgColor2: "bg-white", borderColor: "border-slate-200", borderColor2: "border-slate-200" },
        { value: "dark", label: "Dark Mode", bgColor: "bg-slate-900", bgColor2: "bg-slate-800", borderColor: "border-slate-800", borderColor2: "border-slate-700" },
        {
            value: "system",
            label: "System Default",
            bgColor: "bg-linear-to-br from-slate-50 to-slate-900",
            bgColor2: "bg-slate-400/20 backdrop-blur",
            borderColor: "border-slate-300",
            borderColor2: "border-white/20",
        },
    ]
    const sidebarData = [
        { value: "left", label: "Left" },
        { value: "right", label: "Right" },
    ]

    const [selectedDateFormat, setSelectedDateFormat] = useState(dateFormats[0].value)
    const [selectedSystemFont, setSelectedSystemFont] = useState(systemFonts[0].value)
    const [selectedAccentColor, setSelectedAccentColor] = useState(accentColors[0].value)
    const [selectedSidebar, setSelectedSidebar] = useState(sidebarData[0].value)

    const handleChangeLng = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    const handleChangeAccentColor = (color: string) => {
        setSelectedAccentColor(color)
        if (color === "blue") {
            // Handle blue accent color logic in CSS
            document.documentElement.style.setProperty("--primary", "blue")
        } else if (color === "green") {
            // Handle green accent color logic in CSS
            document.documentElement.style.setProperty("--primary", "green")
        } else if (color === "purple") {
            // Handle violet accent color logic in CSS
            document.documentElement.style.setProperty("--primary", "purple")
        }
    }

    return (
        <div className="space-y-5">
            <Card>
                <CardContent>
                    <div className="mb-6">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">{t("preferences.appearance.title")}</h3>
                        <p className="text-slate-500 text-sm">{t("preferences.appearance.desc")}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {themeData.map((item) => (
                            <div
                                className={`relative cursor-pointer group rounded-xl overflow-hidden  shadow-sm  ${theme === item.value ? "ring-2 ring-primary" : ""}`}
                                onClick={() => setTheme(item.value)}
                            >
                                <div className={` transition-all`}>
                                    <div className={`h-24 ${item.bgColor} flex items-center justify-center`}>
                                        <div className={`w-16 h-10 ${item.bgColor2} rounded shadow-sm border  ${item.borderColor2}`}></div>
                                    </div>
                                    <div className="p-3 text-center bg-white dark:bg-slate-800">
                                        <p className="text-sm font-semibold">{item.label}</p>
                                    </div>
                                </div>
                                {theme === item.value && (
                                    <div className="absolute top-2 right-2  text-primary">
                                        <CheckCircle2Icon />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Accent Color</p>
                        <div className="flex gap-4">
                            {accentColors.map((item) => (
                                <Button
                                    variant={"outline"}
                                    className={` ${item.value === selectedAccentColor ? item.borderColor : ""} ${item.className}`}
                                    onClick={() => handleChangeAccentColor(item.value)}
                                >
                                    <div className={`size-4 rounded-full ${item.bgDot}`}></div>
                                    <span className="text-sm font-medium text-primary">{item.label}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <div className="mb-6">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">{t("preferences.appearance.interface.title")}</h3>
                        <p className="text-slate-500 text-sm">{t("preferences.appearance.interface.desc")}</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{t("preferences.appearance.interface.compact.title")}</p>
                                <p className="text-xs text-slate-500">{t("preferences.appearance.interface.compact.desc")}</p>
                            </div>
                            <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none ring-primary/20">
                                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-6 pt-4 border-t ">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("preferences.appearance.interface.font")}</Label>
                                <CSelectOptions data={systemFonts} valueKey="value" displayKey="label" value={selectedSystemFont} onChangeValue={setSelectedSystemFont} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("preferences.appearance.interface.sidebar")}</Label>
                                <CSelectOptions data={sidebarData} valueKey="value" displayKey="label" value={selectedSidebar} onChangeValue={setSelectedSidebar} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <div className="mb-6">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">{t("preferences.localization.title")}</h3>
                        <p className="text-slate-500 text-sm">{t("preferences.localization.desc")}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="mb-2">{t("preferences.localization.language")}</Label>
                            <div className="flex gap-2">
                                <Button variant={i18n.language === "en" ? "default" : "outline"} className="" onClick={() => handleChangeLng("en")}>
                                    {t("preferences.localization.en")}
                                </Button>
                                <Button variant={i18n.language === "vi" ? "default" : "outline"} className="" onClick={() => handleChangeLng("vi")}>
                                    {t("preferences.localization.vi")}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="">{t("preferences.localization.date")}</Label>
                            <CSelectOptions data={dateFormats} valueKey="value" displayKey="label" value={selectedDateFormat} onChangeValue={setSelectedDateFormat} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <div className="mb-6">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Notifications</h3>
                        <p className="text-slate-500 text-sm">Manage how and when you receive system alerts.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">mail</span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Email Notifications</p>
                                    <p className="text-xs text-slate-500">Receive summaries of pending tasks and approvals.</p>
                                </div>
                            </div>
                            <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">volume_up</span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">System Sounds</p>
                                    <p className="text-xs text-slate-500">Play a sound for new messages and status updates.</p>
                                </div>
                            </div>
                            <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none">
                                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex items-center justify-end gap-3 pb-20">
                <button className="px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Discard Changes</button>
                <button className="px-8 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all">Save Preferences</button>
            </div>
        </div>
    )
}
