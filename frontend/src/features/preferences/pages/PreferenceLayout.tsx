import { Link, Outlet, useLocation } from "react-router-dom"

export default function PreferenceLayout() {
    const { pathname } = useLocation()
    const nav = [
        { name: "My Account", icon: "person", href: "/preferences/my-account" },
        { name: "Appearance", icon: "palette", href: "/preferences/appearance" },
        { name: "Security", icon: "lock", href: "/preferences/security" },
        { name: "Notifications", icon: "notifications_active", href: "/preferences/notifications" },
        { name: "Localization", icon: "language", href: "/preferences/localization" },
    ]
    return (
        <main className="flex-1 flex max-w-7xl mx-auto w-full px-8 py-10 gap-10">
            <aside className="w-64 flex flex-col gap-2 shrink-0">
                <div className="px-3 pb-4">
                    <h1 className="text-slate-900 dark:text-white text-xl font-bold">Preferences</h1>
                    <p className="text-slate-500 text-xs mt-1">Personalize your HR experience</p>
                </div>
                <nav className="flex flex-col gap-1">
                    {nav.map((item) => (
                        <Link
                            key={item.name}
                            className={`flex items-center gap-3 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-primary/5 rounded-lg transition-colors ${pathname === item.href ? "bg-primary/10 text-primary" : ""}`}
                            to={item.href}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
            <div className="flex-1 flex flex-col gap-8">
                <Outlet />
            </div>
        </main>
    )
}
