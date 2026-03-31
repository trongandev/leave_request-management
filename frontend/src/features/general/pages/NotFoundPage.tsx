import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { Calendar1Icon, ChevronLeft, HeadsetIcon, LayoutDashboardIcon } from "lucide-react"

import { Link } from "react-router-dom"

export default function NotFoundPage() {
    const { t } = useTranslation()
    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -z-10"></div>
            <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
                <div className="relative inline-block">
                    <h1 className="text-[120px] md:text-[180px] font-extrabold leading-none tracking-tighter text-primary/10 select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl md:text-8xl font-bold text-primary drop-shadow-sm">404</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{t("general.notFound.title")}</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">{t("general.notFound.desc")}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link to="/">
                        <Button className="h-12">
                            <ChevronLeft /> {t("general.notFound.backToHome")}
                        </Button>
                    </Link>
                    <Button className="h-12" variant={"outline"}>
                        <HeadsetIcon />
                        {t("general.notFound.contactSupport")}
                    </Button>
                </div>
                <div className="pt-12 border-t border-slate-200 dark:border-slate-800 mt-12 max-w-md mx-auto">
                    <p className="text-sm text-slate-500 mb-4 uppercase tracking-wider font-semibold">{t("general.notFound.quickLinks")}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <Link to="/">
                            <Button variant={"outline"} className="text-primary w-full h-12">
                                <LayoutDashboardIcon />
                                {t("general.notFound.links.dashboard")}
                            </Button>
                        </Link>
                        <Link to="/my-leaves">
                            <Button variant={"outline"} className="text-primary w-full h-12">
                                <Calendar1Icon />
                                {t("general.notFound.links.myLeaves")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
