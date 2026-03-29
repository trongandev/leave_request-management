import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { ChevronDown, Search, UserCog, ArrowRight, X, Check, Users, Shield, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import type { User } from "@/types/user"
import userService from "@/services/userService"
import LoadingUI from "@/components/etc/LoadingUI"
import CAvatarProfile from "@/components/etc/CAvatarProfile"
import { useTranslation, Trans } from "react-i18next"
import { toast } from "sonner"

function UserCombobox({
    label,
    icon: Icon,
    iconColor,
    users,
    selectedUser,
    onSelect,
    placeholder,
    searchPlaceholder,
    id,
}: {
    label: string
    icon: React.ElementType
    iconColor: string
    users: User[]
    selectedUser: User | null
    onSelect: (user: User | null) => void
    placeholder: string
    searchPlaceholder: string
    id: string
}) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const { t } = useTranslation()
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100)
        } else {
            setSearch("")
        }
    }, [open])

    const filtered = useMemo(() => {
        if (!search.trim()) return users
        const keyword = search.toLowerCase()
        return users.filter(
            (u) =>
                u.fullName?.toLowerCase().includes(keyword) ||
                u.empId?.toLowerCase().includes(keyword) ||
                u.positionId?.fullName?.toLowerCase().includes(keyword) ||
                u.departmentId?.name?.toLowerCase().includes(keyword)
        )
    }, [users, search])

    return (
        <div className="flex flex-col gap-2.5">
            <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${iconColor}`}>
                    <Icon className="size-4" />
                </div>
                {label}
            </label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        id={id}
                        type="button"
                        className="group relative flex w-full items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50
                        px-4 py-3.5 text-left shadow-xs transition-all duration-200
                        hover:border-primary/40 hover:shadow-md hover:shadow-primary/5
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
                        data-[state=open]:border-primary/50 data-[state=open]:ring-2 data-[state=open]:ring-primary/20 data-[state=open]:shadow-md"
                    >
                        {selectedUser ? (
                            <>
                                <div className="relative">
                                    <CAvatarProfile user={selectedUser} className="size-10! ring-0!" />
                                    <div className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                        {selectedUser.fullName}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {selectedUser.positionId?.fullName || selectedUser.positionId?.name}
                                        {selectedUser.departmentId?.name && ` · ${selectedUser.departmentId.name}`}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onSelect(null)
                                    }}
                                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X className="size-3.5 text-slate-400" />
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="size-10 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                                    <Icon className="size-4 text-slate-400" />
                                </div>
                                <span className="flex-1 text-sm text-slate-400 dark:text-slate-500">
                                    {placeholder}
                                </span>
                            </>
                        )}
                        <ChevronDown className="size-4 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    sideOffset={6}
                    className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-xl"
                >
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800
                                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 placeholder:text-slate-400 transition-all"
                            />
                        </div>
                    </div>
                    <div className="max-h-72 overflow-y-auto p-1.5">
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 px-4">
                                <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                                    <Search className="size-5 text-slate-400" />
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    {search ? t("approvals.assignManager.form.noResults") : t("approvals.assignManager.form.noData")}
                                </p>
                            </div>
                        ) : (
                            filtered.map((user) => {
                                const isSelected = selectedUser?._id === user._id
                                return (
                                    <button
                                        key={user._id}
                                        type="button"
                                        onClick={() => {
                                            onSelect(user)
                                            setOpen(false)
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150
                                            ${isSelected
                                                ? "bg-primary/8 ring-1 ring-primary/20"
                                                : "hover:bg-slate-50 dark:hover:bg-slate-800/70"
                                            }`}
                                    >
                                        <div className="relative shrink-0">
                                            <CAvatarProfile user={user} className="size-9! text-xs! ring-0!" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium truncate ${isSelected ? "text-primary" : "text-slate-900 dark:text-white"}`}>
                                                {user.fullName}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                {user.positionId?.fullName || user.positionId?.name || "N/A"}
                                            </p>
                                        </div>
                                        {user.departmentId?.name && (
                                            <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                                                {user.departmentId.name}
                                            </span>
                                        )}
                                        {isSelected && (
                                            <div className="shrink-0 size-5 rounded-full bg-primary flex items-center justify-center">
                                                <Check className="size-3 text-white" />
                                            </div>
                                        )}
                                    </button>
                                )
                            })
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default function AssignManager() {
    const { t } = useTranslation()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null)
    const [selectedManager, setSelectedManager] = useState<User | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [showOverrideDialog, setShowOverrideDialog] = useState(false)
    const [showUnassignDialog, setShowUnassignDialog] = useState(false)
    const [tableSearch, setTableSearch] = useState("")
    const [tableFilter, setTableFilter] = useState<"all" | "has_manager" | "no_manager">("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [paginationMeta, setPaginationMeta] = useState({
        total: 0,
        page: 1,
        limit: 10,
        last_page: 1
    })

    const fetchUsers = useCallback(async (page = currentPage) => {
        try {
            const res = await userService.getAllUsers({ page })
            setUsers(res.data)
            if (res.meta) {
                setPaginationMeta(res.meta)
            }
        } catch {
            setUsers([])
        } finally {
            setLoading(false)
        }
    }, [currentPage])

    useEffect(() => {
        fetchUsers(currentPage)
    }, [currentPage, fetchUsers])

    const currentManager = useMemo(() => {
        if (!selectedEmployee?.managerId) return null
        const raw = selectedEmployee.managerId
        return typeof raw === "string"
            ? users.find((u) => u._id === raw) ?? null
            : raw as User
    }, [selectedEmployee, users])

    const canSubmit = selectedEmployee && selectedManager && selectedEmployee._id !== selectedManager._id && selectedManager._id !== currentManager?._id

    const doAssign = async () => {
        if (!canSubmit) return
        if (!selectedEmployee.empId || !selectedManager.empId) {
            toast.error(t("approvals.assignManager.messages.empIdNotFound"))
            return
        }
        setSubmitting(true)
        try {
            await userService.assignManager(selectedEmployee.empId, selectedManager.empId)
            toast.success(t("approvals.assignManager.messages.assignSuccess", {
                manager: selectedManager.fullName,
                employee: selectedEmployee.fullName
            }))
            setSelectedEmployee(null)
            setSelectedManager(null)
            setLoading(true)
            await fetchUsers()
        } catch (err: any) {
            const msg = err?.response?.data?.message || t("approvals.assignManager.messages.assignError")
            toast.error(msg)
        } finally {
            setSubmitting(false)
        }
    }

    const handleSubmit = () => {
        if (!canSubmit) return
        if (currentManager) {
            setShowOverrideDialog(true)
        } else {
            doAssign()
        }
    }

    const handleConfirmOverride = async () => {
        setShowOverrideDialog(false)
        await doAssign()
    }

    const doUnassign = async () => {
        if (!selectedEmployee?.empId) return
        setSubmitting(true)
        try {
            await userService.removeManager(selectedEmployee.empId)
            toast.success(t("approvals.assignManager.messages.unassignSuccess", {
                employee: selectedEmployee.fullName
            }))
            setSelectedEmployee(null)
            setSelectedManager(null)
            setLoading(true)
            await fetchUsers()
        } catch (err: any) {
            const msg = err?.response?.data?.message || t("approvals.assignManager.messages.unassignError")
            toast.error(msg)
        } finally {
            setSubmitting(false)
            setShowUnassignDialog(false)
        }
    }

    const handleUnassign = () => {
        if (!selectedEmployee?.managerId) return
        setShowUnassignDialog(true)
    }

    const filteredTableUsers = useMemo(() => {
        let result = users
        if (tableFilter === "has_manager") result = result.filter((u) => u.managerId)
        if (tableFilter === "no_manager") result = result.filter((u) => !u.managerId)
        if (tableSearch.trim()) {
            const kw = tableSearch.toLowerCase()
            result = result.filter(
                (u) =>
                    u.fullName?.toLowerCase().includes(kw) ||
                    u.empId?.toLowerCase().includes(kw) ||
                    u.positionId?.fullName?.toLowerCase().includes(kw) ||
                    u.departmentId?.name?.toLowerCase().includes(kw)
            )
        }
        return result
    }, [users, tableSearch, tableFilter])

    const stats = useMemo(() => ({
        total: users.length,
        hasManager: users.filter((u) => u.managerId).length,
        noManager: users.filter((u) => !u.managerId).length,
    }), [users])

    if (loading) return <LoadingUI />

    return (
        <>
            <main className="h-[calc(100vh-8rem)] flex flex-col gap-4">
                <header className="flex items-center gap-2.5 shrink-0">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                        <UserCog className="size-4 text-primary" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                            {t("sidebar.assignManager")}
                        </h1>
                        <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
                            {t("approvals.assignManager.subtitle")}
                        </p>
                    </div>
                </header>

                <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[9fr_15fr] gap-4">
                    <Card className="shadow-sm border-slate-200 dark:border-slate-700/80 overflow-hidden h-full flex flex-col">
                        <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50/80 to-transparent dark:from-slate-800/30 py-4">
                            <CardTitle className="text-base">{t("approvals.assignManager.form.title")}</CardTitle>
                            <CardDescription className="text-xs">
                                {t("approvals.assignManager.form.desc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-5 pb-2 flex-1 overflow-y-auto">
                            <div className="space-y-5">
                                <UserCombobox
                                    id="select-employee"
                                    label={t("approvals.assignManager.form.employeeLabel")}
                                    icon={Users}
                                    iconColor="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                    users={users}
                                    selectedUser={selectedEmployee}
                                    onSelect={(u) => {
                                        setSelectedEmployee(u)
                                        if (u && selectedManager?._id === u._id) setSelectedManager(null)
                                    }}
                                    placeholder={t("approvals.assignManager.form.employeePlaceholder")}
                                    searchPlaceholder={t("approvals.assignManager.form.searchPlaceholder")}
                                />

                                {selectedEmployee && currentManager && (
                                    <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/15">
                                        <AlertCircle className="size-4 text-amber-500 shrink-0 mt-0.5" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                                                {t("approvals.assignManager.form.currentManagerAlert")}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <CAvatarProfile user={currentManager} className="size-6! text-[10px]! ring-0!" />
                                                <div className="min-w-0">
                                                    <p className="text-xs font-medium text-amber-800 dark:text-amber-300 truncate">
                                                        {currentManager.fullName}
                                                    </p>
                                                    <p className="text-[10px] text-amber-600/80 dark:text-amber-500/80 truncate">
                                                        {(currentManager.positionId as any)?.fullName || (currentManager.positionId as any)?.name || "—"}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-1.5">
                                                {t("approvals.assignManager.form.overrideConfirm")}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 px-1">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
                                    <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                        <ArrowRight className="size-3.5 text-slate-400 rotate-90" />
                                    </div>
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
                                </div>

                                <UserCombobox
                                    id="select-manager"
                                    label={t("approvals.assignManager.form.managerLabel")}
                                    icon={Shield}
                                    iconColor="bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                    users={users.filter((u) => (u.roleId as any)?.name === "MANAGER" && u._id !== selectedEmployee?._id && u._id !== currentManager?._id)}
                                    selectedUser={selectedManager}
                                    onSelect={setSelectedManager}
                                    placeholder={t("approvals.assignManager.form.managerPlaceholder")}
                                    searchPlaceholder={t("approvals.assignManager.form.searchPlaceholder")}
                                />

                                <div className="min-h-[72px] flex flex-col justify-center">
                                    {selectedEmployee && selectedManager && selectedEmployee._id === selectedManager._id ? (
                                        <div className="flex items-center gap-2 px-3.5 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                                            <X className="size-4 text-red-500 shrink-0" />
                                            <p className="text-xs text-red-600 dark:text-red-400">
                                                {t("approvals.assignManager.form.sameUserError")}
                                            </p>
                                        </div>
                                    ) : selectedEmployee && selectedManager && selectedManager._id === currentManager?._id ? (
                                        <div className="flex items-center gap-2 px-3.5 py-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40">
                                            <AlertCircle className="size-4 text-amber-500 shrink-0" />
                                            <p className="text-xs text-amber-600 dark:text-amber-400">
                                                {t("approvals.assignManager.form.alreadyAssignedError")}
                                            </p>
                                        </div>
                                    ) : selectedEmployee && selectedManager ? (
                                        <div className="rounded-xl border border-primary/15 bg-primary/[0.03] dark:bg-primary/5 px-4 py-3">
                                            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-wider mb-2">
                                                {t("approvals.assignManager.form.submit")}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <CAvatarProfile user={selectedEmployee} className="size-7! text-xs! ring-0!" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{selectedEmployee.fullName}</p>
                                                        <p className="text-[10px] text-slate-500 truncate">{selectedEmployee.positionId?.fullName || "N/A"}</p>
                                                    </div>
                                                </div>
                                                <div className="shrink-0 px-2 py-1 rounded-full bg-primary/10 text-primary">
                                                    <ArrowRight className="size-3" />
                                                </div>
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <CAvatarProfile user={selectedManager} className="size-7! text-xs! ring-0!" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{selectedManager.fullName}</p>
                                                        <p className="text-[10px] text-slate-500 truncate">{selectedManager.positionId?.fullName || "N/A"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400 dark:text-slate-600 text-center">
                                            {t("approvals.assignManager.form.placeholder")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedEmployee(null)
                                    setSelectedManager(null)
                                }}
                                disabled={!selectedEmployee && !selectedManager}
                                className="rounded-lg mr-auto h-9 text-xs font-semibold"
                            >
                                {t("approvals.assignManager.form.cancel")}
                            </Button>
                            {selectedEmployee && currentManager && (
                                <Button
                                    variant="outline"
                                    onClick={handleUnassign}
                                    disabled={submitting}
                                    className="rounded-lg border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 h-9 text-xs font-semibold"
                                >
                                    {submitting ? (
                                        <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    ) : (
                                        <X className="size-4" />
                                    )}
                                    {t("approvals.assignManager.form.unassign")}
                                </Button>
                            )}
                            <Button
                                onClick={handleSubmit}
                                disabled={!canSubmit || submitting}
                                className="rounded-lg min-w-[140px] shadow-md shadow-primary/20 disabled:shadow-none h-9 text-xs font-semibold"
                            >
                                {submitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {t("approvals.assignManager.form.loading")}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        {t("approvals.assignManager.form.submit")}
                                    </span>
                                )}
                            </Button>
                        </div>
                    </Card>

                    <Card className="shadow-sm border-slate-200 dark:border-slate-700/80 h-full flex flex-col overflow-hidden">
                        <CardHeader className="border-b border-slate-100 dark:border-slate-800 py-4">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <CardTitle className="text-base">{t("approvals.assignManager.table.title")}</CardTitle>
                                    <CardDescription className="text-xs mt-0.5">
                                        {t("approvals.assignManager.table.subtitle")}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                                        {stats.total} {t("approvals.assignManager.table.stats.total")}
                                    </span>
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium">
                                        {stats.hasManager} {t("approvals.assignManager.table.stats.withManager")}
                                    </span>
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium">
                                        {stats.noManager} {t("approvals.assignManager.table.stats.noManager")}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <div className="relative flex-1 min-w-48">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={tableSearch}
                                        onChange={(e) => setTableSearch(e.target.value)}
                                        placeholder={t("approvals.assignManager.table.searchPlaceholder")}
                                        className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800
                                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 placeholder:text-slate-400 transition-all"
                                    />
                                </div>
                                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                                    {(["all", "has_manager", "no_manager"] as const).map((f) => {
                                        const labels = {
                                            all: t("approvals.assignManager.table.all"),
                                            has_manager: t("approvals.assignManager.table.hasManager"),
                                            no_manager: t("approvals.assignManager.table.noManager")
                                        }
                                        return (
                                            <button
                                                key={f}
                                                onClick={() => setTableFilter(f)}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${tableFilter === f
                                                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                                    }`}
                                            >
                                                {labels[f]}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </CardHeader>
                        <div className="flex-1 min-h-0 overflow-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-10">#</th>
                                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t("approvals.assignManager.table.colEmployee")}</th>
                                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t("approvals.assignManager.table.colPosition")}</th>
                                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t("approvals.assignManager.table.colManager")}</th>
                                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t("approvals.assignManager.table.colStatus")}</th>
                                        <th className="px-4 py-3 text-right text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t("approvals.assignManager.table.colAction")}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {filteredTableUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-16 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                        <Users className="size-5 text-slate-400" />
                                                    </div>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Không tìm thấy nhân viên</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTableUsers.map((user, idx) => {
                                            const hasManager = !!user.managerId
                                            const managerIdRaw = user.managerId
                                            const manager: User | null = managerIdRaw
                                                ? typeof managerIdRaw === "string"
                                                    ? users.find((u) => u._id === managerIdRaw) ?? null
                                                    : (managerIdRaw as User)
                                                : null
                                            const isSelectedRow = selectedEmployee?._id === user._id
                                            return (
                                                <tr
                                                    key={user._id}
                                                    className={`transition-colors duration-100 ${isSelectedRow
                                                        ? "bg-primary/[0.04] dark:bg-primary/10"
                                                        : "hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                                                        }`}
                                                >
                                                    <td className="px-4 py-3 text-xs text-slate-400 dark:text-slate-600 font-mono">
                                                        {idx + 1}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2.5">
                                                            <CAvatarProfile user={user} className="size-8! text-xs! ring-0! shrink-0" />
                                                            <div className="min-w-0">
                                                                <p className={`text-sm font-semibold truncate ${isSelectedRow ? "text-primary" : "text-slate-900 dark:text-white"}`}>
                                                                    {user.fullName}
                                                                </p>
                                                                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-mono">
                                                                    {user.empId || "—"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate max-w-40">
                                                            {user.positionId?.fullName || user.positionId?.name || "—"}
                                                        </p>
                                                        {user.departmentId?.name && (
                                                            <p className="text-[11px] text-slate-400 truncate max-w-40">{user.departmentId.name}</p>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {hasManager && manager ? (
                                                            <div className="flex items-center gap-2">
                                                                <CAvatarProfile user={manager} className="size-7! text-[10px]! ring-0! shrink-0" />
                                                                <div className="min-w-0">
                                                                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate max-w-32">
                                                                        {manager.fullName}
                                                                    </p>
                                                                    <p className="text-[10px] text-slate-400 truncate max-w-32">
                                                                        {(manager.positionId as any)?.fullName || "N/A"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-slate-400 dark:text-slate-600 italic">Chưa phân công</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {hasManager ? (
                                                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30">
                                                                <span className="size-1.5 rounded-full bg-green-500" />
                                                                {t("approvals.assignManager.table.hasManager")}
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30">
                                                                <span className="size-1.5 rounded-full bg-red-500" />
                                                                {t("approvals.assignManager.table.noManager")}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedEmployee(user)
                                                                if (selectedManager?._id === user._id) setSelectedManager(null)
                                                            }}
                                                            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${isSelectedRow
                                                                ? "bg-primary text-white shadow-sm"
                                                                : "text-primary border border-primary/25 hover:bg-primary/5 hover:border-primary/50"
                                                                }`}
                                                        >
                                                            {isSelectedRow ? t("approvals.assignManager.table.selected") : t("approvals.assignManager.table.select")}
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-wrap items-center justify-between gap-4">
                            <div className="text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1">
                                <Trans
                                    i18nKey="approvals.assignManager.table.pagination.showing"
                                    values={{
                                        count: filteredTableUsers.length,
                                        total: paginationMeta.total
                                    }}
                                    components={[
                                        <span />,
                                        <span className="font-bold text-slate-900 dark:text-white" />
                                    ]}
                                />
                                {tableSearch && (
                                    <button
                                        onClick={() => setTableSearch("")}
                                        className="ml-2 inline-flex items-center gap-1 text-primary hover:underline"
                                    >
                                        <X className="size-3" />
                                        {t("approvals.assignManager.table.pagination.clearFilter")}
                                    </button>
                                )}
                            </div>

                            <div className="order-1 sm:order-2 w-full sm:w-auto flex justify-center">
                                {paginationMeta.last_page > 1 && (
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                    disabled={currentPage === 1}
                                                    className="gap-1 pl-2.5 h-8"
                                                >
                                                    <ChevronLeft className="size-4" />
                                                    <span className="hidden sm:inline">{t("approvals.assignManager.table.pagination.prev")}</span>
                                                </Button>
                                            </PaginationItem>

                                            {Array.from({ length: paginationMeta.last_page }, (_, i) => i + 1).map((p) => {
                                                // Show limited pages if totalPages is large
                                                if (
                                                    p === 1 ||
                                                    p === paginationMeta.last_page ||
                                                    (p >= currentPage - 1 && p <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <PaginationItem key={p}>
                                                            <PaginationLink
                                                                onClick={() => setCurrentPage(p)}
                                                                isActive={currentPage === p}
                                                                className="h-8 w-8 cursor-pointer"
                                                            >
                                                                {p}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    )
                                                }
                                                if (p === currentPage - 2 || p === currentPage + 2) {
                                                    if (p > 1 && p < paginationMeta.last_page) {
                                                        return <PaginationItem key={p}><span className="px-2 text-slate-300">...</span></PaginationItem>
                                                    }
                                                }
                                                return null
                                            })}

                                            <PaginationItem>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setCurrentPage(prev => Math.min(paginationMeta.last_page, prev + 1))}
                                                    disabled={currentPage === paginationMeta.last_page}
                                                    className="gap-1 pr-2.5 h-8"
                                                >
                                                    <span className="hidden sm:inline">{t("approvals.assignManager.table.pagination.next")}</span>
                                                    <ChevronRight className="size-4" />
                                                </Button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </main>

            <Dialog open={showOverrideDialog} onOpenChange={setShowOverrideDialog}>
                <DialogContent className="sm:max-w-lg w-full" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base">
                            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                <AlertCircle className="size-4 text-amber-600 dark:text-amber-400" />
                            </div>
                            {t("approvals.assignManager.dialogs.override.title")}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
                            <Trans
                                i18nKey="approvals.assignManager.dialogs.override.desc"
                                values={{ name: selectedEmployee?.fullName }}
                                components={[
                                    <span />,
                                    <span className="font-bold text-slate-900 dark:text-white" />
                                ]}
                            />
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-stretch gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            {currentManager && <CAvatarProfile user={currentManager} className="size-9! text-xs! ring-0! shrink-0 mt-0.5" />}
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{t("approvals.assignManager.dialogs.override.current")}</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white break-words leading-tight">{currentManager?.fullName}</p>
                                <p className="text-[11px] text-slate-400 break-words mt-0.5">{(currentManager?.positionId as any)?.fullName || "—"}</p>
                            </div>
                        </div>
                        <div className="shrink-0 flex flex-col items-center justify-center gap-0.5 px-2">
                            <ArrowRight className="size-4 text-slate-400" />
                            <span className="text-[10px] text-amber-500 font-medium text-center">{t("approvals.assignManager.dialogs.override.replaceBy")}</span>
                        </div>
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                            {selectedManager && <CAvatarProfile user={selectedManager} className="size-9! text-xs! ring-0! shrink-0 mt-0.5" />}
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{t("approvals.assignManager.dialogs.override.new")}</p>
                                <p className="text-sm font-semibold text-primary break-words leading-tight">{selectedManager?.fullName}</p>
                                <p className="text-[11px] text-slate-400 break-words mt-0.5">{(selectedManager?.positionId as any)?.fullName || "—"}</p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowOverrideDialog(false)}
                            disabled={submitting}
                            className="rounded-lg"
                        >
                            {t("approvals.assignManager.form.cancel")}
                        </Button>
                        <Button
                            onClick={handleConfirmOverride}
                            disabled={submitting}
                            className="rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20"
                        >
                            {submitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    {t("approvals.assignManager.form.loading")}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Check className="size-4" />
                                    {t("approvals.assignManager.dialogs.override.confirm")}
                                </span>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showUnassignDialog} onOpenChange={setShowUnassignDialog}>
                <DialogContent className="sm:max-w-md w-full" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base text-red-600 dark:text-red-400">
                            <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30">
                                <X className="size-4" />
                            </div>
                            {t("approvals.assignManager.dialogs.unassign.title")}
                        </DialogTitle>
                        <DialogDescription className="text-sm">
                            <Trans
                                i18nKey="approvals.assignManager.dialogs.unassign.desc"
                                values={{ name: selectedEmployee?.fullName }}
                                components={[
                                    <span />,
                                    <span className="font-bold text-slate-900 dark:text-white" />
                                ]}
                            />
                        </DialogDescription>
                    </DialogHeader>

                    {currentManager && (
                        <div className="p-4 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 flex items-center gap-3">
                            <CAvatarProfile user={currentManager} className="size-10! text-xs! ring-0!" />
                            <div className="min-w-0">
                                <p className="text-xs text-red-600/80 dark:text-red-400/80 mb-0.5 font-medium">{t("approvals.assignManager.dialogs.unassign.managerToBeRemoved")}</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{currentManager.fullName}</p>
                                <p className="text-[11px] text-slate-500 truncate">{(currentManager.positionId as any)?.fullName || "—"}</p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowUnassignDialog(false)}
                            disabled={submitting}
                            className="rounded-lg"
                        >
                            {t("approvals.assignManager.form.cancel")}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={doUnassign}
                            disabled={submitting}
                            className="rounded-lg shadow-md shadow-red-500/20"
                        >
                            {submitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    {t("approvals.assignManager.form.loading")}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Check className="size-4" />
                                    {t("approvals.assignManager.dialogs.unassign.confirm")}
                                </span>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
