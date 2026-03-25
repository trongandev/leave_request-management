import { useTranslation } from "react-i18next"

export default function CMyAccountPage() {
    const { t } = useTranslation()
    return (
        <div className="flex-1 flex flex-col gap-8">
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">{t("preferences.accounts.title")}</h3>
                    <p className="text-slate-500 text-sm mt-1">{t("preferences.accounts.desc")}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex flex-col items-center gap-4 min-w-[160px]">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-sm">
                                <img
                                    alt={t("preferences.accounts.avatarAlt")}
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkL3TZw0HJZrtaiKL3KFDEi0f-4YPMSTj7siM4zoAm5k52_DAl5PRTHMh1RabW3MVXOIX1tvkRwOXQHlkdcpkDnk8twI3QLHA92Ij5YwcW9adK8O-dtArXBsbObAjtJsj7E-rlwbpBf1H39G_dcgL1FEPlMZL9pgg_SZ9JZF8Fu5Gm6ZM4bqGip5TPeNFqxXvi0oF9-6_97kR88qQqIDz0e3xZs8SeRx_gaBP3VvZw-y1HPLyWAdbes-fYTk_z0VB3RB8N_npX0zs"
                                />
                            </div>
                            <button className="absolute bottom-1 right-1 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 p-2 rounded-full shadow-md border border-slate-200 dark:border-slate-600 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-lg leading-none">edit</span>
                            </button>
                        </div>
                        <span className="text-xs text-slate-400 text-center">
                            {t("preferences.accounts.upload.title")}
                            <br />
                            {t("preferences.accounts.upload.subtitle")}
                        </span>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5 col-span-1">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="firstName">
                                {t("preferences.accounts.personalization.firstname")}
                            </label>
                            <input
                                className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 transition-all"
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={t("preferences.accounts.personalization.sample.firstName")}
                            />
                        </div>
                        <div className="space-y-1.5 col-span-1">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="lastName">
                                {t("preferences.accounts.personalization.lastname")}
                            </label>
                            <input
                                className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 transition-all"
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={t("preferences.accounts.personalization.sample.lastName")}
                            />
                        </div>
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">
                                {t("preferences.accounts.personalization.email")}
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">mail</span>
                                <input
                                    className="w-full h-10 pl-10 pr-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 transition-all"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={t("preferences.accounts.personalization.sample.email")}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="bio">
                                {t("preferences.accounts.personalization.bio.title")} <span className="font-normal text-slate-400">{t("preferences.accounts.personalization.bio.optional")}</span>
                            </label>
                            <textarea
                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 transition-all resize-none"
                                id="bio"
                                placeholder={t("preferences.accounts.personalization.bio.placeholder")}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm mb-10">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">{t("preferences.accounts.personalization.profile.title")}</h3>
                        <p className="text-slate-500 text-sm mt-1">{t("preferences.accounts.personalization.profile.desc")}</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-700">
                        {t("preferences.accounts.personalization.profile.readonly")}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t("preferences.accounts.personalization.profile.jobTitle")}</label>
                        <div className="w-full h-10 px-3 flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed">
                            {t("preferences.accounts.personalization.profile.jobText")}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t("preferences.accounts.personalization.profile.department")}</label>
                        <div className="w-full h-10 px-3 flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed">
                            {t("preferences.accounts.personalization.profile.departmentText")}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t("preferences.accounts.personalization.profile.employee")}</label>
                        <div className="w-full h-10 px-3 flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed">
                            {t("preferences.accounts.personalization.profile.employeeText")}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t("preferences.accounts.personalization.profile.location")}</label>
                        <div className="w-full h-10 px-3 flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed">
                            {t("preferences.accounts.personalization.profile.locationText")}
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-end gap-3 pb-20">
                <button className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent">
                    {t("preferences.accounts.personalization.profile.change.cancel")}
                </button>
                <button className="px-8 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all focus:ring-4 focus:ring-primary/30">
                    {t("preferences.accounts.personalization.profile.change.save")}
                </button>
            </div>
        </div>
    )
}
