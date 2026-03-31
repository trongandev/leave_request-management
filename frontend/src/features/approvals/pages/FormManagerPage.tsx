import { Card, CardContent } from "@/components/ui/card"
import { CirclePlus, Download, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import LoadingUI from "@/components/etc/LoadingUI"
import { useQuery } from "@tanstack/react-query"
import formTemplateService from "@/services/formTemplateService"
import { Link } from "react-router-dom"

export default function FormManagerPage() {
    const { t } = useTranslation()

    const { data, isLoading } = useQuery({
        queryKey: ["form-template"],
        queryFn: () => formTemplateService.getAll({ page: 1 }),
    })
    const columns = ["user created", "code", "form name", "Created At", "status", "Actions"]
    return (
        <div className="space-y-6">
            <Card>
                <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Form Manager</h1>
                            <p className="text-sm text-neutral-500 mt-1">Quản lí biểu mẫu</p>
                        </div>
                        <div className="flex gap-3">
                            <Button className="h-10" variant={"outline"}>
                                <Download /> {t("admin.employees.exportReport")}
                            </Button>
                            <Link to="/approvals/create-form-builder">
                                <Button className="h-10">
                                    <CirclePlus /> Tạo mới biểu mẫu
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {isLoading && <LoadingUI />}
            {!isLoading && (
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border bg-white border-neutral-200 dark:border-neutral-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
                                    {columns.map((column) => (
                                        <th key={column} className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">
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
                                                <img className="h-9 w-9 rounded-full object-cover" data-alt="Close up of a man with glasses smiling" src={item.userId.avatar} />
                                                <div>
                                                    <div className="font-medium text-neutral-900 dark:text-white">{item.userId.fullName}</div>
                                                    <div className="text-xs text-neutral-500">ID: {item.userId.empId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">{item?.code}</td>
                                        <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">{item?.name}</td>
                                        <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">{new Date(item?.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                {item?.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                        <td className="py-4 px-6 text-right">
                                            <Link to={`/approvals/form-manager/${item._id}`}>
                                                <Button variant={"ghost"}>
                                                    <Eye />
                                                </Button>
                                            </Link>
                                            <Link to={`/approvals/form-manager/${item._id}/edit`}>
                                                <Button variant={"ghost"}>
                                                    <Edit />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {data?.data.length === 0 && (
                                    <tr>
                                        <td colSpan={columns.length} className="py-32 text-center text-neutral-400 italic">
                                            Chưa có dữ liệu...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark border-t border-neutral-200 dark:border-neutral-700 px-6 py-4 flex items-center justify-between">
                        <div className="text-sm text-neutral-500">
                            {t("admin.employees.pagination.showing")} <span className="font-medium text-neutral-900 dark:text-white">1</span> {t("admin.employees.pagination.to")}{" "}
                            <span className="font-medium text-neutral-900 dark:text-white">{data?.meta.limit}</span> {t("admin.employees.pagination.of")}{" "}
                            <span className="font-medium text-neutral-900 dark:text-white">{data?.meta.total}</span> {t("admin.employees.pagination.employees")}
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-500 disabled:opacity-50 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                {t("admin.employees.pagination.previous")}
                            </button>
                            <button className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                {t("admin.employees.pagination.next")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
