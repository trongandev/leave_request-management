import CSelectOptions from "@/components/etc/CSelectOptions"
import { format } from "date-fns"
import CAvatarProfile from "@/components/etc/CAvatarProfile"
import { Button } from "@/components/ui/button"
import { CirclePlus, Download, Search, X, SaveIcon, Edit, Eye, EyeOff, UserPlus, CalendarIcon, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import userService, { type CreateUserPayload } from "@/services/userService"
import departmentService from "@/services/departmentService"
import positionService from "@/services/positionService"
import roleService from "@/services/roleService"
import type { User, UserResponse, RoleId } from "@/types/user"
import type { Department, Position } from "@/types/organization"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useMemo } from "react"
import CTable from "@/components/etc/CTable"
import { Switch } from "@/components/ui/switch"
import { CBadge } from "@/components/etc/CBadgeColor"
import { Link } from "react-router-dom"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { appConfig } from "@/config/appConfig"
import { formatString, getFirstName, getLastDigits, normalizeForPassword } from "@/utils/format"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

type UserFormState = {
    fullName: string
    email: string
    phone: string
    password: string
    birthDate: string
    gender: string
    avatar: string
    roleId: string
    departmentId: string
    positionId: string
}

const DEFAULT_FORM_STATE: UserFormState = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    birthDate: "",
    gender: "male",
    avatar: "",
    roleId: "",
    departmentId: "",
    positionId: "",
}

function formatBirthDateForApi(value: string) {
    if (!value) return ""
    try {
        const date = new Date(value)
        if (isNaN(date.getTime())) return value
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    } catch {
        return value
    }
}

