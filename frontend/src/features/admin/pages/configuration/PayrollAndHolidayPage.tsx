import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { CalendarIcon } from "lucide-react";

export default function PayrollAndHolidayPage() {
    const { t } = useTranslation();

    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.title")}</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t("admin.configuration.payrollHoliday.subtitle")}</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-border text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                        {t("admin.configuration.payrollHoliday.discard")}
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">save</span>
                        {t("admin.configuration.payrollHoliday.save")}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl shadow-sm border border-border flex flex-col h-fit">
                    <div className="p-6 border-b border-border">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-icons text-primary text-[20px]">account_balance_wallet</span>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.payroll.title")}</h2>
                        </div>
                        <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">{t("admin.configuration.payrollHoliday.payroll.subtitle")}</p>
                    </div>
                    <div className="p-6 space-y-8">
                        <section>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                {t("admin.configuration.payrollHoliday.payroll.baseRules")}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500">{t("admin.configuration.payrollHoliday.payroll.payFreq")}</label>
                                    <Select defaultValue={t("admin.configuration.payrollHoliday.payroll.freqOptions.monthly")}>
                                        <SelectTrigger className="w-full rounded-lg border-border dark:bg-slate-800 text-sm h-[38px]">
                                            <SelectValue placeholder={t("admin.configuration.payrollHoliday.payroll.payFreq")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={t("admin.configuration.payrollHoliday.payroll.freqOptions.monthly")}>{t("admin.configuration.payrollHoliday.payroll.freqOptions.monthly")}</SelectItem>
                                            <SelectItem value={t("admin.configuration.payrollHoliday.payroll.freqOptions.biWeekly")}>{t("admin.configuration.payrollHoliday.payroll.freqOptions.biWeekly")}</SelectItem>
                                            <SelectItem value={t("admin.configuration.payrollHoliday.payroll.freqOptions.weekly")}>{t("admin.configuration.payrollHoliday.payroll.freqOptions.weekly")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500">{t("admin.configuration.payrollHoliday.payroll.procDate")}</label>
                                    <Select defaultValue={t("admin.configuration.payrollHoliday.payroll.dateOptions.day25")}>
                                        <SelectTrigger className="w-full rounded-lg border-border dark:bg-slate-800 text-sm h-[38px]">
                                            <SelectValue placeholder={t("admin.configuration.payrollHoliday.payroll.procDate")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={t("admin.configuration.payrollHoliday.payroll.dateOptions.day25")}>{t("admin.configuration.payrollHoliday.payroll.dateOptions.day25")}</SelectItem>
                                            <SelectItem value={t("admin.configuration.payrollHoliday.payroll.dateOptions.lastDay")}>{t("admin.configuration.payrollHoliday.payroll.dateOptions.lastDay")}</SelectItem>
                                            <SelectItem value={t("admin.configuration.payrollHoliday.payroll.dateOptions.firstDay")}>{t("admin.configuration.payrollHoliday.payroll.dateOptions.firstDay")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    {t("admin.configuration.payrollHoliday.payroll.allowance.title")}
                                </h3>
                                <button className="text-primary text-xs font-bold hover:underline">{t("admin.configuration.payrollHoliday.payroll.allowance.addNew")}</button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.payroll.allowance.housing")}</p>
                                        <p className="text-xs text-slate-500">{t("admin.configuration.payrollHoliday.payroll.allowance.housingDesc")}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            <span className="material-icons text-[18px]">edit</span>
                                        </button>
                                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                                            <span className="material-icons text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.payroll.allowance.transport")}</p>
                                        <p className="text-xs text-slate-500">{t("admin.configuration.payrollHoliday.payroll.allowance.transportDesc")}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            <span className="material-icons text-[18px]">edit</span>
                                        </button>
                                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                                            <span className="material-icons text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                    {t("admin.configuration.payrollHoliday.payroll.deduction.title")}
                                </h3>
                                <button className="text-primary text-xs font-bold hover:underline">{t("admin.configuration.payrollHoliday.payroll.deduction.addNew")}</button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.payroll.deduction.health")}</p>
                                        <p className="text-xs text-slate-500">{t("admin.configuration.payrollHoliday.payroll.deduction.healthDesc")}</p>
                                    </div>
                                    <Switch checked />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.payroll.deduction.pension")}</p>
                                        <p className="text-xs text-slate-500">{t("admin.configuration.payrollHoliday.payroll.deduction.pensionDesc")}</p>
                                    </div>
                                    <Switch checked />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="bg-card rounded-xl shadow-sm border border-border flex flex-col h-fit">
                    <div className="p-6 border-b border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-icons text-primary text-[20px]">event_available</span>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.holiday.title")}</h2>
                                </div>
                                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">{t("admin.configuration.payrollHoliday.holiday.subtitle")}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Select defaultValue="2024">
                                    <SelectTrigger className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 border-none rounded-lg h-8 w-20">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2025">2025</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="mb-8 p-4 bg-primary-light/30 dark:bg-primary/5 rounded-xl border border-primary/10">
                            <h3 className="text-sm font-bold text-primary dark:text-blue-400 mb-4">{t("admin.configuration.payrollHoliday.holiday.addHoliday")}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">{t("admin.configuration.payrollHoliday.holiday.datePicker")}</label>
                                    <div className="relative">
                                        <InputGroup className="h-10">
                                            <InputGroupAddon>
                                                <CalendarIcon className="size-4 text-slate-400" />
                                            </InputGroupAddon>
                                            <InputGroupInput className="h-10" type="date" defaultValue="2024-02-10" />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">{t("admin.configuration.payrollHoliday.holiday.holidayName")}</label>
                                    <Input
                                        className="h-10 border-border dark:bg-slate-800"
                                        placeholder={t("admin.configuration.payrollHoliday.holiday.holidayPlaceholder")}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-hover transition-colors">{t("admin.configuration.payrollHoliday.holiday.addToCalendar")}</button>
                        </div>
                        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-primary rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t("admin.configuration.payrollHoliday.holiday.months.jan")}</span>
                                    <span className="text-lg font-bold text-primary">01</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.holiday.list.newYear")}</h4>
                                    <p className="text-xs text-slate-500">{t("admin.configuration.payrollHoliday.holiday.list.newYearDesc")}</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-amber-500 rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t("admin.configuration.payrollHoliday.holiday.months.feb")}</span>
                                    <span className="text-lg font-bold text-amber-600">10</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.holiday.list.lunar")}</h4>
                                    <p className="text-xs text-slate-500">{t("admin.configuration.payrollHoliday.holiday.list.lunarDesc")}</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-emerald-500 rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t("admin.configuration.payrollHoliday.holiday.months.may")}</span>
                                    <span className="text-lg font-bold text-emerald-600">01</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.holiday.list.labor")}</h4>
                                    <p className="text-xs text-slate-500">{t("admin.configuration.payrollHoliday.holiday.list.laborDesc")}</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-indigo-500 rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t("admin.configuration.payrollHoliday.holiday.months.oct")}</span>
                                    <span className="text-lg font-bold text-indigo-600">01</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.holiday.list.national")}</h4>
                                    <p className="text-xs text-slate-500">{t("admin.configuration.payrollHoliday.holiday.list.nationalDesc")}</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-primary rounded-r-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col items-center justify-center min-w-[50px] py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t("admin.configuration.payrollHoliday.holiday.months.dec")}</span>
                                    <span className="text-lg font-bold text-primary">25</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t("admin.configuration.payrollHoliday.holiday.list.christmas")}</h4>
                                    <p className="text-xs text-slate-500">{t("admin.configuration.payrollHoliday.holiday.list.christmasDesc")}</p>
                                </div>
                                <button className="text-slate-400 hover:text-rose-500">
                                    <span className="material-icons text-[18px]">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-border bg-slate-50/50 dark:bg-slate-800/20 text-center">
                        <button className="text-sm font-semibold text-primary hover:underline flex items-center justify-center gap-2 mx-auto">
                            <span className="material-icons text-[18px]">download</span>
                            {t("admin.configuration.payrollHoliday.holiday.importCSV")}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
