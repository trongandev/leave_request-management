import CAvatarProfile from "@/components/etc/CAvatarProfile"
import CTable from "@/components/etc/CTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { deptMapColor, positionMapColor, roleMapColor } from "@/config/mapColor"
import userService from "@/services/userService"
import { useQuery } from "@tanstack/react-query"
import { Eye, Search } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function TeamManagement() {
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1)

    const { data, isLoading } = useQuery({
        queryKey: ["team-management", page, searchTerm],
        queryFn: () => userService.getTeamMembers(),
    })
    console.log(data)
    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const columns = [
        t("admin.employeeManagement.table.employee"),
        t("admin.employeeManagement.table.department"),
        t("admin.employeeManagement.table.position"),
        t("admin.employeeManagement.table.role"),
        t("admin.employeeManagement.table.status"),
        t("admin.employeeManagement.table.actions"),
    ]
    return (
        <div className="space-y-6">
            <Card>
                <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Team Request Management</h1>
                            <p className="text-sm text-neutral-500 mt-1">Manage and review leave requests from your team members</p>
                        </div>
                        {/* <div className="flex gap-3">
                                    <Button className="h-10" variant={"outline"} onClick={handleExportClick}>
                                        <Download /> {t("admin.employees.exportReport")}
                                    </Button>
                                    <Button className="h-10" onClick={() => navigate("/approvals/adjust-leave-balances")}>
                                        <CirclePlus /> {t("admin.employees.newAdjustment")}
                                    </Button>
                                </div> */}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative h-12">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 " size={20} />
                            <Input
                                className="w-full h-full pl-10"
                                placeholder={"Search by employee name, ID, or leave type..."}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap gap-3">
                            {/* <CSelectOptions
                                data={departmentsData}
                                valueKey="value"
                                displayKey="label"
                                placeholder={t("admin.employees.filters.department", "Department")}
                                value={selectedDept}
                                onChange={(val) => setSelectedDept(val)}
                            />
                            <CSelectOptions
                                data={leaveTypesData}
                                valueKey="value"
                                displayKey="label"
                                placeholder={t("admin.employees.filters.leaveType", "Leave Type")}
                                onChange={(val) => setSelectedLeaveType(val)}
                                value={selectedLeaveType}
                            /> */}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <CTable data={data} columns={columns} handlePageChange={handlePageChange} isLoading={isLoading}>
                {data?.map((item, index) => (
                    <tr key={index} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                        <td className="py-4 px-6">
                            <Link to={`/profile/${item._id}`} className="flex items-center justify-left gap-3">
                                <CAvatarProfile user={item} className="h-9 w-9 ring-0" />
                                <div className="text-left">
                                    <div className="font-medium text-neutral-900 dark:text-white">{item.fullName}</div>
                                    <div className="text-xs text-neutral-500">ID: {item.empId}</div>
                                </div>
                            </Link>
                        </td>
                        <td className="py-4 px-6 text-center">
                            <div className="flex justify-center">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${deptMapColor(item?.departmentId?.originName || "")} tracking-wide`}>
                                    {item?.departmentId?.originName || t("admin.employeeManagement.common.system")}
                                </span>
                            </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                            <div className="flex justify-center">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${positionMapColor(item?.positionId?.fullName || "")} tracking-wide`}>
                                    {item?.positionId?.fullName || t("admin.employeeManagement.common.empty")}
                                </span>
                            </div>
                        </td>
                        <td className="py-4 px-6 text-center text-neutral-600 dark:text-neutral-400 text-xs">
                            <div className="flex justify-center">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${roleMapColor(item?.roleId?.name || "")} tracking-wide`}>
                                    {item?.roleId?.name || t("admin.employeeManagement.common.user")}
                                </span>
                            </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                            <div className="flex justify-center">
                                <Switch checked={item.status} />
                            </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                            <Link to={`/profile/${item._id}`}>
                                <Button variant={"ghost"}>
                                    <Eye />
                                </Button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </CTable>
        </div>
    )
}
