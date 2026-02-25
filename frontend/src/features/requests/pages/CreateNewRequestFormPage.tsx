export default function CreateNewRequestFormPage() {
    return (
        <div className="">
            <nav aria-label="Breadcrumb" className="flex mb-5">
                <ol className="flex items-center space-x-2">
                    <li>
                        <a className="text-slate-400 hover:text-slate-500 text-sm" href="#">
                            Requests
                        </a>
                    </li>
                    <li>
                        <span className="text-slate-300">/</span>
                    </li>
                    <li>
                        <span className="text-slate-600 dark:text-slate-300 font-medium text-sm">New Request</span>
                    </li>
                </ol>
            </nav>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Create New Request</h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Fill out the form below to submit a leave, overtime, or business trip request.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-subtle border border-slate-200 dark:border-slate-700 overflow-hidden">
                <form action="#" className="divide-y divide-slate-100 dark:divide-slate-700" method="POST">
                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1" htmlFor="request-type">
                                    Request Type
                                </label>
                                <div className="relative">
                                    <select
                                        className="block w-full rounded-md border-border-neutral dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 pl-3 pr-10"
                                        id="request-type"
                                        name="request-type"
                                    >
                                        <option value="leave">Leave Request</option>
                                        <option value="overtime">Overtime</option>
                                        <option value="business-trip">Business Trip</option>
                                        <option value="remote-work">Remote Work</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1" htmlFor="leave-category">
                                    Leave Category
                                </label>
                                <select
                                    className="block w-full rounded-md border-border-neutral dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 pl-3 pr-10"
                                    id="leave-category"
                                    name="leave-category"
                                >
                                    <option value="annual">Annual Leave</option>
                                    <option value="sick">Sick Leave</option>
                                    <option value="unpaid">Unpaid Leave</option>
                                    <option value="maternity">Maternity/Paternity</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 pt-2">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1" htmlFor="start-date">
                                    Start Date
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="material-icons text-slate-400 text-sm">calendar_today</span>
                                    </div>
                                    <input
                                        className="block w-full rounded-md border-border-neutral dark:border-slate-600 pl-10 focus:border-primary focus:ring-primary sm:text-sm py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
                                        id="start-date"
                                        name="start-date"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1" htmlFor="end-date">
                                    End Date
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="material-icons text-slate-400 text-sm">event</span>
                                    </div>
                                    <input
                                        className="block w-full rounded-md border-border-neutral dark:border-slate-600 pl-10 focus:border-primary focus:ring-primary sm:text-sm py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
                                        id="end-date"
                                        name="end-date"
                                        type="date"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary-light border border-primary/20 rounded-md p-3 flex items-start">
                            <span className="material-icons text-primary text-sm mt-0.5 mr-2">info</span>
                            <p className="text-sm text-slate-700 dark:text-slate-200">
                                Total duration: <span className="font-semibold text-primary">3 Days</span>. Your remaining balance after this request will be{" "}
                                <span className="font-semibold">12 days</span>.
                            </p>
                        </div>
                    </div>
                    <div className="p-6 sm:p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1" htmlFor="reason">
                                Reason for Request
                            </label>
                            <div className="mt-1">
                                <textarea
                                    className="block w-full rounded-md border-border-neutral dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 placeholder-slate-400"
                                    id="reason"
                                    name="reason"
                                    placeholder="Please describe the reason for your leave request..."
                                ></textarea>
                            </div>
                            <p className="mt-2 text-xs text-slate-500">Provide sufficient details for your manager to review.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Approver</label>
                            <div className="flex items-center p-3 border border-border-neutral dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-900/50">
                                <img
                                    alt="Profile photo of manager"
                                    className="h-8 w-8 rounded-full"
                                    data-alt="Profile photo of manager"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDweymlinkVo7QtVRXNv8CFnatNsBJ8ViFbS7HZvXBOI55jfWoI6wqigxPsoc4ojSIlIdbNRyksM-eey9Yiew4s6zKLS92u2wRamrIeuQzwTwbH3YLxYIDPrfEvev2oOsXB2hIHkWQifD9d6P7-E7g2k6__B3Td-Tf9xgty9gR049Hc16FiQXebVuTxShIP1CjqpFhlhbMaEEdL0EkMmDrEijAMKchdq_JoM4aheARK_4pzf-1X47G9mYmEAL6p5y-OoEIvDM8Hp5Y"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Sarah Connor</p>
                                    <p className="text-xs text-slate-500">Engineering Director</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                        Auto-assign
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Attachments (Optional)</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-neutral dark:border-slate-600 border-dashed rounded-md hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
                                <div className="space-y-1 text-center">
                                    <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">cloud_upload</span>
                                    <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                                        <label
                                            className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                                            htmlFor="file-upload"
                                        >
                                            <span>Upload a file</span>
                                            <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/30 flex items-center justify-end space-x-3 rounded-b-lg sm:px-8">
                        <button
                            className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            type="submit"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
            <p className="text-center text-xs text-slate-400 mt-6">
                © 2023 Acme Corp HR Systems. Need help?{" "}
                <a className="text-primary hover:underline" href="#">
                    Contact Support
                </a>
            </p>
        </div>
    )
}