export default function EmployeeManagementPage() {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const departmentsData = [
        { value: "all", label: t("admin.employeeManagement.filters.allDepartments") },
    ]

    const roleFilterData = [
        { value: "all", label: t("admin.employeeManagement.filters.allRoles") },
    ]

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState("all")
    const [selectedRole, setSelectedRole] = useState("all")
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isFakeOpen, setIsFakeOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const [fakeCount, setFakeCount] = useState("1")
    const [formData, setFormData] = useState<UserFormState>(DEFAULT_FORM_STATE)
    const [touched, setTouched] = useState<Partial<Record<keyof UserFormState, boolean>>>({})

    const errors = useMemo(() => {
        const newErrors: Partial<Record<keyof UserFormState, string>> = {}
        const trimmedName = formData.fullName.trim()
        const trimmedEmail = formData.email.trim()
        const trimmedPhone = formData.phone.trim()
        const trimmedPassword = formData.password.trim()

        if (!trimmedName) {
            newErrors.fullName = t("admin.employeeManagement.messages.required")
        } else if (trimmedName.length < 2) {
            newErrors.fullName = t("admin.employeeManagement.messages.invalidFullName")
        } else if (!/^[\p{L}\s]+$/u.test(trimmedName)) {
            newErrors.fullName = t("admin.employeeManagement.messages.invalidFullName")
        }

        if (!trimmedEmail) {
            newErrors.email = t("admin.employeeManagement.messages.required")
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            newErrors.email = t("admin.employeeManagement.messages.invalidEmail")
        }

        if (!trimmedPhone) {
            newErrors.phone = t("admin.employeeManagement.messages.required")
        } else if (!/^0\d{9}$/.test(trimmedPhone)) {
            newErrors.phone = t("admin.employeeManagement.messages.invalidPhone")
        }

        if (!trimmedPassword) {
            newErrors.password = t("admin.employeeManagement.messages.required")
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,32}$/.test(trimmedPassword)) {
            newErrors.password = t("admin.employeeManagement.messages.invalidPassword")
        }

        if (!formData.birthDate) {
            newErrors.birthDate = t("admin.employeeManagement.messages.required")
        } else {
            const birthDate = new Date(formData.birthDate)
            const today = new Date()
            if (birthDate > today) {
                newErrors.birthDate = t("admin.employeeManagement.messages.invalidBirthDate")
            } else {
                let age = today.getFullYear() - birthDate.getFullYear()
                const m = today.getMonth() - birthDate.getMonth()
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--
                }
                if (age < 18) {
                    newErrors.birthDate = t("admin.employeeManagement.messages.tooYoung")
                }
            }
        }

        if (!formData.roleId) newErrors.roleId = t("admin.employeeManagement.messages.required")
        if (!formData.positionId) newErrors.positionId = t("admin.employeeManagement.messages.required")

        return newErrors
    }, [formData, t])

    const handleBlur = (field: keyof UserFormState) => {
        setTouched((prev) => ({ ...prev, [field]: true }))
        if (field === "fullName") {
            setFormData((prev) => ({
                ...prev,
                fullName: formatString(prev.fullName, "title"),
            }))
        }
    }

    const generateDefaultPassword = () => {
        const trimmedPhone = formData.phone.trim()
        const trimmedName = formData.fullName.trim()
        if (!trimmedName || trimmedPhone.length < 4) {
            toast.error(t("admin.employeeManagement.messages.required"))
            return
        }

        const firstName = getFirstName(trimmedName)
        const normalizedFirstName = formatString(normalizeForPassword(firstName), "title")
        const lastDigits = getLastDigits(trimmedPhone, 4)

        setFormData((prev) => ({ ...prev, password: `${normalizedFirstName}@${lastDigits}` }))
        setTouched((prev) => ({ ...prev, password: true }))
    }

    const { data, isLoading } = useQuery<UserResponse>({
        queryKey: ["employees", page, search, selectedDepartment, selectedRole],
        queryFn: () =>
            userService.getAllUsers({
                page,
                search,
                departmentCode: selectedDepartment,
                roleName: selectedRole,
            }),
    })
    const { data: departmentsOptions } = useQuery({
        queryKey: ["departments", "employee-management-options"],
        queryFn: () => departmentService.getAll({ page: 1, limit: 100 }),
    })
    const { data: positionsOptions } = useQuery({
        queryKey: ["positions", "employee-management-options"],
        queryFn: () => positionService.getAll({ page: 1, limit: 100 }),
    })
    const { data: roleOptions } = useQuery({
        queryKey: ["roles", "employee-management-options"],
        queryFn: () => roleService.getAll(),
    })
    const [adjustEmp, setAdjustEmp] = useState<User | null>(null)
    const allPositions = positionsOptions?.data ?? []

    const getDepartmentFromPosition = (pos: Position) => {
        const deptField = pos?.departmentId as unknown
        if (!deptField) return { id: "", name: "" }
        if (typeof deptField === "string") {
            const dept = departmentsOptions?.data?.find((d: Department) => d._id === deptField)
            return { id: deptField, name: dept?.originName ?? "" }
        }
        const deptObj = deptField as Department
        return { id: deptObj._id, name: deptObj.originName }
    }

    const selectedPositionDepartmentName = useMemo(() => {
        if (!formData.positionId) return ""
        const pos = allPositions.find((p: Position) => p._id === formData.positionId)
        if (!pos) return ""
        return getDepartmentFromPosition(pos).name
    }, [formData.positionId, allPositions, departmentsOptions])

    const columns = [
        t("admin.employeeManagement.table.employee"),
        t("admin.employeeManagement.table.department"),
        t("admin.employeeManagement.table.position"),
        t("admin.employeeManagement.table.role"),
        t("admin.employeeManagement.table.status"),
        t("admin.employeeManagement.table.actions"),
    ]

    const resetCreateForm = () => {
        setFormData(DEFAULT_FORM_STATE)
        setTouched({})
    }

    const { mutate: createUser, isPending: isCreatingUser } = useMutation({
        mutationFn: (payload: CreateUserPayload) => userService.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
            toast.success(t("admin.employeeManagement.messages.createSuccess"))
            setIsCreateOpen(false)
            resetCreateForm()
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || t("admin.employeeManagement.messages.createError"))
        },
    })

    const { mutate: createFakeUsers, isPending: isCreatingFakeUsers } = useMutation({
        mutationFn: (count: number) => userService.createFakeUsers(count),
        onSuccess: (users) => {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
            toast.success(t("admin.employeeManagement.messages.fakeCreateSuccess", { count: users?.length || Number(fakeCount) }))
            setIsFakeOpen(false)
            setFakeCount("1")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || t("admin.employeeManagement.messages.fakeCreateError"))
        },
    })

    const handleSaveChanges = () => {
        // Implementation for saving changes
    }
    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const handleCreateUser = () => {
        if (Object.keys(errors).length > 0) {
            // Mark all as touched to show all errors
            const allTouched: Partial<Record<keyof UserFormState, boolean>> = {}
            Object.keys(DEFAULT_FORM_STATE).forEach((key) => {
                allTouched[key as keyof UserFormState] = true
            })
            setTouched(allTouched)
            toast.error(t("admin.employeeManagement.messages.required"))
            return
        }

        createUser({
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            password: formData.password.trim(),
            fullName: formData.fullName.trim(),
            birthDate: formatBirthDateForApi(formData.birthDate),
            gender: formData.gender,
            avatar: formData.avatar.trim() || undefined,
            roleId: formData.roleId || undefined,
            departmentId: formData.departmentId || undefined,
            positionId: formData.positionId || undefined,
        })
    }

    const handleCreateFakeUsers = () => {
        const count = Number(fakeCount)

        if (!fakeCount.trim() || Number.isNaN(count) || count < 1 || count > 100) {
            toast.error(t("admin.employeeManagement.messages.invalidFakeCount"))
            return
        }

        createFakeUsers(count)
    }

    return (
        <div className="flex-1 flex relative overflow-hidden">
            <main className="flex-1  relative  z-0">
                <div className="space-y-6">
                    <Card>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">{t("admin.employeeManagement.title")}</h1>
                                    <p className="text-sm text-neutral-500 mt-1">{t("admin.employeeManagement.subtitle")}</p>
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    <Button className="h-10" variant={"outline"}>
                                        <Download /> {t("admin.employeeManagement.actions.export")}
                                    </Button>
                                    {appConfig.isDevelopment && (
                                        <Button className="h-10" variant={"outline"} onClick={() => setIsFakeOpen(true)}>
                                            <Sparkles /> {t("admin.employeeManagement.actions.createFake")}
                                        </Button>
                                    )}
                                    <Button className="h-10" onClick={() => setIsCreateOpen(true)}>
                                        <CirclePlus /> {t("admin.employeeManagement.actions.create")}
                                    </Button>
                                </div>
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
                                        placeholder={t("admin.employeeManagement.filters.searchPlaceholder")}
                                        type="text"
                                        value={search}
                                        onChange={(event) => {
                                            setSearch(event.target.value)
                                            setPage(1)
                                        }}
                                    />
                                </div>
                                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                                    <CSelectOptions
                                        data={[
                                            ...departmentsData,
                                            ...(departmentsOptions?.data ?? []).map((department: Department) => ({
                                                value: department.code,
                                                label: department.originName,
                                            })),
                                        ]}
                                        valueKey="value"
                                        displayKey="label"
                                        value={selectedDepartment}
                                        onChange={(value) => {
                                            setSelectedDepartment(value)
                                            setPage(1)
                                        }}
                                        placeholder={t("admin.employeeManagement.filters.department")}
                                    />
                                    <CSelectOptions
                                        data={[
                                            ...roleFilterData,
                                            ...((roleOptions ?? []).map((role: RoleId) => ({
                                                value: role.name,
                                                label: role.name,
                                            })) as Array<{ value: string; label: string }>),
                                        ]}
                                        valueKey="value"
                                        displayKey="label"
                                        value={selectedRole}
                                        onChange={(value) => {
                                            setSelectedRole(value)
                                            setPage(1)
                                        }}
                                        placeholder={t("admin.employeeManagement.filters.role")}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <CTable data={data} columns={columns} handlePageChange={handlePageChange} isLoading={isLoading}>
                        {data?.data.map((item, index) => (
                            <tr key={index} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-left gap-3">
                                        <CAvatarProfile user={item} className="h-9 w-9 ring-0" />
                                        <div className="text-left">
                                            <div className="font-medium text-neutral-900 dark:text-white">{item.fullName}</div>
                                            <div className="text-xs text-neutral-500">ID: {item.empId}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-center text-neutral-600 dark:text-neutral-400">{item?.departmentId?.originName || t("admin.employeeManagement.common.system")}</td>
                                <td className="py-4 px-6 text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                        {item?.positionId?.fullName || t("admin.employeeManagement.common.empty")}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center text-neutral-600 dark:text-neutral-400 text-xs">
                                    <div className="flex justify-center">
                                        <CBadge>{item?.roleId?.name || t("admin.employeeManagement.common.user")}</CBadge>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="flex justify-center">
                                        <Switch checked={item.status} />
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <Link to={`/profile/${item._id}`}>
                                        <Button variant={"ghost"}>
                                            <Eye />
                                        </Button>
                                    </Link>
                                    <Button variant={"ghost"} onClick={() => setAdjustEmp(item)}>
                                        <Edit />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </CTable>
                </div>
            </main>
            {adjustEmp && <div className="absolute inset-0 bg-black/10" onClick={() => setAdjustEmp(null)}></div>}
            <div
                className={`absolute inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-surface-dark shadow-2xl transform transition-transform border-l border-neutral-200 dark:border-neutral-700 z-10 flex flex-col ${adjustEmp ? "translate-x-0" : "translate-x-[200%]"}`}
            >
                <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Adjust Balance</h2>
                        <p className="text-xs text-neutral-500 mt-0.5">Edit leave details for selected employee.</p>
                    </div>
                    <Button variant={"ghost"} onClick={() => setAdjustEmp(null)}>
                        <X />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary/10 rounded-lg border border-primary-100 dark:border-primary/20">
                        {adjustEmp ? <CAvatarProfile user={adjustEmp} className="h-12 w-12 border-2 border-white dark:border-neutral-700" /> : null}
                        <div>
                            <div className="font-semibold text-neutral-900 dark:text-white">{adjustEmp?.fullName}</div>
                            <div className="text-xs text-neutral-500">{adjustEmp?.positionId.fullName}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                            <div className="text-xs text-neutral-500 mb-1">Current Balance</div>
                            <div className="text-xl font-bold text-neutral-900 dark:text-white font-mono">
                                8.0 <span className="text-xs font-normal text-neutral-400">days</span>
                            </div>
                        </div>
                        <div className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                            <div className="text-xs text-neutral-500 mb-1">Annual Limit</div>
                            <div className="text-xl font-bold text-neutral-900 dark:text-white font-mono">
                                20 <span className="text-xs font-normal text-neutral-400">days</span>
                            </div>
                        </div>
                    </div>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Adjustment Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="cursor-pointer">
                                    <input className="peer sr-only" name="adj-type" type="radio" />
                                    <div className="text-center py-2 px-3 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors">
                                        Add Days (+)
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input className="peer sr-only" name="adj-type" type="radio" />
                                    <div className="text-center py-2 px-3 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors">
                                        Deduct Days (-)
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5" htmlFor="days">
                                Number of Days
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full pl-4 pr-12 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                    id="days"
                                    step="0.5"
                                    type="number"
                                    value="2.0"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-medium pointer-events-none">Days</div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5" htmlFor="reason">
                                Reason for Adjustment
                            </label>
                            <textarea
                                className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white resize-none text-sm placeholder-neutral-400"
                                id="reason"
                                placeholder="e.g., Correction of data entry error..."
                                rows={3}
                            ></textarea>
                        </div>
                        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">New Balance Preview</span>
                                <span className="text-lg font-bold text-primary dark:text-blue-400 font-mono">10.0 days</span>
                            </div>
                        </div>
                    </form>
                    <div className="pt-2">
                        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Recent Changes</h3>
                        <div className="relative border-l border-neutral-200 dark:border-neutral-700 ml-2 space-y-4">
                            <div className="ml-4 relative">
                                <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                                <p className="text-xs text-neutral-500">Oct 24, 2023</p>
                                <p className="text-sm text-neutral-800 dark:text-neutral-200">System deduction (Leave Request)</p>
                                <p className="text-xs font-mono text-red-500">-2.0 days</p>
                            </div>
                            <div className="ml-4 relative">
                                <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                                <p className="text-xs text-neutral-500">Aug 15, 2023</p>
                                <p className="text-sm text-neutral-800 dark:text-neutral-200">Manual Adjustment by S. Jenkins</p>
                                <p className="text-xs font-mono text-green-500">+1.0 days</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 bg-surface-light dark:bg-surface-dark mt-auto">
                    <div className="flex gap-3">
                        <Button variant={"outline"} className="flex-1" onClick={() => setAdjustEmp(null)}>
                            Cancel
                        </Button>
                        <Button className="flex-1" onClick={handleSaveChanges}>
                            <SaveIcon /> Save Changes
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-2xl dark:border-white/10 dark:bg-[#10151d]">
                    <DialogHeader>
                        <DialogTitle>{t("admin.employeeManagement.createDialog.title")}</DialogTitle>
                        <DialogDescription>{t("admin.employeeManagement.createDialog.description")}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="create-full-name">{t("admin.employeeManagement.createDialog.fields.fullName")}</Label>
                            <Input
                                id="create-full-name"
                                value={formData.fullName}
                                onChange={(event) => {
                                    const val = event.target.value
                                    if (val === "" || /^[\p{L}\s]+$/u.test(val)) {
                                        setFormData((current) => ({ ...current, fullName: val }))
                                    }
                                }}
                                onBlur={() => handleBlur("fullName")}
                                className={`${errors.fullName && touched.fullName ? "border-red-500 animate-shake" : ""}`}
                            />
                            {errors.fullName && touched.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="create-email">{t("admin.employeeManagement.createDialog.fields.email")}</Label>
                                <Input
                                    id="create-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                                    onBlur={() => handleBlur("email")}
                                    className={`${errors.email && touched.email ? "border-red-500 animate-shake" : ""}`}
                                />
                                {errors.email && touched.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-phone">{t("admin.employeeManagement.createDialog.fields.phone")}</Label>
                                <Input
                                    id="create-phone"
                                    value={formData.phone}
                                    onChange={(event) => {
                                        const val = event.target.value
                                        if (val === "" || /^[0-9]+$/.test(val)) {
                                            setFormData((current) => ({ ...current, phone: val }))
                                        }
                                    }}
                                    onBlur={() => handleBlur("phone")}
                                    className={`${errors.phone && touched.phone ? "border-red-500 animate-shake" : ""}`}
                                />
                                {errors.phone && touched.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="create-password">{t("admin.employeeManagement.createDialog.fields.password")}</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    onClick={generateDefaultPassword}
                                                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors cursor-help"
                                                >
                                                    {t("admin.employeeManagement.createDialog.placeholders.useDefaultPassword")}
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {t("admin.employeeManagement.createDialog.placeholders.useDefaultPasswordTooltip")}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="create-password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                                        onBlur={() => handleBlur("password")}
                                        className={`pr-10 ${errors.password && touched.password ? "border-red-500 animate-shake" : ""}`}
                                    />
                                    <div className="absolute right-0 top-0 flex h-full items-center pr-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                                {errors.password && touched.password && <p className="text-xs text-red-500">{errors.password}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-birth-date">{t("admin.employeeManagement.createDialog.fields.birthDate")}</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`${
                                                errors.birthDate && touched.birthDate ? "border-red-500 animate-shake" : ""
                                            } w-full h-12 justify-start text-left font-normal`}
                                            onBlur={() => handleBlur("birthDate")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.birthDate ? (
                                                format(new Date(formData.birthDate), "dd/MM/yyyy")
                                            ) : (
                                                <span>{t("admin.employeeManagement.createDialog.fields.birthDate")}</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={formData.birthDate ? new Date(formData.birthDate) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        birthDate: date.toISOString(),
                                                    }))
                                                    handleBlur("birthDate")
                                                }
                                            }}
                                            fromYear={1900}
                                            toYear={new Date().getFullYear()}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.birthDate && touched.birthDate && <p className="text-xs text-red-500">{errors.birthDate}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label>{t("admin.employeeManagement.createDialog.fields.gender")}</Label>
                                <CSelectOptions
                                    data={[
                                        { value: "male", label: t("admin.employeeManagement.genders.male") },
                                        { value: "female", label: t("admin.employeeManagement.genders.female") },
                                    ]}
                                    valueKey="value"
                                    displayKey="label"
                                    value={formData.gender}
                                    onChange={(value) => setFormData((current) => ({ ...current, gender: value }))}
                                    placeholder={t("admin.employeeManagement.createDialog.placeholders.gender")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-avatar">{t("admin.employeeManagement.createDialog.fields.avatar")}</Label>
                                <Input
                                    id="create-avatar"
                                    value={formData.avatar}
                                    placeholder={t("admin.employeeManagement.createDialog.placeholders.avatar")}
                                    onChange={(event) => setFormData((current) => ({ ...current, avatar: event.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="grid gap-2">
                                <Label>{t("admin.employeeManagement.createDialog.fields.role")}</Label>
                                <CSelectOptions
                                    data={roleOptions ?? []}
                                    valueKey="_id"
                                    displayKey="name"
                                    value={formData.roleId}
                                    onChange={(value) => {
                                        setFormData((current) => ({ ...current, roleId: value }))
                                        handleBlur("roleId")
                                    }}
                                    className={`${errors.roleId && touched.roleId ? "border-red-500 animate-shake" : ""}`}
                                    placeholder={t("admin.employeeManagement.createDialog.placeholders.role")}
                                />
                                {errors.roleId && touched.roleId && <p className="text-xs text-red-500">{errors.roleId}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>{t("admin.employeeManagement.createDialog.fields.position")}</Label>
                                <CSelectOptions
                                    data={allPositions}
                                    valueKey="_id"
                                    displayKey="fullName"
                                    value={formData.positionId}
                                    onChange={(value) => {
                                        const pos = allPositions.find((p: Position) => p._id === value)
                                        const dept = pos ? getDepartmentFromPosition(pos) : { id: "" }
                                        setFormData((current) => ({
                                            ...current,
                                            positionId: value,
                                            departmentId: dept.id,
                                        }))
                                        handleBlur("positionId")
                                    }}
                                    className={`${errors.positionId && touched.positionId ? "border-red-500 animate-shake" : ""}`}
                                    placeholder={t("admin.employeeManagement.createDialog.placeholders.position")}
                                />
                                {errors.positionId && touched.positionId && <p className="text-xs text-red-500">{errors.positionId}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>{t("admin.employeeManagement.createDialog.fields.department")}</Label>
                                <Input
                                    value={selectedPositionDepartmentName}
                                    readOnly
                                    onChange={() => {}}
                                    className="bg-muted cursor-not-allowed"
                                    placeholder={t("admin.employeeManagement.createDialog.placeholders.department")}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                setIsCreateOpen(false)
                                resetCreateForm()
                            }}
                        >
                            {t("admin.employeeManagement.common.cancel")}
                        </Button>
                        <Button isLoading={isCreatingUser} onClick={handleCreateUser}>
                            <UserPlus /> {t("admin.employeeManagement.actions.create")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {appConfig.isDevelopment && (
                <Dialog open={isFakeOpen} onOpenChange={setIsFakeOpen}>
                    <DialogContent className="sm:max-w-md dark:border-white/10 dark:bg-[#10151d]">
                        <DialogHeader>
                            <DialogTitle>{t("admin.employeeManagement.fakeDialog.title")}</DialogTitle>
                            <DialogDescription>{t("admin.employeeManagement.fakeDialog.description")}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-2 py-2">
                            <Label htmlFor="fake-count">{t("admin.employeeManagement.fakeDialog.fields.count")}</Label>
                            <Input id="fake-count" type="number" min={1} max={100} value={fakeCount} onChange={(event) => setFakeCount(event.target.value)} />
                            <p className="text-xs text-neutral-500">{t("admin.employeeManagement.fakeDialog.hint")}</p>
                        </div>
                        <DialogFooter>
                            <Button variant={"outline"} onClick={() => setIsFakeOpen(false)}>
                                {t("admin.employeeManagement.common.cancel")}
                            </Button>
                            <Button isLoading={isCreatingFakeUsers} onClick={handleCreateFakeUsers}>
                                <Sparkles /> {t("admin.employeeManagement.actions.createFake")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

        </div>
    )
}
