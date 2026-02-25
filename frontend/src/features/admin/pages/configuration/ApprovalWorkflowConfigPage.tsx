export default function ApprovalWorkflowConfigPage() {
    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Approval Workflow Configuration</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Define and manage multi-level approval sequences for department requests.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-button text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                        Export Config
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-button text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">add</span>
                        Create New Workflow
                    </button>
                </div>
            </div>
            <div className="mb-8 flex items-center gap-4 bg-white dark:bg-neutral-dark p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex-1 max-w-xs">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Filter by Department</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-button text-sm focus:ring-primary focus:border-primary">
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Sales &amp; Marketing</option>
                        <option>Finance</option>
                    </select>
                </div>
                <div className="flex-1 max-w-xs">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Request Type</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-button text-sm focus:ring-primary focus:border-primary">
                        <option>All Types</option>
                        <option>Annual Leave</option>
                        <option>Sick Leave</option>
                        <option>Remote Work</option>
                        <option>Overtime</option>
                    </select>
                </div>
                <div className="ml-auto flex items-center gap-2 text-slate-400 italic text-sm">
                    <span className="material-icons text-[18px]">info</span>
                    Changes apply to new requests only
                </div>
            </div>
            <div className="space-y-6">
                <div className="bg-white dark:bg-neutral-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-primary flex items-center justify-center">
                                <span className="material-icons">engineering</span>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">Engineering Department</h3>
                                <p className="text-xs text-slate-500">Standard Leave Approval Workflow</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-icons text-[20px]">edit</span>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                                <span className="material-icons text-[20px]">delete</span>
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-12 overflow-x-auto pb-4">
                            <div className="shrink-0 w-64 workflow-connector">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">01</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Initial Review</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">person</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Dept Manager</p>
                                            <p className="text-[11px] text-slate-500">Direct Supervisor</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 w-64 workflow-connector">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">02</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resource Check</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">badge</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">HR Specialist</p>
                                            <p className="text-[11px] text-slate-500">Leave Coordinator</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 w-64">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-400 text-[10px] font-bold flex items-center justify-center">
                                        03
                                    </span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Final Step</span>
                                </div>
                                <button className="w-full h-[62px] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center gap-2 text-slate-400 hover:border-primary hover:text-primary transition-all group">
                                    <span className="material-icons text-[18px]">add_circle_outline</span>
                                    <span className="text-sm font-medium">Add Approval Step</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-neutral-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                                <span className="material-icons">payments</span>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">Finance &amp; Operations</h3>
                                <p className="text-xs text-slate-500">Executive Leave &amp; Expense Workflow</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-icons text-[20px]">edit</span>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                                <span className="material-icons text-[20px]">delete</span>
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-12 overflow-x-auto pb-4">
                            <div className="shrink-0 w-64 workflow-connector">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">01</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dept Head Approval</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">manage_accounts</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Finance Director</p>
                                            <p className="text-[11px] text-slate-500">Primary Approver</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 w-64 workflow-connector">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">02</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Executive Sanction</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">account_balance</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">CFO</p>
                                            <p className="text-[11px] text-slate-500">Financial Oversight</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 w-64">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">03</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">HR Compliance</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">gavel</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">HR Director</p>
                                            <p className="text-[11px] text-slate-500">Legal Verification</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-primary hover:border-primary transition-all font-medium">
                    <span className="material-icons">add_circle</span>
                    Configure Workflow for another Department
                </button>
            </div>
        </main>
    )
}
