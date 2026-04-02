import LoadingUI from "@/components/etc/LoadingUI"
import PaginationUI from "@/components/etc/PaginationUI"
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
import { BadgeCheck, Building2, Cpu, FlaskConical, HardHat, Pencil, Plus, Search, ShieldCheck, Trash2, Truck, Users } from "lucide-react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import type { LucideIcon } from "lucide-react"
import { toast } from "sonner"
import type { IMetaTag } from "@/types/user"

function getDepartmentVisual(code: string): { icon: LucideIcon; iconClassName: string; badgeClassName: string; nameClassName: string } {
    const normalizedCode = code.toUpperCase()

    const config: Record<string, { icon: LucideIcon; iconClassName: string; badgeClassName: string; nameClassName: string }> = {
        TECH: {
            icon: Cpu,
            iconClassName: "bg-blue-50 text-blue-600 dark:border dark:border-blue-400/35 dark:bg-blue-500/20 dark:text-blue-100 dark:shadow-[0_0_0_1px_rgba(96,165,250,0.12)]",
            badgeClassName: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/40 dark:bg-blue-500/18 dark:text-blue-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-400/40 dark:bg-cyan-500/18 dark:text-cyan-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        PROD: {
            icon: HardHat,
            iconClassName: "bg-amber-50 text-amber-600 dark:border dark:border-amber-400/35 dark:bg-amber-500/22 dark:text-amber-100 dark:shadow-[0_0_0_1px_rgba(251,191,36,0.12)]",
            badgeClassName: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/40 dark:bg-amber-500/18 dark:text-amber-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-400/40 dark:bg-orange-500/18 dark:text-orange-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        RND: {
            icon: FlaskConical,
            iconClassName: "bg-fuchsia-50 text-fuchsia-600 dark:border dark:border-fuchsia-400/35 dark:bg-fuchsia-500/20 dark:text-fuchsia-100 dark:shadow-[0_0_0_1px_rgba(232,121,249,0.12)]",
            badgeClassName: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-400/40 dark:bg-fuchsia-500/18 dark:text-fuchsia-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/40 dark:bg-violet-500/18 dark:text-violet-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        HR: {
            icon: Users,
            iconClassName: "bg-rose-50 text-rose-600 dark:border dark:border-rose-400/35 dark:bg-rose-500/20 dark:text-rose-100 dark:shadow-[0_0_0_1px_rgba(251,113,133,0.12)]",
            badgeClassName: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/40 dark:bg-rose-500/18 dark:text-rose-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-400/40 dark:bg-pink-500/18 dark:text-pink-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        LOG: {
            icon: Truck,
            iconClassName: "bg-emerald-50 text-emerald-600 dark:border dark:border-emerald-400/35 dark:bg-emerald-500/20 dark:text-emerald-100 dark:shadow-[0_0_0_1px_rgba(52,211,153,0.12)]",
            badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/18 dark:text-emerald-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-lime-200 bg-lime-50 text-lime-700 dark:border-lime-400/40 dark:bg-lime-500/18 dark:text-lime-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        QA: {
            icon: BadgeCheck,
            iconClassName: "bg-teal-50 text-teal-600 dark:border dark:border-teal-400/35 dark:bg-teal-500/20 dark:text-teal-100 dark:shadow-[0_0_0_1px_rgba(45,212,191,0.12)]",
            badgeClassName: "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-400/40 dark:bg-teal-500/18 dark:text-teal-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/40 dark:bg-sky-500/18 dark:text-sky-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        SYS: {
            icon: ShieldCheck,
            iconClassName: "bg-slate-100 text-slate-700 dark:border dark:border-slate-300/30 dark:bg-slate-500/18 dark:text-slate-100 dark:shadow-[0_0_0_1px_rgba(148,163,184,0.12)]",
            badgeClassName: "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-300/35 dark:bg-slate-500/16 dark:text-slate-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-300/35 dark:bg-zinc-500/16 dark:text-zinc-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
    }

    return (
        config[normalizedCode] ?? {
            icon: Building2,
            iconClassName: "bg-neutral-100 text-neutral-700 dark:border dark:border-neutral-300/25 dark:bg-neutral-500/16 dark:text-neutral-100",
            badgeClassName: "border-neutral-200 bg-neutral-100 text-neutral-700 dark:border-neutral-300/30 dark:bg-neutral-500/14 dark:text-neutral-100",
            nameClassName: "border-stone-200 bg-stone-100 text-stone-700 dark:border-stone-300/30 dark:bg-stone-500/14 dark:text-stone-100",
        }
    )
}

export default function DepartmentManagementPage() {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)
    const pageSize = 10
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
        queryKey: ["departments"],
        queryFn: () => departmentService.getAll({ page: 1, limit: 1000 }),
    })

    const filteredDepartments = useMemo(() => {
        const keyword = searchTerm.trim().toLowerCase()
        if (!keyword) return data?.data ?? []

        return (data?.data ?? []).filter((department) => {
            return (
                department.originName.toLowerCase().includes(keyword) ||
                department.name?.toLowerCase().includes(keyword) ||
                department.code.toLowerCase().includes(keyword) ||
                department.description?.toLowerCase().includes(keyword)
            )
        })
    }, [data?.data, searchTerm])

    const currentPage = useMemo(() => {
        const totalPages = Math.max(1, Math.ceil(filteredDepartments.length / pageSize))
        return Math.min(page, totalPages)
    }, [filteredDepartments.length, page, pageSize])

    const paginatedDepartments = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize
        return filteredDepartments.slice(startIndex, startIndex + pageSize)
    }, [currentPage, filteredDepartments, pageSize])

    const paginationMeta = useMemo<IMetaTag>(() => {
        const total = filteredDepartments.length
        const lastPage = Math.max(1, Math.ceil(total / pageSize))

        return {
            total,
            page: currentPage,
            limit: pageSize,
            last_page: lastPage,
            has_next: currentPage < lastPage,
            has_prev: currentPage > 1,
        }
    }, [currentPage, filteredDepartments.length, pageSize])

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
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || t("admin.organization.departments.messages.saveError"))
        },
    })

    const { mutate: deleteDepartment, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => departmentService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] })
            toast.success(t("admin.organization.departments.messages.deleted"))
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || t("admin.organization.departments.messages.deleteError"))
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
                            <Badge variant="outline" className="w-fit border-neutral-300 bg-white text-neutral-800 px-3 py-1 text-sm shadow-xs dark:border-cyan-400/35 dark:bg-cyan-400/15 dark:text-cyan-100">
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

            {isLoading && <LoadingUI />}

            {!isLoading && (
                <div className="bg-surface-light dark:bg-surface-dark overflow-hidden rounded-xl border shadow-xs dark:border-white/10">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-white/[0.04]">
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.departments.table.department")}</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.departments.table.code")}</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.departments.table.localizedName")}</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.departments.table.description")}</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.common.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 text-sm dark:divide-white/8">
                                {paginatedDepartments.map((department) => {
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
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">{department.description || t("admin.organization.common.empty")}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="outline" size="icon-sm" className="dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.08]" onClick={() => openEditForm(department)}>
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
                                {paginatedDepartments.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-sm text-neutral-500">
                                            {t("admin.organization.departments.empty")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark border-t border-neutral-200 px-6 py-4 dark:border-white/10">
                        <PaginationUI pagination={paginationMeta} onPageChange={setPage} />
                    </div>
                </div>
            )}

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
