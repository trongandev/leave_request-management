export default function ReportAndAnalyticsPage() {
    return (
        <main className="">
            <div className="">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                    <div>
                        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                            <span>System</span>
                            <span className="material-symbols-outlined !text-[14px]">chevron_right</span>
                            <span className="text-slate-900 dark:text-slate-300 font-medium">Audit Logs</span>
                        </nav>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">System Audit Logs History</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                            Complete historical record of administrative actions, configuration changes, and security events for enterprise transparency and compliance audits.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-button text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2">
                            <span className="material-symbols-outlined !text-[18px]">cloud_download</span>
                            Export Logs
                        </button>
                        <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-button text-sm font-semibold transition-all shadow-md flex items-center gap-2">
                            <span className="material-symbols-outlined !text-[18px]">sync</span>
                            Refresh Data
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-neutral-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4">
                        <div className="relative flex-1 min-w-[320px]">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-button text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                                placeholder="Search by user, action type, entity ID or IP address..."
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-[18px]">calendar_month</span>
                                <div className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-button text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer hover:border-slate-300 transition-colors">
                                    Oct 24, 2023 - Oct 31, 2023
                                </div>
                            </div>
                            <select className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-button text-sm font-medium text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary py-2 pr-10 pl-4">
                                <option>All Actions</option>
                                <option>Workflow Changes</option>
                                <option>Balance Updates</option>
                                <option>Security Events</option>
                                <option>System Config</option>
                            </select>
                            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="w-[180px]">Timestamp</th>
                                    <th className="w-[240px]">User Account</th>
                                    <th>Action Details</th>
                                    <th className="w-[200px]">Target Entity</th>
                                    <th className="w-[140px]">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td className="whitespace-nowrap font-mono text-[12px] text-slate-500">2023-10-31 14:22:15</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCSc2CA_Yvb_2fEBW1esnR01qKALAym80WJklOxIsQo5x5ciet-6YGUSnIhpD5DEb1KzVIXUMl0DMUhU-wQS7sgVpndzV85XqCRmoe2RLZRVHGicQ776waw2h0Sqi-v9IQ84Qdaw1TUNL4n9aoVUohtUvJKejxK1IkYcgB2wiVRLR4FlwRKSjBTIZpiNeq3psJTSu3akvNMXdKi60z4jgXg_G__6Xp3LbNXmgax3_S0f0oQ2zAxTqXSOnrzGKhsBjD8Hk_2m3DD5Q"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 leading-none">Tom Cook</span>
                                                <span className="text-[10px] text-slate-400 mt-0.5 uppercase font-medium">Administrator</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <span className="ghost-tag ghost-tag-workflow">Edited Workflow</span>
                                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[300px]">Updated multi-stage approval steps for Engineering Department</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                            <span className="material-symbols-outlined !text-[16px]">account_tree</span>
                                            <span className="font-medium text-xs">#WF-882-ENG</span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-[12px] text-slate-400">192.168.1.42</td>
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap font-mono text-[12px] text-slate-500">2023-10-31 13:45:02</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsEn-a8qJ7imrBTR8PByteV0ioP3iEOJrBjS3aDTqkU_NG0wRsEcc4aldJklv8mWBnqCH_vedJjygzKHqEzRGiiFixZ9_7ISPmmwvj28Mukps1qdYzfO1AexcThkYe377tBRR_vlFPna9M1t3TL2aVKWaCDuTTB9DTHyfo7cE0Tj1D8k_JTGb5KkDcemlY-IFWWMNOBvNMcKOMX0x9rUlSLF5uEMWKcMC3--soOjVi3Msg2G0NU7IFb08TwMfdeP1ZSgXDWd34_4U"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 leading-none">Sarah Jenkins</span>
                                                <span className="text-[10px] text-slate-400 mt-0.5 uppercase font-medium">HR Manager</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <span className="ghost-tag ghost-tag-balance">Updated Balance</span>
                                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[300px]">Manual adjustment: +2.0 Accrued Sick Leave</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                            <span className="material-symbols-outlined !text-[16px]">person</span>
                                            <span className="font-medium text-xs">Michael Chen</span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-[12px] text-slate-400">10.0.4.115</td>
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap font-mono text-[12px] text-slate-500">2023-10-31 11:20:55</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                                <span className="material-symbols-outlined text-slate-400 !text-[16px]">smart_toy</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 leading-none">System Engine</span>
                                                <span className="text-[10px] text-slate-400 mt-0.5 uppercase font-medium">Automated</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <span className="ghost-tag ghost-tag-security">Security Login</span>
                                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[300px]">Successful admin authentication via SAML 2.0 SSO</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1.5 text-slate-400 italic">
                                            <span className="material-symbols-outlined !text-[16px]">lock_open</span>
                                            <span className="text-xs">Security Layer</span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-[12px] text-slate-400">192.168.1.1</td>
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap font-mono text-[12px] text-slate-500">2023-10-31 10:05:33</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt2-gYnD72vFSj_5rQiLsjKdXQZ-eyt9WBAjGaKYVPkNWE6W7xUTImphcl5GoXB6IWKcKKBzgQtjOHKaFfUx6oH1spaVT7xHKjk1OlFVEpdOfQuL03xiJESKl7-rSdvW4vFBJnTLvWH2z4t7fja5pCWZUmxyCzY_FTxl8kjuSFbx1mBX4xPDOj_7p7LYjHLD1u9_cFpzX4UeOwKYrM2tvIjSscUvcQB4HRlK8eao9uwMN3EXiJY_In98hWObbomVlNvuzX6oKh1Nk"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 leading-none">Robert Fox</span>
                                                <span className="text-[10px] text-slate-400 mt-0.5 uppercase font-medium">DevOps</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <span className="ghost-tag ghost-tag-admin">Config Update</span>
                                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[300px]">Modified fiscal year rollover settings for 2024</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                            <span className="material-symbols-outlined !text-[16px]">language</span>
                                            <span className="font-medium text-xs">Global Settings</span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-[12px] text-slate-400">84.22.101.4</td>
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap font-mono text-[12px] text-slate-500">2023-10-30 17:55:12</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTcOtyEHT_6spZ29C70XReNiaeuBZ1tRqYGXAZfbiOdHBzQS8DFpNfg7d9660TaFwCC-qBMorA1CYjgQTGc84jLArOFDwyFGQW2wMCvj50l67AdbEemqz-FdACYdB4VwX1F25cNgBEbXOA1yhAbS158om4aUJ-VZ48wjWLQtbFq9uP1feyrwqnKwsPpQWwBJJNM1rIrtus4oXjRKIHX3tY1CwBttTHi90e26jLDzaWSCqCTu6zQDHeJ6Kero2cJ36gy6PnMPYYG7U"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 leading-none">Emma Wilson</span>
                                                <span className="text-[10px] text-slate-400 mt-0.5 uppercase font-medium">Director</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <span className="ghost-tag ghost-tag-delete">Deleted Entry</span>
                                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[300px]">Purged archived department data: "Legacy Operations"</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1.5 text-rose-500">
                                            <span className="material-symbols-outlined !text-[16px]">domain_disabled</span>
                                            <span className="font-medium text-xs">Dept #442</span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-[12px] text-slate-400">172.16.254.1</td>
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap font-mono text-[12px] text-slate-500">2023-10-30 16:30:00</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700">
                                                <img
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdgRQs6hC71769Cb9hd1A0xCoJUmm-LfBjzaT2qLXsFaOMKmW6rte4SHaT4_HfC_aOj_LPxf15w3B3qGHW8Fr841qLTzC09vQ9ocvDLTXH9lEjOhfYKGjMoyj8w4_7qmVqFQko0s4vaPLzodO6Qx62elljaCYoN1V9mxt6gDtNKWBXTOM_k0X0A5NXsxiXZC3h0k1XRfSmp7Wo0Dih8Meli_UTfCojkEI0j-umZNt8pBqy5ScS4mykyUAk7b_FFfuLRIf5Kh0f1-Q"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 leading-none">Tom Cook</span>
                                                <span className="text-[10px] text-slate-400 mt-0.5 uppercase font-medium">Administrator</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <span className="ghost-tag ghost-tag-workflow">Action Trigger</span>
                                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[300px]">Published 'Finance &amp; Operations' approval flow</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <span className="material-symbols-outlined !text-[16px]">publish</span>
                                            <span className="font-medium text-xs">#WF-891-FIN</span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-[12px] text-slate-400">192.168.1.42</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-[12px] text-slate-500 font-medium">
                            Showing <span className="text-slate-900 dark:text-slate-200">1</span> to <span className="text-slate-900 dark:text-slate-200">6</span> of{" "}
                            <span className="text-slate-900 dark:text-slate-200">2,412</span> log entries
                        </p>
                        <div className="flex items-center gap-1.5">
                            <button className="h-8 px-2 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-600 transition-all disabled:opacity-50">
                                <span className="material-symbols-outlined !text-[18px]">chevron_left</span>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-[12px] font-bold shadow-sm">1</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[12px] font-semibold hover:bg-white dark:hover:bg-slate-700 transition-all">
                                2
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[12px] font-semibold hover:bg-white dark:hover:bg-slate-700 transition-all">
                                3
                            </button>
                            <span className="px-1 text-slate-400 text-xs">...</span>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[12px] font-semibold hover:bg-white dark:hover:bg-slate-700 transition-all">
                                402
                            </button>
                            <button className="h-8 px-2 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-600 transition-all">
                                <span className="material-symbols-outlined !text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white dark:bg-neutral-dark rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Total Events (30d)</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white leading-none">18,492</p>
                        </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-neutral-dark rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Critical Changes</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white leading-none">42</p>
                        </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-neutral-dark rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                            <span className="material-symbols-outlined">verified_user</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">System Compliance</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white leading-none">100%</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
