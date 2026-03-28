/* eslint-disable react-hooks/set-state-in-effect */
import { Badge } from "@/components/ui/badge"
import { Trans, useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import {
    CalendarOffIcon,
    ChevronRightIcon,
    CloudSync,
    DoorClosedLockedIcon,
    ExternalLinkIcon,
    HistoryIcon,
    IdCardIcon,
    ListTodoIcon,
    MonitorCogIcon,
    NotebookPenIcon,
    Rocket,
    ScrollTextIcon,
    SettingsIcon,
    ShieldUserIcon,
    Umbrella,
    UserCog2Icon,
    UserPenIcon,
    UserRoundIcon,
    WalletIcon,
} from "lucide-react"
import { createElement, useEffect, useState } from "react"

export default function DashboardHomePage() {
    const { t } = useTranslation()
    const { user } = useAuthStore()
    const [namePointDay, setNamePointDay] = useState("")
    const roleName = user?.roleId.name
    const recentRequests = [
        { id: 1, name: "Annual Leave", status: "Pending", time: "Jul 12 - Jul 19, 2024 (5 days)", icon: Umbrella },
        { id: 2, name: "Sick Leave", status: "Approved", time: "Jul 10 - Jul 10, 2024 (1 day)", icon: ShieldUserIcon },
        { id: 3, name: "Compensatory", status: "Rejected", time: "Jun 28 - Jul 2, 2024 (5 days)", icon: HistoryIcon },
    ]

    const bgColors: any = {
        "Annual Leave": "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500",
        "Sick Leave": "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500",
        Compensatory: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-500",
    }

    const statusColors: any = {
        Pending: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-500",
        Approved: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500",
        Rejected: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500",
    }

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
    }, [user, t])

    return (
        <main className="space-y-10">
            <Card>
                <CardContent>
                    <h1 className="text-2xl  tracking-tight text-slate-700 dark:text-white">
                        {t("general.dashboard.greeting.hello")} {namePointDay},{" "}
                        <span className="text-primary font-bold text-3xl uppercase">{user?.fullName || t("general.dashboard.greeting.user")}</span>
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
                </CardContent>
            </Card>
            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t("general.profile.timeOff.title")}</h3>
                    <button className="text-primary text-sm font-bold hover:underline">{t("general.profile.timeOff.request")}</button>
                </div>
                <div className="">
                    <Card>
                        <CardContent>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Số phép còn lại</span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">7/12</span>
                            </div>
                            <div className="w-full h-2 bg-secondary-foreground/20 rounded-full overflow-hidden relative  ">
                                <div
                                    className="absolute bg-primary z-10 w-full h-full rounded-full transition-all duration-500 min-w-0"
                                    style={{ transform: `translateX(${-(1 - 7 / 12) * 100}%)` }}
                                ></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-card rounded-lg shadow-card border overflow-hidden">
                        <div className="px-6 py-4 border-b flex items-center justify-between bg-header">
                            <h2 className="font-bold text-lg">Recent Requests</h2>
                            <button className="text-primary text-xs font-bold hover:underline">View All</button>
                        </div>
                        <div className="divide-y divide-border">
                            {recentRequests.map((request) => (
                                <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`size-10 rounded-lg ${bgColors[request.name] || "bg-emerald-100 text-emerald-600"} flex items-center justify-center`}>
                                            {createElement(request.icon)}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{request.name}</p>
                                            <p className="text-xs text-slate-500">{request.time} </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight ${statusColors[request.status] || "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"}`}
                                    >
                                        {request.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="space-y-4">
                        <h2 className="font-bold text-lg px-2">Company Announcements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-primary/5 border border-primary/10 rounded-lg p-5 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">HR UPDATES</span>
                                    <span className="text-[10px] text-slate-500 font-medium uppercase">2 hours ago</span>
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white leading-tight">New Remote Work Policy Guidelines for Q3</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">The updated handbook includes new flexible hours and home office stipend procedures...</p>
                                <button className="mt-auto text-primary text-xs font-bold self-start">Read More</button>
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-card rounded-lg p-5 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">EVENT</span>
                                    <span className="text-[10px] text-slate-500 font-medium uppercase">Yesterday</span>
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Annual Office Retreat: RSVP Needed</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">Please confirm your attendance and meal preferences for our mountain getaway in May.</p>
                                <button className="mt-auto text-primary text-xs font-bold self-start">Read More</button>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="space-y-8">
                    <section className="bg-card rounded-lg shadow-card border  overflow-hidden">
                        <div className="px-6 py-4 border-b  flex items-center justify-between bg-header">
                            <h2 className="font-bold text-sm uppercase tracking-wider text-slate-500">Upcoming</h2>
                            <span className="text-[10px] font-bold  px-2 py-1 rounded border">APRIL 2024</span>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center justify-center size-12 bg-primary/10 rounded-lg shrink-0">
                                    <span className="text-[10px] font-bold text-primary uppercase">Apr</span>
                                    <span className="text-lg font-black text-primary leading-none">15</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">National Holiday</p>
                                    <p className="text-xs text-slate-500">Good Friday Observed</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center justify-center size-12 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Apr</span>
                                    <span className="text-lg font-black text-slate-500 leading-none">22</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Annual Leave</p>
                                    <p className="text-xs text-slate-500">Personal Day (1 day)</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center justify-center size-12 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">May</span>
                                    <span className="text-lg font-black text-slate-500 leading-none">01</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Labor Day</p>
                                    <p className="text-xs text-slate-500">Public Holiday</p>
                                </div>
                            </div>
                            <Button className="w-full h-8">
                                <CloudSync /> Sync to Calendar
                            </Button>
                        </div>
                    </section>
                    <section className="bg-primary dark:bg-card p-6 rounded-lg shadow-lg relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 size-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                        <div className="relative z-10 space-y-4">
                            <h2 className="text-white font-bold text-lg">Need a break?</h2>
                            <p className="text-primary-100/80 text-xs leading-relaxed text-white/70">Easily request leave, track your approvals, and view upcoming holidays all in one place.</p>
                            <Button className="w-full h-10" variant={"secondary"}>
                                <Rocket />
                                New Request
                            </Button>
                            <div className="grid grid-cols-2 gap-2 pt-2">
                                <Button className="text-[10px] bg-white/80" variant={"outline"}>
                                    VIEW SLIPS
                                </Button>
                                <Button className="text-[10px] bg-white/80" variant={"outline"}>
                                    TAX DOCS
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Công việc của tôi, hiển thị cho tất cả người dùng kể cả EMPLOYEE */}
                <section className="flex flex-col  bg-card border shadow rounded-xl overflow-hidden">
                    <div className="flex items-center gap-4 shadow p-5">
                        <UserPenIcon className="text-primary" />
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t("general.dashboard.myWork.title")}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5">
                        <Button className="flex gap-5 h-22 rounded-xl text-left" variant={"outline"}>
                            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-md">
                                <CalendarOffIcon />
                            </div>
                            <div className="flex flex-col flex-1">
                                <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.myWork.createLeave.title")}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.myWork.createLeave.desc")}</p>
                            </div>
                        </Button>
                        <Button className="flex gap-5 h-22 rounded-xl text-left" variant={"outline"}>
                            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-md">
                                <WalletIcon />
                            </div>
                            <div className="flex flex-col flex-1">
                                <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.myWork.viewBalance.title")}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.myWork.viewBalance.desc", { days: 12.5 })}</p>
                            </div>
                        </Button>
                        <Button className="flex gap-5 h-22 rounded-xl text-left" variant={"outline"}>
                            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-md">
                                <IdCardIcon />
                            </div>
                            <div className="flex flex-col flex-1">
                                <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.myWork.updateProfile.title")}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.myWork.updateProfile.desc")}</p>
                            </div>
                        </Button>
                    </div>
                </section>

                {/* Quản lý đội ngũ mới hiển thị phần này lên, chỉ có role = HR hoặc MANAGER */}
                {(roleName === "HR" || roleName === "MANAGER") && (
                    <>
                        <section className="flex flex-col bg-card shadow border rounded-xl overflow-hidden">
                            <div className="flex items-center gap-4 shadow p-5">
                                <UserRoundIcon className="text-green-600" />
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t("general.dashboard.teamManagement.title")}</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-3 p-5">
                                <Button className="flex gap-5 h-22 rounded-xl text-left" variant={"outline"}>
                                    <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-md">
                                        <ListTodoIcon />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.teamManagement.approveRequests.title")}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t("general.dashboard.teamManagement.approveRequests.desc", { count: 3 })}</p>
                                    </div>
                                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold">3</div>
                                </Button>
                                <Button className="flex gap-5 h-22 rounded-xl text-left" variant={"outline"}>
                                    <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-md">
                                        <NotebookPenIcon />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <h3 className="font-bold text-slate-900 dark:text-white">{t("general.dashboard.teamManagement.absenceReport.title")}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ">{t("general.dashboard.teamManagement.absenceReport.desc")}</p>
                                    </div>
                                    <ChevronRightIcon className="text-gray-400" />
                                </Button>
                            </div>
                        </section>
                        <section className="flex flex-col  bg-card border shadow rounded-xl overflow-hidden">
                            <div className="flex items-center gap-4 shadow p-5">
                                <UserCog2Icon className="text-amber-600" />
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t("general.dashboard.hrManagement.title")}</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5">
                                <Card className="shadow-none  active:scale-95 hover:scale-[0.98] transitions-all duration-150 cursor-pointer">
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
                                <Card className="shadow-none   active:scale-95 hover:scale-[0.98] transitions-all duration-150 cursor-pointer">
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
                    <section className="flex flex-col  bg-card border shadow rounded-xl overflow-hidden">
                        <div className="flex items-center gap-4 shadow p-5">
                            <MonitorCogIcon />
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t("general.dashboard.system.title")}</h2>
                        </div>
                        <div className="">
                            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="flex justify-between items-center p-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 cursor-pointer  active:scale-95 hover:scale-[0.98] transitions-all duration-150">
                                    <div className="flex items-center gap-3">
                                        <SettingsIcon />
                                        <span className="font-medium">{t("general.dashboard.system.settings")}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>
                                <div className="flex justify-between items-center p-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 cursor-pointer active:scale-95 hover:scale-[0.98] transitions-all duration-150">
                                    <div className="flex items-center gap-3">
                                        <ScrollTextIcon />
                                        <span className="font-medium">{t("general.dashboard.system.auditLogs")}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>
                                <div className="flex justify-between items-center p-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 cursor-pointer active:scale-95 hover:scale-[0.98] transitions-all duration-150">
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
                    <div className="rounded-lg bg-card p-6">
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
