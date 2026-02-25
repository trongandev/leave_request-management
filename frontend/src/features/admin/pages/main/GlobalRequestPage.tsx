export default function GlobalRequestPage() {
    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Global Requests Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review and manage all employee leave and administrative requests.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">download</span>
                        Export
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">add</span>
                        New Request
                    </button>
                </div>
            </div>
            <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                            <input
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary"
                                placeholder="Search employee..."
                                type="text"
                            />
                        </div>
                        <select className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary">
                            <option value="">All Departments</option>
                            <option value="engineering">Engineering</option>
                            <option value="design">Design</option>
                            <option value="sales">Sales</option>
                            <option value="hr">Human Resources</option>
                        </select>
                        <select className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary">
                            <option value="">All Request Types</option>
                            <option value="annual">Annual Leave</option>
                            <option value="sick">Sick Leave</option>
                            <option value="emergency">Emergency Leave</option>
                            <option value="remote">Remote Work</option>
                        </select>
                        <select className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary">
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">Annual Leave</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-white font-medium">3 Days</div>
                                    <div className="text-xs text-slate-500">Oct 12 - Oct 14</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Oct 08, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase ghost-tag-pending">Pending</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-hover">View Detail</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 shrink-0 flex items-center justify-center text-xs font-bold">MK</div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Michael Klein</div>
                                            <div className="text-xs text-slate-500">Engineering</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">Sick Leave</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-white font-medium">2 Days</div>
                                    <div className="text-xs text-slate-500">Oct 10 - Oct 11</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Oct 09, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase ghost-tag-approved">Approved</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-hover">View Detail</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 shrink-0 flex items-center justify-center text-xs font-bold">JD</div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Jane Doe</div>
                                            <div className="text-xs text-slate-500">Sales</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">Emergency</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-white font-medium">1 Day</div>
                                    <div className="text-xs text-slate-500">Oct 10</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Oct 10, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase ghost-tag-approved">Approved</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-hover">View Detail</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                                            <div className="w-full h-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">RB</div>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Robert Brown</div>
                                            <div className="text-xs text-slate-500">Engineering</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">Remote Work</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-white font-medium">5 Days</div>
                                    <div className="text-xs text-slate-500">Oct 20 - Oct 24</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Oct 11, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase ghost-tag-rejected">Rejected</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-hover">View Detail</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        Showing <span className="font-medium text-slate-900 dark:text-white">1-4</span> of <span className="font-medium text-slate-900 dark:text-white">152</span> requests
                    </p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 bg-primary text-white rounded text-sm">1</button>
                        <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
                        <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
