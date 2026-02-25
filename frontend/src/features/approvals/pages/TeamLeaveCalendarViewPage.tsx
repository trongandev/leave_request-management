export default function TeamLeaveCalendarViewPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-100 min-h-screen flex flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-72 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 flex flex-col z-10 hidden md:flex shrink-0">
                    <div className="p-5 border-b border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">Filters</h2>
                        <div className="relative">
                            <span className="material-icons absolute left-3 top-2.5 text-neutral-400 text-[18px]">search</span>
                            <input
                                className="w-full pl-9 pr-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-neutral-700 dark:text-neutral-200 placeholder-neutral-400"
                                placeholder="Find employee..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50">
                        <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-3 uppercase">Legend</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200 dark:bg-blue-900 dark:border-blue-700"></span>
                                <span className="text-sm text-neutral-600 dark:text-neutral-300">Approved Leave</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-200 dark:bg-amber-900 dark:border-amber-700"></span>
                                <span className="text-sm text-neutral-600 dark:text-neutral-300">Overtime (OT)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-100 border border-purple-200 dark:bg-purple-900 dark:border-purple-700"></span>
                                <span className="text-sm text-neutral-600 dark:text-neutral-300">Public Holiday</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">Team Members</h3>
                            <button className="text-xs text-primary hover:text-primary-dark font-medium">Select All</button>
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-2 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-lg cursor-pointer group transition-colors">
                                <input className="rounded border-neutral-300 text-primary focus:ring-primary/30 h-4 w-4" type="checkbox" />
                                <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden shrink-0">
                                    <img
                                        alt="Alice Johnson"
                                        className="h-full w-full object-cover"
                                        data-alt="Portrait of Alice Johnson"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCth_YwLeakrW_-J3k2XlJJQwJd_R9W6soiGHXaRg2q3ISW0V9lG16MxuIAbxOQRBBrMlcceXj5IcZWpeWtJyok9n28c-WGSQkvAEDO2NxYJiruTgiWOgYqescRjDtlDeqNi1nmz1Jzl_htps47szFclHa00_HGzY9seGy3Wz4YYGaISfDhNJBHSjyFwUDBtdTPf0WibY0mvISi3z-IfY61D1i5GBAiGqvDfcmQU-IQCU9kZIfAQGByBEUppALdYG6NnVaYed5Cl8E"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-primary transition-colors">Alice Johnson</p>
                                    <p className="text-xs text-neutral-400">Product Design</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-2 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-lg cursor-pointer group transition-colors">
                                <input className="rounded border-neutral-300 text-primary focus:ring-primary/30 h-4 w-4" type="checkbox" />
                                <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden shrink-0">
                                    <img
                                        alt="Bob Smith"
                                        className="h-full w-full object-cover"
                                        data-alt="Portrait of Bob Smith"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZqH8dccuYqhZ2n5u4zng-Mnjqdd6zmiNzNYWOMlmwFjU6ckiK1DNcyw6-10Q3LT9WoXrMehMGNI4rcHxgZk6U8RmA_jZT1G7tMRVJCzb0gEWgxUNLelzgKLz0jP0fVLREoovWgD-tmXgjURy3ih3taUlZkpm0gkwMKf5nCEIP_5eR8SMLjnWwkL8cdas0BRnwiKM6PENKzcIdYWKlFmKaI38DKBI-fuGkrGfX7Wl6rQ14vXZGeezRst7KlvVka9TgfO-enSSkbLE"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-primary transition-colors">Bob Smith</p>
                                    <p className="text-xs text-neutral-400">Engineering</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-2 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-lg cursor-pointer group transition-colors">
                                <input className="rounded border-neutral-300 text-primary focus:ring-primary/30 h-4 w-4" type="checkbox" />
                                <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden shrink-0">
                                    <img
                                        alt="Charlie Davis"
                                        className="h-full w-full object-cover"
                                        data-alt="Portrait of Charlie Davis"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl4soyrKoyl2EA0IZE2bdffCkMzHqnE4HeGyq3v9NvoNmj7JXcRAwtbNZwljMM4InLGSdvJdjjxoiDm-oNCe8U0mHp5Ggtma8RB2QxEPZBNJFvCRcFnRV2-ui-n8ojrgNMXt2g_pK76sRP2U5xVSdLLnyKfqvr0IS-BwbypCj0V9R7eiHuxRtodkuz-dbt7HYFJ8x0wKjmg-OYR7YNChfvtC4ggbMGFr7cvdb-yDlymAGiwOrq893LxIA_gtWdkuKrU6PygdJSjfg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-primary transition-colors">Charlie Davis</p>
                                    <p className="text-xs text-neutral-400">Marketing</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-2 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-lg cursor-pointer group transition-colors">
                                <input className="rounded border-neutral-300 text-primary focus:ring-primary/30 h-4 w-4" type="checkbox" />
                                <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden shrink-0">
                                    <img
                                        alt="Diana Prince"
                                        className="h-full w-full object-cover"
                                        data-alt="Portrait of Diana Prince"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj_MWdJWRvjnpx-67t2EsZ3v_93xzzcmxhTxH7dYfjpzlBTMbImBAx-Xb1WfhhFvayFb8VSGHBe0TZ5TlakFyieEX1aFuhpvOGJSTguP5vTsh4UtFsqy7Uq6L56NofHzT2QkzLZDaIbGYJoBeXmHYBVu_7UHiQRs391OMxLGIDye4uyBITeTg2PFk-x9LSld34UHxPRhE-bipTAam4i-LaoVX_azzVCqzveCzykaopk4PzTtrzwITQQj_qBaeDrttGeT4xnGo0D5k"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-primary transition-colors">Diana Prince</p>
                                    <p className="text-xs text-neutral-400">Engineering</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-2 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-lg cursor-pointer group transition-colors">
                                <input className="rounded border-neutral-300 text-primary focus:ring-primary/30 h-4 w-4" type="checkbox" />
                                <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden shrink-0">
                                    <img
                                        alt="Evan Wright"
                                        className="h-full w-full object-cover"
                                        data-alt="Portrait of Evan Wright"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJiKVpHuLU9mYxZUFWaKpvi1gtvFtigY6cX8976-CMQtSaOcqSMK7jg_ufV02IOsc5ypELK_4Ac2xMwN17PzCBMphPtwUdOHTI5KxuAS2fjczLhbqNKX4iLdq99qXOUmPSu7iEPTrcruwjCGO8jQAs3zKPPY5FMrbPpKCKdTSItSV_ibncqXa0K1ivzRsBIGIHp1qyGD1qeEYfJFCi4y8Ars0Lg1YE_qe4YawJUL89pksN4ntbOliPvbMPWjEYkEfkAuvOz9hfjDc"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-primary transition-colors">Evan Wright</p>
                                    <p className="text-xs text-neutral-400">Sales</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </aside>
                <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark p-6 h-full overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 shrink-0">
                        <div className="flex items-center gap-4 bg-white dark:bg-neutral-800 p-1.5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                            <button className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-neutral-500 dark:text-neutral-400 transition-colors">
                                <span className="material-icons">chevron_left</span>
                            </button>
                            <div className="flex items-baseline gap-2 px-2">
                                <span className="text-lg font-bold text-neutral-800 dark:text-white">September</span>
                                <span className="text-lg font-normal text-neutral-500 dark:text-neutral-400">2023</span>
                            </div>
                            <button className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-neutral-500 dark:text-neutral-400 transition-colors">
                                <span className="material-icons">chevron_right</span>
                            </button>
                            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1"></div>
                            <button className="text-sm font-medium text-primary hover:text-primary-dark px-2 transition-colors">Today</button>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
                                <button className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white rounded shadow-sm">Month</button>
                                <button className="px-3 py-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors">Week</button>
                                <button className="px-3 py-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors">Day</button>
                            </div>
                            <button className="ml-auto sm:ml-0 flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md shadow-primary/20 transition-all">
                                <span className="material-icons text-[18px]">add</span>
                                <span>Request Time Off</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden flex flex-col">
                        <div className="grid grid-cols-7 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 shrink-0">
                            <div className="py-3 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Sun</div>
                            <div className="py-3 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Mon</div>
                            <div className="py-3 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Tue</div>
                            <div className="py-3 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Wed</div>
                            <div className="py-3 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Thu</div>
                            <div className="py-3 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Fri</div>
                            <div className="py-3 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Sat</div>
                        </div>
                        <div className="flex-1 overflow-y-auto grid grid-cols-7 auto-rows-fr bg-neutral-200 dark:bg-neutral-700 gap-px border-b border-neutral-200 dark:border-neutral-700">
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">27</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">28</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">29</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">30</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">31</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">1</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">2</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">3</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">4</span>
                                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-l-md rounded-r-none border-l-4 border-blue-500 mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1 z-10 -mr-2 shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Alice (AL)
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">5</span>
                                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 -mx-2 mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity shadow-sm"></div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">6</span>
                                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-r-md rounded-l-none -ml-2 mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity shadow-sm"></div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">7</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">8</span>
                                <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-100 text-xs px-2 py-1 rounded-md mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1">
                                    <span className="material-icons text-[10px]">celebration</span>
                                    Company Day
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">9</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">10</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">11</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">12</span>
                                <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-l-md rounded-r-none border-l-4 border-red-400 mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity -mr-2 z-10 flex items-center gap-1">
                                    <span className="material-icons text-[10px]">sick</span>
                                    Charlie (Sick)
                                </div>
                                <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-100 text-xs px-2 py-1 rounded-md mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1 border border-amber-200 dark:border-amber-700/50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    Bob: 4h OT
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">13</span>
                                <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-2 py-1 -mx-2 mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity"></div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">14</span>
                                <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-2 py-1 -mx-2 mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity"></div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">15</span>
                                <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-r-md rounded-l-none -ml-2 mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity"></div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">16</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">17</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">18</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">19</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-white bg-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mb-1 shadow-md shadow-primary/30">20</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">21</span>
                                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-md mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity border-l-4 border-blue-500 flex items-center gap-1 shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Diana (AL)
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">22</span>
                                <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-100 text-xs px-2 py-1 rounded-md mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1 border border-amber-200 dark:border-amber-700/50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    Evan: 2h OT
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">23</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">24</span>
                            </div>
                            <div className="bg-purple-50/30 dark:bg-purple-900/10 p-2 min-h-[120px] flex flex-col group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">25</span>
                                <div className="bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-100 text-xs px-2 py-1 rounded-md mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity w-full text-center font-medium border border-purple-200 dark:border-purple-800">
                                    Public Holiday
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">26</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">27</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">28</span>
                                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-md mb-1 truncate cursor-pointer border-l-4 border-blue-500 shadow-sm">
                                    Bob (AL)
                                </div>
                                <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-100 text-xs px-2 py-1 rounded-md mb-1 truncate cursor-pointer border border-amber-200">
                                    Alice: OT
                                </div>
                                <div className="mt-auto">
                                    <span className="text-[10px] text-neutral-400 font-medium hover:text-primary cursor-pointer">+2 more</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">29</span>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-2 min-h-[120px] flex flex-col group hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors relative">
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1">30</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">1</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">2</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">3</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">4</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">5</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">6</span>
                            </div>
                            <div className="bg-neutral-50/50 dark:bg-neutral-900/50 p-2 min-h-[120px] flex flex-col">
                                <span className="text-neutral-400 dark:text-neutral-600 text-sm font-medium">7</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
