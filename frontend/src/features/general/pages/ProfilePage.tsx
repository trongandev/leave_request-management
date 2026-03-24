import CAvatarName from "@/components/etc/CAvatarName"
import { useTranslation } from "react-i18next"
import CAvatarProfile from "@/components/etc/CAvatarProfile"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import { CalendarDaysIcon, Edit2, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

export default function ProfilePage() {
    const { t } = useTranslation()
    const user = useAuthStore((state) => state.user)
    return (
        <main className="max-w-7xl mx-auto w-full px-8 py-8">
            <div className="flex gap-8 items-start">
                <aside className="w-[300px] shrink-0 flex flex-col gap-6">
                    <Card className="p-0! overflow-hidden">
                        <CardContent className="p-0!">
                            <div className="h-24 bg-gradient-to-r from-primary to-blue-400" data-alt="Abstract blue gradient background pattern"></div>
                            <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
                                {user && <CAvatarProfile user={user} className="h-24 w-24 bg-white text-3xl font-semibold" />}
                                <h1 className="text-xl mt-3 font-bold text-slate-900 dark:text-white">{user?.fullName || "Alex Johnson"}</h1>
                                <p className="text-slate-500 text-sm font-medium">{user?.positionId.fullName || t("general.profile.roles.seniorDeveloper")}</p>
                                <div className="mt-6 w-full space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">{t("general.profile.info.empId")}</span>
                                        <span className="font-semibold text-slate-900 dark:text-slate-200">{user?.empId || "EMP-4829"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">{t("general.profile.info.department")}</span>
                                        <span className="font-semibold text-slate-900 dark:text-slate-200">{user?.departmentId?.originName || "IT"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">{t("general.profile.info.workMode")}</span>
                                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">{t("general.profile.info.remote")}</span>
                                    </div>
                                </div>
                                <div className="mt-7 w-full">
                                    <Button className="w-full h-12">
                                        <Edit2 /> {t("general.profile.info.editProfile")}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t("general.profile.contact.title")}</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-center">
                                    <MailIcon className="text-gray-500" />
                                    <div className="text-xs">
                                        <p className="text-slate-400">{t("general.profile.contact.workEmail")}</p>
                                        <p className="text-slate-900 dark:text-slate-200 font-medium">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <PhoneIcon className="text-gray-500" />
                                    <div className="text-xs">
                                        <p className="text-slate-400">{t("general.profile.contact.phone")}</p>
                                        <p className="text-slate-900 dark:text-slate-200 font-medium">{user?.phone?.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
                <Card>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-primary">
                                        <CalendarDaysIcon />
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t("general.profile.details.joinedDate")}</h4>
                                </div>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{new Date(user?.createdAt || new Date()).toLocaleDateString()}</p>
                                <p className="text-xs text-slate-500 mt-1">{t("general.profile.details.tenure", { years: 2, months: 4 })}</p>
                            </div>
                            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-3">{t("general.profile.details.lineManager")}</h4>
                                <CAvatarName user={user} />
                            </div>
                            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-3">{t("general.profile.details.officeLocation")}</h4>
                                <div className="flex items-center gap-3">
                                    <MapPinIcon className="text-purple-500" />
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white" data-location="San Francisco">
                                            San Francisco, HQ
                                        </p>
                                        <p className="text-xs text-slate-500">{t("general.profile.details.floorInfo")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t("general.profile.timeOff.title")}</h3>
                                <button className="text-primary text-sm font-bold hover:underline">{t("general.profile.timeOff.request")}</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900">
                                    <div className="relative h-14 w-14 flex items-center justify-center">
                                        <svg className="h-14 w-14 transform -rotate-90">
                                            <circle className="text-slate-100 dark:text-slate-800" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" stroke-width="4"></circle>
                                            <circle
                                                className="text-primary"
                                                cx="28"
                                                cy="28"
                                                fill="transparent"
                                                r="24"
                                                stroke="currentColor"
                                                stroke-dasharray="150"
                                                stroke-dashoffset="40"
                                                stroke-width="4"
                                            ></circle>
                                        </svg>
                                        <span className="absolute text-[10px] font-bold">12/18</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("general.profile.timeOff.types.vacation")}</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{t("general.profile.timeOff.daysLeft", { days: 6 })}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900">
                                    <div className="relative h-14 w-14 flex items-center justify-center">
                                        <svg className="h-14 w-14 transform -rotate-90">
                                            <circle className="text-slate-100 dark:text-slate-800" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" stroke-width="4"></circle>
                                            <circle
                                                className="text-orange-400"
                                                cx="28"
                                                cy="28"
                                                fill="transparent"
                                                r="24"
                                                stroke="currentColor"
                                                stroke-dasharray="150"
                                                stroke-dashoffset="100"
                                                stroke-width="4"
                                            ></circle>
                                        </svg>
                                        <span className="absolute text-[10px] font-bold">3/10</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("general.profile.timeOff.types.sick")}</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{t("general.profile.timeOff.daysLeft", { days: 7 })}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900">
                                    <div className="relative h-14 w-14 flex items-center justify-center">
                                        <svg className="h-14 w-14 transform -rotate-90">
                                            <circle className="text-slate-100 dark:text-slate-800" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" stroke-width="4"></circle>
                                            <circle
                                                className="text-emerald-400"
                                                cx="28"
                                                cy="28"
                                                fill="transparent"
                                                r="24"
                                                stroke="currentColor"
                                                stroke-dasharray="150"
                                                stroke-dashoffset="130"
                                                stroke-width="4"
                                            ></circle>
                                        </svg>
                                        <span className="absolute text-[10px] font-bold">1/5</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("general.profile.timeOff.types.personal")}</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{t("general.profile.timeOff.daysLeft", { days: 4 })}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900">
                                    <div className="relative h-14 w-14 flex items-center justify-center">
                                        <svg className="h-14 w-14 transform -rotate-90">
                                            <circle className="text-slate-100 dark:text-slate-800" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" stroke-width="4"></circle>
                                            <circle
                                                className="text-purple-400"
                                                cx="28"
                                                cy="28"
                                                fill="transparent"
                                                r="24"
                                                stroke="currentColor"
                                                stroke-dasharray="150"
                                                stroke-dashoffset="150"
                                                stroke-width="4"
                                            ></circle>
                                        </svg>
                                        <span className="absolute text-[10px] font-bold">0/2</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("general.profile.timeOff.types.learning")}</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{t("general.profile.timeOff.daysLeft", { days: 2 })}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t("general.profile.activity.title")}</h3>
                                <button className="text-slate-500 text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                                    {t("general.profile.activity.viewLog")} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                            <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl">
                                <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
                                    <thead className="bg-slate-50 dark:bg-slate-800">
                                        <tr>
                                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{t("general.profile.activity.columns.type")}</th>
                                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{t("general.profile.activity.columns.date")}</th>
                                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{t("general.profile.activity.columns.duration")}</th>
                                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{t("general.profile.activity.columns.status")}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <tr>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                                                    <span className="font-medium">{t("general.profile.activity.types.vacation")}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-slate-500">Feb 10 - Feb 12, 2024</td>
                                            <td className="px-4 py-4 text-slate-500">{t("general.profile.activity.days", { count: 3 })}</td>
                                            <td className="px-4 py-4">
                                                <span className="px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold">{t("general.profile.activity.statuses.approved")}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                                                    <span className="font-medium">{t("general.profile.activity.types.sick")}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-slate-500">Jan 24, 2024</td>
                                            <td className="px-4 py-4 text-slate-500">{t("general.profile.activity.day", { count: 1 })}</td>
                                            <td className="px-4 py-4">
                                                <span className="px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold">{t("general.profile.activity.statuses.approved")}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                                                    <span className="font-medium">{t("general.profile.activity.types.workshop")}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-slate-500">Jan 15, 2024</td>
                                            <td className="px-4 py-4 text-slate-500">{t("general.profile.activity.day", { count: 1 })}</td>
                                            <td className="px-4 py-4">
                                                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold">{t("general.profile.activity.statuses.processed")}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
