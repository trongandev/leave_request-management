import { useTranslation } from "react-i18next"

const auditEntries = [
    {
        timestamp: "2023-10-31 14:22:15",
        user: "Tom Cook",
        role: "Administrator",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCSc2CA_Yvb_2fEBW1esnR01qKALAym80WJklOxIsQo5x5ciet-6YGUSnIhpD5DEb1KzVIXUMl0DMUhU-wQS7sgVpndzV85XqCRmoe2RLZRVHGicQ776waw2h0Sqi-v9IQ84Qdaw1TUNL4n9aoVUohtUvJKejxK1IkYcgB2wiVRLR4FlwRKSjBTIZpiNeq3psJTSu3akvNMXdKi60z4jgXg_G__6Xp3LbNXmgax3_S0f0oQ2zAxTqXSOnrzGKhsBjD8Hk_2m3DD5Q",
        action: "Edited Workflow",
        detail: "Updated approval steps for Engineering Department",
        tagClass: "ghost-tag-workflow",
        target: "Workflow #WF-882",
        targetTone: "text-slate-500 italic",
        ip: "192.168.1.42",
    },
    {
        timestamp: "2023-10-31 13:45:02",
        user: "Sarah Jenkins",
        role: "HR Manager",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsEn-a8qJ7imrBTR8PByteV0ioP3iEOJrBjS3aDTqkU_NG0wRsEcc4aldJklv8mWBnqCH_vedJjygzKHqEzRGiiFixZ9_7ISPmmwvj28Mukps1qdYzfO1AexcThkYe377tBRR_vlFPna9M1t3TL2aVKWaCDuTTB9DTHyfo7cE0Tj1D8k_JTGb5KkDcemlY-IFWWMNOBvNMcKOMX0x9rUlSLF5uEMWKcMC3--soOjVi3Msg2G0NU7IFb08TwMfdeP1ZSgXDWd34_4U",
        action: "Updated Balance",
        detail: "Manual adjustment: +2.0 Sick Leave",
        tagClass: "ghost-tag-balance",
        target: "Michael Chen",
        targetTone: "text-slate-700 dark:text-slate-200",
        ip: "10.0.4.115",
    },
    {
        timestamp: "2023-10-31 11:20:55",
        user: "System Bot",
        role: "Automated",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-JrFvrtlR8fxqAaqaxwdWI_Y90NnsPVlGCcRJEbB2lsIHbc_maFbNWh3W1masjswIlmpI_C0I-QHh8FexU0lEXyxmNTxMkhIAnVX9MVzYnrQuE9T64y-y2Hqr6WsQLFgMSLBRht2PDyr_TMCACqRhcyXmecBJ0Hw-gdQ0-JvRsdLICRL9cnzirdrVE0toyfsiOeYcRg0D5T0EZ8HD77yRz69c1Y0iACqjqiCSRuWWyMUfX5cfwlyc2Yq9XuRUUSuroTUK3i4MzwI",
        action: "Login Success",
        detail: "Admin portal authentication via SSO",
        tagClass: "ghost-tag-security",
        target: "System Access",
        targetTone: "text-slate-500 italic",
        ip: "192.168.1.1",
    },
    {
        timestamp: "2023-10-31 10:05:33",
        user: "Robert Fox",
        role: "DevOps",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt2-gYnD72vFSj_5rQiLsjKdXQZ-eyt9WBAjGaKYVPkNWE6W7xUTImphcl5GoXB6IWKcKKBzgQtjOHKaFfUx6oH1spaVT7xHKjk1OlFVEpdOfQuL03xiJESKl7-rSdvW4vFBJnTLvWH2z4t7fja5pCWZUmxyCzY_FTxl8kjuSFbx1mBX4xPDOj_7p7LYjHLD1u9_cFpzX4UeOwKYrM2tvIjSscUvcQB4HRlK8eao9uwMN3EXiJY_In98hWObbomVlNvuzX6oKh1Nk",
        action: "Config Change",
        detail: "Changed public holiday calendar for 2024",
        tagClass: "ghost-tag-admin",
        target: "Regional Settings",
        targetTone: "text-slate-700 dark:text-slate-200",
        ip: "84.22.101.4",
    },
    {
        timestamp: "2023-10-30 17:55:12",
        user: "Emma Wilson",
        role: "Director",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTcOtyEHT_6spZ29C70XReNiaeuBZ1tRqYGXAZfbiOdHBzQS8DFpNfg7d9660TaFwCC-qBMorA1CYjgQTGc84jLArOFDwyFGQW2wMCvj50l67AdbEemqz-FdACYdB4VwX1F25cNgBEbXOA1yhAbS158om4aUJ-VZ48wjWLQtbFq9uP1feyrwqnKwsPpQWwBJJNM1rIrtus4oXjRKIHX3tY1CwBttTHi90e26jLDzaWSCqCTu6zQDHeJ6Kero2cJ36gy6PnMPYYG7U",
        action: "Deleted Entity",
        detail: 'Removed archived department "Legacy Ops"',
        tagClass: "ghost-tag-delete text-rose-600",
        target: "Dept #442",
        targetTone: "text-rose-500",
        ip: "172.16.254.1",
    },
    {
        timestamp: "2023-10-30 16:30:00",
        user: "Tom Cook",
        role: "Administrator",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdgRQs6hC71769Cb9hd1A0xCoJUmm-LfBjzaT2qLXsFaOMKmW6rte4SHaT4_HfC_aOj_LPxf15w3B3qGHW8Fr841qLTzC09vQ9ocvDLTXH9lEjOhfYKGjMoyj8w4_7qmVqFQko0s4vaPLzodO6Qx62elljaCYoN1V9mxt6gDtNKWBXTOM_k0X0A5NXsxiXZC3h0k1XRfSmp7Wo0Dih8Meli_UTfCojkEI0j-umZNt8pBqy5ScS4mykyUAk7b_FFfuLRIf5Kh0f1-Q",
        action: "Workflow Activated",
        detail: "Published 'Finance & Ops' approval flow",
        tagClass: "ghost-tag-workflow",
        target: "Workflow #WF-891",
        targetTone: "text-slate-500 italic",
        ip: "192.168.1.42",
    },
]

