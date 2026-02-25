export default function AdminDashboardPage() {
    return (
        <main className="flex-1 p-8 h-full min-h-screen">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard Overview</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Summary of enterprise leave management and manpower metrics.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                        Generate Report
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">calendar_today</span>
                        Leave Calendar
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-primary flex items-center justify-center">
                        <span className="material-icons text-3xl">flight_takeoff</span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Currently on Leave</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">12</h3>
                        <p className="text-xs text-emerald-600 font-medium mt-1">4 Returning Tomorrow</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center">
                        <span className="material-icons text-3xl">pending_actions</span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Approvals</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">28</h3>
                        <p className="text-xs text-slate-400 mt-1">Avg response time: 2h</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center">
                        <span className="material-icons text-3xl">groups</span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Employees</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">452</h3>
                        <p className="text-xs text-indigo-600 font-medium mt-1">+3 New this month</p>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manpower Trends (Last 6 Months)</h2>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="w-3 h-3 rounded-full bg-primary"></span> Active Staff
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="w-3 h-3 rounded-full bg-slate-300"></span> Leave Balance
                        </span>
                    </div>
                </div>
                <div className="relative h-64 w-full flex items-end justify-between px-2 pt-4">
                    <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-400 pointer-events-none">
                        <div className="border-t border-slate-100 dark:border-slate-800 w-full pt-1">500</div>
                        <div className="border-t border-slate-100 dark:border-slate-800 w-full pt-1">400</div>
                        <div className="border-t border-slate-100 dark:border-slate-800 w-full pt-1">300</div>
                        <div className="border-t border-slate-100 dark:border-slate-800 w-full pt-1">200</div>
                        <div className="border-t border-slate-100 dark:border-slate-800 w-full pt-1">100</div>
                        <div className="w-full h-[1px]"></div>
                    </div>
                    <div className="relative flex-1 h-full flex items-end justify-around gap-4 z-[1]">
                        <div className="group relative flex flex-col items-center w-full h-full justify-end">
                            <div className="w-2 bg-primary rounded-t h-[75%]"></div>
                            <span className="mt-2 text-xs text-slate-500">Jan</span>
                        </div>
                        <div className="group relative flex flex-col items-center w-full h-full justify-end">
                            <div className="w-2 bg-primary rounded-t h-[78%]"></div>
                            <span className="mt-2 text-xs text-slate-500">Feb</span>
                        </div>
                        <div className="group relative flex flex-col items-center w-full h-full justify-end">
                            <div className="w-2 bg-primary rounded-t h-[82%]"></div>
                            <span className="mt-2 text-xs text-slate-500">Mar</span>
                        </div>
                        <div className="group relative flex flex-col items-center w-full h-full justify-end">
                            <div className="w-2 bg-primary rounded-t h-[85%]"></div>
                            <span className="mt-2 text-xs text-slate-500">Apr</span>
                        </div>
                        <div className="group relative flex flex-col items-center w-full h-full justify-end">
                            <div className="w-2 bg-primary rounded-t h-[88%]"></div>
                            <span className="mt-2 text-xs text-slate-500">May</span>
                        </div>
                        <div className="group relative flex flex-col items-center w-full h-full justify-end">
                            <div className="w-2 bg-primary rounded-t h-[90%]"></div>
                            <span className="mt-2 text-xs text-slate-500">Jun</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Requests</h2>
                        <button className="text-primary text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Dates</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                                                <img
                                                    alt="Employee"
                                                    className="w-full h-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7rok9VpnJpUDsE5T50GRY3XYXyy1ApEm2xAUKULWK7agU2SOi1UvTejX89nhgp9HJKdRAG0ybB4o334MRv9NwsRkLTsI3RtlALJLee0E0gmtsGfZRgEvAZHB3PFty36LtEOEPtvG1RrC41no-M8ko4sc8X-WhBfLpNFiCJQTOKY_AWAnelm6B7P5m-An1WXWZUquVIwU4IIik5eGJx6sh0sYmgzb1frJMrdyIYeJ2W5ZFuD3hrYl2x8mDAcxxFAh-ajeXZmz4OZs"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">Courtney Henry</div>
                                                <div className="text-xs text-slate-500">Design Team</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Annual Leave</span>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-900 dark:text-white">Oct 12 - Oct 14</div>
                                        <div className="text-xs text-slate-500">3 Days</div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase ghost-tag-pending">Pending</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                                                <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">MK</div>
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">Michael Klein</div>
                                                <div className="text-xs text-slate-500">Engineering</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Sick Leave</span>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-900 dark:text-white">Oct 10 - Oct 11</div>
                                        <div className="text-xs text-slate-500">2 Days</div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase ghost-tag-approved">Approved</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                                                <div className="w-full h-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">JD</div>
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">Jane Doe</div>
                                                <div className="text-xs text-slate-500">Sales</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Emergency</span>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-900 dark:text-white">Oct 10</div>
                                        <div className="text-xs text-slate-500">1 Day</div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase ghost-tag-approved">Approved</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Today's Attendance</h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Present</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">410 / 452</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "90.7%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">On Leave</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">12</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "2.6%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Late In</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">8</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "1.7%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Unaccounted</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">22</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div className="bg-rose-500 h-2 rounded-full" style={{ width: "4.8%" }}></div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <button className="w-full flex items-center justify-center gap-2 py-2 text-primary font-semibold text-sm hover:bg-primary-light/50 rounded-lg transition-colors">
                            Check Detailed Logs
                            <span className="material-icons text-[16px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
