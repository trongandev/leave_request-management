import CSelectOptions from "@/components/etc/CSelectOptions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/contexts/themeContext"
import { CheckCircle2Icon } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
export default function CAppearancePage() {
    const { t } = useTranslation()
    const { theme, setTheme } = useTheme()

    const systemFonts = [
        { value: "Inter", label: t("preferences.appearance.interface.fontOptions.inter") },
        { value: "Roboto", label: t("preferences.appearance.interface.fontOptions.roboto") },
        { value: "Open Sans", label: t("preferences.appearance.interface.fontOptions.openSans") },
    ]
    const accentColors = [
        { value: "blue", label: t("preferences.appearance.interface.theme.colors.blue"), bgDot: "bg-primary", borderColor: "border-primary", className: "text-primary! bg-primary/5" },
        {
            value: "green",
            label: t("preferences.appearance.interface.theme.colors.green"),
            bgDot: "bg-green-500",
            borderColor: "border-emerald-500",
            className: "text-green-700! hover:border-emerald-500",
        },
        {
            value: "purple",
            label: t("preferences.appearance.interface.theme.colors.purple"),
            bgDot: "bg-purple-500",
            borderColor: "border-purple-500",
            className: "text-purple-700! hover:border-purple-500  ",
        },
    ]
    const themeData = [
        {
            value: "light",
            label: t("preferences.appearance.interface.theme.label.light"),
            bgColor: "bg-slate-50",
            bgColor2: "bg-white",
            borderColor: "border-slate-200",
            borderColor2: "border-slate-200",
        },
        {
            value: "dark",
            label: t("preferences.appearance.interface.theme.label.dark"),
            bgColor: "bg-slate-900",
            bgColor2: "bg-slate-800",
            borderColor: "border-slate-800",
            borderColor2: "border-slate-700",
        },
        {
            value: "system",
            label: t("preferences.appearance.interface.theme.label.system"),
            bgColor: "bg-linear-to-br from-slate-50 to-slate-900",
            bgColor2: "bg-slate-400/20 backdrop-blur",
            borderColor: "border-slate-300",
            borderColor2: "border-white/20",
        },
    ]
    const sidebarData = [
        { value: "left", label: t("preferences.appearance.interface.sidebarData.left") },
        { value: "right", label: t("preferences.appearance.interface.sidebarData.right") },
    ]


    const [selectedSystemFont, setSelectedSystemFont] = useState(systemFonts[0].value)
    const [selectedAccentColor, setSelectedAccentColor] = useState(accentColors[0].value)
    const [selectedSidebar, setSelectedSidebar] = useState(sidebarData[0].value)



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
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t("preferences.appearance.interface.theme.accentColor")}</p>
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
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">{t("preferences.notification.title")}</h3>
                        <p className="text-slate-500 text-sm">{t("preferences.notification.desc")}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">mail</span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t("preferences.notification.mail.title")}</p>
                                    <p className="text-xs text-slate-500">{t("preferences.notification.mail.desc")}</p>
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
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t("preferences.notification.sound.title")}</p>
                                    <p className="text-xs text-slate-500">{t("preferences.notification.sound.desc")}</p>
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
                <button className="px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    {t("preferences.changes.discard")}
                </button>
                <button className="px-8 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all">
                    {t("preferences.changes.save")}
                </button>
            </div>
        </div>
    )
}
