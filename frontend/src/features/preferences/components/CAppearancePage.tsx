export default function CAppearancePage() {
    return (
        <div className="">
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Theme Engine</h3>
                    <p className="text-slate-500 text-sm">Select how you want the system to look and feel.</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <label className="relative cursor-pointer group">
                        <input checked className="peer sr-only" name="theme" type="radio" />
                        <div className="border-2 border-slate-100 dark:border-slate-800 peer-checked:border-primary rounded-lg overflow-hidden transition-all">
                            <div className="h-24 bg-slate-50 flex items-center justify-center" data-alt="Light mode interface preview with soft shadows">
                                <div className="w-16 h-10 bg-white rounded shadow-sm border border-slate-200"></div>
                            </div>
                            <div className="p-3 text-center bg-white dark:bg-slate-800">
                                <p className="text-sm font-semibold">Light Mode</p>
                            </div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-primary">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                        </div>
                    </label>
                    <label className="relative cursor-pointer group">
                        <input className="peer sr-only" name="theme" type="radio" />
                        <div className="border-2 border-slate-100 dark:border-slate-800 peer-checked:border-primary rounded-lg overflow-hidden transition-all">
                            <div className="h-24 bg-slate-900 flex items-center justify-center" data-alt="Dark mode interface preview with neon accents">
                                <div className="w-16 h-10 bg-slate-800 rounded shadow-sm border border-slate-700"></div>
                            </div>
                            <div className="p-3 text-center bg-white dark:bg-slate-800">
                                <p className="text-sm font-semibold">Dark Mode</p>
                            </div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-primary">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                        </div>
                    </label>
                    <label className="relative cursor-pointer group">
                        <input className="peer sr-only" name="theme" type="radio" />
                        <div className="border-2 border-slate-100 dark:border-slate-800 peer-checked:border-primary rounded-lg overflow-hidden transition-all">
                            <div className="h-24 bg-gradient-to-br from-slate-50 to-slate-900 flex items-center justify-center" data-alt="Split preview of light and dark mode">
                                <div className="w-16 h-10 bg-slate-400/20 backdrop-blur rounded shadow-sm border border-white/20"></div>
                            </div>
                            <div className="p-3 text-center bg-white dark:bg-slate-800">
                                <p className="text-sm font-semibold">System Default</p>
                            </div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-primary">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                        </div>
                    </label>
                </div>
                <div className="space-y-4">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Accent Color</p>
                    <div className="flex gap-4">
                        <button className="group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary bg-primary/5">
                            <div className="size-4 rounded-full bg-primary"></div>
                            <span className="text-sm font-medium text-primary">Ocean Blue</span>
                        </button>
                        <button className="group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-slate-100 dark:border-slate-800 hover:border-emerald-500 transition-colors">
                            <div className="size-4 rounded-full bg-emerald-500"></div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Emerald</span>
                        </button>
                        <button className="group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-slate-100 dark:border-slate-800 hover:border-violet-500 transition-colors">
                            <div className="size-4 rounded-full bg-violet-500"></div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Violet</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Interface</h3>
                    <p className="text-slate-500 text-sm">Control the layout and density of the user interface.</p>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Compact Mode</p>
                            <p className="text-xs text-slate-500">Display more information with less spacing.</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none ring-primary/20">
                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-900 dark:text-white">System Font</label>
                            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                                <option>Inter (Default)</option>
                                <option>Roboto</option>
                                <option>Public Sans</option>
                                <option>Open Sans</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-900 dark:text-white">Sidebar Position</label>
                            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                                <option>Left (Default)</option>
                                <option>Right</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">language</span>
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Localization</h3>
                        <p className="text-slate-500 text-sm">Set your regional preferences for language and formatting.</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Language</label>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 px-3 text-sm font-medium rounded-lg border border-primary bg-primary text-white">English (US)</button>
                            <button className="flex-1 py-2 px-3 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                Tiếng Việt
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Date Format</label>
                        <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                            <option>DD/MM/YYYY (31/12/2023)</option>
                            <option>MM/DD/YYYY (12/31/2023)</option>
                            <option>YYYY-MM-DD (2023-12-31)</option>
                        </select>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-10">
                <div className="mb-6">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Notifications</h3>
                    <p className="text-slate-500 text-sm">Manage how and when you receive system alerts.</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-400">mail</span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Email Notifications</p>
                                <p className="text-xs text-slate-500">Receive summaries of pending tasks and approvals.</p>
                            </div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                            <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"></span>
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-400">volume_up</span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">System Sounds</p>
                                <p className="text-xs text-slate-500">Play a sound for new messages and status updates.</p>
                            </div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none">
                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"></span>
                        </button>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-end gap-3 pb-20">
                <button className="px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Discard Changes</button>
                <button className="px-8 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all">Save Preferences</button>
            </div>
        </div>
    )
}
