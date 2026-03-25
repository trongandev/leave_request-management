import { useTranslation } from "react-i18next"

export default function ReportAndAnalyticsPage() {
    const { t } = useTranslation()

    return (
        <main className="">
            <div className="">
                <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                        <nav className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                            <span>{t("admin.auditLogsPage.eyebrow")}</span>
                            <span className="material-symbols-outlined !text-[14px]">chevron_right</span>
                            <span className="font-medium text-slate-900 dark:text-slate-300">{t("sidebar.systemAuditLogs")}</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{t("admin.auditLogsPage.title")}</h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{t("admin.auditLogsPage.subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-button border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-neutral-dark dark:text-slate-300 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined !text-[18px]">cloud_download</span>
                            {t("admin.auditLogsPage.export")}
                        </button>
                        <button className="flex items-center gap-2 rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-hover">
                            <span className="material-symbols-outlined !text-[18px]">sync</span>
                            {t("admin.auditLogsPage.refresh")}
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-neutral-dark">
                    <div className="border-b border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative min-w-[320px] flex-1">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <input
                                    className="w-full rounded-button border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800"
                                    placeholder={t("admin.auditLogsPage.searchPlaceholder")}
                                    type="text"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 !text-[18px] text-slate-400">calendar_month</span>
                                    <div className="cursor-pointer rounded-button border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                        {t("admin.auditLogsPage.dateRange")}
                                    </div>
                                </div>
                                <select className="rounded-button border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                    <option>{t("admin.auditLogsPage.filters.all")}</option>
                                    <option>{t("admin.auditLogsPage.filters.workflow")}</option>
                                    <option>{t("admin.auditLogsPage.filters.balance")}</option>
                                    <option>{t("admin.auditLogsPage.filters.access")}</option>
                                    <option>{t("admin.auditLogsPage.filters.config")}</option>
                                </select>
                                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    <span className="material-symbols-outlined">filter_list</span>
                                </button>
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
                                <tr className="align-top transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-900/30">
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">2023-10-31 14:22:15</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="h-full w-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCSc2CA_Yvb_2fEBW1esnR01qKALAym80WJklOxIsQo5x5ciet-6YGUSnIhpD5DEb1KzVIXUMl0DMUhU-wQS7sgVpndzV85XqCRmoe2RLZRVHGicQ776waw2h0Sqi-v9IQ84Qdaw1TUNL4n9aoVUohtUvJKejxK1IkYcgB2wiVRLR4FlwRKSjBTIZpiNeq3psJTSu3akvNMXdKi60z4jgXg_G__6Xp3LbNXmgax3_S0f0oQ2zAxTqXSOnrzGKhsBjD8Hk_2m3DD5Q"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">Tom Cook</p>
                                                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Administrator</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                                            <span className="ghost-tag w-fit ghost-tag-workflow">Edited Workflow</span>
                                            <span className="max-w-[420px] text-sm leading-6 text-slate-600 dark:text-slate-400">Updated multi-stage approval steps for Engineering Department</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium italic text-slate-500 dark:text-slate-400">#WF-882-ENG</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">192.168.1.42</td>
                                </tr>

                                <tr className="align-top transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-900/30">
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">2023-10-31 13:45:02</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="h-full w-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsEn-a8qJ7imrBTR8PByteV0ioP3iEOJrBjS3aDTqkU_NG0wRsEcc4aldJklv8mWBnqCH_vedJjygzKHqEzRGiiFixZ9_7ISPmmwvj28Mukps1qdYzfO1AexcThkYe377tBRR_vlFPna9M1t3TL2aVKWaCDuTTB9DTHyfo7cE0Tj1D8k_JTGb5KkDcemlY-IFWWMNOBvNMcKOMX0x9rUlSLF5uEMWKcMC3--soOjVi3Msg2G0NU7IFb08TwMfdeP1ZSgXDWd34_4U"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">Sarah Jenkins</p>
                                                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">HR Manager</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                                            <span className="ghost-tag w-fit ghost-tag-balance">Updated Balance</span>
                                            <span className="max-w-[420px] text-sm leading-6 text-slate-600 dark:text-slate-400">Manual adjustment: +2.0 Accrued Sick Leave</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Michael Chen</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">10.0.4.115</td>
                                </tr>

                                <tr className="align-top transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-900/30">
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">2023-10-31 11:20:55</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700">
                                                <span className="material-symbols-outlined text-slate-400 !text-[16px]">smart_toy</span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">System Engine</p>
                                                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Automated</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                                            <span className="ghost-tag w-fit ghost-tag-security">Security Login</span>
                                            <span className="max-w-[420px] text-sm leading-6 text-slate-600 dark:text-slate-400">Successful admin authentication via SAML 2.0 SSO</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium italic text-slate-500 dark:text-slate-400">Security Layer</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">192.168.1.1</td>
                                </tr>

                                <tr className="align-top transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-900/30">
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">2023-10-31 10:05:33</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="h-full w-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt2-gYnD72vFSj_5rQiLsjKdXQZ-eyt9WBAjGaKYVPkNWE6W7xUTImphcl5GoXB6IWKcKKBzgQtjOHKaFfUx6oH1spaVT7xHKjk1OlFVEpdOfQuL03xiJESKl7-rSdvW4vFBJnTLvWH2z4t7fja5pCWZUmxyCzY_FTxl8kjuSFbx1mBX4xPDOj_7p7LYjHLD1u9_cFpzX4UeOwKYrM2tvIjSscUvcQB4HRlK8eao9uwMN3EXiJY_In98hWObbomVlNvuzX6oKh1Nk"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">Robert Fox</p>
                                                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">DevOps</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                                            <span className="ghost-tag w-fit ghost-tag-admin">Config Update</span>
                                            <span className="max-w-[420px] text-sm leading-6 text-slate-600 dark:text-slate-400">Modified fiscal year rollover settings for 2024</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Global Settings</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">84.22.101.4</td>
                                </tr>

                                <tr className="align-top transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-900/30">
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">2023-10-30 17:55:12</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="h-full w-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTcOtyEHT_6spZ29C70XReNiaeuBZ1tRqYGXAZfbiOdHBzQS8DFpNfg7d9660TaFwCC-qBMorA1CYjgQTGc84jLArOFDwyFGQW2wMCvj50l67AdbEemqz-FdACYdB4VwX1F25cNgBEbXOA1yhAbS158om4aUJ-VZ48wjWLQtbFq9uP1feyrwqnKwsPpQWwBJJNM1rIrtus4oXjRKIHX3tY1CwBttTHi90e26jLDzaWSCqCTu6zQDHeJ6Kero2cJ36gy6PnMPYYG7U"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">Emma Wilson</p>
                                                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Director</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                                            <span className="ghost-tag w-fit ghost-tag-delete">Deleted Entry</span>
                                            <span className="max-w-[420px] text-sm leading-6 text-slate-600 dark:text-slate-400">Purged archived department data: "Legacy Operations"</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-rose-500">Dept #442</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">172.16.254.1</td>
                                </tr>

                                <tr className="align-top transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-900/30">
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">2023-10-30 16:30:00</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="h-full w-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdgRQs6hC71769Cb9hd1A0xCoJUmm-LfBjzaT2qLXsFaOMKmW6rte4SHaT4_HfC_aOj_LPxf15w3B3qGHW8Fr841qLTzC09vQ9ocvDLTXH9lEjOhfYKGjMoyj8w4_7qmVqFQko0s4vaPLzodO6Qx62elljaCYoN1V9mxt6gDtNKWBXTOM_k0X0A5NXsxiXZC3h0k1XRfSmp7Wo0Dih8Meli_UTfCojkEI0j-umZNt8pBqy5ScS4mykyUAk7b_FFfuLRIf5Kh0f1-Q"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">Tom Cook</p>
                                                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Administrator</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                                            <span className="ghost-tag w-fit ghost-tag-workflow">Action Trigger</span>
                                            <span className="max-w-[420px] text-sm leading-6 text-slate-600 dark:text-slate-400">Published 'Finance &amp; Operations' approval flow</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium italic text-slate-500 dark:text-slate-400">#WF-891-FIN</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">192.168.1.42</td>
                                </tr>
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
                            <button className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                                2
                            </button>
                            <button className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                                3
                            </button>
                            <span className="px-1 text-slate-400">...</span>
                            <button className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                                402
                            </button>
                            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:bg-white hover:text-slate-600 dark:border-slate-700 dark:hover:bg-slate-800">
                                <span className="material-icons text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-neutral-dark">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">{t("admin.auditLogsPage.stats.totalEvents")}</p>
                            <p className="text-lg font-bold leading-none text-slate-900 dark:text-white">18,492</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-neutral-dark">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-900/20">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">{t("admin.auditLogsPage.stats.criticalChanges")}</p>
                            <p className="text-lg font-bold leading-none text-slate-900 dark:text-white">42</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-neutral-dark">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                            <span className="material-symbols-outlined">verified_user</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">{t("admin.auditLogsPage.stats.compliance")}</p>
                            <p className="text-lg font-bold leading-none text-slate-900 dark:text-white">100%</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
