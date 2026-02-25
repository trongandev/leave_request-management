export default function AttendanceTrackingPage() {
    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Attendance Tracking Log</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review daily employee clock-in records and identify discrepancies.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">download</span>
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">add</span>
                        Manual Entry
                    </button>
                </div>
            </div>
            <div className="bg-white dark:bg-neutral-dark p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6 flex flex-wrap items-center gap-4">
                <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Search Employee</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-icons text-slate-400 text-[18px]">search</span>
                        </span>
                        <input
                            className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-neutral-dark text-slate-900 dark:text-white placeholder-slate-400 focus:ring-1 focus:ring-primary focus:border-primary text-sm shadow-sm"
                            placeholder="Name or ID..."
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 min-w-[180px]">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</label>
                    <select className="block w-full pl-3 pr-10 py-2 text-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-dark focus:ring-primary focus:border-primary rounded-lg shadow-sm text-slate-700 dark:text-slate-300">
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>Human Resources</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5 min-w-[240px]">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Range</label>
                    <div className="flex items-center gap-2">
                        <input
                            className="block w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-neutral-dark text-slate-700 dark:text-slate-300 focus:ring-primary focus:border-primary shadow-sm"
                            type="date"
                            value="2023-10-01"
                        />
                        <span className="text-slate-400">to</span>
                        <input
                            className="block w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-neutral-dark text-slate-700 dark:text-slate-300 focus:ring-primary focus:border-primary shadow-sm"
                            type="date"
                            value="2023-10-31"
                        />
                    </div>
                </div>
                <div className="flex items-end h-full pt-6">
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Apply Filters
                    </button>
                </div>
            </div>
            <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 striped-table">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">
                                    Employee Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider text-center" scope="col">
                                    Clock In
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider text-center" scope="col">
                                    Clock Out
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider text-center" scope="col">
                                    Total Hours
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">
                                    Discrepancy
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr className="hover:bg-primary-light/10 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 24, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">JD</div>
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">Jane Doe</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">08:55 AM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">05:30 PM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-600 dark:text-slate-400">8h 35m</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-success">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                                        On Time
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-icons text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary-light/10 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 24, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold mr-3">TC</div>
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">Tom Cook</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">09:15 AM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">06:00 PM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-600 dark:text-slate-400">8h 45m</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-warning">
                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                        Late Arrival
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-icons text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary-light/10 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 24, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3">MS</div>
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">Mark Stevens</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">08:45 AM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">04:15 PM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-600 dark:text-slate-400">7h 30m</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-danger">
                                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
                                        Early Leave
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-icons text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary-light/10 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 24, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold mr-3">AY</div>
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">Alice Young</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">09:00 AM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">05:00 PM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-600 dark:text-slate-400">8h 00m</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-success">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                                        On Time
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-icons text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary-light/10 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Oct 23, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mr-3">EW</div>
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">Emma Wilson</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">08:30 AM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900 dark:text-white">05:30 PM</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-600 dark:text-slate-400">9h 00m</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-neutral">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-1.5"></span>
                                        Regular
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-icons text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-white dark:bg-neutral-dark px-4 py-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-slate-700 dark:text-slate-400">
                                Showing <span className="font-medium text-slate-900 dark:text-white">1</span> to <span className="font-medium text-slate-900 dark:text-white">5</span> of{" "}
                                <span className="font-medium text-slate-900 dark:text-white">245</span> results
                            </p>
                        </div>
                        <div>
                            <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <a
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-neutral-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    href="#"
                                >
                                    <span className="sr-only">Previous</span>
                                    <span className="material-icons text-[20px]">chevron_left</span>
                                </a>
                                <a aria-current="page" className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                    1
                                </a>
                                <a
                                    className="bg-white dark:bg-neutral-dark border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    href="#"
                                >
                                    2
                                </a>
                                <a
                                    className="bg-white dark:bg-neutral-dark border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    href="#"
                                >
                                    3
                                </a>
                                <a
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-neutral-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    href="#"
                                >
                                    <span className="sr-only">Next</span>
                                    <span className="material-icons text-[20px]">chevron_right</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Present</span>
                        <span className="material-icons text-emerald-500">check_circle</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">184</div>
                    <p className="text-xs text-emerald-600 mt-1 flex items-center">
                        <span className="material-icons text-[12px] mr-1">trending_up</span> 92% of total staff
                    </p>
                </div>
                <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Late Arrivals</span>
                        <span className="material-icons text-amber-500">schedule</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
                    <p className="text-xs text-amber-600 mt-1 flex items-center">
                        <span className="material-icons text-[12px] mr-1">trending_up</span> +3 since yesterday
                    </p>
                </div>
                <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Early Departures</span>
                        <span className="material-icons text-rose-500">logout</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">05</div>
                    <p className="text-xs text-slate-500 mt-1">Normal daily average</p>
                </div>
                <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Absent</span>
                        <span className="material-icons text-slate-400">person_off</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">16</div>
                    <p className="text-xs text-slate-500 mt-1">On approved leave: 14</p>
                </div>
            </div>
        </main>
    )
}
