import { useTranslation } from "react-i18next";

export default function ApprovalWorkflowConfigPage() {
    const { t } = useTranslation();

    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t("admin.configuration.approvalWorkflow.title")}</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t("admin.configuration.approvalWorkflow.subtitle")}</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-button text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                        {t("admin.configuration.approvalWorkflow.exportConfig")}
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-button text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">add</span>
                        {t("admin.configuration.approvalWorkflow.createNew")}
                    </button>
                </div>
            </div>
            <div className="mb-8 flex items-center gap-4 bg-white dark:bg-neutral-dark p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex-1 max-w-xs">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{t("admin.configuration.approvalWorkflow.filters.department")}</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-button text-sm focus:ring-primary focus:border-primary">
                        <option>{t("admin.configuration.approvalWorkflow.filters.allDepts")}</option>
                        <option>{t("admin.configuration.approvalWorkflow.filters.engineering")}</option>
                        <option>{t("admin.configuration.approvalWorkflow.filters.hr")}</option>
                        <option>{t("admin.configuration.approvalWorkflow.filters.sales")}</option>
                        <option>{t("admin.configuration.approvalWorkflow.filters.finance")}</option>
                    </select>
                </div>
                <div className="flex-1 max-w-xs">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{t("admin.configuration.approvalWorkflow.filters.requestType")}</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-button text-sm focus:ring-primary focus:border-primary">
                        <option>{t("admin.configuration.approvalWorkflow.filters.allTypes")}</option>
                        <option>{t("admin.configuration.approvalWorkflow.filters.annualLeave")}</option>
                        <option>{t("admin.configuration.approvalWorkflow.filters.sickLeave")}</option>
                        <option>{t("admin.configuration.approvalWorkflow.filters.remoteWork")}</option>
                        <option>{t("admin.configuration.approvalWorkflow.filters.overtime")}</option>
                    </select>
                </div>
                <div className="ml-auto flex items-center gap-2 text-slate-400 italic text-sm">
                    <span className="material-icons text-[18px]">info</span>
                    {t("admin.configuration.approvalWorkflow.infoMsg")}
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
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">{t("admin.configuration.approvalWorkflow.engineeringDept.title")}</h3>
                                <p className="text-xs text-slate-500">{t("admin.configuration.approvalWorkflow.engineeringDept.subtitle")}</p>
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
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("admin.configuration.approvalWorkflow.engineeringDept.step1.title")}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">person</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("admin.configuration.approvalWorkflow.engineeringDept.step1.role")}</p>
                                            <p className="text-[11px] text-slate-500">{t("admin.configuration.approvalWorkflow.engineeringDept.step1.desc")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 w-64 workflow-connector">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">02</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("admin.configuration.approvalWorkflow.engineeringDept.step2.title")}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">badge</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("admin.configuration.approvalWorkflow.engineeringDept.step2.role")}</p>
                                            <p className="text-[11px] text-slate-500">{t("admin.configuration.approvalWorkflow.engineeringDept.step2.desc")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 w-64">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-400 text-[10px] font-bold flex items-center justify-center">
                                        03
                                    </span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("admin.configuration.approvalWorkflow.engineeringDept.step3")}</span>
                                </div>
                                <button className="w-full h-[62px] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center gap-2 text-slate-400 hover:border-primary hover:text-primary transition-all group">
                                    <span className="material-icons text-[18px]">add_circle_outline</span>
                                    <span className="text-sm font-medium">{t("admin.configuration.approvalWorkflow.addStep")}</span>
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
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">{t("admin.configuration.approvalWorkflow.financeDept.title")}</h3>
                                <p className="text-xs text-slate-500">{t("admin.configuration.approvalWorkflow.financeDept.subtitle")}</p>
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
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("admin.configuration.approvalWorkflow.financeDept.step1.title")}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">manage_accounts</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("admin.configuration.approvalWorkflow.financeDept.step1.role")}</p>
                                            <p className="text-[11px] text-slate-500">{t("admin.configuration.approvalWorkflow.financeDept.step1.desc")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 w-64 workflow-connector">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">02</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("admin.configuration.approvalWorkflow.financeDept.step2.title")}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">account_balance</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("admin.configuration.approvalWorkflow.financeDept.step2.role")}</p>
                                            <p className="text-[11px] text-slate-500">{t("admin.configuration.approvalWorkflow.financeDept.step2.desc")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 w-64">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">03</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("admin.configuration.approvalWorkflow.financeDept.step3.title")}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <span className="material-icons text-slate-400 text-[18px]">gavel</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("admin.configuration.approvalWorkflow.financeDept.step3.role")}</p>
                                            <p className="text-[11px] text-slate-500">{t("admin.configuration.approvalWorkflow.financeDept.step3.desc")}</p>
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
                    {t("admin.configuration.approvalWorkflow.configureAnother")}
                </button>
            </div>
        </main>
    )
}
