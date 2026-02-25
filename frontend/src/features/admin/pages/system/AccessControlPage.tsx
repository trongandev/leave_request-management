export default function AccessControlPage() {
    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Access Control and Permissions</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage Role-Based Access Control (RBAC) and module-level security permissions.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-button text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                        Security Audit
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-button text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">add</span>
                        Create New Role
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-4">
                    <div className="bg-white dark:bg-neutral-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="relative">
                                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                                <input
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-input text-sm focus:ring-primary focus:border-primary"
                                    placeholder="Search roles..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="p-2 space-y-1">
                            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-primary/5 text-primary border border-primary/20 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-[20px]">admin_panel_settings</span>
                                    <div className="text-left">
                                        <p className="text-sm font-bold">Administrator</p>
                                        <p className="text-[11px] text-primary/70">Full System Access</p>
                                    </div>
                                </div>
                                <span className="material-icons text-[18px]">chevron_right</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-[20px] text-slate-400 group-hover:text-primary">badge</span>
                                    <div className="text-left">
                                        <p className="text-sm font-bold">HR Manager</p>
                                        <p className="text-[11px] text-slate-500">Personnel &amp; Operations</p>
                                    </div>
                                </div>
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-[20px] text-slate-400 group-hover:text-primary">supervised_user_circle</span>
                                    <div className="text-left">
                                        <p className="text-sm font-bold">Department Manager</p>
                                        <p className="text-[11px] text-slate-500">Team Management</p>
                                    </div>
                                </div>
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-[20px] text-slate-400 group-hover:text-primary">person_outline</span>
                                    <div className="text-left">
                                        <p className="text-sm font-bold">General Staff</p>
                                        <p className="text-[11px] text-slate-500">Self-Service Access</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-primary/5 p-4 rounded-lg border border-blue-100 dark:border-primary/10">
                        <div className="flex gap-3">
                            <span className="material-icons text-primary text-[20px]">info</span>
                            <div>
                                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">RBAC Insight</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Changes to role permissions take effect for users at their next login session.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-8 xl:col-span-9">
                    <div className="bg-white dark:bg-neutral-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center">
                                    <span className="material-icons">security</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Role: Administrator</h3>
                                    <p className="text-xs text-slate-500">Configure access level for each system module</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-1.5">Discard Changes</button>
                                <button className="text-sm font-medium bg-primary text-white px-4 py-1.5 rounded-button hover:bg-primary-hover shadow-sm transition-colors">Save Permissions</button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                            Module / Permission
                                        </th>
                                        <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">View</th>
                                        <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Create</th>
                                        <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Edit</th>
                                        <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Delete</th>
                                        <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Export</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="material-icons text-slate-400 text-[18px]">dashboard</span>
                                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Main Dashboard</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center text-slate-300 dark:text-slate-700">—</td>
                                        <td className="px-6 py-4 text-center text-slate-300 dark:text-slate-700">—</td>
                                        <td className="px-6 py-4 text-center text-slate-300 dark:text-slate-700">—</td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="material-icons text-slate-400 text-[18px]">people</span>
                                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Employee Records</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="material-icons text-slate-400 text-[18px]">event_note</span>
                                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Leave Requests</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="material-icons text-slate-400 text-[18px]">payments</span>
                                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Payroll Processing</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="material-icons text-slate-400 text-[18px]">settings</span>
                                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">System Configuration</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input checked type="checkbox" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-auto p-6 bg-slate-50/50 dark:bg-slate-800/10 border-t border-slate-100 dark:border-slate-800">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Advanced Permissions</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center h-5">
                                        <input checked className="h-4 w-4" type="checkbox" />
                                    </div>
                                    <div className="text-sm">
                                        <label className="font-semibold text-slate-700 dark:text-slate-200">Bulk Data Import</label>
                                        <p className="text-slate-500 text-xs">Allow importing multiple employee records via CSV/XLSX.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center h-5">
                                        <input checked className="h-4 w-4" type="checkbox" />
                                    </div>
                                    <div className="text-sm">
                                        <label className="font-semibold text-slate-700 dark:text-slate-200">System API Access</label>
                                        <p className="text-slate-500 text-xs">Generate and manage API keys for external integrations.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center h-5">
                                        <input checked className="h-4 w-4" type="checkbox" />
                                    </div>
                                    <div className="text-sm">
                                        <label className="font-semibold text-slate-700 dark:text-slate-200">View Audit Logs</label>
                                        <p className="text-slate-500 text-xs">Access detailed history of all system activities and changes.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center h-5">
                                        <input checked className="h-4 w-4" type="checkbox" />
                                    </div>
                                    <div className="text-sm">
                                        <label className="font-semibold text-slate-700 dark:text-slate-200">Manage Approval Workflows</label>
                                        <p className="text-slate-500 text-xs">Define multi-level approval sequences for departments.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
