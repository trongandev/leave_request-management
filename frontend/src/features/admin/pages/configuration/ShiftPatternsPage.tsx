import { useTranslation } from "react-i18next";

export default function ShiftPatternsPage() {
    const { t } = useTranslation();

    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t("admin.configuration.shiftPattern.title")}</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t("admin.configuration.shiftPattern.subtitle")}</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">add</span>
                        {t("admin.configuration.shiftPattern.create")}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-neutral-dark shift-card shadow-sm rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span className="material-icons text-primary">corporate_fare</span>
                        </div>
                        <div className="flex gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-icons text-[18px]">edit</span>
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                                <span className="material-icons text-[18px]">delete</span>
                            </button>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t("admin.configuration.shiftPattern.shifts.office.title")}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t("admin.configuration.shiftPattern.shifts.office.desc")}</p>
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                            <span className="material-icons text-slate-400 text-[20px]">schedule</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("admin.configuration.shiftPattern.cards.timeRange")}</p>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">08:00 - 17:00</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-icons text-slate-400 text-[20px]">coffee_maker</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("admin.configuration.shiftPattern.cards.breakDuration")}</p>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">60 {t("admin.configuration.shiftPattern.cards.minutes")}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t("admin.configuration.shiftPattern.cards.activeDays")}</p>
                            <div className="flex gap-2">
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.mon")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.tue")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.wed")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.thu")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.fri")}</div>
                                <div className="day-badge day-inactive">{t("admin.configuration.shiftPattern.days.sat")}</div>
                                <div className="day-badge day-inactive">{t("admin.configuration.shiftPattern.days.sun")}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{t("admin.configuration.shiftPattern.cards.assignedEmployees")}</span>
                            <span className="font-bold text-slate-900 dark:text-white">124</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-neutral-dark shift-card shadow-sm rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <span className="material-icons text-amber-600">light_mode</span>
                        </div>
                        <div className="flex gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-icons text-[18px]">edit</span>
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                                <span className="material-icons text-[18px]">delete</span>
                            </button>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t("admin.configuration.shiftPattern.shifts.morning.title")}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t("admin.configuration.shiftPattern.shifts.morning.desc")}</p>
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                            <span className="material-icons text-slate-400 text-[20px]">schedule</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("admin.configuration.shiftPattern.cards.timeRange")}</p>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">06:00 - 14:00</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-icons text-slate-400 text-[20px]">coffee_maker</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("admin.configuration.shiftPattern.cards.breakDuration")}</p>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">45 {t("admin.configuration.shiftPattern.cards.minutes")}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t("admin.configuration.shiftPattern.cards.activeDays")}</p>
                            <div className="flex gap-2">
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.mon")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.tue")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.wed")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.thu")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.fri")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.sat")}</div>
                                <div className="day-badge day-inactive">{t("admin.configuration.shiftPattern.days.sun")}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{t("admin.configuration.shiftPattern.cards.assignedEmployees")}</span>
                            <span className="font-bold text-slate-900 dark:text-white">82</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-neutral-dark shift-card shadow-sm rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                            <span className="material-icons text-indigo-600">dark_mode</span>
                        </div>
                        <div className="flex gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-icons text-[18px]">edit</span>
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                                <span className="material-icons text-[18px]">delete</span>
                            </button>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t("admin.configuration.shiftPattern.shifts.night.title")}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t("admin.configuration.shiftPattern.shifts.night.desc")}</p>
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                            <span className="material-icons text-slate-400 text-[20px]">schedule</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("admin.configuration.shiftPattern.cards.timeRange")}</p>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">22:00 - 06:00</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-icons text-slate-400 text-[20px]">coffee_maker</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("admin.configuration.shiftPattern.cards.breakDuration")}</p>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">30 {t("admin.configuration.shiftPattern.cards.minutes")}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t("admin.configuration.shiftPattern.cards.activeDays")}</p>
                            <div className="flex gap-2">
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.mon")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.tue")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.wed")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.thu")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.fri")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.sat")}</div>
                                <div className="day-badge day-active">{t("admin.configuration.shiftPattern.days.sun")}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{t("admin.configuration.shiftPattern.cards.assignedEmployees")}</span>
                            <span className="font-bold text-slate-900 dark:text-white">36</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2">
                            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
