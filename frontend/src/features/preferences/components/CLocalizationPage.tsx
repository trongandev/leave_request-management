export default function CLocalizationPage() {
    return (
        <div className="flex-1 flex flex-col gap-8">
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Regional Settings</h3>
                    <p className="text-slate-500 text-sm">Configure your region, time zone, and language preferences.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Language</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-lg">translate</span>
                            <select className="w-full pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5">
                                <option value="en">English (US)</option>
                                <option value="vi">Tiếng Việt (Vietnamese)</option>
                            </select>
                        </div>
                        <p className="text-xs text-slate-500">Select the language you want to use for the interface.</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Time Zone</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-lg">schedule</span>
                            <select className="w-full pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5">
                                <option>(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                                <option>(GMT+00:00) UTC</option>
                                <option>(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                                <option>(GMT+08:00) Singapore, Kuala Lumpur</option>
                            </select>
                        </div>
                        <p className="text-xs text-slate-500">Your current time is 09:41 AM</p>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2">
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Formatting</h3>
                        <p className="text-slate-500 text-sm">Set how dates, numbers, and currencies are displayed.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Date Format</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-lg">calendar_month</span>
                            <select className="w-full pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5">
                                <option>DD/MM/YYYY (31/12/2023)</option>
                                <option>MM/DD/YYYY (12/31/2023)</option>
                                <option>YYYY-MM-DD (2023-12-31)</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Time Format</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-lg">access_time</span>
                            <select className="w-full pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5">
                                <option>12-hour (09:30 PM)</option>
                                <option>24-hour (21:30)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="mt-1 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                                <span className="material-symbols-outlined">attach_money</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Primary Currency</h4>
                                <p className="text-xs text-slate-500 mb-3 max-w-sm">This currency will be used for all financial reports, salary displays, and expense reimbursements.</p>
                                <div className="flex gap-3">
                                    <label className="relative cursor-pointer">
                                        <input checked className="peer sr-only" name="currency" type="radio" />
                                        <div className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-colors text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                                            USD ($)
                                        </div>
                                    </label>
                                    <label className="relative cursor-pointer">
                                        <input className="peer sr-only" name="currency" type="radio" />
                                        <div className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-colors text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                                            VND (₫)
                                        </div>
                                    </label>
                                    <label className="relative cursor-pointer">
                                        <input className="peer sr-only" name="currency" type="radio" />
                                        <div className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-colors text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                                            EUR (€)
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">Preview</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded">Active Settings</span>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Date</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">31/12/2023</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Time</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">09:41 AM</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Currency</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">$1,250.00</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Numbers</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">1,000,000.00</p>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-end gap-3 pb-20">
                <button className="px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Discard Changes</button>
                <button className="px-8 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all">Save Settings</button>
            </div>
        </div>
    )
}
