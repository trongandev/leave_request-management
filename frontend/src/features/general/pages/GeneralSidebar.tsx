/* eslint-disable react-hooks/set-state-in-effect */
import CAvatarName from "@/components/etc/CAvatarName"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore"
import {
    AlarmClockIcon,
    BarChartIcon,
    BriefcaseBusiness,
    BrickWallShieldIcon,
    Building2,
    CalendarDaysIcon,
    FormIcon,
    GlobeIcon,
    HistoryIcon,
    HomeIcon,
    LassoSelectIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    NetworkIcon,
    SettingsIcon,
    UserIcon,
    Users,
    WalletCardsIcon,
    NotepadText,
    MailWarning,
} from "lucide-react"
import { createElement, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"

export default function GeneralSidebar() {
    const { pathname } = useLocation()
    const { user, logout } = useAuthStore()
    const { t } = useTranslation()

    const [portalName, setPortalName] = useState(t("general.sidebar.portals.employee"))
    const roleName = user?.roleId.name
    const [newNav, setNewNav] = useState<typeof empNav>([])

    // sidebar cho employee
    const empNav = useMemo(
        () => [
            {
                name: "main menu",
                items: [
                    { name: t("sidebar.home"), icon: HomeIcon, href: "/" },
                    // { name: t("sidebar.dashboard"), icon: LayoutDashboardIcon, href: "/employee" },
                    { name: t("sidebar.createNewRequest"), icon: BarChartIcon, href: "/employee/create-new-request-form" },
                    { name: t("sidebar.myRequestHistory"), icon: HistoryIcon, href: "/employee/my-request-history-list" },
                    { name: t("sidebar.teamCalendar"), icon: CalendarDaysIcon, href: "/approvals/team-calendar" },
                ],
            },
            {
                name: "settings",
                items: [
                    { name: t("sidebar.profile"), icon: UserIcon, href: "/profile" },
                    { name: t("sidebar.preference"), icon: SettingsIcon, href: "/preferences" },
                ],
            },
        ],
        [t],
    )

    // sidebar cho HR - Manager
    const manNav = useMemo(
        () => [
            {
                name: t("sidebar.mainMenu"),
                items: [
                    { name: t("sidebar.home"), icon: HomeIcon, href: "/" },
                    // { name: t("sidebar.dashboard"), icon: LayoutDashboardIcon, href: "/approvals" },
                    { name: t("sidebar.createNewRequest"), icon: BarChartIcon, href: "/employee/create-new-request-form" },
                    { name: t("sidebar.myRequestHistory"), icon: HistoryIcon, href: "/employee/my-request-history-list" },
                    { name: t("sidebar.teamCalendar"), icon: CalendarDaysIcon, href: "/approvals/team-calendar" },
                ],
            },
            {
                name: "Manager",
                items: [
                    { name: "Team Management", icon: Users, href: "/approvals/team-management" },
                    { name: "Team Requests", icon: MailWarning, href: "/approvals/team-requests" },
                    { name: t("sidebar.leaveBalances"), icon: NotepadText, href: "/approvals/leave-balances" },
                ],
            },
            {
                name: t("sidebar.setting"),
                items: [
                    { name: t("sidebar.profile"), icon: UserIcon, href: "/profile" },
                    { name: t("sidebar.preference"), icon: SettingsIcon, href: "/preferences" },
                ],
            },
        ],
        [t],
    )

    const HRNav = useMemo(
        () => [
            {
                name: t("sidebar.mainMenu"),
                items: [
                    { name: t("sidebar.home"), icon: HomeIcon, href: "/" },
                    // { name: t("sidebar.dashboard"), icon: LayoutDashboardIcon, href: "/approvals" },
                    { name: t("sidebar.createNewRequest"), icon: BarChartIcon, href: "/employee/create-new-request-form" },
                    { name: t("sidebar.myRequestHistory"), icon: HistoryIcon, href: "/employee/my-request-history-list" },
                    { name: t("sidebar.teamCalendar"), icon: CalendarDaysIcon, href: "/approvals/team-calendar" },
                ],
            },
            {
                name: "HR",
                items: [
                    { name: t("sidebar.employee"), icon: Users, href: "/admin/employee-management" },
                    { name: t("sidebar.leaveBalances"), icon: Users, href: "/approvals/leave-balances" },
                    { name: t("sidebar.assignManager"), icon: LassoSelectIcon, href: "/approvals/assign-manager" },
                    { name: "Form Manager", icon: FormIcon, href: "/approvals/form-manager" },
                ],
            },
            {
                name: t("sidebar.setting"),
                items: [
                    { name: t("sidebar.profile"), icon: UserIcon, href: "/profile" },
                    { name: t("sidebar.preference"), icon: SettingsIcon, href: "/preferences" },
                ],
            },
        ],
        [t],
    )

    // sidebar cho Admin
    const adminNav = useMemo(
        () => [
            {
                name: t("sidebar.mainMenu"),
                items: [
                    { name: t("sidebar.home"), icon: HomeIcon, href: "/" },
                    { name: t("sidebar.dashboard"), icon: LayoutDashboardIcon, href: "/admin" },
                    { name: t("sidebar.employee"), icon: Users, href: "/admin/employee-management" },
                    { name: t("sidebar.positionManagement"), icon: BriefcaseBusiness, href: "/admin/position-management" },
                    { name: t("sidebar.departmentManagement"), icon: Building2, href: "/admin/department-management" },
                    { name: t("sidebar.createNewRequest"), icon: BarChartIcon, href: "/employee/create-new-request-form" },
                    { name: t("sidebar.attendanceTracking"), icon: AlarmClockIcon, href: "/admin/attendance-tracking" },
                    { name: t("sidebar.globalRequests"), icon: GlobeIcon, href: "/admin/global-request" },
                ],
            },
            {
                name: "Manager",
                items: [
                    { name: t("sidebar.teamCalendar"), icon: CalendarDaysIcon, href: "/approvals/team-calendar" },
                    { name: t("sidebar.leaveBalances"), icon: Users, href: "/approvals/leave-balances" },
                    { name: t("sidebar.assignManager"), icon: LassoSelectIcon, href: "/approvals/assign-manager" },
                    { name: "Form Manager", icon: FormIcon, href: "/approvals/form-manager" },
                ],
            },
            {
                name: t("sidebar.configuration"),
                items: [
                    { name: t("sidebar.shiftPatterns"), icon: AlarmClockIcon, href: "/admin/shift-patterns" },
                    { name: t("sidebar.payrollAndHoliday"), icon: WalletCardsIcon, href: "/admin/payroll-and-holiday" },
                    { name: t("sidebar.approvalWorkflow"), icon: NetworkIcon, href: "/admin/approval-workflow" },
                ],
            },
            {
                name: t("sidebar.system"),
                items: [
                    { name: t("sidebar.reportsAndAnalytics"), icon: BarChartIcon, href: "/admin/reports-analytics" },
                    { name: t("sidebar.systemAuditLogs"), icon: HistoryIcon, href: "/admin/audit-logs" },
                    { name: t("sidebar.accessControl"), icon: BrickWallShieldIcon, href: "/admin/access-control" },
                ],
            },
            {
                name: t("sidebar.setting"),
                items: [
                    { name: t("sidebar.profile"), icon: UserIcon, href: "/profile" },
                    { name: t("sidebar.preference"), icon: SettingsIcon, href: "/preferences" },
                ],
            },
        ],
        [t],
    )

    useEffect(() => {
        switch (roleName) {
            case "ADMIN":
                setNewNav(adminNav)
                setPortalName(t("general.sidebar.portals.admin"))
                break
            case "MANAGER":
                setNewNav(manNav)
                setPortalName("Manager Portal")
                break
            case "HR":
                setNewNav(HRNav)
                setPortalName("HR")
                break
            default:
                setNewNav(empNav)
                setPortalName(t("general.sidebar.portals.employee"))
                break
        }
    }, [user, roleName, empNav, manNav, adminNav, HRNav, t])

    return (
        <>
            <div className="h-16 flex items-center px-6 border-b ">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">
                        {portalName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </div>
                    <span className="text-foreground font-semibold text-lg tracking-tight">{portalName}</span>
                </div>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {newNav.map((section, index) => (
                    <div key={section.name}>
                        <div
                            className={`px-3 mt-3 mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 ${index === 0 ? "pt-0" : "  pt-5 border-t border-t-slate-200 dark:border-t-white/20"}`}
                        >
                            {section.name}
                        </div>
                        {section.items.map((item) => (
                            <Link
                                key={item.name}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground/80  transition-colors group ${pathname === item.href ? "bg-primary/5 text-primary" : ""}`}
                                to={item.href}
                            >
                                {createElement(item.icon, { className: "w-5 h-5" })}
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t">
                <div className="flex items-center gap-3">
                    <CAvatarName user={user} />
                    <Button variant={"ghost"} onClick={logout} className="text-red-500">
                        <LogOutIcon />
                    </Button>
                </div>
            </div>
        </>
    )
}
