import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, UserPlus, Check, Loader2, ArrowLeft } from "lucide-react"
import userService from "@/services/userService"
import leaveBalanceService from "@/services/leaveBalanceService"
import { type User } from "@/types/user"
import LoadingUI from "@/components/etc/LoadingUI"
import { useNavigate } from "react-router-dom"
import CAvatarProfile from "@/components/etc/CAvatarProfile"

export default function AdjustLeaveBalance() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [year, setYear] = useState<string>("2026")
    const [adjustedDays, setAdjustedDays] = useState<string>("0")
    const [usedDays, setUsedDays] = useState<string>("0")
    const [searchTerm, setSearchTerm] = useState("")

    const queryClient = useQueryClient()

    const { data: usersData, isLoading: isLoadingUsers } = useQuery({
        queryKey: ["users-for-adjust"],
        queryFn: () => userService.getAllUsers({ page: 1 }),
    })

    const { data: balancesData, isLoading: isLoadingBalances } = useQuery({
        queryKey: ["all-balances-for-adjust"],
        queryFn: () => leaveBalanceService.getAll({ limit: 1000 }),
    })

    const balanceMap = useMemo(() => {
        const map = new Map<string, any>()
        if (balancesData?.data) {
            balancesData.data.forEach((b: any) => {
                const uid: string = typeof b.userId === "string" ? b.userId : b.userId?._id
                if (uid) map.set(uid, b)
            })
        }
        return map
    }, [balancesData])

    const userMap = useMemo(() => {
        const map: Record<string, { name: string; avatar: string; empId: string }> = {}
        usersData?.data.forEach((u) => {
            map[u._id] = { name: u.fullName, avatar: u.avatar, empId: u.empId }
        })
        return map
    }, [usersData])

    const handleSelectUser = (user: User) => {
        setSelectedUser(user)
        const balance = balanceMap.get(user._id)
        if (balance) {
            setAdjustedDays((balance.adjustedDays ?? 0).toString())
            setUsedDays((balance.usedDays ?? 0).toString())
        } else {
            setAdjustedDays("0")
            setUsedDays("0")
        }
    }

    const adjustMutation = useMutation({
        mutationFn: leaveBalanceService.create,
        onSuccess: () => {
            toast.success(t("approvals.assignLeaveBalance.success", "Assigned leave balance successfully"))
            queryClient.invalidateQueries({ queryKey: ["all-balances-for-adjust"] })
            setSelectedUser(null)
            setAdjustedDays("0")
            setUsedDays("0")
            setYear("2026")
        },
    })

    const filteredUsers = usersData?.data.filter((user) => user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || user.empId.toLowerCase().includes(searchTerm.toLowerCase())) || []

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedUser) {
            toast.error(t("approvals.assignLeaveBalance.selectUserError", "Please select a user"))
            return
        }

        adjustMutation.mutate({
            userId: selectedUser._id,
            year: year ? parseInt(year) : 2026,
            adjustedDays: adjustedDays ? parseFloat(adjustedDays) : 0,
            usedDays: usedDays ? parseFloat(usedDays) : 0,
        })
    }

    if (isLoadingUsers) return <LoadingUI />

    return (
        <div className="container mx-auto py-8 max-w-4xl space-y-6">
            <header className="flex items-center gap-3 mb-6">
                <Button variant="ghost" size="icon" onClick={() => navigate("/approvals/leave-balances")} className="mr-1">
                    <ArrowLeft size={20} />
                </Button>
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <UserPlus size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{t("approvals.assignLeaveBalance.title", "Assign Leave Balance")}</h1>
                    <p className="text-muted-foreground">{t("approvals.assignLeaveBalance.subtitle", "Initialize or adjust leave balance for users")}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Selection */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">{t("approvals.assignLeaveBalance.selectUser", "Select Employee")}</CardTitle>
                        <CardDescription>{t("approvals.assignLeaveBalance.searchUser", "Search by name or Employee ID")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input placeholder={t("common.search", "Search...")} className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="max-h-[400px] overflow-y-auto border rounded-md divide-y custom-scrollbar">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => {
                                    const userBalance = balanceMap.get(user._id)
                                    return (
                                        <div
                                            key={user._id}
                                            className={`flex items-center gap-3 p-3 cursor-pointer transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-800/50 last:border-0 ${selectedUser?._id === user._id ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}
                                            onClick={() => handleSelectUser(user)}
                                        >
                                            <CAvatarProfile user={{ ...(user as any), avatar: userMap[user?._id]?.avatar || user?.avatar }} className="w-9 h-9" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold truncate">{user.fullName}</p>
                                                <div className="flex items-center gap-2 mt-0.5 whitespace-nowrap overflow-hidden">
                                                    <p className="text-xs text-muted-foreground font-mono truncate">{user.empId}</p>
                                                    {isLoadingBalances ? (
                                                        <Loader2 size={10} className="animate-spin text-muted-foreground" />
                                                    ) : userBalance ? (
                                                        <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary font-medium rounded-md shrink-0">
                                                            {userBalance.usedDays} / {userBalance.totalDays} {t("admin.employees.adjustModal.days", "days")}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-medium rounded-full border border-neutral-200 dark:border-neutral-700 shrink-0">
                                                            {t("admin.employees.adjustModal.noBalance", "No balance")}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {selectedUser?._id === user._id && (
                                                <div className="size-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                                                    <Check size={14} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="p-8 text-center text-muted-foreground">{t("common.noResults", "No users found")}</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Assignment Form */}
                <Card className="shadow-sm border-primary/20 bg-primary/[0.01]">
                    <CardHeader>
                        <CardTitle className="text-lg">{t("approvals.assignLeaveBalance.formTitle", "Balance Information")}</CardTitle>
                        <CardDescription>{t("approvals.assignLeaveBalance.formDesc", "Set the leave balance for the selected user")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {selectedUser ? (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm mb-4">
                                    <CAvatarProfile user={{ ...(selectedUser as any), avatar: userMap[selectedUser?._id]?.avatar || selectedUser?.avatar }} className="w-9 h-9" />
                                    <div>
                                        <p className="font-bold text-lg">{selectedUser.fullName}</p>
                                        <p className="text-sm text-muted-foreground">{(selectedUser.positionId as any)?.fullName || (selectedUser.positionId as any)?.name}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="year">{t("common.year", "Year")}</Label>
                                        <Input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} min={2000} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="adjustedDays">{t("approvals.assignLeaveBalance.adjustedDays", "Adjusted Days")}</Label>
                                        <Input id="adjustedDays" type="number" step="0.5" value={adjustedDays} onChange={(e) => setAdjustedDays(e.target.value)} />
                                        <p className="text-xs text-muted-foreground italic">{t("approvals.assignLeaveBalance.adjustedHint", "Positive for adding, negative for deducting")}</p>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="usedDays">{t("approvals.assignLeaveBalance.usedDays", "Used Days")}</Label>
                                        <Input id="usedDays" type="number" step="0.5" value={usedDays} onChange={(e) => setUsedDays(e.target.value)} min={0} />
                                    </div>
                                </div>

                                <Button className="w-full mt-6 h-12 text-lg font-bold shadow-lg shadow-primary/20" type="submit" disabled={adjustMutation.isPending}>
                                    {adjustMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 animate-spin" /> {t("common.saving", "Saving...")}
                                        </>
                                    ) : (
                                        t("approvals.assignLeaveBalance.submit", "Initialize Balance")
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <div className="h-[300px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50/50 dark:bg-neutral-800/10">
                                <div className="size-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                                    <UserPlus className="text-neutral-400 dark:text-neutral-500" size={32} />
                                </div>
                                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                                    {t("approvals.assignLeaveBalance.placeholder", "Please select an employee from the left panel to continue")}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
