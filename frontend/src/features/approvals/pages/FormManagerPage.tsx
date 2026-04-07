import { Card, CardContent } from "@/components/ui/card"
import { CirclePlus, Download, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import formTemplateService from "@/services/formTemplateService"
import { Link } from "react-router-dom"
import CTable from "@/components/etc/CTable"
import { useState } from "react"

export default function FormManagerPage() {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const { data, isLoading } = useQuery({
        queryKey: ["form-template"],
        queryFn: () => formTemplateService.getAll({ page }),
    })

    const handlePageChange = (page: number) => {
        setPage(page)
    }

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

            <CTable columns={columns} isLoading={isLoading} data={data} handlePageChange={handlePageChange}>
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
                        <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">{item?.vieName}</td>
                        <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">{new Date(item?.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 px-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {item?.isActive ? "Active" : "Inactive"}
                            </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                            <Link to={`/approvals/form-manager/${item._id}?is_view=true`}>
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
            </CTable>
        </div>
    )
}
