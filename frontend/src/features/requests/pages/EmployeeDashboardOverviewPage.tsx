import React from "react"

export default function EmployeeDashboardOverviewPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-neutral-800 dark:text-neutral-100 font-display min-h-screen flex overflow-hidden antialiased">
            <aside className="w-[260px] bg-neutral-900 flex-shrink-0 flex flex-col h-screen fixed left-0 top-0 z-50 text-neutral-300 border-r border-neutral-800 shadow-xl transition-all duration-300">
                <div className="h-16 flex items-center px-6 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">H</div>
                        <span className="text-white font-semibold text-lg tracking-tight">HR Portal</span>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Main Menu</div>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white font-medium transition-colors" href="#">
                        <span className="material-icons text-[20px]">dashboard</span>
                        <span className="text-sm">Dashboard</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors group" href="#">
                        <span className="material-icons text-[20px] group-hover:text-primary transition-colors">event_note</span>
                        <span className="text-sm">My Leave</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors group" href="#">
                        <span className="material-icons text-[20px] group-hover:text-primary transition-colors">groups</span>
                        <span className="text-sm">Team Calendar</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors group" href="#">
                        <span className="material-icons text-[20px] group-hover:text-primary transition-colors">receipt_long</span>
                        <span className="text-sm">Payslips</span>
                    </a>
                    <div className="mt-8 px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Settings</div>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors group" href="#">
                        <span className="material-icons text-[20px] group-hover:text-primary transition-colors">person</span>
                        <span className="text-sm">My Profile</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors group" href="#">
                        <span className="material-icons text-[20px] group-hover:text-primary transition-colors">settings</span>
                        <span className="text-sm">Preferences</span>
                    </a>
                </nav>
                <div className="p-4 border-t border-neutral-800">
                    <div className="flex items-center gap-3">
                        <img
                            alt="User Profile Picture"
                            className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                            data-alt="Portrait of a smiling man in business attire"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPF11CM_1ZTPsHRdBbZfJ2s576CXCFe5yHBgZphwohrBnMF-Veelhi-_6k-Bs9LedUHEm3SGZ7QAvskw7zojveQTwresFST9VI-sOaTNMWSWUk1fAQIAgL5h3Ey2EuHlEQuRaYCNY5FrBIqvz33H8HG_uY02MMu5IglzHWyQXtW8w6dpQZhhmSbkO9Idkp8UiKpZMmFfOiadO6o8YHzj59X5pUzXcwARE13werNEKxa967xWaci2EYg_rVmIlSn9sYlCuRBy4gVak"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Tom Cook</p>
                            <p className="text-xs text-neutral-500 truncate">Software Engineer</p>
                        </div>
                        <button className="text-neutral-400 hover:text-white transition-colors">
                            <span className="material-icons text-[20px]">logout</span>
                        </button>
                    </div>
                </div>
            </aside>
            <main className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-8 flex-shrink-0 z-40">
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Dashboard Overview</h1>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-neutral-500 hover:text-primary transition-colors">
                            <span className="material-icons">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block">October 24, 2023</span>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-8 bg-background-light dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Welcome back, Tom! 👋</h2>
                                <p className="text-neutral-500 dark:text-neutral-400 mt-1">Here's what's happening with your leave requests today.</p>
                            </div>
                            <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 font-medium text-sm">
                                <span className="material-icons text-[18px]">add</span>
                                New Leave Request
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-start justify-between relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Remaining Leave</p>
                                    <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">
                                        14 <span className="text-base font-normal text-neutral-400">Days</span>
                                    </h3>
                                    <div className="mt-4 flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded w-fit">
                                        <span className="material-icons text-[14px] mr-1">trending_flat</span>
                                        Available now
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-icons">beach_access</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-start justify-between relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Pending Requests</p>
                                    <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">2</h3>
                                    <div className="mt-4 flex items-center text-xs font-medium text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded w-fit">
                                        <span className="material-icons text-[14px] mr-1">hourglass_empty</span>
                                        Awaiting approval
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-icons">pending_actions</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-start justify-between relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Approved YTD</p>
                                    <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">
                                        8 <span className="text-base font-normal text-neutral-400">Days</span>
                                    </h3>
                                    <div className="mt-4 flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded w-fit">
                                        <span className="material-icons text-[14px] mr-1">check_circle</span>
                                        Taken this year
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-icons">history</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 flex flex-col">
                            <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Recent Activity</h3>
                                <a className="text-sm font-medium text-primary hover:text-primary-dark transition-colors" href="#">
                                    View All History
                                </a>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-xs text-neutral-500 uppercase tracking-wider bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-700">
                                            <th className="px-6 py-4 font-medium">Type</th>
                                            <th className="px-6 py-4 font-medium">Dates Requested</th>
                                            <th className="px-6 py-4 font-medium">Duration</th>
                                            <th className="px-6 py-4 font-medium">Submitted</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-neutral-200 dark:divide-neutral-700">
                                        <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                                    Annual Leave
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">Dec 20 - Dec 24, 2023</td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">5 Days</td>
                                            <td className="px-6 py-4 text-neutral-500 text-xs">Oct 23, 2023</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                                                    Pending
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-neutral-400 hover:text-primary transition-colors">
                                                    <span className="material-icons text-[20px]">edit</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                    Sick Leave
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">Oct 15, 2023</td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">1 Day</td>
                                            <td className="px-6 py-4 text-neutral-500 text-xs">Oct 15, 2023</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                                                    Approved
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-neutral-400 hover:text-primary transition-colors">
                                                    <span className="material-icons text-[20px]">visibility</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    Remote Work
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">Oct 10, 2023</td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">1 Day</td>
                                            <td className="px-6 py-4 text-neutral-500 text-xs">Oct 08, 2023</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                                                    Approved
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-neutral-400 hover:text-primary transition-colors">
                                                    <span className="material-icons text-[20px]">visibility</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                                    Annual Leave
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">Sep 01 - Sep 05, 2023</td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">5 Days</td>
                                            <td className="px-6 py-4 text-neutral-500 text-xs">Aug 15, 2023</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                                                    Completed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-neutral-400 hover:text-primary transition-colors">
                                                    <span className="material-icons text-[20px]">visibility</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                    Sick Leave
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">Aug 20, 2023</td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">1 Day</td>
                                            <td className="px-6 py-4 text-neutral-500 text-xs">Aug 20, 2023</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                                    Rejected
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-neutral-400 hover:text-primary transition-colors">
                                                    <span className="material-icons text-[20px]">info</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 rounded-b-lg">
                                <p className="text-xs text-neutral-500 text-center">Showing latest 5 requests</p>
                            </div>
                        </div>
                        <div className="pt-4 pb-8 text-center text-xs text-neutral-400">
                            © 2023 Acme Corp HR Systems. All rights reserved.{" "}
                            <a className="hover:text-primary hover:underline" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
