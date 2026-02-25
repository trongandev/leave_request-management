import { Link, useLocation } from "react-router-dom"

const requestsNav = [
    {
        name: "main menu",
        items: [
            { name: "Dashboard", icon: "dashboard", href: "/employee" },
            { name: "Create New Request", icon: "event_note", href: "/employee/create-new-request-form" },
            { name: "My Request History", icon: "history", href: "/employee/my-request-history-list" },
        ],
    },
    {
        name: "settings",
        items: [
            { name: "My Profile", icon: "person", href: "/profile" },
            { name: "Preferences", icon: "settings", href: "/preferences" },
            { name: "Back to Portal", icon: "home", href: "/" },
        ],
    },
]

const approvalsNav = [
    {
        name: "main menu",
        items: [
            { name: "Dashboard", icon: "dashboard", href: "/approvals" },
            { name: "Team Calendar", icon: "groups", href: "/approvals/team-calendar" },
        ],
    },
    {
        name: "settings",
        items: [
            { name: "My Profile", icon: "person", href: "/profile" },
            { name: "Preferences", icon: "settings", href: "/preferences" },
            { name: "Back to Portal", icon: "home", href: "/" },
        ],
    },
]

const adminNav = [
    {
        name: "main menu",
        items: [
            { name: "Dashboard", icon: "dashboard", href: "/admin" },
            { name: "Employee Management", icon: "groups", href: "/admin/employee-management" },
            { name: "Attendance Tracking", icon: "access_time", href: "/admin/attendance-tracking" },
            { name: "Global Requests", icon: "public", href: "/admin/global-request" },
        ],
    },
    {
        name: "configuration",
        items: [
            { name: "Request Types", icon: "person", href: "/admin/request-types" },
            { name: "Shift Patterns", icon: "alarm", href: "/admin/shift-patterns" },
            { name: "Payroll & Holiday", icon: "payment", href: "/admin/payroll-and-holiday" },
            { name: "Approval Workflow", icon: "account_tree", href: "/admin/approval-workflow" },
            { name: "Back to Portal", icon: "home", href: "/" },
        ],
    },
    {
        name: "system",
        items: [
            { name: "Report & Analytics", icon: "bar_chart", href: "/admin/reports-analytics" },
            { name: "System Audit Logs", icon: "history", href: "/admin/audit-logs" },
            { name: "Access Control", icon: "security", href: "/admin/access-control" },
        ],
    },
]
export default function GeneralSidebar() {
    const { pathname } = useLocation()
    const nav = pathname.startsWith("/approvals") ? approvalsNav : pathname.startsWith("/admin") ? adminNav : requestsNav
    return (
        <>
            <div className="h-16 flex items-center px-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">
                        {pathname.startsWith("/approvals") ? "AP" : pathname.startsWith("/admin") ? "AD" : "EM"}
                    </div>
                    <span className="text-slate-900 font-semibold text-lg tracking-tight">
                        {pathname.startsWith("/approvals") ? "Approval Portal" : pathname.startsWith("/admin") ? "Admin Portal" : "Employee Portal"}
                    </span>
                </div>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {nav.map((section) => (
                    <div key={section.name}>
                        <div className="px-3 mt-5 mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">{section.name}</div>
                        {section.items.map((item) => (
                            <Link
                                key={item.name}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700  transition-colors group ${pathname === item.href ? "bg-primary/10 text-primary" : ""}`}
                                to={item.href}
                            >
                                <span className="material-icons text-[20px] group-hover:text-primary transition-colors ">{item.icon}</span>
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                    <img
                        alt="User Profile Picture"
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        data-alt="Portrait of a smiling man in business attire"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPF11CM_1ZTPsHRdBbZfJ2s576CXCFe5yHBgZphwohrBnMF-Veelhi-_6k-Bs9LedUHEm3SGZ7QAvskw7zojveQTwresFST9VI-sOaTNMWSWUk1fAQIAgL5h3Ey2EuHlEQuRaYCNY5FrBIqvz33H8HG_uY02MMu5IglzHWyQXtW8w6dpQZhhmSbkO9Idkp8UiKpZMmFfOiadO6o8YHzj59X5pUzXcwARE13werNEKxa967xWaci2EYg_rVmIlSn9sYlCuRBy4gVak"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">Tom Cook</p>
                        <p className="text-xs text-neutral-500 truncate">Software Engineer</p>
                    </div>
                    <button className="text-neutral-400 hover:text-slate-900 transition-colors">
                        <span className="material-icons text-[20px]">logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}
