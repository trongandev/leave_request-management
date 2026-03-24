/* eslint-disable react-hooks/set-state-in-effect */
import { Badge } from "@/components/ui/badge"
import { Trans, useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import {
    CalendarOffIcon,
    ChevronRightIcon,
    DoorClosedLockedIcon,
    ExternalLinkIcon,
    IdCardIcon,
    ListTodoIcon,
    MonitorCogIcon,
    NotebookPenIcon,
    ScrollTextIcon,
    SettingsIcon,
    ShieldUserIcon,
    UserCog2Icon,
    UserPenIcon,
    UserRoundIcon,
    WalletIcon,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function DashboardHomePage() {
    const { t } = useTranslation()
    const { user } = useAuthStore()
    const [namePointDay, setNamePointDay] = useState("")
    const roleName = user?.roleId.name
    useEffect(() => {
        // kiểm tra xem giờ là buổi sáng trưa hay chiều
        const hour = new Date().getHours()
        if (hour < 12) {
            setNamePointDay(t("general.dashboard.greeting.morning"))
        } else if (hour < 18) {
            setNamePointDay(t("general.dashboard.greeting.afternoon"))
        } else {
            setNamePointDay(t("general.dashboard.greeting.evening"))
        }
    }, [user])

    return (
        <main className="">
            <section className="mb-10">
                <div className="flex flex-col gap-1 bg-white p-5 rounded-xl shadow-xs">
                    <h1 className="text-2xl  tracking-tight text-slate-700 dark:text-white">
                        {t("general.dashboard.greeting.hello")} {namePointDay}, <span className="text-primary font-bold text-3xl uppercase">{user?.fullName || t("general.dashboard.greeting.user")}</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {t("general.dashboard.greeting.datePattern", { date: "Thứ Tư, ngày 24 tháng 5, 2024" })} {/*  chỉ hiển thị phần này khi người dùng là HR hoặc MANAGER */}
                        {(roleName === "HR" || roleName === "MANAGER") && (
                            <>
                                <br />
                                <Trans
                                    i18nKey="general.dashboard.greeting.pendingApprovals"
                                    values={{ count: 3 }}
                                    components={{ 1: <span className="bg-yellow-500 text-white px-1.5 py-px rounded-sm" /> }}
                                />
                            </>
                        )}
                    </p>
                </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Công việc của tôi, hiển thị cho tất cả người dùng kể cả EMPLOYEE */}
                <section className="flex flex-col  bg-white shadow rounded-xl overflow-hidden">
                    <div className="flex items-center gap-4 shadow p-5">
                        <UserPenIcon className="text-primary" />
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t("general.dashboard.myWork.title")}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5">
                        <Card className="shadow-none border-gray-200">
                            <CardContent className="flex gap-5">
                                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-md">
                                    <CalendarOffIcon />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.myWork.createLeave.title")}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.myWork.createLeave.desc")}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-none border-gray-200">
                            <CardContent className="flex gap-5">
                                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-md">
                                    <WalletIcon />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.myWork.viewBalance.title")}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.myWork.viewBalance.desc", { days: 12.5 })}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-2 shadow-none border-gray-200">
                            <CardContent className="flex gap-5">
                                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-md">
                                    <IdCardIcon />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.myWork.updateProfile.title")}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.myWork.updateProfile.desc")}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Quản lý đội ngũ mới hiển thị phần này lên, chỉ có role = HR hoặc MANAGER */}
                {(roleName === "HR" || roleName === "MANAGER") && (
                    <>
                        <section className="flex flex-col bg-white shadow rounded-xl overflow-hidden">
                            <div className="flex items-center gap-4 shadow p-5">
                                <UserRoundIcon className="text-green-600" />
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t("general.dashboard.teamManagement.title")}</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-3 p-5">
                                <Card className="shadow-none border-gray-200">
                                    <CardContent className="flex gap-5 items-center">
                                        <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-md">
                                            <ListTodoIcon />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.teamManagement.approveRequests.title")}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.teamManagement.approveRequests.desc", { count: 3 })}</p>
                                        </div>
                                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold">3</div>
                                    </CardContent>
                                </Card>
                                <Card className="shadow-none border-gray-200">
                                    <CardContent className="flex gap-5 items-center">
                                        <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-md">
                                            <NotebookPenIcon />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.teamManagement.absenceReport.title")}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.teamManagement.absenceReport.desc")}</p>
                                        </div>
                                        <ChevronRightIcon className="text-gray-400" />
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                        <section className="flex flex-col  bg-white shadow rounded-xl overflow-hidden">
                            <div className="flex items-center gap-4 shadow p-5">
                                <UserCog2Icon className="text-amber-600" />
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t("general.dashboard.hrManagement.title")}</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5">
                                <Card className="shadow-none border-gray-200">
                                    <CardContent className="flex gap-3 flex-col">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                                            <UserRoundIcon />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.hrManagement.employeeList.title")}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.hrManagement.employeeList.desc", { count: 245 })}</p>
                                        </div>
                                        <div className="">
                                            <Button className="text-xs" variant={"link"}>
                                                {t("general.dashboard.hrManagement.employeeList.viewDetails")} <ExternalLinkIcon size={14} />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="shadow-none border-gray-200">
                                    <CardContent className="flex gap-3 flex-col">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                                            <ShieldUserIcon />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.hrManagement.policyConfig.title")}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.hrManagement.policyConfig.desc")}</p>
                                        </div>
                                        <div className="">
                                            <Button className="text-xs" variant={"link"}>
                                                Xem chi tiết <ExternalLinkIcon size={14} />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </>
                )}
                {/* Quản lý hệ thống, chỉ hiển thị cho role ADMIN */}
                {roleName === "ADMIN" && (
                    <section className="flex flex-col  bg-white shadow rounded-xl overflow-hidden">
                        <div className="flex items-center gap-4 shadow p-5">
                            <MonitorCogIcon />
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t("general.dashboard.system.title")}</h2>
                        </div>
                        <div className="">
                            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="flex justify-between items-center p-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <SettingsIcon />
                                        <span className="font-medium">{t("general.dashboard.system.settings")}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>
                                <div className="flex justify-between items-center p-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <ScrollTextIcon />
                                        <span className="font-medium">{t("general.dashboard.system.auditLogs")}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>
                                <div className="flex justify-between items-center p-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <DoorClosedLockedIcon />
                                        <span className="font-medium">{t("general.dashboard.system.rbac")}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <section className="mt-12">
                <div className="rounded-xl bg-primary/10 p-1">
                    <div className="rounded-lg bg-white dark:bg-slate-900 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h3 className="text-lg font-bold">{t("general.dashboard.stats.title")}</h3>
                            <div className="flex gap-2">
                                <Badge variant={"outline"} className="text-xs">
                                    {t("general.dashboard.stats.newEmployees", { count: 12 })}
                                </Badge>
                                <Badge variant={"outline"}>{t("general.dashboard.stats.openPositions", { count: 5 })}</Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-semibold">{t("general.dashboard.stats.totalEmployees.label")}</span>
                                <span className="text-2xl font-black text-slate-900 dark:text-white">{t("general.dashboard.stats.totalEmployees.value")}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-semibold">{t("general.dashboard.stats.leavesToday.label")}</span>
                                <span className="text-2xl font-black text-slate-900 dark:text-white">{t("general.dashboard.stats.leavesToday.value")}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-semibold">{t("general.dashboard.stats.turnoverRate.label")}</span>
                                <span className="text-2xl font-black text-emerald">{t("general.dashboard.stats.turnoverRate.value")}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-semibold">{t("general.dashboard.stats.pendingRequests.label")}</span>
                                <span className="text-2xl font-black text-amber">{t("general.dashboard.stats.pendingRequests.value")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