const overviewStats = [
    { icon: "description", key: "admin.auditLogsPage.stats.totalEvents", value: "18,492", iconClass: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300" },
    { icon: "warning", key: "admin.auditLogsPage.stats.criticalChanges", value: "42", iconClass: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300" },
    { icon: "verified_user", key: "admin.auditLogsPage.stats.compliance", value: "100%", iconClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" },
]

export default function AuditLogPage() {
    const { t } = useTranslation()

    return (
        <main className="mx-auto w-full max-w-[1580px] space-y-6">
            <section className="rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-sm dark:border-slate-800 dark:bg-neutral-dark sm:px-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">{t("admin.auditLogsPage.eyebrow")}</p>
                        <h1 className="mt-2 text-[28px] font-bold leading-tight text-slate-900 dark:text-white">{t("admin.auditLogsPage.title")}</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{t("admin.auditLogsPage.subtitle")}</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:justify-end">
                        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-button border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                            <span className="material-icons text-[18px]">download</span>
                            {t("admin.auditLogsPage.export")}
                        </button>
                        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-button bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover">
                            <span className="material-icons text-[18px]">refresh</span>
                            {t("admin.auditLogsPage.refresh")}
                        </button>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-neutral-dark">
                <div className="border-b border-slate-200/80 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/30 sm:px-6">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="relative min-w-0 flex-1">
                            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">search</span>
                            <input
                                className="h-12 w-full rounded-button border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                                placeholder={t("admin.auditLogsPage.searchPlaceholder")}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row xl:flex-wrap xl:justify-end">
                            <div className="flex h-12 min-w-[250px] items-center gap-3 rounded-button border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                <span className="material-icons text-[18px] text-slate-400">calendar_today</span>
                                <span className="truncate">{t("admin.auditLogsPage.dateRange")}</span>
                            </div>
                            <select className="h-12 min-w-[210px] rounded-button border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                <option>{t("admin.auditLogsPage.filters.all")}</option>
                                <option>{t("admin.auditLogsPage.filters.workflow")}</option>
                                <option>{t("admin.auditLogsPage.filters.balance")}</option>
                                <option>{t("admin.auditLogsPage.filters.access")}</option>
                                <option>{t("admin.auditLogsPage.filters.config")}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[960px] border-collapse">
                        <thead className="bg-white dark:bg-neutral-dark">
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t("admin.auditLogsPage.table.timestamp")}</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t("admin.auditLogsPage.table.user")}</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t("admin.auditLogsPage.table.action")}</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t("admin.auditLogsPage.table.target")}</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t("admin.auditLogsPage.table.ip")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {auditEntries.map((entry) => (
                                <tr key={`${entry.timestamp}-${entry.user}`} className="align-top transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-900/30">
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">{entry.timestamp}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700">
                                                <img alt={entry.user} className="h-full w-full object-cover" src={entry.avatar} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{entry.user}</p>
                                                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{entry.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                                            <span className={`ghost-tag w-fit ${entry.tagClass}`}>{entry.action}</span>
                                            <span className="max-w-[420px] text-sm leading-6 text-slate-600 dark:text-slate-400">{entry.detail}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-medium ${entry.targetTone}`}>{entry.target}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">{entry.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/30 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {t("admin.auditLogsPage.pagination.showing")} <span className="font-semibold text-slate-800 dark:text-slate-200">1</span> {t("admin.auditLogsPage.pagination.to")}{" "}
                        <span className="font-semibold text-slate-800 dark:text-slate-200">6</span> {t("admin.auditLogsPage.pagination.of")}{" "}
                        <span className="font-semibold text-slate-800 dark:text-slate-200">2,412</span> {t("admin.auditLogsPage.pagination.entries")}
                    </p>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:bg-white hover:text-slate-600 dark:border-slate-700 dark:hover:bg-slate-800">
                            <span className="material-icons text-[18px]">chevron_left</span>
                        </button>
                        <button className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-white">1</button>
                        <button className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">2</button>
                        <button className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">3</button>
                        <span className="px-1 text-slate-400">...</span>
                        <button className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">48</button>
                        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:bg-white hover:text-slate-600 dark:border-slate-700 dark:hover:bg-slate-800">
                            <span className="material-icons text-[18px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {overviewStats.map((stat) => (
                    <article key={stat.key} className="flex min-h-[108px] items-center gap-4 rounded-[24px] border border-slate-200/80 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-neutral-dark">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.iconClass}`}>
                            <span className="material-icons text-[22px]">{stat.icon}</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t(stat.key)}</p>
                            <p className="mt-1 text-[28px] font-bold leading-none text-slate-900 dark:text-white">{stat.value}</p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}
