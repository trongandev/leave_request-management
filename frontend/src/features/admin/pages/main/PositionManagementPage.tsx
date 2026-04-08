import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import positionService from "@/services/positionService"
import type { Position, PositionPayload, PositionResponse } from "@/types/organization"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import CTable from "@/components/etc/CTable"

function getLevelBadgeClass(level: number) {
    if (level >= 7) return "border-red-200 bg-red-50 text-red-700 dark:border-red-400/40 dark:bg-red-500/18 dark:text-red-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    if (level >= 5) return "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-400/40 dark:bg-orange-500/18 dark:text-orange-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    if (level >= 3)
        return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/18 dark:text-emerald-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/40 dark:bg-violet-500/18 dark:text-violet-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
}

export default function PositionManagementPage() {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)

    const [searchTerm, setSearchTerm] = useState("")

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [positionToDelete, setPositionToDelete] = useState<Position | null>(null)
    const [editingPosition, setEditingPosition] = useState<Position | null>(null)
    const [levelInput, setLevelInput] = useState("1")
    const [formData, setFormData] = useState<PositionPayload>({
        name: "",
        fullName: "",
        level: 1,
        description: "",
        departmentId: "",
    })

    const { data, isLoading } = useQuery<PositionResponse>({
        queryKey: ["positions", page],
        queryFn: () => positionService.getAll({ page: page }),
    })

    const resetForm = () => {
        setEditingPosition(null)
        setLevelInput("1")
        setFormData({
            name: "",
            fullName: "",
            level: 1,
            description: "",
            departmentId: "",
        })
    }

    const openCreateForm = () => {
        resetForm()
        setIsFormOpen(true)
    }

    const openEditForm = (position: Position) => {
        setEditingPosition(position)
        setLevelInput(String(position.level))
        setFormData({
            name: position.name,
            fullName: position.fullName,
            level: position.level,
            description: position.description || "",
            departmentId: typeof position.departmentId === "object" ? position.departmentId._id : position.departmentId,
        })
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setIsFormOpen(false)
        resetForm()
    }

    const { mutate: savePosition, isPending: isSaving } = useMutation({
        mutationFn: (payload: PositionPayload) => {
            if (editingPosition) {
                return positionService.update(editingPosition._id, payload)
            }

            return positionService.create(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["positions"] })
            queryClient.invalidateQueries({ queryKey: ["departments"] })
            toast.success(t(editingPosition ? "admin.organization.positions.messages.updated" : "admin.organization.positions.messages.created"))
            closeForm()
        },
    })

    const { mutate: deletePosition, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => positionService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["positions"] })
            toast.success(t("admin.organization.positions.messages.deleted"))
        },
    })

    const handleSubmit = () => {
        if (!formData.name.trim() || !formData.fullName.trim() || !formData.departmentId) {
            toast.error(t("admin.organization.positions.messages.required"))
            return
        }

        const parsedLevel = Number(levelInput)
        if (!levelInput.trim() || Number.isNaN(parsedLevel) || parsedLevel <= 0) {
            toast.error(t("admin.organization.positions.messages.invalidLevel"))
            return
        }

        savePosition({
            name: formData.name.trim().toUpperCase(),
            fullName: formData.fullName.trim(),
            level: parsedLevel,
            description: formData.description?.trim() || "",
            departmentId: formData.departmentId,
        })
    }

    const handleDelete = () => {
        if (!positionToDelete) return
        deletePosition(positionToDelete._id)
        setPositionToDelete(null)
    }
    const handlePageChange = (page: number) => {
        setPage(page)
    }
    const columns = useMemo(() => ["Position", "Short Name", "Level", "Department", "Description", "Actions"], [])
    return (
        <div className="space-y-6">
            <Card className="dark:border-white/10 dark:bg-surface-dark/70">
                <CardContent>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">{t("admin.organization.positions.title")}</h1>
                            <p className="mt-1 text-sm text-neutral-500">{t("admin.organization.positions.subtitle")}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge
                                variant="outline"
                                className="w-fit border-neutral-300 bg-white text-neutral-800 px-3 py-1 text-sm shadow-xs dark:border-cyan-400/35 dark:bg-cyan-400/15 dark:text-cyan-100"
                            >
                                {t("admin.organization.positions.summary", { count: data?.meta.total ?? 0 })}
                            </Badge>
                            <Button onClick={openCreateForm}>
                                <Plus />
                                {t("admin.organization.positions.actions.add")}
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
                            placeholder={t("admin.organization.positions.searchPlaceholder")}
                        />
                    </div>
                </CardContent>
            </Card>

            <CTable columns={columns} data={data} isLoading={isLoading} handlePageChange={handlePageChange}>
                {data &&
                    data?.data.map((position) => {
                        return (
                            <tr key={position._id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-white/[0.03]">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-medium text-neutral-900 dark:text-white">{position.fullName}</div>
                                        <div className="text-xs text-neutral-500 dark:text-neutral-400">{position._id}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Badge variant="outline">{position.name}</Badge>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Badge variant="outline" className={getLevelBadgeClass(position.level)}>
                                        {t("admin.organization.positions.levelValue", { level: position.level })}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">{position.departmentId.originName}</td>
                                <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">{position.description || t("admin.organization.common.empty")}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            className="dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.08]"
                                            onClick={() => openEditForm(position)}
                                        >
                                            <Pencil />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon-sm"
                                            className="dark:bg-red-500/80 dark:text-white dark:hover:bg-red-500"
                                            disabled={isDeleting}
                                            onClick={() => setPositionToDelete(position)}
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
                        <DialogTitle>{t(editingPosition ? "admin.organization.positions.form.editTitle" : "admin.organization.positions.form.createTitle")}</DialogTitle>
                        <DialogDescription>{t("admin.organization.positions.form.description")}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="fullName">{t("admin.organization.positions.form.fullName")}</Label>
                            <Input id="fullName" value={formData.fullName} onChange={(event) => setFormData((current) => ({ ...current, fullName: event.target.value }))} />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">{t("admin.organization.positions.form.name")}</Label>
                                <Input id="name" value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value.toUpperCase() }))} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="level">{t("admin.organization.positions.form.level")}</Label>
                                <Input
                                    id="level"
                                    type="number"
                                    min={1}
                                    max={8}
                                    value={levelInput}
                                    onFocus={() => setLevelInput("")}
                                    onBlur={() => {
                                        if (!levelInput.trim()) {
                                            const fallbackLevel = String(formData.level || 1)
                                            setLevelInput(fallbackLevel)
                                        }
                                    }}
                                    onChange={(event) => {
                                        const nextValue = event.target.value
                                        setLevelInput(nextValue)
                                        setFormData((current) => ({
                                            ...current,
                                            level: nextValue ? Number(nextValue) : current.level,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>{t("admin.organization.positions.form.department")}</Label>
                            <Select value={formData.departmentId} onValueChange={(value) => setFormData((current) => ({ ...current, departmentId: value }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t("admin.organization.positions.form.departmentPlaceholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* {(departmentsData?.data ?? []).map((department) => (
                                        <SelectItem key={department._id} value={department._id}>
                                            {department.originName} ({department.code})
                                        </SelectItem>
                                    ))} */}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">{t("admin.organization.positions.form.descriptionLabel")}</Label>
                            <Textarea id="description" value={formData.description} onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeForm}>
                            {t("admin.organization.common.cancel")}
                        </Button>
                        <Button onClick={handleSubmit} isLoading={isSaving}>
                            {t(editingPosition ? "admin.organization.common.saveChanges" : "admin.organization.positions.actions.add")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={!!positionToDelete} onOpenChange={(open) => !open && setPositionToDelete(null)}>
                <DialogContent className="sm:max-w-md dark:border-white/10 dark:bg-[#10151d]">
                    <DialogHeader>
                        <DialogTitle>{t("admin.organization.positions.deleteDialog.title")}</DialogTitle>
                        <DialogDescription>{t("admin.organization.positions.deleteDialog.description", { name: positionToDelete?.fullName || "" })}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPositionToDelete(null)}>
                            {t("admin.organization.common.cancel")}
                        </Button>
                        <Button variant="destructive" isLoading={isDeleting} onClick={handleDelete}>
                            {t("admin.organization.positions.deleteDialog.confirm")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
