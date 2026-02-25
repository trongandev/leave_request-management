export default function ProfilePage() {
    return (
        <main className="max-w-[1280px] mx-auto w-full px-8 py-8">
            <div className="flex gap-8 items-start">
                <aside className="w-[300px] shrink-0 flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="h-24 bg-gradient-to-r from-primary to-blue-400" data-alt="Abstract blue gradient background pattern"></div>
                        <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
                            <div className="h-24 w-24 rounded-2xl border-4 border-white dark:border-slate-900 overflow-hidden mb-4 shadow-md bg-white">
                                <img
                                    className="h-full w-full object-cover"
                                    data-alt="Profile photo of Alex Johnson"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrb_H8-dOiGY4NpfVOd7DJ0SPLu6hFcsUwnsa15lEm052HA7eRCKey-nfD4Sn-gU-iu9JMiGuMHKDJoeFuFV7rgP7S8WpPtohhJjjwaQ9gyWG65b-YzDPkhajpxaKvjfGVLZcp9l8_ZrZDd9tCTx6hzma3_rs4jo-JUVfLrVbwdY-xOD2QRCZce8Bvo-f2oHT2fenpdUHXxQr8ws56BVpzn4b2iSZNBo3o1Z2wM-9J4HzOxqZB_NQimBmWw8zhNeFmiwhcvgls6-M"
                                />
                            </div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Alex Johnson</h1>
                            <p className="text-slate-500 text-sm font-medium">Senior Frontend Developer</p>
                            <div className="mt-6 w-full space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Employee ID</span>
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">EMP-4829</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Department</span>
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">Engineering</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Work Mode</span>
                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">Remote</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">edit</span>
                                <span>Edit Profile</span>
                            </button>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Contact Details</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3 items-center">
                                <span className="material-symbols-outlined text-slate-400">mail</span>
                                <div className="text-xs">
                                    <p className="text-slate-400">Work Email</p>
                                    <p className="text-slate-900 dark:text-slate-200 font-medium">alex.j@enterprise.com</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="material-symbols-outlined text-slate-400">call</span>
                                <div className="text-xs">
                                    <p className="text-slate-400">Phone</p>
                                    <p className="text-slate-900 dark:text-slate-200 font-medium">+1 (555) 012-3456</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <section className="flex-1 min-w-0">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
                        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 gap-8">
                            <button className="flex items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 py-4 font-bold tracking-tight">Personal</button>
                            <button className="flex items-center justify-center border-b-2 border-primary text-primary py-4 font-bold tracking-tight">Work</button>
                            <button className="flex items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 py-4 font-bold tracking-tight">Security</button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">calendar_today</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Joined Date</h4>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">October 12, 2021</p>
                                    <p className="text-xs text-slate-500 mt-1">Tenure: 2 years, 4 months</p>
                                </div>
                                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">Line Manager</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-200">
                                            <img
                                                className="h-full w-full object-cover"
                                                data-alt="Avatar of Line Manager Sarah Connor"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhGDYrScsalWErmzKX0R2M6OmhziUX46Pocb1SoDPAT9beWGEaDQmMuKRdLe6lPwHStlbUQ3ev-TnM9UK4AAxDGXpSzrpkf-CyIXAJ7c0zWWVB0v99SSbkP6_j-QxmTP8FjjnzuaiLCepMhLyxC_FQ108rX1-8QeVSfjIuCdIxFsbG829qH4xgjQDNuORr6F8NZcWCm5F4M7Q2nBVTqcUZY0aQdD1C_56aKK35K487dG_pJIDUxeTS18llfas_wmrUStCZDXDWeHo"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">Sarah Connor</p>
                                            <p className="text-xs text-slate-500">Engineering Director</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">Office Location</h4>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">location_on</span>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white" data-location="San Francisco">
                                                San Francisco, HQ
                                            </p>
                                            <p className="text-xs text-slate-500">Floor 4, Wing B</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Time Off Balance</h3>
                                    <button className="text-primary text-sm font-bold hover:underline">Request Time Off</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900">
                                        <div className="relative h-14 w-14 flex items-center justify-center">
                                            <svg className="h-14 w-14 transform -rotate-90">
                                                <circle className="text-slate-100 dark:text-slate-800" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" stroke-width="4"></circle>
                                                <circle
                                                    className="text-primary"
                                                    cx="28"
                                                    cy="28"
                                                    fill="transparent"
                                                    r="24"
                                                    stroke="currentColor"
                                                    stroke-dasharray="150"
                                                    stroke-dashoffset="40"
                                                    stroke-width="4"
                                                ></circle>
                                            </svg>
                                            <span className="absolute text-[10px] font-bold">12/18</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Vacation</p>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">6 Days Left</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900">
                                        <div className="relative h-14 w-14 flex items-center justify-center">
                                            <svg className="h-14 w-14 transform -rotate-90">
                                                <circle className="text-slate-100 dark:text-slate-800" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" stroke-width="4"></circle>
                                                <circle
                                                    className="text-orange-400"
                                                    cx="28"
                                                    cy="28"
                                                    fill="transparent"
                                                    r="24"
                                                    stroke="currentColor"
                                                    stroke-dasharray="150"
                                                    stroke-dashoffset="100"
                                                    stroke-width="4"
                                                ></circle>
                                            </svg>
                                            <span className="absolute text-[10px] font-bold">3/10</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Sick Leave</p>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">7 Days Left</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900">
                                        <div className="relative h-14 w-14 flex items-center justify-center">
                                            <svg className="h-14 w-14 transform -rotate-90">
                                                <circle className="text-slate-100 dark:text-slate-800" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" stroke-width="4"></circle>
                                                <circle
                                                    className="text-emerald-400"
                                                    cx="28"
                                                    cy="28"
                                                    fill="transparent"
                                                    r="24"
                                                    stroke="currentColor"
                                                    stroke-dasharray="150"
                                                    stroke-dashoffset="130"
                                                    stroke-width="4"
                                                ></circle>
                                            </svg>
                                            <span className="absolute text-[10px] font-bold">1/5</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Personal</p>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">4 Days Left</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900">
                                        <div className="relative h-14 w-14 flex items-center justify-center">
                                            <svg className="h-14 w-14 transform -rotate-90">
                                                <circle className="text-slate-100 dark:text-slate-800" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" stroke-width="4"></circle>
                                                <circle
                                                    className="text-purple-400"
                                                    cx="28"
                                                    cy="28"
                                                    fill="transparent"
                                                    r="24"
                                                    stroke="currentColor"
                                                    stroke-dasharray="150"
                                                    stroke-dashoffset="150"
                                                    stroke-width="4"
                                                ></circle>
                                            </svg>
                                            <span className="absolute text-[10px] font-bold">0/2</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Learning</p>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">2 Days Left</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                                    <button className="text-slate-500 text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                                        View Full Log <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                                <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl">
                                    <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
                                        <thead className="bg-slate-50 dark:bg-slate-800">
                                            <tr>
                                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</th>
                                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            <tr>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                                                        <span className="font-medium">Vacation Leave</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-slate-500">Feb 10 - Feb 12, 2024</td>
                                                <td className="px-4 py-4 text-slate-500">3 Days</td>
                                                <td className="px-4 py-4">
                                                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold">Approved</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                                                        <span className="font-medium">Sick Leave</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-slate-500">Jan 24, 2024</td>
                                                <td className="px-4 py-4 text-slate-500">1 Day</td>
                                                <td className="px-4 py-4">
                                                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold">Approved</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                                                        <span className="font-medium">Workshop Attendance</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-slate-500">Jan 15, 2024</td>
                                                <td className="px-4 py-4 text-slate-500">1 Day</td>
                                                <td className="px-4 py-4">
                                                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold">Processed</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
