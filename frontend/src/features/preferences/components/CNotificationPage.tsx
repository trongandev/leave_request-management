export default function CNotificationPage() {
    return (
        <div className="flex-1 flex flex-col gap-8">
            <div>
                <h3 className="text-slate-900 dark:text-white text-2xl font-bold">Notification Preferences</h3>
                <p className="text-slate-500 text-sm mt-1">Control precisely what updates you receive and how.</p>
            </div>
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4">
                            <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">event_available</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white text-base font-semibold">Leave Requests</h4>
                                <p className="text-slate-500 text-sm mt-0.5">Updates on time-off requests, approvals, and balance changes.</p>
                            </div>
                        </div>
                        <button className="text-sm text-primary font-medium hover:underline">Reset to Default</button>
                    </div>
                    <div className="ml-14 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Notifications</span>
                            <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">In-app Push Notifications</span>
                            <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4">
                            <div className="size-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">campaign</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white text-base font-semibold">Announcements</h4>
                                <p className="text-slate-500 text-sm mt-0.5">Company-wide news, policy updates, and HR announcements.</p>
                            </div>
                        </div>
                    </div>
                    <div className="ml-14 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Notifications</span>
                            <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">SMS Alerts</span>
                            <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4">
                            <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">summarize</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white text-base font-semibold">Weekly Summary</h4>
                                <p className="text-slate-500 text-sm mt-0.5">A digest of your team's activity and upcoming deadlines sent every Monday.</p>
                            </div>
                        </div>
                    </div>
                    <div className="ml-14 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Enable Weekly Digest</span>
                            <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="mb-4">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">General Settings</h3>
                    <p className="text-slate-500 text-sm">Global overrides for your notification experience.</p>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Do Not Disturb</p>
                        <p className="text-xs text-slate-500">Pause all notifications during non-working hours (6 PM - 8 AM).</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                </div>
                <div className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Sound Effects</p>
                        <p className="text-xs text-slate-500">Play a sound when a new in-app notification arrives.</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                </div>
            </section>
            <div className="flex items-center justify-end gap-3 pb-20">
                <button className="px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Discard Changes</button>
                <button className="px-8 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all">Save Preferences</button>
            </div>
        </div>
    )
}
