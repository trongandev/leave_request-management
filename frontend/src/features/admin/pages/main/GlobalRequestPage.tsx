import CRenderStatus from "@/components/etc/CRenderStatus"
import CTable from "@/components/etc/CTable"
import { Button } from "@/components/ui/button"
import requestService from "@/services/requestService"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Eye } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function GlobalRequestPage() {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const { data, isLoading } = useQuery({
        queryKey: ["globalRequests", page],
        queryFn: () => requestService.getAll({ page }),
    })
    console.log(data)
    const columns = ["ID", "Employee", "Type", "Duration", "Applied Date", "Status", "Actions"]
    return (
        <main className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t("admin.globalRequests.title")}</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t("admin.globalRequests.subtitle")}</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-neutral-dark border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">download</span>
                        {t("admin.globalRequests.export")}
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <span className="material-icons text-[18px]">add</span>
                        {t("admin.globalRequests.newRequest")}
                    </button>
                </div>
            </div>
            {/* <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                            <input
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary"
                                placeholder={t("admin.globalRequests.filters.searchPlaceholder")}
                                type="text"
                            />
                        </div>
                        <select className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary">
                            <option value="">{t("admin.globalRequests.filters.allDepartments")}</option>
                            <option value="engineering">{t("admin.globalRequests.filters.engineering")}</option>
                            <option value="design">{t("admin.globalRequests.filters.design")}</option>
                            <option value="sales">{t("admin.globalRequests.filters.sales")}</option>
                            <option value="hr">{t("admin.globalRequests.filters.hr")}</option>
                        </select>
                        <select className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary">
                            <option value="">{t("admin.globalRequests.filters.allRequestTypes")}</option>
                            <option value="annual">{t("admin.globalRequests.filters.annual")}</option>
                            <option value="sick">{t("admin.globalRequests.filters.sick")}</option>
                            <option value="emergency">{t("admin.globalRequests.filters.emergency")}</option>
                            <option value="remote">{t("admin.globalRequests.filters.remote")}</option>
                        </select>
                        <select className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary">
                            <option value="">{t("admin.globalRequests.filters.allStatus")}</option>
                            <option value="pending">{t("admin.globalRequests.filters.pending")}</option>
                            <option value="approved">{t("admin.globalRequests.filters.approved")}</option>
                            <option value="rejected">{t("admin.globalRequests.filters.rejected")}</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("admin.globalRequests.table.employee")}</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("admin.globalRequests.table.type")}</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("admin.globalRequests.table.duration")}</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("admin.globalRequests.table.appliedDate")}</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("admin.globalRequests.table.status")}</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("admin.globalRequests.table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                                            <img
                                                alt="Employee"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7rok9VpnJpUDsE5T50GRY3XYXyy1ApEm2xAUKULWK7agU2SOi1UvTejX89nhgp9HJKdRAG0ybB4o334MRv9NwsRkLTsI3RtlALJLee0E0gmtsGfZRgEvAZHB3PFty36LtEOEPtvG1RrC41no-M8ko4sc8X-WhBfLpNFiCJQTOKY_AWAnelm6B7P5m-An1WXWZUquVIwU4IIik5eGJx6sh0sYmgzb1frJMrdyIYeJ2W5ZFuD3hrYl2x8mDAcxxFAh-ajeXZmz4OZs"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Courtney Henry</div>
                                            <div className="text-xs text-slate-500">Design Team</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{t("admin.globalRequests.filters.annual")}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-white font-medium">{t("admin.globalRequests.table.days", { count: 3 })}</div>
                                    <div className="text-xs text-slate-500">Oct 12 - Oct 14</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Oct 08, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase ghost-tag-pending">{t("admin.globalRequests.filters.pending")}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-hover">{t("admin.globalRequests.table.viewDetail")}</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 shrink-0 flex items-center justify-center text-xs font-bold">MK</div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Michael Klein</div>
                                            <div className="text-xs text-slate-500">Engineering</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{t("admin.globalRequests.filters.sick")}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-white font-medium">{t("admin.globalRequests.table.days", { count: 2 })}</div>
                                    <div className="text-xs text-slate-500">Oct 10 - Oct 11</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Oct 09, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase ghost-tag-approved">{t("admin.globalRequests.filters.approved")}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-hover">{t("admin.globalRequests.table.viewDetail")}</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 shrink-0 flex items-center justify-center text-xs font-bold">JD</div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Jane Doe</div>
                                            <div className="text-xs text-slate-500">Sales</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{t("admin.globalRequests.filters.emergency")}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-white font-medium">{t("admin.globalRequests.table.day", { count: 1 })}</div>
                                    <div className="text-xs text-slate-500">Oct 10</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Oct 10, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase ghost-tag-approved">{t("admin.globalRequests.filters.approved")}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-hover">{t("admin.globalRequests.table.viewDetail")}</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                                            <div className="w-full h-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">RB</div>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">Robert Brown</div>
                                            <div className="text-xs text-slate-500">Engineering</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{t("admin.globalRequests.filters.remote")}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-white font-medium">{t("admin.globalRequests.table.days", { count: 5 })}</div>
                                    <div className="text-xs text-slate-500">Oct 20 - Oct 24</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Oct 11, 2023</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase ghost-tag-rejected">{t("admin.globalRequests.filters.rejected")}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-hover">{t("admin.globalRequests.table.viewDetail")}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        {t("admin.globalRequests.pagination.showing")} <span className="font-medium text-slate-900 dark:text-white">1-4</span> {t("admin.globalRequests.pagination.of")} <span className="font-medium text-slate-900 dark:text-white">152</span> {t("admin.globalRequests.pagination.requests")}
                    </p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm disabled:opacity-50">{t("admin.globalRequests.pagination.previous")}</button>
                        <button className="px-3 py-1 bg-primary text-white rounded text-sm">1</button>
                        <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
                        <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800">{t("admin.globalRequests.pagination.next")}</button>
                    </div>
                </div>
            </div> */}
            <CTable isLoading={isLoading} data={data} columns={columns} handlePageChange={setPage}>
                {data?.data.map((req) => (
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors" key={req.reqDisplayId}>
                        <td className="px-6 py-4 whitespace-nowrap">{req.reqDisplayId}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                                    <img alt="Employee" className="w-full h-full object-cover" src={req.creatorId.avatar} />
                                </div>
                                <div className="ml-3">
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">{req.creatorId?.fullName}</div>
                                    <div className="text-xs text-slate-500">{req?.creatorId?.positionId?.fullName}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-slate-600 dark:text-slate-400">{req.code}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900 dark:text-white font-medium">{t("admin.globalRequests.table.days", { count: req?.values?.totalDays })}</div>
                            <div className="text-xs text-slate-500">
                                {format(req?.values?.startDate, "MMM dd")} - {format(req?.values?.endDate, "MMM dd")}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400"> {format(req?.createdAt, "MMM dd yyyy")}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <CRenderStatus status={req.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link to={`/re`}>
                                <Button variant={"outline-primary"} size={"xs"}>
                                    <Eye /> {t("admin.globalRequests.table.viewDetail")}
                                </Button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </CTable>
        </main>
    )
}
