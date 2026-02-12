export default function PendingApprovalsListPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 antialiased min-h-screen flex">
            <aside className="w-64 bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col fixed h-full z-20">
                <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-primary dark:text-white font-bold text-xl">
                        <span className="material-icons text-3xl">grid_view</span>
                        <span>
                            Nexus<span className="text-slate-400 font-normal">HR</span>
                        </span>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    <a
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        href="#"
                    >
                        <span className="material-icons text-slate-400">dashboard</span>
                        Dashboard
                    </a>
                    <a
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        href="#"
                    >
                        <span className="material-icons text-slate-400">people</span>
                        Team Directory
                    </a>
                    <a className="flex items-center justify-between px-3 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg transition-colors group" href="#">
                        <div className="flex items-center gap-3">
                            <span className="material-icons text-primary">assignment_turned_in</span>
                            Approvals
                        </div>
                        <span className="bg-primary text-white text-xs py-0.5 px-2 rounded-full">12</span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        href="#"
                    >
                        <span className="material-icons text-slate-400">calendar_today</span>
                        Leave Calendar
                    </a>
                    <a
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        href="#"
                    >
                        <span className="material-icons text-slate-400">analytics</span>
                        Reports
                    </a>
                </nav>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                        <img
                            alt="Manager Profile"
                            className="h-9 w-9 rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
                            data-alt="Portrait of a professional man in a suit"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0w0R1p3bzPsYnZ9nHzfgbQ8JFka1TGI_09O7qG6jpkU2sRhO5acmlaNO1zKrA7vEmVgLrRjuOqzVCA-owSVPwcIr0SNaFIOGMq05G3cxyxu2JnI8diUENFZJtrxXKkioFmJ7BY5Fyw_oNY_6PHIsbvvFdKcXYCYr_Dkd_pqz1sm0NM9UeZS-_X2yufQrStb6Q0QJLd1y4-X3Jc0W72fML4OIpXJxLFE3MJsLXn6yaih8GVSd9pZJLwNBAgL1mBDahqzkM0oZV8E4"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">Tom Cook</p>
                            <p className="text-xs text-slate-500 truncate">HR Manager</p>
                        </div>
                        <span className="material-icons text-slate-400 text-lg">more_vert</span>
                    </div>
                </div>
            </aside>
            <main className="flex-1 lg:ml-64 p-8">
                <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Pending Approvals</h1>
                        <p className="text-sm text-slate-500 mt-1">Review and manage requests from your team members.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <span className="material-icons absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
                            <input
                                className="pl-9 pr-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
                                placeholder="Search requests..."
                                type="text"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                            <span className="material-icons text-lg">filter_list</span>
                            Filter
                        </button>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Total Pending</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">12</h3>
                        </div>
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400">
                            <span className="material-icons">hourglass_empty</span>
                        </div>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Due This Week</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">5</h3>
                        </div>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                            <span className="material-icons">event</span>
                        </div>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Urgent Requests</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">2</h3>
                        </div>
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                            <span className="material-icons">priority_high</span>
                        </div>
                    </div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-surface-dark">
                        <h3 className="font-semibold text-slate-800 dark:text-white">Request Queue</h3>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-icons text-xl">refresh</span>
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-icons text-xl">more_horiz</span>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 uppercase text-xs font-medium text-slate-500 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-3 tracking-wider w-1/4">Employee</th>
                                    <th className="px-6 py-3 tracking-wider">Request Type</th>
                                    <th className="px-6 py-3 tracking-wider">Date Range</th>
                                    <th className="px-6 py-3 tracking-wider">Requested On</th>
                                    <th className="px-6 py-3 tracking-wider">Status</th>
                                    <th className="px-6 py-3 tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img
                                                alt=""
                                                className="h-8 w-8 rounded-full object-cover"
                                                data-alt="Woman with short hair smiling"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbgR7WYTTY-1jbFRHtr36PpCSuhqDBoW1b_EBsRmZYOvQ0cJZtoGbRDW8E_8jcGP7f5HuHkylrMHQLVkXRyJbshpGkHh8_2eILeDmX3wDOuLIqP-v4kOVdar6h6sIyb-y3n0SnQKN2LK173lqkiODHH6DAnmxHvP9uCd2ZWipCsEjfd0wLYlU-BjbeW694e2Pf5HfPX0aWMSYmE6dl_7D21gLABGOVidSd8UtERFoMhQ8ApEs-NUja00mqFCVf1XeAjl5iz74_d9I"
                                            />
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">Sarah Jenkins</div>
                                                <div className="text-xs text-slate-500">UX Designer</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                            Annual Leave
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-300">Oct 12 - Oct 15</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">Today, 9:41 AM</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors focus:outline-none focus:underline decoration-2 underline-offset-2">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">MR</div>
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">Mike Ross</div>
                                                <div className="text-xs text-slate-500">Sales Associate</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                            Expense Claim
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-300">Oct 10</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">Yesterday</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors focus:outline-none focus:underline decoration-2 underline-offset-2">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img
                                                alt=""
                                                className="h-8 w-8 rounded-full object-cover"
                                                data-alt="Woman in white shirt smiling"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJdONOZKTHLkXkBOFJobTtIT4P6V3WoUHzCj9A9F8plZ-cPbnCRKVwnHu0YnngnoW5Mp1kxbmN734Bog-YM_ze6tmYCSVUzGkoEUQod1lbWLJECWZUNM6k42lFESvDS0fsZnlfwEOup24TgVOJruKe26M1wLFQNaHgBmYYBVN0YUl9gUm_XfxFLG9Ggt37l8VsriiWzVKXbx-jaa7r2J32-ZDMl0Kqead_-HOo1PCVx3vM67rktDCiFIJV7_Nh8YzLn5WYh2t3WeU"
                                            />
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">Davina Claire</div>
                                                <div className="text-xs text-slate-500">Marketing Lead</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                                            Sick Leave
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-300">Oct 11</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">Oct 11, 8:00 AM</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors focus:outline-none focus:underline decoration-2 underline-offset-2">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img
                                                alt=""
                                                className="h-8 w-8 rounded-full object-cover"
                                                data-alt="Man with glasses smiling"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVVkvX_u6wEptcCsMfNH66Fopg3QgYS-uI-Ua0J4-PEDA2s_xPCB_OlbOKhudXcU0SnXMHa5zsgdarUp8ezBR0-wSrsxPZZBxG3nVAYOkVI7uTcBrLWdVtlWWBLD163Y7MvhJz8FGet0_x3a7HMS9fx3girCn2O6GK2TkyEnGD77FIFIOcK5fA6fUGj2yLSiCQwt9WnsJGgm3fLeDHNNp5r_TtxSxdDSaj6YFKb1ZcQWaguAe4US4tN-fgoHNpJrz_VTzsgDK1wIs"
                                            />
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">James Wilson</div>
                                                <div className="text-xs text-slate-500">Backend Dev</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                                            Equipment
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-300">Oct 20</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">Oct 09, 2:30 PM</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors focus:outline-none focus:underline decoration-2 underline-offset-2">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">AL</div>
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">Anita Lee</div>
                                                <div className="text-xs text-slate-500">Product Manager</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                            Annual Leave
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-300">Nov 24 - Nov 30</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">Oct 08, 11:15 AM</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors focus:outline-none focus:underline decoration-2 underline-offset-2">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-surface-dark">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> results
                                </p>
                            </div>
                            <div>
                                <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <a
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        href="#"
                                    >
                                        <span className="material-icons text-base">chevron_left</span>
                                    </a>
                                    <a aria-current="page" className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                        1
                                    </a>
                                    <a
                                        className="bg-white dark:bg-surface-dark border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        href="#"
                                    >
                                        2
                                    </a>
                                    <a
                                        className="bg-white dark:bg-surface-dark border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        href="#"
                                    >
                                        3
                                    </a>
                                    <a
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        href="#"
                                    >
                                        <span className="material-icons text-base">chevron_right</span>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
