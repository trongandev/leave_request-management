import React from "react"

export default function EmployeeBalanceManagementPage() {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-neutral-800 dark:text-neutral-100 antialiased h-screen overflow-hidden flex flex-col">
            <header className="h-16 bg-surface-light dark:bg-surface-dark border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-6 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500">
                        <span className="material-icons-round">menu</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">HR</div>
                        <span className="font-semibold text-lg tracking-tight">NexHR Systems</span>
                    </div>
                    <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
                    <nav className="hidden md:flex gap-1">
                        <a className="px-3 py-2 text-sm font-medium text-neutral-500 hover:text-primary rounded-md hover:bg-primary-50 dark:hover:bg-primary/10" href="#">
                            Dashboard
                        </a>
                        <a className="px-3 py-2 text-sm font-medium text-neutral-500 hover:text-primary rounded-md hover:bg-primary-50 dark:hover:bg-primary/10" href="#">
                            Employees
                        </a>
                        <a className="px-3 py-2 text-sm font-medium text-primary bg-primary-50 dark:bg-primary/10 rounded-md" href="#">
                            Leave Management
                        </a>
                        <a className="px-3 py-2 text-sm font-medium text-neutral-500 hover:text-primary rounded-md hover:bg-primary-50 dark:hover:bg-primary/10" href="#">
                            Reports
                        </a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 relative text-neutral-500 hover:text-primary rounded-full hover:bg-primary-50 dark:hover:bg-primary/10">
                        <span className="material-icons-round text-xl">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface-light dark:border-surface-dark"></span>
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-neutral-200 dark:border-neutral-700">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">Sarah Jenkins</p>
                            <p className="text-xs text-neutral-500">HR Administrator</p>
                        </div>
                        <img
                            alt="Sarah Jenkins Profile"
                            className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700 object-cover"
                            data-alt="Portrait of a smiling woman with long brown hair"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2949lYvruI49wF2moAInXpE1SCaO7RS0pkqAztHhYYvuF1TttYuDmxjB1YpuzTtWeBfIHpIQAnz4zM_DoqyHQqQLO47sippspVzvDsfzv0yvzIGn2jVa8i_7Uv-bqc7JwUMmAg06zhqFcqZoq9G2iLWytohS-sa8eDyl3gctLfvZofXU-1lhjD9xcXq_j12n0KnDYAJqVj1qdRZCc6dB5pa3WnDCFO4lv0OdheerqktHYf-PqV0do6mvdIz05_-t-qXeskFa2CyE"
                        />
                    </div>
                </div>
            </header>
            <div className="flex-1 flex overflow-hidden relative">
                <main className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar relative z-0">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Leave Balances</h1>
                                <p className="text-sm text-neutral-500 mt-1">Manage and audit employee leave entitlements and usage.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 dark:bg-surface-dark dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800 shadow-sm transition-colors">
                                    <span className="material-icons-round text-lg">download</span>
                                    Export Report
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-700 shadow-sm transition-colors">
                                    <span className="material-icons-round text-lg">add</span>
                                    New Adjustment
                                </button>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">search</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400"
                                        placeholder="Search by name, ID or email..."
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                                    <div className="w-full sm:w-48 relative">
                                        <select className="w-full appearance-none pl-3 pr-10 py-2.5 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                                            <option>All Departments</option>
                                            <option>Engineering</option>
                                            <option>Product Design</option>
                                            <option>Marketing</option>
                                            <option>Human Resources</option>
                                        </select>
                                        <span className="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-lg">expand_more</span>
                                    </div>
                                    <div className="w-full sm:w-48 relative">
                                        <select className="w-full appearance-none pl-3 pr-10 py-2.5 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                                            <option>All Locations</option>
                                            <option>New York</option>
                                            <option>London</option>
                                            <option>Remote</option>
                                        </select>
                                        <span className="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-lg">expand_more</span>
                                    </div>
                                    <div className="w-full sm:w-48 relative">
                                        <select className="w-full appearance-none pl-3 pr-10 py-2.5 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                                            <option>Leave Type: Annual</option>
                                            <option>Sick Leave</option>
                                            <option>Parental Leave</option>
                                            <option>Unpaid</option>
                                        </select>
                                        <span className="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-lg">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
                                            <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider w-12">
                                                <input className="rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                            </th>
                                            <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300 group">
                                                <div className="flex items-center gap-1">
                                                    Employee
                                                    <span className="material-icons-round text-base opacity-0 group-hover:opacity-100 transition-opacity">arrow_downward</span>
                                                </div>
                                            </th>
                                            <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Department</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Leave Type</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Used / Total</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300 group">
                                                <div className="flex items-center justify-end gap-1">
                                                    Balance
                                                    <span className="material-icons-round text-base text-primary">arrow_downward</span>
                                                </div>
                                            </th>
                                            <th className="py-3 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 text-sm">
                                        <tr className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors bg-primary-50/50 dark:bg-primary/5">
                                            <td className="py-4 px-6">
                                                <input className="rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        className="h-9 w-9 rounded-full object-cover"
                                                        data-alt="Close up of a man with glasses smiling"
                                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC513_j1nMw1rlfKKemQqGV6yAwYwx5udfuXac5Vm7oT0m4qutrwe7K9djjvwq-w7dFqOkIkt3N7blgYa-F6_6OWMdLl3b_h9o0FiUmuS_BE6CXq3rSBYPRXgbc5MuoSoweZrs7VOmsrLE-pQzZq6vZuGK5Aq-8eMa59JndxgNOAA7_CzzG8lkwPek072poRqlCJl9Z1jbZ_bR3rqqINhdne7NaJ_Jm_BeTcoNMda3ze6MdP06wcR3GTWSjBCkHcFrUHwgH3wumXgI"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-neutral-900 dark:text-white">Alex Morgan</div>
                                                        <div className="text-xs text-neutral-500">ID: EMP-001</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">Engineering</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                    Annual Leave
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right text-neutral-600 dark:text-neutral-400 font-mono">12 / 20</td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="font-bold text-neutral-900 dark:text-white font-mono text-base">8.0</span>
                                                <span className="text-xs text-neutral-400 ml-1">days</span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-primary hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1 transition-colors">
                                                    <span className="material-icons-round text-lg">edit</span>
                                                    Adjust
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <input className="rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                                                        JD
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-neutral-900 dark:text-white">Jessica Doe</div>
                                                        <div className="text-xs text-neutral-500">ID: EMP-042</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">Marketing</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                    Annual Leave
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right text-neutral-600 dark:text-neutral-400 font-mono">18 / 20</td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="font-bold text-orange-600 dark:text-orange-400 font-mono text-base">2.0</span>
                                                <span className="text-xs text-neutral-400 ml-1">days</span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-neutral-400 hover:text-primary font-medium text-sm inline-flex items-center gap-1 transition-colors">
                                                    <span className="material-icons-round text-lg">edit</span>
                                                    Adjust
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <input className="rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        className="h-9 w-9 rounded-full object-cover"
                                                        data-alt="Profile photo of a man in business casual attire"
                                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIXvZh4qqiKrlCVcomsvXG3_SwdL1ZTlFwDRq_snF3o5RpocmPNa3cfWqbpDtmnGKSVFLdT6A4tTB6HWsf_28BbbbXXLXJutiu8q4gFlr3LnL5chFmsydCfnfUsRMA_7Y31ZAZaJqyfro-8Wrh6a3iX5aICryE8mSZtoGM-dgspth06L8E9oSh5Bb_YjxrAKCV259bFclacGIanSXZX0-etZZFHlrqeeoA-n4vLKZPtuWaLuqginJft-FWaodPgCgfNyCFFzWzrtE"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-neutral-900 dark:text-white">Marcus Chen</div>
                                                        <div className="text-xs text-neutral-500">ID: EMP-103</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">Sales</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                    Sick Leave
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right text-neutral-600 dark:text-neutral-400 font-mono">2 / 10</td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="font-bold text-neutral-900 dark:text-white font-mono text-base">8.0</span>
                                                <span className="text-xs text-neutral-400 ml-1">days</span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-neutral-400 hover:text-primary font-medium text-sm inline-flex items-center gap-1 transition-colors">
                                                    <span className="material-icons-round text-lg">edit</span>
                                                    Adjust
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <input className="rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        className="h-9 w-9 rounded-full object-cover"
                                                        data-alt="Woman with blonde hair looking professional"
                                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSVkQnLndrypbd8TOuj785WyB86o9PSzHRLEPds710bqToK5Drab1HaK7RzvNYzMJQMYd5cuzJwu-L4e489LC6a6Oy2GYJ5xwofKYMSpHPk1vY5m-tlGD_Lw6IGxX-jcJpdjeMejobvUDM355MXW4jTRTWW3t9QIByi8z8d4HfvzRKEh576nmXZ2ZZyEYTItL5zbVjteXbZwpQERnz0Kst3ALMJat5FCjGg7RT44Pb42gJoYSdUh150SULL32oYM8KjJhhep09k7g"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-neutral-900 dark:text-white">Emily Parker</div>
                                                        <div className="text-xs text-neutral-500">ID: EMP-156</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">Product</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                    Annual Leave
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right text-neutral-600 dark:text-neutral-400 font-mono">21 / 20</td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="font-bold text-red-600 dark:text-red-400 font-mono text-base">-1.0</span>
                                                <span className="text-xs text-neutral-400 ml-1">days</span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-neutral-400 hover:text-primary font-medium text-sm inline-flex items-center gap-1 transition-colors">
                                                    <span className="material-icons-round text-lg">edit</span>
                                                    Adjust
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <input className="rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 flex items-center justify-center font-bold text-sm">
                                                        DK
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-neutral-900 dark:text-white">David Kim</div>
                                                        <div className="text-xs text-neutral-500">ID: EMP-088</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">Engineering</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                    Annual Leave
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right text-neutral-600 dark:text-neutral-400 font-mono">5 / 20</td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="font-bold text-neutral-900 dark:text-white font-mono text-base">15.0</span>
                                                <span className="text-xs text-neutral-400 ml-1">days</span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-neutral-400 hover:text-primary font-medium text-sm inline-flex items-center gap-1 transition-colors">
                                                    <span className="material-icons-round text-lg">edit</span>
                                                    Adjust
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-surface-light dark:bg-surface-dark border-t border-neutral-200 dark:border-neutral-700 px-6 py-4 flex items-center justify-between">
                                <div className="text-sm text-neutral-500">
                                    Showing <span className="font-medium text-neutral-900 dark:text-white">1</span> to <span className="font-medium text-neutral-900 dark:text-white">5</span> of{" "}
                                    <span className="font-medium text-neutral-900 dark:text-white">128</span> employees
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-500 disabled:opacity-50 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <div className="absolute inset-y-0 right-0 w-full sm:w-96 bg-surface-light dark:bg-surface-dark shadow-2xl transform transition-transform border-l border-neutral-200 dark:border-neutral-700 z-10 flex flex-col">
                    <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50">
                        <div>
                            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Adjust Balance</h2>
                            <p className="text-xs text-neutral-500 mt-0.5">Edit leave details for selected employee.</p>
                        </div>
                        <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                            <span className="material-icons-round">close</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary/10 rounded-lg border border-primary-100 dark:border-primary/20">
                            <img
                                className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-neutral-700"
                                data-alt="Close up of a man with glasses smiling"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_GuoKCrhctfCBww4Te73puyMsSDXh03BQB8dLLu1JvPnDe1Wwss7GBAcXJziT97LGE7WikEFbFNJeilW8c9IdP1qN35BzxVm-Xqo67EaZtBWf1smJUwFKshf--x7pVSJrotA-yAigc-OVyellU7AheTMqxXYPRL_bUDb9k3sBkYUJYHHoFNVzACxq_jDERHCuZaM0RNAeG45s3yWNtuXORv_3g-GJQrlQTVzPKAKHia0mCdhyw4KtDBMm1W82kEHUGJnCMYs1WQ0"
                            />
                            <div>
                                <div className="font-semibold text-neutral-900 dark:text-white">Alex Morgan</div>
                                <div className="text-xs text-neutral-500">Engineering • Senior Dev</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                                <div className="text-xs text-neutral-500 mb-1">Current Balance</div>
                                <div className="text-xl font-bold text-neutral-900 dark:text-white font-mono">
                                    8.0 <span className="text-xs font-normal text-neutral-400">days</span>
                                </div>
                            </div>
                            <div className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                                <div className="text-xs text-neutral-500 mb-1">Annual Limit</div>
                                <div className="text-xl font-bold text-neutral-900 dark:text-white font-mono">
                                    20 <span className="text-xs font-normal text-neutral-400">days</span>
                                </div>
                            </div>
                        </div>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Adjustment Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="cursor-pointer">
                                        <input className="peer sr-only" name="adj-type" type="radio" />
                                        <div className="text-center py-2 px-3 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors">
                                            Add Days (+)
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input className="peer sr-only" name="adj-type" type="radio" />
                                        <div className="text-center py-2 px-3 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors">
                                            Deduct Days (-)
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5" htmlFor="days">
                                    Number of Days
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full pl-4 pr-12 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                        id="days"
                                        step="0.5"
                                        type="number"
                                        value="2.0"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-medium pointer-events-none">Days</div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5" htmlFor="reason">
                                    Reason for Adjustment
                                </label>
                                <textarea
                                    className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white resize-none text-sm placeholder-neutral-400"
                                    id="reason"
                                    placeholder="e.g., Correction of data entry error..."
                                    rows={3}
                                ></textarea>
                            </div>
                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">New Balance Preview</span>
                                    <span className="text-lg font-bold text-primary dark:text-blue-400 font-mono">10.0 days</span>
                                </div>
                            </div>
                        </form>
                        <div className="pt-2">
                            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Recent Changes</h3>
                            <div className="relative border-l border-neutral-200 dark:border-neutral-700 ml-2 space-y-4">
                                <div className="ml-4 relative">
                                    <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                                    <p className="text-xs text-neutral-500">Oct 24, 2023</p>
                                    <p className="text-sm text-neutral-800 dark:text-neutral-200">System deduction (Leave Request)</p>
                                    <p className="text-xs font-mono text-red-500">-2.0 days</p>
                                </div>
                                <div className="ml-4 relative">
                                    <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                                    <p className="text-xs text-neutral-500">Aug 15, 2023</p>
                                    <p className="text-sm text-neutral-800 dark:text-neutral-200">Manual Adjustment by S. Jenkins</p>
                                    <p className="text-xs font-mono text-green-500">+1.0 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 bg-surface-light dark:bg-surface-dark mt-auto">
                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 dark:bg-transparent dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors">
                                Cancel
                            </button>
                            <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-700 shadow-sm transition-colors">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
