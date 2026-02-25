import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

import { Link } from "react-router-dom"

export default function PortalHubPage() {
    const portalHubs = [
        {
            name: "Employee Portal",
            description: "View your payslips, request time off, manage your personal profile, and access your benefits information.",
            icon: "badge",
            bgColor: "bg-blue-500/10",
            color: "text-blue-900",
            link: "/employee",
        },
        {
            name: "Manager Panel",
            description: "Approve leave requests, review team performance, manage schedules, and oversee departmental goals.",
            icon: "supervised_user_circle",
            bgColor: "bg-sky-500/10",
            color: "text-sky-900",
            link: "/approvals",
        },
        {
            name: "Admin Settings",
            description: "Configure system settings, manage user roles, update global policies, and view system audit logs.",
            icon: "settings",
            bgColor: "bg-gray-500/10",
            color: "text-gray-900",
            link: "/admin",
        },
        {
            name: "Login Page",
            description: "Login page for the application.",
            icon: "verified_user",
            bgColor: "bg-red-500/10",
            color: "text-red-900",
            link: "/auth/login",
        },
        {
            name: "NotFound Page",
            description: "Notfound page for the application.",
            icon: "sync_problem",
            bgColor: "bg-red-500/10",
            color: "text-red-900",
            link: "/not-found",
        },
    ]
    return (
        <div className="max-w-5xl mx-auto py-10 ">
            <div className="space-y-5">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to the Hub</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Select a module to continue your session.</p>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    {portalHubs.map((hub) => (
                        <Card key={hub.name}>
                            <CardContent className="space-y-5">
                                <div className="">
                                    <div className={`w-16 h-16 rounded-xl ${hub.bgColor} flex items-center justify-center `}>
                                        <span className={`material-icons text-6xl ${hub.color}`}>{hub.icon}</span>
                                    </div>
                                </div>
                                <div className="">
                                    <h2 className="text-[20px] font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{hub.name}</h2>
                                    <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto sm:mx-0">{hub.description}</p>
                                </div>
                                <Link to={hub.link}>
                                    <Button className="w-full">
                                        Visit <ChevronRight />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 flex justify-center gap-6 text-sm text-gray-400 dark:text-gray-500">
                    <a className="hover:text-primary dark:hover:text-primary-300 transition-colors" href="#">
                        Help Center
                    </a>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <a className="hover:text-primary dark:hover:text-primary-300 transition-colors" href="#">
                        Privacy Policy
                    </a>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span className="cursor-default">v4.2.0</span>
                </div>
            </div>
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 dark:opacity-20"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl opacity-50 dark:opacity-20"></div>
            </div>
        </div>
    )
}
