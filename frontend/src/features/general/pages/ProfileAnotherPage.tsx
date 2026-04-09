import CAvatarName from "@/components/etc/CAvatarName";
import { useTranslation } from "react-i18next";
import CAvatarProfile from "@/components/etc/CAvatarProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDaysIcon, Edit2, Gift, MailIcon, PhoneIcon } from "lucide-react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/userService";
import LoadingUI from "@/components/etc/LoadingUI";
import CTable from "@/components/etc/CTable";
import { format } from "date-fns";

export default function ProfileAnotherPage() {
    const { t, i18n } = useTranslation();
    const { data, isLoading } = useQuery({
        queryKey: ["profile" + location.pathname.split("/")[2]],
        queryFn: () => userService.getUserById(location.pathname.split("/")[2]),
    });
    const user = data?.user;
    const lb = data?.lb;
    console.log(data);

    if (isLoading) {
        return <LoadingUI />;
    }
    const columns = [
        t("general.profile.activity.columns.type", "TYPE"),
        t("general.profile.activity.columns.date", "DATE"),
        t("general.profile.activity.columns.duration", "DURATION"),
        t("general.profile.activity.columns.status", "STATUS"),
    ];
    return (
        <main className="max-w-7xl mx-auto w-full px-8 py-8">
            <div className="flex gap-8 items-start">
                <aside className="w-[300px] shrink-0 flex flex-col gap-6">
                    <Card className="p-0! overflow-hidden">
                        <CardContent className="p-0!">
                            <div className="h-24 bg-gradient-to-r from-primary to-blue-400" data-alt="Abstract blue gradient background pattern"></div>
                            <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
                                {user && <CAvatarProfile user={user} className="h-24 w-24 bg-white text-3xl font-semibold" />}
                                <h1 className="text-xl mt-3 font-bold text-slate-900 dark:text-white">{user?.fullName || "Alex Johnson"}</h1>
                                <p className="text-slate-500 text-sm font-medium">{i18n.language === 'en' ? (user?.positionId?.originName || user?.positionId?.name) : (user?.positionId?.name || user?.positionId?.originName) || "System"}</p>
                                <div className="mt-6 w-full space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">{t("general.profile.info.empId")}</span>
                                        <span className="font-semibold text-slate-900 dark:text-slate-200">{user?.empId || "EMP"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">{t("general.profile.info.department")}</span>
                                        <span className="font-semibold text-slate-900 dark:text-slate-200">{i18n.language === 'en' ? (user?.departmentId?.originName || user?.departmentId?.name) : (user?.departmentId?.name || user?.departmentId?.originName) || "System"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">{t("general.profile.info.workMode")}</span>
                                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">
                                            {t("general.profile.info.remote")}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-7 w-full">
                                    <Button className="w-full h-12">
                                        <Edit2 /> {t("general.profile.info.editProfile")}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t("general.profile.contact.title")}</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-center">
                                    <MailIcon className="text-neutral-500" size={20} />
                                    <div className="text-xs">
                                        <p className="text-neutral-600">{t("general.profile.contact.workEmail")}</p>
                                        <p className="text-slate-900 dark:text-slate-200 font-medium">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <PhoneIcon className="text-neutral-500" size={20} />
                                    <div className="text-xs">
                                        <p className="text-neutral-600">{t("general.profile.contact.phone")}</p>
                                        <p className="text-slate-900 dark:text-slate-200 font-medium">{user?.phone?.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
                <Card>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card>
                                <CardContent>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t("general.profile.details.joinedDate")}</h4>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-primary">
                                            <CalendarDaysIcon />
                                        </div>
                                        <div className="">
                                            <p className="text-xl font-bold text-slate-900 dark:text-white">{new Date(user?.createdAt || new Date()).toLocaleDateString()}</p>
                                            <p className="text-xs text-slate-500">{t("general.profile.details.tenure", { years: 2, months: 4 })}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">{t("general.profile.details.lineManager")}</h4>
                                    {user?.managerId ? <CAvatarName user={user?.managerId} /> : <div className="text-xs text-foreground">{t("general.profile.details.noManager")}</div>}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t("general.profile.details.birthDate") || "BirthDate"}</h4>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-500">
                                            <Gift className="" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{user?.birthDate ? dayjs(user.birthDate).format("MMMM D, YYYY") : "N/A"}</p>
                                            <div className="text-xs text-slate-500">{user?.birthDate ? dayjs().year() - dayjs(user.birthDate).year() : "N/A"} {t("general.profile.details.yearsOld") || "Years Old"}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t("general.profile.timeOff.title")}</h3>
                                <button className="text-primary text-sm font-bold hover:underline">{t("general.profile.timeOff.request")}</button>
                            </div>
                            <div className="">
                                <Card>
                                    <CardContent>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">{t("general.profile.timeOff.remainingLabel") || "Số phép còn lại"}</span>
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                {lb?.remainingDays || 0}/{lb?.totalDays || 12}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-secondary-foreground/20 rounded-full overflow-hidden relative  ">
                                            <div
                                                className="absolute bg-primary z-10 w-full h-full rounded-full transition-all duration-500 min-w-0"
                                                style={{ transform: `translateX(${-(1 - (lb?.remainingDays || 0) / (lb?.totalDays || 12)) * 100}%)` }}></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t("general.profile.activity.title")}</h3>
                                <button className="text-slate-500 text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                                    {t("general.profile.activity.viewLog")} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                            <CTable columns={columns} data={data?.rq} isLoading={isLoading}>
                                {data?.rq?.map((request) => (
                                    <tr>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-primary"></span>
                                                <span className="font-medium">{request.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-slate-500">
                                            {format(new Date(request?.values?.startDate), "MMM dd, yyyy")} - {format(new Date(request?.values?.endDate), "MMM dd, yyyy")}
                                        </td>

                                        {(() => {
                                            const start = dayjs(request?.values?.startDate);
                                            const end = dayjs(request?.values?.endDate);
                                            const durationDays = start.isValid() && end.isValid() ? Math.max(end.diff(start, "day") + 1, 0) : 0;

                                            return (
                                                <td className="px-4 py-4 text-slate-500">
                                                    {t(durationDays > 1 ? "general.profile.activity.days" : "general.profile.activity.day", { count: durationDays })}
                                                </td>
                                            );
                                        })()}
                                        <td className="px-4 py-4">
                                            <span className="px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold uppercase">{request.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </CTable>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
