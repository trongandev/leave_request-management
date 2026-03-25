import { useTranslation } from "react-i18next"

const roleItems = [
    { icon: "admin_panel_settings", title: "admin.system.accessControl.roles.admin.title", desc: "admin.system.accessControl.roles.admin.desc", active: true },
    { icon: "badge", title: "admin.system.accessControl.roles.hr.title", desc: "admin.system.accessControl.roles.hr.desc" },
    { icon: "supervised_user_circle", title: "admin.system.accessControl.roles.deptManager.title", desc: "admin.system.accessControl.roles.deptManager.desc" },
    { icon: "person_outline", title: "admin.system.accessControl.roles.staff.title", desc: "admin.system.accessControl.roles.staff.desc" },
]

const moduleItems = [
    { icon: "dashboard", label: "admin.system.accessControl.table.modules.dashboard" },
    { icon: "people", label: "admin.system.accessControl.table.modules.employee" },
    { icon: "event_note", label: "admin.system.accessControl.table.modules.leave" },
    { icon: "payments", label: "admin.system.accessControl.table.modules.payroll" },
    { icon: "settings", label: "admin.system.accessControl.table.modules.config" },
]

const advancedItems = [
    { title: "admin.system.accessControl.advanced.bulkImport.title", desc: "admin.system.accessControl.advanced.bulkImport.desc" },
    { title: "admin.system.accessControl.advanced.apiAccess.title", desc: "admin.system.accessControl.advanced.apiAccess.desc" },
    { title: "admin.system.accessControl.advanced.auditLogs.title", desc: "admin.system.accessControl.advanced.auditLogs.desc" },
    { title: "admin.system.accessControl.advanced.workflows.title", desc: "admin.system.accessControl.advanced.workflows.desc" },
]

export default function AccessControlPage() {
    const { t } = useTranslation()

    return (
        <main className="">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t("admin.system.accessControl.title")}</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("admin.system.accessControl.subtitle")}</p>
                </div>
                <div className="flex gap-3">
                    <button className="rounded-button border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-neutral-dark dark:text-slate-300 dark:hover:bg-slate-800">
                        {t("admin.system.accessControl.securityAudit")}
                    </button>
                    <button className="flex items-center gap-2 rounded-button bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover">
                        <span className="material-icons text-[18px]">add</span>
                        {t("admin.system.accessControl.createRole")}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 space-y-4 lg:col-span-4 xl:col-span-3">
                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-neutral-dark">
                        <div className="border-b border-slate-100 p-4 dark:border-slate-800">
                            <div className="relative">
                                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">search</span>
                                <input
                                    className="w-full rounded-input border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800/50"
                                    placeholder={t("admin.system.accessControl.searchPlaceholder")}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="space-y-1 p-2">
                            {roleItems.map((role) => (
                                <button
                                    key={role.title}
                                    className={`group flex w-full items-center justify-between rounded-lg p-3 transition-colors ${
                                        role.active
                                            ? "border border-primary/20 bg-primary/5 text-primary"
                                            : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`material-icons text-[20px] ${role.active ? "" : "text-slate-400 group-hover:text-primary"}`}>{role.icon}</span>
                                        <div className="text-left">
                                            <p className="text-sm font-bold">{t(role.title)}</p>
                                            <p className={`text-[11px] ${role.active ? "text-primary/70" : "text-slate-500"}`}>{t(role.desc)}</p>
                                        </div>
                                    </div>
                                    {role.active ? <span className="material-icons text-[18px]">chevron_right</span> : null}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-primary/10 dark:bg-primary/5">
                        <div className="flex gap-3">
                            <span className="material-icons text-[20px] text-primary">info</span>
                            <div>
                                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{t("admin.system.accessControl.insight.title")}</p>
                                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{t("admin.system.accessControl.insight.desc")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-8 xl:col-span-9">
                    <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-neutral-dark">
                        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/30 p-5 dark:border-slate-800 dark:bg-slate-800/20">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                                    <span className="material-icons">security</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{t("admin.system.accessControl.roleDetails.title")}</h3>
                                    <p className="text-xs text-slate-500">{t("admin.system.accessControl.roleDetails.desc")}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                                    {t("admin.system.accessControl.roleDetails.discard")}
                                </button>
                                <button className="rounded-button bg-primary px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover">
                                    {t("admin.system.accessControl.roleDetails.save")}
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                                        <th className="border-b border-slate-100 px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:border-slate-800">
                                            {t("admin.system.accessControl.table.module")}
                                        </th>
                                        <th className="border-b border-slate-100 px-6 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:border-slate-800">
                                            {t("admin.system.accessControl.table.view")}
                                        </th>
                                        <th className="border-b border-slate-100 px-6 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:border-slate-800">
                                            {t("admin.system.accessControl.table.create")}
                                        </th>
                                        <th className="border-b border-slate-100 px-6 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:border-slate-800">
                                            {t("admin.system.accessControl.table.edit")}
                                        </th>
                                        <th className="border-b border-slate-100 px-6 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:border-slate-800">
                                            {t("admin.system.accessControl.table.delete")}
                                        </th>
                                        <th className="border-b border-slate-100 px-6 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:border-slate-800">
                                            {t("admin.system.accessControl.table.export")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {moduleItems.map((item, index) => (
                                        <tr key={item.label} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-icons text-[18px] text-slate-400">{item.icon}</span>
                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t(item.label)}</span>
                                                </div>
                                            </td>
                                            {[0, 1, 2, 3, 4].map((permissionIndex) => (
                                                <td key={permissionIndex} className="px-6 py-4 text-center">
                                                    {index === 0 && (permissionIndex === 1 || permissionIndex === 2 || permissionIndex === 3) ? (
                                                        <span className="text-slate-300 dark:text-slate-700">—</span>
                                                    ) : (
                                                        <input checked readOnly type="checkbox" />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-auto border-t border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/10">
                            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">{t("admin.system.accessControl.advanced.title")}</h4>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {advancedItems.map((item) => (
                                    <div key={item.title} className="flex items-start gap-4">
                                        <div className="flex h-5 items-center">
                                            <input checked readOnly className="h-4 w-4" type="checkbox" />
                                        </div>
                                        <div className="text-sm">
                                            <label className="font-semibold text-slate-700 dark:text-slate-200">{t(item.title)}</label>
                                            <p className="text-xs text-slate-500">{t(item.desc)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
