import { ClipboardPen, LayoutDashboard, MessageCircle, Search, SquareCode } from "lucide-react"
import React from "react"
import { Link, useLocation } from "react-router-dom"

export default function CHeader() {
    const pathname = useLocation().pathname
    const navs = [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Courses", href: "#", icon: SquareCode },
        { name: "Assignments", href: "#", icon: ClipboardPen },
        { name: "Messages", href: "#", icon: MessageCircle },
    ]
    return (
        <div className="h-14 flex items-center justify-between px-10 border-b border-gray-200 shadow-sm bg-white">
            <div className="flex items-center gap-5">
                <h1 className="text-2xl font-bold">Stitch Learning</h1>
                <div className="flex items-center gap-3 h-10">
                    <Search />
                    <input type="text" placeholder="Search courses, assiginments..." />
                </div>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-5 text-gray-600">
                    {navs.map((nav) => (
                        <Link
                            to={nav.href}
                            className={`flex gap-2 items-center ${pathname === nav.href ? "text-primary font-medium bg-secondary px-3 rounded-md py-2" : "hover:text-gray-900"}`}
                            key={nav.name}
                        >
                            <nav.icon size={18} />
                            {nav.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
