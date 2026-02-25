export default function RequestDetailAndApprovalPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display min-h-screen flex flex-col">
            <nav className="bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 h-16 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                                <span className="material-icons text-xl">dataset</span>
                            </div>
                            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">HR Portal</span>
                        </div>
                        <div className="hidden md:flex h-6 w-px bg-slate-300 dark:bg-slate-600 mx-2"></div>
                        <div className="hidden md:flex items-center text-sm text-slate-500 dark:text-slate-400 gap-2">
                            <span className="hover:text-primary cursor-pointer transition-colors">Requests</span>
                            <span className="material-icons text-base">chevron_right</span>
                            <span className="font-medium text-slate-900 dark:text-white">LR-2023-892</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-icons">notifications</span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
                            <img
                                alt="Manager Profile"
                                className="h-full w-full object-cover"
                                data-alt="Manager profile photo"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBepDQJFDlsvP5N49GsxirtdIqzcPqVzCEocSbTu11RhkDiFtbVaLLStU-HXiUVS1wr4erPLuP-jLxVtYBX0SFcJ0DAcP2789PvZx7S_Q7o5x4zDEqkKXfU5Y2tOnCH9C8yyT-LKQBGWuK-pjZRt_bUm_CsCt1DH1AiBXLkbO9asJQwVA0oq32SQ7XV1NwmHzg2oUeOpQNkSdg70CfdqoKgCblDTk4HNFWr-H_wBt_EpmNxRNrPKxLtZgKAfbNerxWwF8lURotx97c"
                            />
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leave Request Details</h1>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                                Pending Approval
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Submitted on Oct 10, 2023 at 09:42 AM</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <span className="material-icons text-base">print</span>
                            Print
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <span className="material-icons text-base">share</span>
                            Share
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-600 shadow-sm shrink-0">
                                        <img
                                            alt="Employee Avatar"
                                            className="h-full w-full object-cover"
                                            data-alt="Employee profile photo"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHhWGx6A9hge5-6ZCqq3yaxZ62eNRFjwXfsFN3fp7T4hfJhwbrJeetU370YtcXM61TZqJsHDOVSx3RFeozJbWbAAOIjh-2fa-XTUstjb9bOP-VaYj4bL4UWsfhbPe2znJ6GvS0bJTiBD5ZbLGRoBIGktGZGuyrNrczO4niaY0yetbHvgz2hD3ZVwhIKUoBz_ZM09TCfoYoyNb6QeI36oAI_6YS2wHVyR5az_cRDgN0WOWi59gWVXJHWFKuplfQumyB9goOYEfmHeo"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sarah Jenkins</h2>
                                        <p className="text-sm text-primary font-medium">Senior UX Designer</p>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <span className="material-icons text-[14px]">business</span> Product Design
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-icons text-[14px]">badge</span> ID: EMP-092
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-1">Current Balance</p>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                        12.5 <span className="text-sm font-medium text-slate-500">days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Request Information</h3>
                                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <span className="material-icons text-sm">schedule</span> 3 Days Total
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">Leave Type</p>
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                                            <span className="text-slate-900 dark:text-white font-medium">Personal Leave</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">Date Range</p>
                                        <div className="text-slate-900 dark:text-white font-medium">Oct 12, 2023 — Oct 14, 2023</div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">Reason</p>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md border border-slate-100 dark:border-slate-700 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                            I need to take time off to attend a family wedding out of state. I have already handed over my pending tasks to Marcus for these three days. I will be
                                            available via email for urgent matters.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Attachments</h3>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center p-3 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-pointer w-full sm:w-auto sm:inline-flex pr-6">
                                    <div className="h-10 w-10 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded flex items-center justify-center mr-3">
                                        <span className="material-icons">picture_as_pdf</span>
                                    </div>
                                    <div className="flex-1 min-w-0 mr-4">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">wedding_invite.pdf</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">2.4 MB</p>
                                    </div>
                                    <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">download</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24 overflow-hidden">
                            <div className="bg-primary/5 dark:bg-primary/10 p-4 border-b border-primary/10">
                                <h3 className="font-semibold text-primary dark:text-primary-100 flex items-center gap-2">
                                    <span className="material-icons text-sm">gavel</span>
                                    Approval Action
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Manager's Comments <span className="text-slate-400 font-normal">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            className="block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-800 shadow-sm focus:border-primary focus:ring-primary sm:text-sm resize-none p-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                            id="comment"
                                            placeholder="Add a note explaining your decision..."
                                        ></textarea>
                                        <div className="absolute bottom-2 right-2 text-xs text-slate-400">0/500</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-error hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                                        type="button"
                                    >
                                        <span className="material-icons text-sm mr-2">close</span>
                                        Reject
                                    </button>
                                    <button
                                        className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-success hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                                        type="button"
                                    >
                                        <span className="material-icons text-sm mr-2">check</span>
                                        Approve
                                    </button>
                                </div>
                                <div className="flex items-center justify-center pt-2">
                                    <a className="text-xs text-primary hover:text-primary-600 flex items-center gap-1 font-medium" href="#">
                                        <span className="material-icons text-[14px]">history</span> View full history
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Request Timeline</h3>
                            <div className="flow-root">
                                <ul className="-mb-8" role="list">
                                    <li>
                                        <div className="relative pb-8">
                                            <span aria-hidden="true" className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700"></span>
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center ring-4 ring-white dark:ring-surface-dark">
                                                        <span className="material-icons text-blue-600 dark:text-blue-400 text-sm">send</span>
                                                    </span>
                                                </div>
                                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                    <div>
                                                        <p className="text-sm text-slate-900 dark:text-slate-200 font-medium">Request Submitted</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">By Sarah Jenkins</p>
                                                    </div>
                                                    <div className="whitespace-nowrap text-right text-xs text-slate-500 dark:text-slate-400">
                                                        <time>Oct 10</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="relative pb-8">
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center ring-4 ring-white dark:ring-surface-dark">
                                                        <span className="material-icons text-amber-600 dark:text-amber-400 text-sm">visibility</span>
                                                    </span>
                                                </div>
                                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                    <div>
                                                        <p className="text-sm text-slate-900 dark:text-slate-200 font-medium">Review Started</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">System Auto-Assign</p>
                                                    </div>
                                                    <div className="whitespace-nowrap text-right text-xs text-slate-500 dark:text-slate-400">
                                                        <time>Oct 10</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20">
                            <div className="flex gap-3">
                                <span className="material-icons text-primary text-xl shrink-0">info</span>
                                <div>
                                    <h4 className="text-sm font-semibold text-primary dark:text-primary-100 mb-1">Company Policy</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Personal leave requests exceeding 3 days require at least 1 week notice. This request meets the notice period criteria.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
