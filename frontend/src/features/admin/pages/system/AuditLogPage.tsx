export default function AuditLogPage() {
    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Audit Logs History</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Detailed chronological record of all administrative and system actions for compliance and transparency.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-button text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">download</span>
                        Export CSV
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-button text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">refresh</span>
                        Refresh Logs
                    </button>
                </div>
            </div>
            <div className="bg-white dark:bg-neutral-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[300px]">
                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-button text-sm focus:ring-primary focus:border-primary"
                            placeholder="Search by user, action, or entity..."
                            type="text"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-button px-3 py-1.5">
                            <span className="material-icons text-slate-400 text-[18px]">calendar_today</span>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Oct 24, 2023 - Oct 31, 2023</span>
                        </div>
                        <select className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-button text-sm focus:ring-primary focus:border-primary py-1.5">
                            <option>All Action Types</option>
                            <option>Workflow Changes</option>
                            <option>Balance Updates</option>
                            <option>User Access</option>
                            <option>System Config</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="w-[180px]">Timestamp</th>
                                <th className="w-[220px]">User</th>
                                <th>Action</th>
                                <th className="w-[200px]">Target Entity</th>
                                <th className="w-[140px]">IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="whitespace-nowrap font-mono text-xs text-slate-500">2023-10-31 14:22:15</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100">
                                            <img
                                                alt="User"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCSc2CA_Yvb_2fEBW1esnR01qKALAym80WJklOxIsQo5x5ciet-6YGUSnIhpD5DEb1KzVIXUMl0DMUhU-wQS7sgVpndzV85XqCRmoe2RLZRVHGicQ776waw2h0Sqi-v9IQ84Qdaw1TUNL4n9aoVUohtUvJKejxK1IkYcgB2wiVRLR4FlwRKSjBTIZpiNeq3psJTSu3akvNMXdKi60z4jgXg_G__6Xp3LbNXmgax3_S0f0oQ2zAxTqXSOnrzGKhsBjD8Hk_2m3DD5Q"
                                            />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">Tom Cook</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className="ghost-tag ghost-tag-workflow">Edited Workflow</span>
                                        <span className="truncate">Updated approval steps for Engineering Dept</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-slate-400 italic">Workflow #WF-882</span>
                                </td>
                                <td className="font-mono text-xs text-slate-500">192.168.1.42</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap font-mono text-xs text-slate-500">2023-10-31 13:45:02</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100">
                                            <img
                                                alt="User"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsEn-a8qJ7imrBTR8PByteV0ioP3iEOJrBjS3aDTqkU_NG0wRsEcc4aldJklv8mWBnqCH_vedJjygzKHqEzRGiiFixZ9_7ISPmmwvj28Mukps1qdYzfO1AexcThkYe377tBRR_vlFPna9M1t3TL2aVKWaCDuTTB9DTHyfo7cE0Tj1D8k_JTGb5KkDcemlY-IFWWMNOBvNMcKOMX0x9rUlSLF5uEMWKcMC3--soOjVi3Msg2G0NU7IFb08TwMfdeP1ZSgXDWd34_4U"
                                            />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">Sarah Jenkins</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className="ghost-tag ghost-tag-balance">Updated Balance</span>
                                        <span className="truncate">Manual adjustment +2.0 Sick Leave</span>
                                    </div>
                                </td>
                                <td>
                                    <span>Michael Chen</span>
                                </td>
                                <td className="font-mono text-xs text-slate-500">10.0.4.115</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap font-mono text-xs text-slate-500">2023-10-31 11:20:55</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100">
                                            <img
                                                alt="User"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-JrFvrtlR8fxqAaqaxwdWI_Y90NnsPVlGCcRJEbB2lsIHbc_maFbNWh3W1masjswIlmpI_C0I-QHh8FexU0lEXyxmNTxMkhIAnVX9MVzYnrQuE9T64y-y2Hqr6WsQLFgMSLBRht2PDyr_TMCACqRhcyXmecBJ0Hw-gdQ0-JvRsdLICRL9cnzirdrVE0toyfsiOeYcRg0D5T0EZ8HD77yRz69c1Y0iACqjqiCSRuWWyMUfX5cfwlyc2Yq9XuRUUSuroTUK3i4MzwI"
                                            />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">System Bot</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className="ghost-tag ghost-tag-security">Login Success</span>
                                        <span className="truncate">Admin portal authentication via SSO</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-slate-400 italic">System Access</span>
                                </td>
                                <td className="font-mono text-xs text-slate-500">192.168.1.1</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap font-mono text-xs text-slate-500">2023-10-31 10:05:33</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100">
                                            <img
                                                alt="User"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt2-gYnD72vFSj_5rQiLsjKdXQZ-eyt9WBAjGaKYVPkNWE6W7xUTImphcl5GoXB6IWKcKKBzgQtjOHKaFfUx6oH1spaVT7xHKjk1OlFVEpdOfQuL03xiJESKl7-rSdvW4vFBJnTLvWH2z4t7fja5pCWZUmxyCzY_FTxl8kjuSFbx1mBX4xPDOj_7p7LYjHLD1u9_cFpzX4UeOwKYrM2tvIjSscUvcQB4HRlK8eao9uwMN3EXiJY_In98hWObbomVlNvuzX6oKh1Nk"
                                            />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">Robert Fox</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className="ghost-tag ghost-tag-admin">Config Change</span>
                                        <span className="truncate">Changed public holiday calendar for 2024</span>
                                    </div>
                                </td>
                                <td>
                                    <span>Regional Settings</span>
                                </td>
                                <td className="font-mono text-xs text-slate-500">84.22.101.4</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap font-mono text-xs text-slate-500">2023-10-30 17:55:12</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100">
                                            <img
                                                alt="User"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTcOtyEHT_6spZ29C70XReNiaeuBZ1tRqYGXAZfbiOdHBzQS8DFpNfg7d9660TaFwCC-qBMorA1CYjgQTGc84jLArOFDwyFGQW2wMCvj50l67AdbEemqz-FdACYdB4VwX1F25cNgBEbXOA1yhAbS158om4aUJ-VZ48wjWLQtbFq9uP1feyrwqnKwsPpQWwBJJNM1rIrtus4oXjRKIHX3tY1CwBttTHi90e26jLDzaWSCqCTu6zQDHeJ6Kero2cJ36gy6PnMPYYG7U"
                                            />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">Emma Wilson</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className="ghost-tag ghost-tag-delete text-rose-600">Deleted Entity</span>
                                        <span className="truncate">Removed archived department "Legacy Ops"</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-slate-400">Dept #442</span>
                                </td>
                                <td className="font-mono text-xs text-slate-500">172.16.254.1</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap font-mono text-xs text-slate-500">2023-10-30 16:30:00</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100">
                                            <img
                                                alt="User"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdgRQs6hC71769Cb9hd1A0xCoJUmm-LfBjzaT2qLXsFaOMKmW6rte4SHaT4_HfC_aOj_LPxf15w3B3qGHW8Fr841qLTzC09vQ9ocvDLTXH9lEjOhfYKGjMoyj8w4_7qmVqFQko0s4vaPLzodO6Qx62elljaCYoN1V9mxt6gDtNKWBXTOM_k0X0A5NXsxiXZC3h0k1XRfSmp7Wo0Dih8Meli_UTfCojkEI0j-umZNt8pBqy5ScS4mykyUAk7b_FFfuLRIf5Kh0f1-Q"
                                            />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">Tom Cook</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className="ghost-tag ghost-tag-workflow">Workflow Activated</span>
                                        <span className="truncate">Published 'Finance &amp; Ops' approval flow</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-slate-400 italic">Workflow #WF-891</span>
                                </td>
                                <td className="font-mono text-xs text-slate-500">192.168.1.42</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs text-slate-500">Showing 1 to 6 of 2,412 entries</p>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-icons text-[18px]">chevron_left</span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-semibold">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            3
                        </button>
                        <span className="px-2 text-slate-400">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            48
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-icons text-[18px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
