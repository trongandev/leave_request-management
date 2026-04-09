import CAvatarProfile from "@/components/etc/CAvatarProfile"
import CRenderStatus from "@/components/etc/CRenderStatus"
import CTable from "@/components/etc/CTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import approvalService from "@/services/approvalService"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Eye, Search } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function TeamRequests() {
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1)

    const { data, isLoading } = useQuery({
        queryKey: ["approval-steps/pending", page, searchTerm],
        queryFn: () => approvalService.getPending(),
    })
    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const columns = ["EMPLOYEE", "REQUEST TYPE", "DATE RANGE", "REQUESTED ON", "STATUS", "ACTIONS"]
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
                {data?.data.map((item, index) => {
                    const requestId = item.requestId
                    const creatorId = requestId?.creatorId
                    return (
                        <tr key={index} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/20 transition-colors border-b border-neutral-100 dark:border-neutral-800/50 last:border-0">
                            <td className="py-4 px-6">
                                <Link to={`/profile/${creatorId._id}`} className="flex items-center gap-3">
                                    <CAvatarProfile user={creatorId} className="w-9 h-9" />
                                    <div>
                                        <div className="font-medium text-neutral-900 dark:text-white">{creatorId?.fullName}</div>
                                        <div className="text-xs text-neutral-500">{creatorId?.positionId.fullName}</div>
                                    </div>
                                </Link>
                            </td>
                            <td className="py-4 px-6 text-center">{requestId?.code}</td>
                            <td className="py-4 px-6 text-center">
                                {format(new Date(requestId?.values.startDate), "MMM d")} - {format(new Date(requestId?.values.endDate), "MMM d")}
                            </td>
                            <td className="py-4 px-6 text-center text-neutral-600 dark:text-neutral-400  font-medium">{format(new Date(item.createdAt), "MMM d, yyyy, h:mm a")}</td>
                            <td className="py-4 px-6 text-center">{CRenderStatus(item)}</td>
                            <td className="py-4 px-6 text-center">
                                <Link to={`/approvals/team-requests/${item._id}`}>
                                    <Button variant={"outline-primary"} size={"xs"}>
                                        <Eye /> Preview
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    )
                })}
            </CTable>
        </div>
    )
}
