import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import departmentService from "@/services/departmentService"
import type { Department, DepartmentPayload, DepartmentResponse } from "@/types/organization"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import CTable from "@/components/etc/CTable"
import { getDepartmentVisual } from "../../components/getIconDept"

export default function DepartmentManagementPage() {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null)
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
    const [formData, setFormData] = useState<DepartmentPayload>({
        originName: "",
        name: "",
        code: "",
        description: "",
    })

    const { data, isLoading } = useQuery<DepartmentResponse>({
        queryKey: ["departments", page],
        queryFn: () => departmentService.getAll({ page: page }),
    })

    const resetForm = () => {
        setEditingDepartment(null)
        setFormData({
            originName: "",
            name: "",
            code: "",
            description: "",
        })
    }

    const openCreateForm = () => {
        resetForm()
        setIsFormOpen(true)
    }

    const openEditForm = (department: Department) => {
        setEditingDepartment(department)
        setFormData({
            originName: department.originName,
            name: department.name || "",
            code: department.code,
            description: department.description || "",
        })
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setIsFormOpen(false)
        resetForm()
    }

    const { mutate: saveDepartment, isPending: isSaving } = useMutation({
        mutationFn: (payload: DepartmentPayload) => {
            if (editingDepartment) {
                return departmentService.update(editingDepartment._id, payload)
            }

            return departmentService.create(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] })
            toast.success(t(editingDepartment ? "admin.organization.departments.messages.updated" : "admin.organization.departments.messages.created"))
            closeForm()
        },
    })

    const { mutate: deleteDepartment, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => departmentService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] })
            toast.success(t("admin.organization.departments.messages.deleted"))
        },
    })

    const handleSubmit = () => {
        if (!formData.originName.trim() || !formData.name.trim() || !formData.code.trim()) {
            toast.error(t("admin.organization.departments.messages.required"))
            return
        }

        saveDepartment({
            originName: formData.originName.trim(),
            name: formData.name.trim(),
            code: formData.code.trim().toUpperCase(),
            description: formData.description?.trim() || "",
        })
    }

    const handleDelete = () => {
        if (!departmentToDelete) return
        deleteDepartment(departmentToDelete._id)
        setDepartmentToDelete(null)
    }

    const columns = useMemo(() => ["Department", "Code", "Name", "Actions"], [])
    const handlePageChange = (page: number) => {
        setPage(page)
    }

    return (
        <div className="space-y-6">
            <Card className="dark:border-white/10 dark:bg-surface-dark/70">
                <CardContent>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">{t("admin.organization.departments.title")}</h1>
                            <p className="mt-1 text-sm text-neutral-500">{t("admin.organization.departments.subtitle")}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge
                                variant="outline"
                                className="w-fit border-neutral-300 bg-white text-neutral-800 px-3 py-1 text-sm shadow-xs dark:border-cyan-400/35 dark:bg-cyan-400/15 dark:text-cyan-100"
                            >
                                {t("admin.organization.departments.summary", { count: data?.meta.total ?? 0 })}
                            </Badge>
                            <Button onClick={openCreateForm}>
                                <Plus />
                                {t("admin.organization.departments.actions.add")}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="dark:border-white/10 dark:bg-surface-dark/70">
                <CardContent>
                    <div className="relative h-12">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <Input
                            className="h-full pl-10"
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value)
                                setPage(1)
                            }}
                            placeholder={t("admin.organization.departments.searchPlaceholder")}
                        />
                    </div>
                </CardContent>
            </Card>

            <CTable data={data} columns={columns} isLoading={isLoading} handlePageChange={handlePageChange}>
                {data &&
                    data?.data?.map((department) => {
                        const visual = getDepartmentVisual(department.code)
                        const DepartmentIcon = visual.icon

                        return (
                            <tr key={department._id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-white/[0.03]">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${visual.iconClassName}`}>
                                            <DepartmentIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-neutral-900 dark:text-white">{department.originName}</div>
                                            <div className="text-xs text-neutral-500 dark:text-neutral-400">{department._id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Badge variant="outline" className={visual.badgeClassName}>
                                        {department.code}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Badge variant="outline" className={visual.nameClassName}>
                                        {department.name || t("admin.organization.common.empty")}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            className="dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.08]"
                                            onClick={() => openEditForm(department)}
                                        >
                                            <Pencil />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon-sm"
                                            className="dark:bg-red-500/80 dark:text-white dark:hover:bg-red-500"
                                            disabled={isDeleting}
                                            onClick={() => setDepartmentToDelete(department)}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
            </CTable>

            <Dialog open={isFormOpen} onOpenChange={(open) => (open ? setIsFormOpen(true) : closeForm())}>
                <DialogContent className="sm:max-w-xl dark:border-white/10 dark:bg-[#10151d]">
                    <DialogHeader>
                        <DialogTitle>{t(editingDepartment ? "admin.organization.departments.form.editTitle" : "admin.organization.departments.form.createTitle")}</DialogTitle>
                        <DialogDescription>{t("admin.organization.departments.form.description")}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="originName">{t("admin.organization.departments.form.originName")}</Label>
                            <Input id="originName" value={formData.originName} onChange={(event) => setFormData((current) => ({ ...current, originName: event.target.value }))} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t("admin.organization.departments.form.name")}</Label>
                            <Input id="name" value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="code">{t("admin.organization.departments.form.code")}</Label>
                            <Input id="code" value={formData.code} onChange={(event) => setFormData((current) => ({ ...current, code: event.target.value.toUpperCase() }))} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">{t("admin.organization.departments.form.descriptionLabel")}</Label>
                            <Textarea id="description" value={formData.description} onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeForm}>
                            {t("admin.organization.common.cancel")}
                        </Button>
                        <Button onClick={handleSubmit} isLoading={isSaving}>
                            {t(editingDepartment ? "admin.organization.common.saveChanges" : "admin.organization.departments.actions.add")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={!!departmentToDelete} onOpenChange={(open) => !open && setDepartmentToDelete(null)}>
                <DialogContent className="sm:max-w-md dark:border-white/10 dark:bg-[#10151d]">
                    <DialogHeader>
                        <DialogTitle>{t("admin.organization.departments.deleteDialog.title")}</DialogTitle>
                        <DialogDescription>{t("admin.organization.departments.deleteDialog.description", { name: departmentToDelete?.originName || "" })}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDepartmentToDelete(null)}>
                            {t("admin.organization.common.cancel")}
                        </Button>
                        <Button variant="destructive" isLoading={isDeleting} onClick={handleDelete}>
                            {t("admin.organization.departments.deleteDialog.confirm")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
