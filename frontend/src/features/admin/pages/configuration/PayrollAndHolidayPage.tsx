export default function PayrollAndHolidayPage() {
    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payroll and Holiday Config</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure global payroll rules and manage official holiday schedules.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                        Discard Changes
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">save</span>
                        Save Configuration
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-fit">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-icons text-primary text-[20px]">account_balance_wallet</span>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payroll Settings</h2>
                        </div>
                        <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Salary Components &amp; Rules</p>
                    </div>
                    <div className="p-6 space-y-8">
                        <section>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                Base Salary Rules
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500">Pay Frequency</label>
                                    <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary">
                                        <option>Monthly</option>
                                        <option>Bi-weekly</option>
                                        <option>Weekly</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500">Processing Date</label>
                                    <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary">
                                        <option>25th of Month</option>
                                        <option>Last Working Day</option>
                                        <option>1st of Next Month</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    Allowance Setup
                                </h3>
                                <button className="text-primary text-xs font-bold hover:underline">+ Add New</button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Housing Allowance</p>
                                        <p className="text-xs text-slate-500">Fixed: $500.00 / month</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-icons text-[18px]">edit</span>
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                                            <span className="material-icons text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Transport Subsidy</p>
                                        <p className="text-xs text-slate-500">Variable: Based on attendance</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-icons text-[18px]">edit</span>
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                                            <span className="material-icons text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                    Standard Deductions
                                </h3>
                                <button className="text-primary text-xs font-bold hover:underline">+ Add New</button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Health Insurance</p>
                                        <p className="text-xs text-slate-500">Employee Share: 2.5%</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input checked className="sr-only peer" type="checkbox" />
                                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Pension Fund</p>
                                        <p className="text-xs text-slate-500">Mandatory: 8.0%</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input checked className="sr-only peer" type="checkbox" />
                                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-fit">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-icons text-primary text-[20px]">event_available</span>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Holiday Calendar</h2>
                                </div>
                                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Scheduled Public Holidays 2024</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <select className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-0">
                                    <option>2024</option>
                                    <option>2025</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="mb-8 p-4 bg-primary-light/30 dark:bg-primary/5 rounded-xl border border-primary/10">
                            <h3 className="text-sm font-bold text-primary dark:text-blue-400 mb-4">Add Public Holiday</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Date Picker</label>
                                    <div className="relative">
                                        <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary pl-10" type="date" value="2024-02-10" />
                                        <span className="material-icons absolute left-3 top-2 text-slate-400 text-[18px]">calendar_today</span>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Holiday Name</label>
                                    <input
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary"
                                        placeholder="e.g. Lunar New Year"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-hover transition-colors">Add to Calendar</button>
                        </div>
                        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-primary rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Jan</span>
                                    <span className="text-lg font-bold text-primary">01</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">New Year's Day</h4>
                                    <p className="text-xs text-slate-500">Fixed Annual Holiday</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-amber-500 rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Feb</span>
                                    <span className="text-lg font-bold text-amber-600">10</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Lunar New Year</h4>
                                    <p className="text-xs text-slate-500">Public Holiday (Varies by Moon)</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-emerald-500 rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">May</span>
                                    <span className="text-lg font-bold text-emerald-600">01</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Labor Day</h4>
                                    <p className="text-xs text-slate-500">International Celebration</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-indigo-500 rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Oct</span>
                                    <span className="text-lg font-bold text-indigo-600">01</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">National Day</h4>
                                    <p className="text-xs text-slate-500">Statutory Holiday</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-primary rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Dec</span>
                                    <span className="text-lg font-bold text-primary">25</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Christmas Day</h4>
                                    <p className="text-xs text-slate-500">Global Observed Holiday</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-center">
                        <button className="text-sm font-semibold text-primary hover:underline flex items-center justify-center gap-2 mx-auto">
                            <span className="material-icons text-[18px]">download</span>
                            Import Bulk Holiday CSV
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
