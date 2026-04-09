import CTable from "@/components/etc/CTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import etcService from "@/services/etcService"
import { type ErrorLogs } from "@/types/etc"
import { useQuery } from "@tanstack/react-query"
import { Download } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function ErrorRequestLogPage() {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const { data, isLoading } = useQuery({
        queryKey: ["error-logs", page],
        queryFn: () => etcService.getErrorLogs({ page }),
    })
    const [detailError, setDetailError] = useState<ErrorLogs | null>(null)
    const columns = ["ID", "Path", "Method", "Status Code", "Error Message", "Timestamp", "Actions"]

    const handleGetBadgeMethodColor = (method: string) => {
        switch (method) {
            case "GET":
                return "bg-green-100 text-green-800 border border-green-300 dark:bg-green-800/20 dark:text-green-400 dark:border-green-700"
            case "POST":
                return "bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-800/20 dark:text-blue-400 dark:border-blue-700"
            case "PUT":
            case "PATCH":
                return "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-800/20 dark:text-yellow-400 dark:border-yellow-700"
            case "DELETE":
                return "bg-red-100 text-red-800 border border-red-300 dark:bg-red-800/20 dark:text-red-400 dark:border-red-700"
            default:
                return "bg-gray-100 text-gray-800 border border-gray-300 dark:bg-gray-800/20 dark:text-gray-400 dark:border-gray-700"
        }
    }

    const handleGetBadgeStatusColor = (statusCode: number) => {
        if (statusCode >= 500) {
            return "bg-red-100 text-red-800 border border-red-300 dark:bg-red-800/20 dark:text-red-400 dark:border-red-700"
        } else if (statusCode >= 400) {
            return "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-800/20 dark:text-yellow-400 dark:border-yellow-700"
        } else if (statusCode >= 200) {
            return "bg-green-100 text-green-800 border border-green-300 dark:bg-green-800/20 dark:text-green-400 dark:border-green-700"
        } else {
            return "bg-gray-100 text-gray-800 border border-gray-300 dark:bg-gray-800/20 dark:text-gray-400 dark:border-gray-700"
        }
    }

    return (
        <div>
            <Card className="mb-5">
                <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Error Logs</h1>
                            <p className="text-sm text-neutral-500 mt-1">View and manage error logs</p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <Button className="h-10" variant={"outline"}>
                                <Download /> {t("admin.employeeManagement.actions.export")}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <CTable data={data} isLoading={isLoading} handlePageChange={setPage} columns={columns}>
                {data?.data.map((log, index) => (
                    <tr key={index} className="text-secondary-foreground">
                        <td className="py-3 px-5">{log._id}</td>
                        <td className="py-3 px-5">{log.path}</td>
                        <td className="py-3 px-5">
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${handleGetBadgeMethodColor(log.method)}`}>{log.method}</span>
                        </td>
                        <td className="py-3 px-5">
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${handleGetBadgeStatusColor(log.statusCode)}`}>{log.statusCode}</span>
                        </td>
                        <td className="py-3 px-5 line-clamp-3">{log.message}</td>
                        <td className="py-3 px-5">{log.createdAt}</td>
                        <td className="py-3 px-5">
                            <Button variant="outline" size="sm" onClick={() => setDetailError(log)}>
                                View Details
                            </Button>
                        </td>
                    </tr>
                ))}
            </CTable>
            <Dialog open={!!detailError} onOpenChange={() => setDetailError(null)}>
                <DialogHeader>Error Details</DialogHeader>
                <DialogContent className="overflow-auto w-full md:max-w-7xl">
                    {detailError && (
                        <div className="space-y-2">
                            <p>
                                <strong>Path:</strong> {detailError.path}
                            </p>
                            <p>
                                <strong>Method:</strong> {detailError.method}
                            </p>
                            <p>
                                <strong>Status Code:</strong> {detailError.statusCode}
                            </p>
                            <p>
                                <strong>Message:</strong> {detailError.message}
                            </p>
                            <p>
                                <strong>Stack Trace:</strong>
                            </p>
                            <pre className="bg-red-50 border border-red-300 p-4 rounded ">{detailError.stack}</pre>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
