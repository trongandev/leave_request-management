export default function RequestTypeConfigPage() {
    return (
        <main className=" ">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Request Type Configuration</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage leave types, overtime rules, and approval workflows.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                        Export Rules
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">add</span>
                        New Request Type
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-icons text-slate-400 text-[20px]">search</span>
                    </span>
                    <input
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-neutral-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm shadow-sm"
                        placeholder="Search request types..."
                        type="text"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-dark focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg shadow-sm text-slate-700 dark:text-slate-300">
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
            </div>
            <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4" scope="col">
                                    Request Type
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/6" scope="col">
                                    Code
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/6" scope="col">
                                    Approval Levels
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/6" scope="col">
                                    Require Attachment
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/6" scope="col">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/12" scope="col">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-neutral-dark divide-y divide-slate-200 dark:divide-slate-700">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="shrink-0 h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                            <span className="material-icons text-[20px]">flight_takeoff</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Annual Leave</div>
                                            <div className="text-xs text-slate-500">Paid Time Off</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                                        LV-ANN
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 shadow-sm bg-white dark:bg-neutral-dark">
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-l-md transition-colors">
                                            -
                                        </button>
                                        <input
                                            className="w-12 text-center border-none p-0 focus:ring-0 text-sm font-medium text-slate-900 dark:text-white bg-transparent [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none"
                                            max="5"
                                            min="1"
                                            type="number"
                                            value="2"
                                        />
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-r-md transition-colors">+</button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all duration-300"
                                            id="toggle1"
                                            name="toggle"
                                            type="checkbox"
                                        />
                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-300" htmlFor="toggle1"></label>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-active">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5"></span>
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-slate-400 hover:text-primary mr-3 transition-colors">
                                        <span className="material-icons text-[18px]">edit</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                                        <span className="material-icons text-[18px]">delete</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="shrink-0 h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                            <span className="material-icons text-[20px]">local_hospital</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Sick Leave</div>
                                            <div className="text-xs text-slate-500">Medical Certificate</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                                        LV-SCK
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 shadow-sm bg-white dark:bg-neutral-dark">
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-l-md transition-colors">
                                            -
                                        </button>
                                        <input
                                            className="w-12 text-center border-none p-0 focus:ring-0 text-sm font-medium text-slate-900 dark:text-white bg-transparent [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none"
                                            max="5"
                                            min="1"
                                            type="number"
                                            value="1"
                                        />
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-r-md transition-colors">+</button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all duration-300"
                                            id="toggle2"
                                            name="toggle"
                                            type="checkbox"
                                        />
                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-300" htmlFor="toggle2"></label>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-active">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5"></span>
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-slate-400 hover:text-primary mr-3 transition-colors">
                                        <span className="material-icons text-[18px]">edit</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                                        <span className="material-icons text-[18px]">delete</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="shrink-0 h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                            <span className="material-icons text-[20px]">access_time</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Overtime Request</div>
                                            <div className="text-xs text-slate-500">Hourly Compensation</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                                        REQ-OT
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 shadow-sm bg-white dark:bg-neutral-dark">
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-l-md transition-colors">
                                            -
                                        </button>
                                        <input
                                            className="w-12 text-center border-none p-0 focus:ring-0 text-sm font-medium text-slate-900 dark:text-white bg-transparent [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none"
                                            max="5"
                                            min="1"
                                            type="number"
                                            value="1"
                                        />
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-r-md transition-colors">+</button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all duration-300"
                                            id="toggle3"
                                            name="toggle"
                                            type="checkbox"
                                        />
                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-300" htmlFor="toggle3"></label>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-inactive">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-1.5"></span>
                                        Inactive
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-slate-400 hover:text-primary mr-3 transition-colors">
                                        <span className="material-icons text-[18px]">edit</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                                        <span className="material-icons text-[18px]">delete</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="shrink-0 h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                            <span className="material-icons text-[20px]">receipt_long</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Expense Claim</div>
                                            <div className="text-xs text-slate-500">Travel &amp; Meals</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                                        REQ-EXP
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 shadow-sm bg-white dark:bg-neutral-dark">
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-l-md transition-colors">
                                            -
                                        </button>
                                        <input
                                            className="w-12 text-center border-none p-0 focus:ring-0 text-sm font-medium text-slate-900 dark:text-white bg-transparent [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none"
                                            max="5"
                                            min="1"
                                            type="number"
                                            value="3"
                                        />
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-r-md transition-colors">+</button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all duration-300"
                                            id="toggle4"
                                            name="toggle"
                                            type="checkbox"
                                        />
                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-300" htmlFor="toggle4"></label>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-active">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5"></span>
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-slate-400 hover:text-primary mr-3 transition-colors">
                                        <span className="material-icons text-[18px]">edit</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                                        <span className="material-icons text-[18px]">delete</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b-0">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="shrink-0 h-10 w-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                                            <span className="material-icons text-[20px]">home_work</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Remote Work</div>
                                            <div className="text-xs text-slate-500">WFH Request</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                                        LV-WFH
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 shadow-sm bg-white dark:bg-neutral-dark">
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-l-md transition-colors">
                                            -
                                        </button>
                                        <input
                                            className="w-12 text-center border-none p-0 focus:ring-0 text-sm font-medium text-slate-900 dark:text-white bg-transparent [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none"
                                            max="5"
                                            min="1"
                                            type="number"
                                            value="1"
                                        />
                                        <button className="p-1 px-2 text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-r-md transition-colors">+</button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all duration-300"
                                            id="toggle5"
                                            name="toggle"
                                            type="checkbox"
                                        />
                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-300" htmlFor="toggle5"></label>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ghost-tag-active">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5"></span>
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-slate-400 hover:text-primary mr-3 transition-colors">
                                        <span className="material-icons text-[18px]">edit</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                                        <span className="material-icons text-[18px]">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-white dark:bg-neutral-dark px-4 py-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-slate-700 dark:text-slate-400">
                                Showing <span className="font-medium text-slate-900 dark:text-white">1</span> to <span className="font-medium text-slate-900 dark:text-white">5</span> of{" "}
                                <span className="font-medium text-slate-900 dark:text-white">12</span> results
                            </p>
                        </div>
                        <div>
                            <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <a
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-neutral-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    href="#"
                                >
                                    <span className="sr-only">Previous</span>
                                    <span className="material-icons text-[20px]">chevron_left</span>
                                </a>
                                <a aria-current="page" className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                    1
                                </a>
                                <a
                                    className="bg-white dark:bg-neutral-dark border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    href="#"
                                >
                                    2
                                </a>
                                <a
                                    className="bg-white dark:bg-neutral-dark border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    href="#"
                                >
                                    3
                                </a>
                                <a
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-neutral-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    href="#"
                                >
                                    <span className="sr-only">Next</span>
                                    <span className="material-icons text-[20px]">chevron_right</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg shadow-lg font-medium transition-transform active:scale-95 flex items-center gap-2">
                    <span className="material-icons">save</span>
                    Save All Changes
                </button>
            </div>
        </main>
    )
}
