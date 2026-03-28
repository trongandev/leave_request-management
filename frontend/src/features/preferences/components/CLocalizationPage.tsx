import CSelectOptions from "@/components/etc/CSelectOptions"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function CLocalizationPage() {
    const { t } = useTranslation()

    const languages = [
        { value: "en", label: t("preferences.localization.language.options.en") },
        { value: "vi", label: t("preferences.localization.language.options.vi") },
    ]

    const timezones = [
        { value: "sea", label: t("preferences.localization.timezone.options.sea") },
        { value: "utc", label: t("preferences.localization.timezone.options.utc") },
        { value: "eastern", label: t("preferences.localization.timezone.options.eastern") },
        { value: "singapore", label: t("preferences.localization.timezone.options.singapore") },
    ]

    const dateFormats = [
        { value: "DD/MM/YYYY", label: t("preferences.localization.format.dateOptions.dayMonthYear") },
        { value: "MM/DD/YYYY", label: t("preferences.localization.format.dateOptions.monthDayYear") },
        { value: "YYYY-MM-DD", label: t("preferences.localization.format.dateOptions.yearMonthDay") },
    ]

    const timeFormats = [
        { value: "12h", label: t("preferences.localization.format.timeOptions.twelveHour") },
        { value: "24h", label: t("preferences.localization.format.timeOptions.twentyFourHour") },
    ]

    const [selectedLanguage, setSelectedLanguage] = useState(languages[1].value)
    const [selectedTimezone, setSelectedTimezone] = useState(timezones[0].value)
    const [selectedDateFormat, setSelectedDateFormat] = useState(dateFormats[0].value)
    const [selectedTimeFormat, setSelectedTimeFormat] = useState(timeFormats[1].value)

    return (
        <div className="flex-1 flex flex-col gap-8">
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">{t("preferences.localization.regional.title")}</h3>
                    <p className="text-slate-500 text-sm">{t("preferences.localization.regional.desc")}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">{t("preferences.localization.language.title")}</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 material-symbols-outlined text-lg">translate</span>
                            <CSelectOptions className="pl-10" data={languages} valueKey="value" displayKey="label" value={selectedLanguage} onChangeValue={setSelectedLanguage} />
                        </div>
                        <p className="text-xs text-slate-500">{t("preferences.localization.language.desc")}</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">{t("preferences.localization.timezone.title")}</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 material-symbols-outlined text-lg">schedule</span>
                            <CSelectOptions className="pl-10" data={timezones} valueKey="value" displayKey="label" value={selectedTimezone} onChangeValue={setSelectedTimezone} />
                        </div>
                        <p className="text-xs text-slate-500">{t("preferences.localization.timezone.defaultText")}</p>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2">
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">{t("preferences.localization.format.title")}</h3>
                        <p className="text-slate-500 text-sm">{t("preferences.localization.format.desc")}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">{t("preferences.localization.format.date")}</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 material-symbols-outlined text-lg">calendar_month</span>
                            <CSelectOptions className="pl-10" data={dateFormats} valueKey="value" displayKey="label" value={selectedDateFormat} onChangeValue={setSelectedDateFormat} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 dark:text-white">{t("preferences.localization.format.time")}</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 material-symbols-outlined text-lg">access_time</span>
                            <CSelectOptions className="pl-10" data={timeFormats} valueKey="value" displayKey="label" value={selectedTimeFormat} onChangeValue={setSelectedTimeFormat} />
                        </div>
                    </div>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="mt-1 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                                <span className="material-symbols-outlined">attach_money</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t("preferences.localization.format.currency.title")}</h4>
                                <p className="text-xs text-slate-500 mb-3 max-w-sm">{t("preferences.localization.format.currency.desc")}</p>
                                <div className="flex gap-3">
                                    <label className="relative cursor-pointer">
                                        <input checked className="peer sr-only" name="currency" type="radio" />
                                        <div className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-colors text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                                            {t("preferences.localization.format.currency.options.usd")}
                                        </div>
                                    </label>
                                    <label className="relative cursor-pointer">
                                        <input className="peer sr-only" name="currency" type="radio" />
                                        <div className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-colors text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                                            {t("preferences.localization.format.currency.options.vnd")}
                                        </div>
                                    </label>
                                    <label className="relative cursor-pointer">
                                        <input className="peer sr-only" name="currency" type="radio" />
                                        <div className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-colors text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                                            {t("preferences.localization.format.currency.options.eur")}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">{t("preferences.localization.format.preview.title")}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded">{t("preferences.localization.format.preview.active")}</span>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold mb-1">{t("preferences.localization.format.preview.date")}</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t("preferences.localization.format.previewValues.date")}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold mb-1">{t("preferences.localization.format.preview.time")}</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t("preferences.localization.format.previewValues.time")}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold mb-1">{t("preferences.localization.format.preview.currency")}</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t("preferences.localization.format.previewValues.currency")}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold mb-1">{t("preferences.localization.format.preview.number")}</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t("preferences.localization.format.previewValues.number")}</p>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-end gap-3 pb-20">
                <button className="px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">{t("preferences.changes.discard")}</button>
                <button className="px-8 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all">{t("preferences.changes.save")}</button>
            </div>
        </div>
    )
}
