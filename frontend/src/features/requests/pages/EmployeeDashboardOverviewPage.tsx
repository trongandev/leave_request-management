export default function EmployeeDashboardOverviewPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8 ">
            <div className=" mx-auto space-y-8">
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
    )
}
