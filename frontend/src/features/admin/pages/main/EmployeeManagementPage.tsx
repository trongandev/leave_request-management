import CSelectOptions from "@/components/etc/CSelectOptions"
import LoadingUI from "@/components/etc/LoadingUI"
import PaginationUI from "@/components/etc/PaginationUI"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CirclePlus, Download, Search, X, Edit, SaveIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import userService from "@/services/userService"
import type { User, UserResponse } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function EmployeeManagementPage() {
    const { t } = useTranslation()
    const departmentsData = [
        { value: "all", label: t("admin.attendance.filters.allDepts", "All Departments") },
        { value: "tech", label: t("admin.common.departments.engineering") },
        { value: "production", label: t("admin.common.departments.production") },
        { value: "r&d", label: t("admin.common.departments.rnd") },
        { value: "hr", label: t("admin.common.departments.hr") },
        { value: "log", label: t("admin.common.departments.logistics") },
        { value: "qa", label: t("admin.common.departments.qa") },
        { value: "sys", label: t("admin.common.departments.system") },
    ]

    const annualsData = [
        { value: "all", label: "All Annuals" },
        { value: "sick", label: "Sick Leave" },
        { value: "personal", label: "Personal Leave" },
        { value: "compensatory", label: "Compensatory Leave" },
        { value: "vacation", label: "Vacation Leave" },
    ]

    const locationData = [
        { value: "all", label: "All Locations" },
        { value: "new_york", label: "New York" },
        { value: "london", label: "London" },
        { value: "remote", label: "Remote" },
    ]

    const [page, setPage] = useState(1)
    const { data, isLoading } = useQuery<UserResponse>({
        queryKey: ["employees", page],
        queryFn: () => userService.getAllUsers({ page }),
    })
    const [adjustEmp, setAdjustEmp] = useState<User | null>(null)

    const columns = ["EMPLOYEE", "DEPARTMENT", "POSTITION", "ROLE", "STATUS", "ACTIONS"]

    console.log(data)

    const handleSaveChanges = () => {
        // Implementation for saving changes
    }
    const handlePageChange = (page: number) => {
        // Implementation for handling page change
        setPage(page)
    }

    return (
        <div className="flex-1 flex relative overflow-hidden">
            <main className="flex-1  relative  z-0">
                <div className="space-y-6">
                    <Card>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">{t("admin.employees.title")}</h1>
                                    <p className="text-sm text-neutral-500 mt-1">{t("admin.employees.subtitle")}</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button className="h-10" variant={"outline"}>
                                        <Download /> {t("admin.employees.exportReport")}
                                    </Button>
                                    <Button className="h-10">
                                        <CirclePlus /> {t("admin.employees.newAdjustment")}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex-1 relative h-12">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 " size={20} />
                                    <Input className="w-full h-full pl-10" placeholder="Search by name, ID or email..." type="text" />
                                </div>
                                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                                    <CSelectOptions data={departmentsData} valueKey="value" displayKey="label" placeholder="Department" />
                                    <CSelectOptions data={annualsData} valueKey="value" displayKey="label" placeholder="Annual Leave" />
                                    <CSelectOptions data={locationData} valueKey="value" displayKey="label" placeholder="Location" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {isLoading && <LoadingUI />}
                    {!isLoading && (
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-xs border bg-card  overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
                                            {columns.map((column) => (
                                                <th key={column} className="py-5 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">
                                                    {column}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 text-sm">
                                        {data?.data.map((item, index) => (
                                            <tr key={index} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <img className="h-9 w-9 rounded-full object-cover" data-alt="Close up of a man with glasses smiling" src={item.avatar} />
                                                        <div>
                                                            <div className="font-medium text-neutral-900 dark:text-white">{item.fullName}</div>
                                                            <div className="text-xs text-neutral-500">ID: {item.empId}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">{item?.departmentId?.originName || "System"}</td>
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                        {item?.positionId?.fullName || "IT"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right text-neutral-600 dark:text-neutral-400 text-xs">
                                                    <Badge>{item?.roleId?.name || "User"}</Badge>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <Switch />
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <Button variant={"ghost"} onClick={() => setAdjustEmp(item)}>
                                                        <Edit />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-surface-light dark:bg-surface-dark border-t border-neutral-200 dark:border-neutral-700 px-6 py-4">
                                <PaginationUI pagination={data?.meta} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {adjustEmp && <div className="absolute inset-0 bg-black/10" onClick={() => setAdjustEmp(null)}></div>}
            <div
                className={`absolute inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-surface-dark shadow-2xl transform transition-transform border-l border-neutral-200 dark:border-neutral-700 z-10 flex flex-col ${adjustEmp ? "translate-x-0" : "translate-x-[200%]"}`}
            >
                <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Adjust Balance</h2>
                        <p className="text-xs text-neutral-500 mt-0.5">Edit leave details for selected employee.</p>
                    </div>
                    <Button variant={"ghost"} onClick={() => setAdjustEmp(null)}>
                        <X />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary/10 rounded-lg border border-primary-100 dark:border-primary/20">
                        <img className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-neutral-700" data-alt="Close up of a man with glasses smiling" src={adjustEmp?.avatar} />
                        <div>
                            <div className="font-semibold text-neutral-900 dark:text-white">{adjustEmp?.fullName}</div>
                            <div className="text-xs text-neutral-500">{adjustEmp?.positionId.fullName}</div>
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
                        <Button variant={"outline"} className="flex-1" onClick={() => setAdjustEmp(null)}>
                            Cancel
                        </Button>
                        <Button className="flex-1" onClick={handleSaveChanges}>
                            <SaveIcon /> Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
