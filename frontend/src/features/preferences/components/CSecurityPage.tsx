export default function CSecurityPage() {
    return (
        <div className="flex-1 flex flex-col gap-8">
            <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Change Password</h3>
                    <p className="text-slate-500 text-sm mt-1">Update your password associated with your account.</p>
                </div>
                <form className="max-w-xl space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
                        <input
                            className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm"
                            placeholder="••••••••"
                            type="password"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                            <input
                                className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm"
                                placeholder="••••••••"
                                type="password"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm Password</label>
                            <input
                                className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary shadow-sm"
                                placeholder="••••••••"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 pt-2">
                        <p className="font-medium text-slate-700 dark:text-slate-400 mb-1">Password requirements:</p>
                        <ul className="list-disc pl-4 space-y-0.5">
                            <li>Minimum 8 characters long - the more, the better</li>
                            <li>At least one lowercase character</li>
                            <li>At least one number, symbol, or whitespace character</li>
                        </ul>
                    </div>
                </form>
            </section>
            <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Two-Factor Authentication</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wide">Enabled</span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-2xl">Add an extra layer of security to your account. We'll send a code to your mobile device when you log in.</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                </div>
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-600">
                            <span className="material-symbols-outlined">smartphone</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Authenticator App</p>
                            <p className="text-xs text-slate-500">Google Authenticator, Microsoft Authenticator, etc.</p>
                        </div>
                    </div>
                    <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Configure</button>
                </div>
            </section>
            <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-10">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Login Activity</h3>
                        <p className="text-slate-500 text-sm">Recent devices that have logged into your account.</p>
                    </div>
                    <button className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">Sign out all devices</button>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-slate-400 mt-1">laptop_mac</span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                    MacBook Pro 16"
                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-100 text-green-700 font-bold border border-green-200">Current</span>
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">San Francisco, CA, USA • Chrome 114.0</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-medium text-emerald-600 flex items-center gap-1 justify-end">
                                <span className="size-2 rounded-full bg-emerald-500"></span> Active now
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-slate-400 mt-1">phone_iphone</span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">iPhone 14 Pro</p>
                                <p className="text-xs text-slate-500 mt-0.5">San Francisco, CA, USA • HR Connect App</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 last:border-0">
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-slate-400 mt-1">desktop_windows</span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Windows PC</p>
                                <p className="text-xs text-slate-500 mt-0.5">Austin, TX, USA • Edge Browser</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500">3 days ago</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-end gap-3 pb-20">
                <button className="px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Discard</button>
                <button className="px-8 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all">Update Security Settings</button>
            </div>
        </div>
    )
}
