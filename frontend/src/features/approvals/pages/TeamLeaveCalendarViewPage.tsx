import { useState } from "react"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Frown, PlusIcon, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import userService from "@/services/userService"
export default function TeamLeaveCalendarViewPage() {
    const { t } = useTranslation()
    const [viewDate, setViewDate] = useState(dayjs())
    const { data } = useQuery({
        queryKey: ["team-members"],
        queryFn: () => userService.getTeamMembers(),
    })
    const teamMembers = Array.isArray(data) ? data.filter(Boolean) : []
    const generateCalendar = () => {
        const startOfMonth = viewDate.startOf("month")
        const startDate = startOfMonth.startOf("week")

        const days = []
        let curr = startDate

        // Tạo mảng 42 ngày
        for (let i = 0; i < 42; i++) {
            days.push(curr)
            curr = curr.add(1, "day")
        }
        return days
    }

    // 3. Hàm di chuyển tháng
    const prevMonth = () => setViewDate(viewDate.subtract(1, "month"))
    const nextMonth = () => setViewDate(viewDate.add(1, "month"))
    const today = () => setViewDate(dayjs())

    const renderRequestCalendar = (date: string) => {
        switch (date) {
            case "2026-03-10":
                return (
                    <span className="ml-3 text-xs font-medium tracking-wide uppercase px-2 h-7 rounded-l-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 flex items-center gap-2">
                        <Frown size={18} /> Charline sick
                    </span>
                )
            case "2026-03-11":
            case "2026-03-12":
            case "2026-03-13":
                return <div className="bg-red-100 dark:bg-red-900  w-full h-3"></div>
            case "2026-03-26":
                return (
                    <span className="ml-3 text-xs font-medium tracking-wide uppercase px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300"></div> Evan 2h OT
                    </span>
                )
            case "2026-03-30":
                return (
                    <span className="ml-3 text-xs font-medium tracking-wide uppercase px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 ">
                        Public Holiday
                    </span>
                )
            default:
                return <span className="ml-3">{date.split("-")[2]}</span>
        }
    }
    return (
        <div className="bg-background flex flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-72 bg-card flex flex-col z-10  md:flex shadow-xs rounded-lg border">
                    <div className="p-5 border-b">
                        <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">{t("approvals.calendar.filters.title")}</h2>
                        <div className="relative">
                            <Search className="absolute translate-y-1/2 left-3 text-muted-foreground" />
                            <Input placeholder={t("approvals.calendar.filters.placeholder")} className="pl-12" />
                        </div>
                    </div>
                    <div className="px-5 py-4 border-b bg-neutral-50/50 dark:bg-neutral-700/50">
                        <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-3 uppercase">{t("approvals.calendar.filters.legendTitle")}</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200 dark:bg-blue-900 dark:border-blue-700"></span>
                                <span className="text-sm text-neutral-600 dark:text-neutral-300">{t("approvals.calendar.filters.approvedLeave")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-200 dark:bg-amber-900 dark:border-amber-700"></span>
                                <span className="text-sm text-neutral-600 dark:text-neutral-300">{t("approvals.calendar.filters.overtime")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-100 border border-purple-200 dark:bg-purple-900 dark:border-purple-700"></span>
                                <span className="text-sm text-neutral-600 dark:text-neutral-300">{t("approvals.calendar.filters.publicHoliday")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">{t("approvals.calendar.teamMembers.title")}</h3>
                            <button className="text-xs text-primary hover:text-primary-dark font-medium">{t("approvals.calendar.teamMembers.selectAll")}</button>
                        </div>
                        <div className="space-y-3">
                            {teamMembers.map((member, index) => (
                                <label
                                    className="flex items-center gap-3 p-2 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-lg cursor-pointer group transition-colors"
                                    key={member?._id || member?._id || index}
                                >
                                    <input className="rounded border-neutral-300 text-primary focus:ring-primary/30 h-4 w-4" type="checkbox" />
                                    <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden shrink-0">
                                        <img
                                            alt={member?.fullName || "Unknown member"}
                                            className="h-full w-full object-cover"
                                            data-alt={`Portrait of ${member?.fullName || "Unknown member"}`}
                                            src={member?.avatar || ""}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-primary transition-colors">{member?.fullName || "Unknown member"}</p>
                                        <p className="text-xs text-neutral-400">{member?.departmentId?.originName || "No department"}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>
                <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark p-6 h-full overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 shrink-0">
                        <Card className="p-0">
                            <CardContent className="flex items-center gap-4 h-12 p-0 px-2">
                                <Button variant={"ghost"} onClick={() => prevMonth()}>
                                    <ChevronLeft />
                                </Button>
                                <div className="flex items-baseline gap-2 px-2">
                                    <span className="text-lg font-medium text-neutral-800 dark:text-white">{viewDate.format("MMMM")}</span>
                                    <span className="text-lg font-normal text-neutral-500 dark:text-neutral-400">{viewDate.format("YYYY")}</span>
                                </div>

                                <Button variant={"ghost"} onClick={() => nextMonth()}>
                                    <ChevronRight />
                                </Button>
                                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1"></div>
                                <Button variant={"ghost"} onClick={() => today()}>
                                    Today
                                </Button>
                            </CardContent>
                        </Card>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Link to="/approvals/request-time-off" className="w-full">
                                <Button className="h-12 px-5">
                                    <PlusIcon />
                                    <span>{t("approvals.calendar.header.requestTimeOff")}</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 bg-card  rounded-xl border shadow-xs overflow-hidden flex flex-col">
                        <div className="grid grid-cols-7  ">
                            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                                <div key={d} className={` text-center text-sm w-full h-12 flex items-center justify-center  bg-foreground/5 font-semibold uppercase tracking-wide text-neutral-500`}>
                                    {d}
                                </div>
                            ))}

                            {generateCalendar().map((date, index) => {
                                const isCurrentMonth = date.isSame(viewDate, "month")
                                const isToday = date.isSame(dayjs(), "day")

                                return (
                                    <div
                                        key={index}
                                        className={`pt-3 h-28  cursor-pointer  border-b ${index % 7 === 6 ? "border-r-0" : "border-r"} hover:bg-primary/5 
                ${!isCurrentMonth ? "text-neutral-300 dark:text-neutral-500" : ""}
                ${isToday ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                                    >
                                        {renderRequestCalendar(date.format("YYYY-MM-DD"))}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
