import LoadingUI from "@/components/etc/LoadingUI"
import PaginationUI from "@/components/etc/PaginationUI"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import departmentService from "@/services/departmentService"
import positionService from "@/services/positionService"
import type { Department, DepartmentResponse, Position, PositionPayload, PositionResponse } from "@/types/organization"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowUpDown, BadgeCheck, Crown, GitBranchPlus, Pencil, Plus, Search, ShieldCheck, Trash2, UserCog, Users, Wrench } from "lucide-react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import type { LucideIcon } from "lucide-react"
import { toast } from "sonner"
import type { IMetaTag } from "@/types/user"

function getDepartmentName(position: Position, departmentMap: Record<string, Department>) {
    if (typeof position.departmentId === "object") {
        return position.departmentId.originName
    }

    return departmentMap[position.departmentId]?.originName || "-"
}

function getDepartmentCode(position: Position, departmentMap: Record<string, Department>) {
    if (typeof position.departmentId === "object") {
        return position.departmentId.code
    }

    return departmentMap[position.departmentId]?.code || "-"
}

type SortDirection = "default" | "desc" | "asc"

function getPositionVisual(name: string): { icon: LucideIcon; iconClassName: string; shortNameClassName: string } {
    const normalizedName = name.toUpperCase()

    if (normalizedName.includes("MANAGER") || normalizedName === "PM") {
        return {
            icon: Crown,
            iconClassName: "bg-amber-50 text-amber-600 dark:border dark:border-amber-400/35 dark:bg-amber-500/22 dark:text-amber-100 dark:shadow-[0_0_0_1px_rgba(251,191,36,0.12)]",
            shortNameClassName: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/40 dark:bg-amber-500/18 dark:text-amber-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        }
    }

    if (normalizedName.includes("ENGINEER") || normalizedName.includes("DEV") || normalizedName === "SWE") {
        return {
            icon: Wrench,
            iconClassName: "bg-blue-50 text-blue-600 dark:border dark:border-blue-400/35 dark:bg-blue-500/20 dark:text-blue-100 dark:shadow-[0_0_0_1px_rgba(96,165,250,0.12)]",
            shortNameClassName: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/40 dark:bg-blue-500/18 dark:text-blue-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        }
    }

    if (normalizedName.includes("HR")) {
        return {
            icon: Users,
            iconClassName: "bg-rose-50 text-rose-600 dark:border dark:border-rose-400/35 dark:bg-rose-500/20 dark:text-rose-100 dark:shadow-[0_0_0_1px_rgba(251,113,133,0.12)]",
            shortNameClassName: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/40 dark:bg-rose-500/18 dark:text-rose-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        }
    }

    if (normalizedName.includes("QA") || normalizedName.includes("QUALITY")) {
        return {
            icon: BadgeCheck,
            iconClassName: "bg-teal-50 text-teal-600 dark:border dark:border-teal-400/35 dark:bg-teal-500/20 dark:text-teal-100 dark:shadow-[0_0_0_1px_rgba(45,212,191,0.12)]",
            shortNameClassName: "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-400/40 dark:bg-teal-500/18 dark:text-teal-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        }
    }

    if (normalizedName.includes("ADMIN") || normalizedName.includes("SYSTEM")) {
        return {
            icon: ShieldCheck,
            iconClassName: "bg-slate-100 text-slate-700 dark:border dark:border-slate-300/30 dark:bg-slate-500/18 dark:text-slate-100 dark:shadow-[0_0_0_1px_rgba(148,163,184,0.12)]",
            shortNameClassName: "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-300/35 dark:bg-slate-500/16 dark:text-slate-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        }
    }

    if (normalizedName.includes("LEAD") || normalizedName.includes("HEAD")) {
        return {
            icon: GitBranchPlus,
            iconClassName: "bg-fuchsia-50 text-fuchsia-600 dark:border dark:border-fuchsia-400/35 dark:bg-fuchsia-500/20 dark:text-fuchsia-100 dark:shadow-[0_0_0_1px_rgba(232,121,249,0.12)]",
            shortNameClassName: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-400/40 dark:bg-fuchsia-500/18 dark:text-fuchsia-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        }
    }

    return {
        icon: UserCog,
        iconClassName: "bg-sky-50 text-sky-600 dark:border dark:border-sky-400/35 dark:bg-sky-500/20 dark:text-sky-100 dark:shadow-[0_0_0_1px_rgba(56,189,248,0.12)]",
        shortNameClassName: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/40 dark:bg-sky-500/18 dark:text-sky-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
    }
}

function getLevelBadgeClass(level: number) {
    if (level >= 7) return "border-red-200 bg-red-50 text-red-700 dark:border-red-400/40 dark:bg-red-500/18 dark:text-red-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    if (level >= 5) return "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-400/40 dark:bg-orange-500/18 dark:text-orange-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    if (level >= 3) return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/18 dark:text-emerald-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/40 dark:bg-violet-500/18 dark:text-violet-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
}

export default function PositionManagementPage() {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)
    const pageSize = 10
    const [searchTerm, setSearchTerm] = useState("")
    const [sortDirection, setSortDirection] = useState<SortDirection>("default")
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
        queryKey: ["positions"],
        queryFn: () => positionService.getAll({ page: 1, limit: 1000 }),
    })

    const { data: departmentsData } = useQuery<DepartmentResponse>({
        queryKey: ["departments", "lookup"],
        queryFn: () => departmentService.getAll({ page: 1, limit: 100 }),
    })

    const departmentMap = useMemo(() => {
        return (departmentsData?.data ?? []).reduce<Record<string, Department>>((accumulator, department) => {
            accumulator[department._id] = department
            return accumulator
        }, {})
    }, [departmentsData?.data])

    const filteredPositions = useMemo(() => {
        const keyword = searchTerm.trim().toLowerCase()
        const positionData = data?.data ?? []

        const searchedPositions = !keyword
            ? positionData
            : positionData.filter((position) => {
            const departmentName = getDepartmentName(position, departmentMap).toLowerCase()
            const departmentCode = getDepartmentCode(position, departmentMap).toLowerCase()

            return (
                position.fullName.toLowerCase().includes(keyword) ||
                position.name.toLowerCase().includes(keyword) ||
                position.description.toLowerCase().includes(keyword) ||
                departmentName.includes(keyword) ||
                departmentCode.includes(keyword) ||
                String(position.level).includes(keyword)
            )
        })

        if (sortDirection === "default") return searchedPositions

        return [...searchedPositions].sort((first, second) => {
            return sortDirection === "desc" ? second.level - first.level : first.level - second.level
        })
    }, [data?.data, departmentMap, searchTerm, sortDirection])

    const currentPage = useMemo(() => {
        const totalPages = Math.max(1, Math.ceil(filteredPositions.length / pageSize))
        return Math.min(page, totalPages)
    }, [filteredPositions.length, page, pageSize])

    const paginatedPositions = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize
        return filteredPositions.slice(startIndex, startIndex + pageSize)
    }, [currentPage, filteredPositions, pageSize])

    const paginationMeta = useMemo<IMetaTag>(() => {
        const total = filteredPositions.length
        const lastPage = Math.max(1, Math.ceil(total / pageSize))

        return {
            total,
            page: currentPage,
            limit: pageSize,
            last_page: lastPage,
            has_next: currentPage < lastPage,
            has_prev: currentPage > 1,
        }
    }, [currentPage, filteredPositions.length, pageSize])

    const handleLevelSort = () => {
        setPage(1)
        setSortDirection((current) => {
            if (current === "default") return "desc"
            if (current === "desc") return "asc"
            return "default"
        })
    }

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
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || t("admin.organization.positions.messages.saveError"))
        },
    })

    const { mutate: deletePosition, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => positionService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["positions"] })
            toast.success(t("admin.organization.positions.messages.deleted"))
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || t("admin.organization.positions.messages.deleteError"))
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
                            <Badge variant="outline" className="w-fit border-neutral-300 bg-white text-neutral-800 px-3 py-1 text-sm shadow-xs dark:border-cyan-400/35 dark:bg-cyan-400/15 dark:text-cyan-100">
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

            {isLoading && <LoadingUI />}

            {!isLoading && (
                <div className="bg-surface-light dark:bg-surface-dark overflow-hidden rounded-xl border shadow-xs dark:border-white/10">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-white/[0.04]">
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.positions.table.position")}</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.positions.table.shortName")}</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-600 dark:text-neutral-200">
                                        <Button variant="ghost" className="mx-auto h-auto p-0 font-semibold text-neutral-600 hover:bg-transparent hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-transparent dark:hover:text-white" onClick={handleLevelSort}>
                                            {t("admin.organization.positions.table.level")}
                                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection !== "default" ? "text-primary dark:text-cyan-300" : "dark:text-neutral-400"}`} />
                                        </Button>
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.positions.table.department")}</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.positions.table.description")}</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-600 dark:text-neutral-200">{t("admin.organization.common.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 text-sm dark:divide-white/8">
                                {paginatedPositions.map((position) => {
                                    const visual = getPositionVisual(position.name)
                                    const PositionIcon = visual.icon

                                    return (
                                        <tr key={position._id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-white/[0.03]">
                                            <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${visual.iconClassName}`}>
                                                    <PositionIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-neutral-900 dark:text-white">{position.fullName}</div>
                                                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{position._id}</div>
                                                </div>
                                            </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant="outline" className={visual.shortNameClassName}>
                                                    {position.name}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant="outline" className={getLevelBadgeClass(position.level)}>
                                                    {t("admin.organization.positions.levelValue", { level: position.level })}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">
                                            <div>{getDepartmentName(position, departmentMap)}</div>
                                            <div className="text-xs text-neutral-400 dark:text-neutral-400">{getDepartmentCode(position, departmentMap)}</div>
                                            </td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">{position.description || t("admin.organization.common.empty")}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="outline" size="icon-sm" className="dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.08]" onClick={() => openEditForm(position)}>
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
                                {paginatedPositions.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-sm text-neutral-500">
                                            {t("admin.organization.positions.empty")}
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
                                    {(departmentsData?.data ?? []).map((department) => (
                                        <SelectItem key={department._id} value={department._id}>
                                            {department.originName} ({department.code})
                                        </SelectItem>
                                    ))}
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
