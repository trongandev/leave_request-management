import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { Calendar, CircleCheck, ClipboardClock, ContactRound, Edit, Eye, Thermometer, Umbrella, Venus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import requestService from "@/services/requestService"
import CTable from "@/components/etc/CTable"
import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { format } from "date-fns"
import { Link } from "react-router-dom"

export default function MyRequestHistoryListPage() {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const { lb } = useAuthStore()
    const { data, isLoading } = useQuery({
        queryKey: ["my-request-history"],
        queryFn: () => requestService.getRequestProfile({ page }),
    })
    console.log(data)
    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }
    const dataDashboard = [
        { label: t("requests.history.stats.pending"), value: data?.data.filter((r: any) => r.status === "pending").length, icon: <ClipboardClock />, bgColor: "bg-yellow-50 text-yellow-600" },
        { label: t("requests.history.stats.approvedYTD"), value: data?.data.filter((r: any) => r.status === "approved").length, icon: <CircleCheck />, bgColor: "bg-green-50 text-green-600" },
        { label: t("requests.history.stats.leaveBalance"), value: lb?.remainingDays, icon: <Calendar />, bgColor: "bg-blue-50 text-blue-600" },
    ]

    const handleRenderType = (type: string) => {
        switch (type) {
            case "Annual Leave":
                return (
                    <div className="h-8 w-8 rounded-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">
                        <Umbrella size={16} />
                    </div>
                )
            case "Sick Leave":
                return (
                    <div className="h-8 w-8 rounded-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mr-2">
                        <Thermometer size={16} />
                    </div>
                )
            case "Maternity Leave":
                return (
                    <div className="h-8 w-8 rounded-sm bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center mr-2">
                        <Venus size={16} />
                    </div>
                )
            case "Paternity Leave":
                return (
                    <div className="h-8 w-8 rounded-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">
                        <ContactRound size={16} />
                    </div>
                )
        }
    }

    const handleRenderStatus = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-50 text-yellow-600 border border-yellow-200"
            case "approved":
                return "bg-green-50 text-green-600 border border-green-200"
            case "rejected":
                return "bg-red-50 text-red-600 border border-red-200"
        }
    }

    const columns = ["Request ID", "Name Request", "Type request", "Step order", "Status", "create at", "Action"]

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {dataDashboard.map((item) => (
                    <Card key={item.label}>
                        <CardContent className=" flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bgColor}`}>{item.icon}</div>
                            <div>
                                <p className="text-xs font-medium text-neutral-500 uppercase">{item.label}</p>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{item.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <CTable columns={columns} data={data} isLoading={isLoading} handlePageChange={handleChangePage}>
                {data &&
                    data?.data?.map((request, index) => (
                        <tr
                            key={request._id}
                            className={`${index % 2 === 1 ? "bg-neutral-50/50 dark:bg-neutral-800/20" : ""} hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <a className="text-sm font-medium text-primary hover:text-primary-hover hover:underline" href="#">
                                    {request._id}
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400 hidden sm:table-cell uppercase">{request.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {handleRenderType(request.code)}
                                    <span className="text-sm text-neutral-900 dark:text-neutral-100">{request.code}</span>
                                </div>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400 hidden sm:table-cell">{request.submitted}</td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400 hidden lg:table-cell">{request.currentStepOrder}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase ${handleRenderStatus(request.status)}`}>{request.status}</span>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100 hidden md:table-cell">
                                {format(new Date(request.createdAt), "HH:mm MMM dd, yyyy")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link to={`/employee/view-detail-request/${request._id}`}>
                                    <Button variant={"ghost"}>
                                        <Eye />
                                    </Button>
                                </Link>
                                <Link to={`/employee/view-detail-request/${request._id}/edit`}>
                                    <Button variant={"ghost"}>
                                        <Edit />
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
            </CTable>
        </div>
    )
}
