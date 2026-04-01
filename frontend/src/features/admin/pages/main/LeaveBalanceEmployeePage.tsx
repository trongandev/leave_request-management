import CSelectOptions from "@/components/etc/CSelectOptions"
import LoadingUI from "@/components/etc/LoadingUI"
import CAvatarProfile from "@/components/etc/CAvatarProfile"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import leaveBalanceService from "@/services/leaveBalanceService"
import type { LeaveBalance } from "@/types/leave-balances"
import type { ResponsePagination } from "@/types/etc"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CirclePlus, Download, Edit, SaveIcon, Search, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useState, useMemo, useEffect } from "react"
import * as XLSX from "xlsx"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import userService from "@/services/userService"

export default function LeaveBalanceEmployeePage() {
    const { t } = useTranslation();
    const departmentsData = [
        { value: "all", label: t("admin.employees.filters.allDepartments", "All Departments") },
        { value: "tech", label: t("admin.common.departments.engineering") },
        { value: "production", label: t("admin.common.departments.production") },
        { value: "r&d", label: t("admin.common.departments.rnd") },
        { value: "hr", label: t("admin.common.departments.hr") },
        { value: "log", label: t("admin.common.departments.logistics") },
        { value: "qa", label: t("admin.common.departments.qa") },
        { value: "sys", label: t("admin.common.departments.system") },
    ]

    // const annualsData = [
    //     { value: "all", label: t("admin.employees.filters.allAnnuals", "All Annuals") },
    //     { value: "sick", label: t("admin.employees.filters.sickLeave", "Sick Leave") },
    //     { value: "personal", label: t("admin.employees.filters.personalLeave", "Personal Leave") },
    //     { value: "compensatory", label: t("admin.employees.filters.compensatoryLeave", "Compensatory Leave") },
    //     { value: "vacation", label: t("admin.employees.filters.vacationLeave", "Vacation Leave") },
    // ]

    // const locationData = [
    //     { value: "all", label: t("admin.employees.filters.allLocations", "All Locations") },
    //     { value: "new_york", label: t("admin.employees.filters.newYork", "New York") },
    //     { value: "london", label: t("admin.employees.filters.london", "London") },
    //     { value: "remote", label: t("admin.employees.filters.remote", "Remote") },
    // ]

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDept, setSelectedDept] = useState("all")

    const { data, isLoading } = useQuery<ResponsePagination<LeaveBalance[]>>({
        queryKey: ["leave-balances", 1, 1000],
        queryFn: () => leaveBalanceService.getAll({ page: 1, limit: 1000 }),
    })

    // Fetch users separately to get avatars (since BE leave-balances populate doesn't include avatar)
    const { data: usersData } = useQuery({
        queryKey: ["users-avatars-map"],
        queryFn: () => userService.getAllUsers({ page: 1 }),
    })

    const userMap = useMemo(() => {
        const map: Record<string, { name: string, avatar: string, empId: string }> = {}
        usersData?.data.forEach(u => {
            map[u._id] = { name: u.fullName, avatar: u.avatar, empId: u.empId }
        })
        return map
    }, [usersData])

    const filteredData = useMemo(() => {
        if (!data?.data) return []
        return data.data.filter(item => {
            const user = item.userId as any
            const fullName = user?.fullName?.toLowerCase() || ""
            const empId = user?.empId?.toLowerCase() || ""
            const email = user?.email?.toLowerCase() || ""
            const deptCode = user?.departmentId?.code?.toLowerCase() || ""
            const deptName = user?.departmentId?.originName?.toLowerCase() || ""
            const term = searchTerm.toLowerCase()

            const matchesSearch = !searchTerm || fullName.includes(term) || empId.includes(term) || email.includes(term)
            const matchesDept = selectedDept === "all" || deptCode === selectedDept || deptName.includes(selectedDept)

            return matchesSearch && matchesDept
        })
    }, [data?.data, searchTerm, selectedDept])

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [adjustEmp, setAdjustEmp] = useState<LeaveBalance | null>(null)
    const [isExportModalOpen, setIsExportModalOpen] = useState(false)
    const [exportFormat, setExportFormat] = useState<"csv" | "xlsx" | "pdf">("csv")
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null)
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
    const [customFileName, setCustomFileName] = useState("")

    const { data: logsData, isLoading: isLoadingLogs } = useQuery({
        queryKey: ["leave-balance-logs", adjustEmp?._id],
        queryFn: () => leaveBalanceService.getLogs(adjustEmp!._id),
        enabled: !!adjustEmp,
    })

    const [adjustType, setAdjustType] = useState<"add" | "deduct">("add")
    const [adjustDays, setAdjustDays] = useState<string>("2.0")
    const [adjustReason, setAdjustReason] = useState<string>("")

    const { mutate: adjustMutate, isPending: isAdjusting } = useMutation({
        mutationFn: (data: { id: string, payload: { changeAmount: number, reason: string, requestId: string } }) => leaveBalanceService.adjust(data.id, data.payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leave-balances"] })
            toast.success(t("admin.employees.adjustModal.success", "Leave balance adjusted successfully"))
            setAdjustEmp(null)
            setAdjustDays("2.0")
            setAdjustReason("")
            setAdjustType("add")
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || t("admin.employees.adjustModal.error", "Failed to adjust leave balance"))
        }
    })

    const handleSaveChanges = () => {
        if (!adjustEmp) return
        const days = parseFloat(adjustDays)
        if (isNaN(days) || days <= 0) {
            toast.error(t("admin.employees.adjustModal.invalidDays", "Please enter a valid number of days"))
            return
        }
        if (!adjustReason.trim()) {
            toast.error(t("admin.employees.adjustModal.invalidReason", "Please enter a reason"))
            return
        }

        const changeAmount = adjustType === "add" ? days : -days

        if (adjustType === "deduct" && adjustEmp.remainingDays + changeAmount < 0) {
            toast.error(t("admin.employees.adjustModal.negativeBalance", "Remaining days cannot be less than 0"))
            return
        }

        adjustMutate({
            id: adjustEmp._id,
            payload: {
                changeAmount,
                reason: adjustReason,
                requestId: "MANUAL"
            }
        })
    }

    const handleOpenAdjust = (item: LeaveBalance) => {
        setAdjustEmp(item)
        setAdjustDays("2.0")
        setAdjustReason("")
        setAdjustType("add")
    }

    const previewDays = adjustEmp ? adjustEmp.remainingDays + (adjustType === "add" ? parseFloat(adjustDays || "0") : -parseFloat(adjustDays || "0")) : 0;

    const handleExportClick = () => {
        if (!data?.data || data.data.length === 0) {
            toast.error(t("admin.employees.exportEmpty", "No data to export"));
            return;
        }
        setIsExportModalOpen(true);
    };

    const exportDataOptions = useMemo(() => {
        if (!data?.data) return [];
        return data.data.map((item: any) => {
            const user = (typeof item.userId === 'object' ? item.userId : {}) as any;
            const deptName = user?.departmentId?.originName || "System";
            return {
                ID: user?.empId || "N/A",
                Name: user?.fullName || "N/A",
                Department: deptName,
                Year: item.year || new Date().getFullYear(),
                "Used Days": item.usedDays ?? 0,
                "Total Days": item.totalDays ?? 0,
                Balance: item.remainingDays ?? 0
            }
        });
    }, [data?.data]);

    const csvPreviewContent = useMemo(() => {
        if (!exportDataOptions.length) return "";
        const headers = Object.keys(exportDataOptions[0]);
        const rows = exportDataOptions.map(obj => headers.map(header => `"${(obj as any)[header]}"`).join(","));
        return [headers.join(","), ...rows].join("\n");
    }, [exportDataOptions]);

    useEffect(() => {
        if (exportFormat === "pdf" && isExportModalOpen) {
            setIsGeneratingPdf(true);
            const timer = setTimeout(async () => {
                try {
                    const container = document.getElementById("export-pdf-container");
                    if (container) {
                        const canvas = await html2canvas(container, { scale: 2 });
                        const imgData = canvas.toDataURL("image/png");
                        const pdf = new jsPDF("l", "mm", "a4");
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                        setPdfPreviewUrl(URL.createObjectURL(pdf.output('blob')));
                    }
                } catch (e) {
                    console.error("Failed to generate PDF view", e);
                } finally {
                    setIsGeneratingPdf(false);
                }
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setPdfPreviewUrl(null);
        }
    }, [exportFormat, isExportModalOpen, exportDataOptions]);

    const executeExport = async () => {
        try {
            const defaultName = `leave-balance-report-${new Date().toISOString().split('T')[0]}`;
            const fileName = customFileName.trim() || defaultName;

            if (exportFormat === "csv") {
                const mimeType = "text/csv;charset=utf-8;";
                const blob = new Blob(["\uFEFF" + csvPreviewContent], { type: mimeType });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", `${fileName}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            else if (exportFormat === "xlsx") {
                const worksheet = XLSX.utils.json_to_sheet([]);
                const headerData = [
                    ["LEAVE BALANCE REPORT"],
                    [`Export Date: ${new Date().toLocaleDateString('en-GB')}`],
                    [`Total Records: ${exportDataOptions.length}`],
                    [] // Spacing
                ];
                XLSX.utils.sheet_add_aoa(worksheet, headerData, { origin: "A1" });
                XLSX.utils.sheet_add_json(worksheet, exportDataOptions, { origin: "A5", skipHeader: false });

                // Tự động định dạng chiều rộng các cột
                if (exportDataOptions.length > 0) {
                    worksheet['!cols'] = Object.keys(exportDataOptions[0]).map(() => ({ wch: 18 }));
                }

                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Balances");
                XLSX.writeFile(workbook, `${fileName}.xlsx`);
            }
            else if (exportFormat === "pdf") {
                if (pdfPreviewUrl) {
                    const link = document.createElement("a");
                    link.href = pdfPreviewUrl;
                    link.download = `${fileName}.pdf`;
                    link.click();
                } else {
                    toast.error(t("admin.employees.exportModal.pdfWait", "Vui lòng đợi PDF Preview tải xong"));
                    return;
                }
            }

            setIsExportModalOpen(false);
            toast.success(t("admin.employees.exportSuccess", "Report exported successfully"));
        } catch (error) {
            console.error(error);
            toast.error(t("admin.employees.exportModal.error", "Has error during export"));
        }
    };

    const columns = [
        t("admin.employees.table.employee", "EMPLOYEE"),
        t("admin.employees.table.department", "DEPARTMENT"),
        t("admin.employees.table.leaveType", "LEAVE TYPE"),
        t("admin.employees.table.usedTotal", "USED / TOTAL"),
        t("admin.employees.table.balance", "BALANCE"),
        t("admin.employees.table.actions", "ACTIONS")
    ]


    return (
        <div className="flex-1 flex overflow-hidden relative">
            <main className="flex-1 overflow-y-auto custom-scrollbar relative z-0">
                <div className="space-y-6">
                    <Card>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">{t("admin.employees.title")}</h1>
                                    <p className="text-sm text-neutral-500 mt-1">{t("admin.employees.subtitle")}</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button className="h-10" variant={"outline"} onClick={handleExportClick}>
                                        <Download /> {t("admin.employees.exportReport")}
                                    </Button>
                                    <Button className="h-10" onClick={() => navigate("/approvals/adjust-leave-balances")}>
                                        <CirclePlus /> {t("admin.employees.newAdjustment")}
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
                                        placeholder={t("admin.employees.searchPlaceholder")}
                                        type="text"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                                    <CSelectOptions
                                        data={departmentsData}
                                        valueKey="value"
                                        displayKey="label"
                                        placeholder={t("admin.employees.filters.department", "Department")}
                                        onChangeValue={(val) => setSelectedDept(val)}
                                    />

                                    {/* <CSelectOptions data={locationData} valueKey="value" displayKey="label" placeholder={t("admin.employees.filters.location", "Location")} /> */}
                                    {/* <CSelectOptions data={annualsData} valueKey="value" displayKey="label" placeholder={t("admin.employees.filters.leaveType", "Leave Type")} /> */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {isLoading && <LoadingUI />}
                    {!isLoading && (
                        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-neutral-50 dark:bg-neutral-800/30 border-b border-neutral-200 dark:border-neutral-800">
                                            {columns.map((column) => (
                                                <th key={column} className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">
                                                    {column}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 text-sm">
                                        {filteredData.map((item, index) => (
                                            <tr key={index} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/20 transition-colors border-b border-neutral-100 dark:border-neutral-800/50 last:border-0">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <CAvatarProfile user={{ ...(item.userId as any), avatar: userMap[item.userId?._id]?.avatar || item.userId?.avatar }} className="w-9 h-9" />
                                                        <div>
                                                            <div className="font-medium text-neutral-900 dark:text-white">{item.userId?.fullName}</div>
                                                            <div className="text-xs text-neutral-500">ID: {item.userId?.empId}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    {(() => {
                                                        const dept = (item.userId?.departmentId as any)?.originName || ""
                                                        const colorMap: Record<string, string> = {
                                                            "Engineering": "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
                                                            "HR": "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-500/20",
                                                            "Marketing": "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
                                                            "Sales": "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
                                                            "Finance": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20",
                                                            "Operations": "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20",
                                                            "Logistics": "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20",
                                                            "QA": "bg-red-100 text-red-800 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
                                                            "Design": "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-500/10 dark:text-fuchsia-400 dark:border-fuchsia-500/20",
                                                            "R&D": "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
                                                            "System": "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20",
                                                        }
                                                        const colorKey = Object.keys(colorMap).find(k => dept.toLowerCase().includes(k.toLowerCase()))
                                                        const colorClass = colorKey ? colorMap[colorKey] : "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700"
                                                        return (
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${colorClass}`}>
                                                                {dept || t("admin.employees.adjustModal.system")}
                                                            </span>
                                                        )
                                                    })()}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">
                                                        {t("admin.employees.filters.annual", "Annual Leave")} {item.year}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center text-neutral-600 dark:text-neutral-400 font-mono font-medium">
                                                    {item.usedDays} / {item.totalDays}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="font-bold text-neutral-900 dark:text-neutral-50 font-mono text-base">{item.remainingDays}</span>
                                                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 ml-1.5 uppercase font-medium tracking-tight">{t("admin.employees.table.days")}</span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <Button variant={"ghost"} onClick={() => handleOpenAdjust(item)}>
                                                        <Edit size={16} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-neutral-50/30 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-6 py-4 flex items-center justify-between">
                                <div className="text-sm text-neutral-500">
                                    {t("admin.employees.pagination.showing")} <span className="font-medium text-neutral-900 dark:text-white">1</span> {t("admin.employees.pagination.to")}{" "}
                                    <span className="font-medium text-neutral-900 dark:text-white">{data?.meta?.limit || 0}</span> {t("admin.employees.pagination.of")}{" "}
                                    <span className="font-medium text-neutral-900 dark:text-white">{data?.meta?.total || 0}</span> {t("admin.employees.pagination.employees")}
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-400 font-medium disabled:opacity-50 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                        {t("admin.employees.pagination.previous")}
                                    </button>
                                    <button className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                        {t("admin.employees.pagination.next")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {adjustEmp && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[5]" onClick={() => setAdjustEmp(null)}></div>}
            <div
                className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-card shadow-2xl transform transition-transform duration-300 border-l border-border z-50 flex flex-col ${adjustEmp ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-muted/30">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{t("admin.employees.adjustModal.title")}</h2>
                        <p className="text-xs text-neutral-500 mt-0.5">{t("admin.employees.adjustModal.subtitle")}</p>
                    </div>
                    <Button variant={"ghost"} onClick={() => setAdjustEmp(null)}>
                        <X />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary/10 rounded-lg border border-primary-100 dark:border-primary/20">
                        <CAvatarProfile user={{ ...(adjustEmp?.userId as any), avatar: userMap[adjustEmp?.userId?._id || ""]?.avatar || adjustEmp?.userId?.avatar }} className="w-12 h-12 border-2 border-white dark:border-neutral-700" />
                        <div>
                            <div className="font-semibold text-neutral-900 dark:text-white">{adjustEmp?.userId?.fullName}</div>
                            <div className="text-xs text-neutral-500">{(adjustEmp?.userId?.positionId as any)?.fullName || (adjustEmp?.userId?.positionId as any)?.name}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-border rounded-xl bg-secondary/40 relative overflow-hidden group">
                            <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-wider">{t("admin.employees.adjustModal.currentBalance")}</div>
                            <div className="text-2xl font-bold text-foreground font-mono">
                                {adjustEmp?.remainingDays} <span className="text-xs font-normal text-muted-foreground uppercase">{t("admin.employees.adjustModal.days")}</span>
                            </div>
                        </div>
                        <div className="p-4 border border-border rounded-xl bg-secondary/40 relative overflow-hidden group">
                            <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-wider">{t("admin.employees.adjustModal.annualLimit")}</div>
                            <div className="text-2xl font-bold text-foreground font-mono">
                                {adjustEmp?.totalDays} <span className="text-xs font-normal text-muted-foreground uppercase">{t("admin.employees.adjustModal.days")}</span>
                            </div>
                        </div>
                    </div>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">{t("admin.employees.adjustModal.adjType")}</label>
                            <div className="flex p-1.5 bg-muted/50 rounded-xl border border-border">
                                <label className="flex-1 cursor-pointer">
                                    <input
                                        className="peer sr-only"
                                        name="adj-type"
                                        type="radio"
                                        checked={adjustType === "add"}
                                        onChange={() => setAdjustType("add")}
                                    />
                                    <div className="text-center py-2.5 px-3 rounded-lg text-sm font-bold text-muted-foreground peer-checked:bg-emerald-600 dark:peer-checked:bg-emerald-700/80 peer-checked:text-white peer-checked:shadow-sm transition-all flex items-center justify-center gap-2">
                                        <div className={`size-1.5 rounded-full ${adjustType === 'add' ? 'bg-white' : 'bg-emerald-500'}`}></div>
                                        {t("admin.employees.adjustModal.addDays")}
                                    </div>
                                </label>
                                <label className="flex-1 cursor-pointer">
                                    <input
                                        className="peer sr-only"
                                        name="adj-type"
                                        type="radio"
                                        checked={adjustType === "deduct"}
                                        onChange={() => setAdjustType("deduct")}
                                    />
                                    <div className="text-center py-2.5 px-3 rounded-lg text-sm font-bold text-muted-foreground peer-checked:bg-rose-600 dark:peer-checked:bg-rose-700/80 peer-checked:text-white peer-checked:shadow-sm transition-all flex items-center justify-center gap-2">
                                        <div className={`size-1.5 rounded-full ${adjustType === 'deduct' ? 'bg-white' : 'bg-rose-500'}`}></div>
                                        {t("admin.employees.adjustModal.deductDays")}
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5" htmlFor="days">
                                {t("admin.employees.adjustModal.numDays")}
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full pl-4 pr-12 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                    id="days"
                                    step="0.5"
                                    type="number"
                                    value={adjustDays}
                                    onChange={(e) => setAdjustDays(e.target.value)}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-medium pointer-events-none">{t("admin.employees.adjustModal.days")}</div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="reason">
                                {t("admin.employees.adjustModal.reason")}
                            </label>
                            <textarea
                                className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground resize-none text-sm placeholder-muted-foreground"
                                id="reason"
                                placeholder={t("admin.employees.adjustModal.reasonPlaceholder")}
                                rows={3}
                                value={adjustReason}
                                onChange={(e) => setAdjustReason(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{t("admin.employees.adjustModal.preview")}</span>
                                <span className="text-lg font-bold text-primary dark:text-blue-400 font-mono">{isNaN(previewDays) ? adjustEmp?.remainingDays : previewDays.toFixed(1)} {t("admin.employees.adjustModal.days")}</span>
                            </div>
                        </div>
                    </form>
                    <div className="pt-2">
                        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">{t("admin.employees.adjustModal.recentChanges")}</h3>
                        <div className="relative border-l border-neutral-200 dark:border-neutral-700 ml-2 space-y-4">
                            {isLoadingLogs ? (
                                <div className="ml-4 py-2">
                                    <span className="size-5 block rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
                                </div>
                            ) : logsData?.data && logsData.data.length > 0 ? (
                                logsData.data.map((log: any) => (
                                    <div key={log.id || log._id} className="ml-4 relative">
                                        <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                                        <p className="text-xs text-neutral-500">{new Date(log.createdAt).toLocaleDateString()}</p>
                                        <p className="text-sm text-neutral-800 dark:text-neutral-200">{log.reason || "System Adjustment"}</p>
                                        <p className={`text-xs font-mono ${(log.changeAmount || 0) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {(log.changeAmount || 0) > 0 ? '+' : ''}{log.changeAmount} {t("admin.employees.adjustModal.days")}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="ml-4 relative">
                                    <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                                    <p className="text-xs text-neutral-500">{t("admin.employees.adjustModal.noChanges", "No recent changes")}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-border bg-card mt-auto">
                    <div className="flex gap-3">
                        <Button variant={"outline"} className="flex-1 h-11 font-bold" onClick={() => setAdjustEmp(null)}>
                            {t("admin.employees.adjustModal.cancel", "Cancel")}
                        </Button>
                        <Button className="flex-1 gap-2 h-11 font-bold shadow-lg shadow-primary/20" onClick={handleSaveChanges} disabled={isAdjusting}>
                            {isAdjusting ? <span className="size-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin"></span> : <SaveIcon className="size-4" />} {t("admin.employees.adjustModal.save")}
                        </Button>
                    </div>
                </div>
            </div>

            {isExportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
                    <div className="bg-card w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] mx-4 border border-border">
                        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-muted/30">
                            <h2 className="text-xl font-bold text-foreground">{t("admin.employees.exportModal.title", "Export Report Preview")}</h2>
                            <Button variant={"ghost"} size="icon" className="rounded-full" onClick={() => setIsExportModalOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-[500px]">
                            <div className="w-full md:w-[35%] p-6 border-r border-border bg-muted/10 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">{t("admin.employees.exportModal.format", "Export Format")}</label>
                                    <div className="flex p-1 bg-muted/50 rounded-xl border border-border">
                                        <label className="flex-1 cursor-pointer">
                                            <input
                                                className="peer sr-only"
                                                name="export-format"
                                                type="radio"
                                                checked={exportFormat === "csv"}
                                                onChange={() => setExportFormat("csv")}
                                            />
                                            <div className="text-center py-3 px-2 rounded-lg transition-all flex flex-col items-center gap-2 group peer-checked:bg-card peer-checked:shadow-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="#FFF" stroke-miterlimit="10" stroke-width="2" className={`w-8 h-8 transition-opacity ${exportFormat === 'csv' ? 'opacity-100' : 'opacity-40 grayscale group-hover:opacity-70'}`}>
                                                    <path stroke="#979593" d="M67.1716,7H27c-1.1046,0-2,0.8954-2,2v78 c0,1.1046,0.8954,2,2,2h58c1.1046,0,2-0.8954,2-2V26.8284c0-0.5304-0.2107-1.0391-0.5858-1.4142L68.5858,7.5858 C68.2107,7.2107,67.702,7,67.1716,7z" />
                                                    <path fill="#8BBF8A" d="M71 71h-3v-3h-.3173c-1.4089 2.3002-3.4822 3.45-6.22 3.45-2.0141 0-3.5908-.5062-4.7292-1.5187-1.1389-1.0125-1.708-2.3559-1.708-4.0312 0-3.5873 2.2244-5.6747 6.6742-6.2625l6.0621-.8063c0-3.2625-1.3891-4.8937-4.1664-4.8937-2.4357 0-4.6339.7875-6.5952 2.3625v-3.15c1.9874-1.2 4.278-1.8 6.8717-1.8C68.6236 51.35 71 53.7378 71 58.5125V71zM68 61.2422l-4.8242.6641c-1.4844.2085-2.6045.5762-3.3594 1.1035-.7554.5273-1.1328 1.4619-1.1328 2.8027 0 .9766.3481 1.7744 1.0449 2.3926.6963.6187 1.624.9277 2.7832.9277 1.5884 0 2.9004-.5566 3.9355-1.6699S68 64.9404 68 63.2344V61.2422zM80.1334 67l-3.252 10h-2.3781l2.3781-10H80.1334z" />
                                                    <path fill="none" stroke="#979593" d="M67,7v18c0,1.1046,0.8954,2,2,2h18" />
                                                    <path fill="#107C41" d="M12,74h32c2.2091,0,4-1.7909,4-4V38c0-2.2091-1.7909-4-4-4H12c-2.2091,0-4,1.7909-4,4v32 C8,72.2091,9.7909,74,12,74z" />
                                                    <path d="M16.9492,66l7.8848-12.0337L17.6123,42h5.8115l3.9424,7.6486c0.3623,0.7252,0.6113,1.2668,0.7471,1.6236 h0.0508c0.2617-0.58,0.5332-1.1436,0.8164-1.69L33.1943,42h5.335l-7.4082,11.9L38.7168,66H33.041l-4.5537-8.4017 c-0.1924-0.3116-0.374-0.6858-0.5439-1.1215H27.876c-0.0791,0.2684-0.2549,0.631-0.5264,1.0878L22.6592,66H16.9492z" />
                                                </svg>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${exportFormat === 'csv' ? 'text-primary' : 'text-muted-foreground'}`}>CSV</span>
                                            </div>
                                        </label>
                                        <label className="flex-1 cursor-pointer">
                                            <input
                                                className="peer sr-only"
                                                name="export-format"
                                                type="radio"
                                                checked={exportFormat === "xlsx"}
                                                onChange={() => setExportFormat("xlsx")}
                                            />
                                            <div className="text-center py-3 px-2 rounded-lg transition-all flex flex-col items-center gap-2 group peer-checked:bg-card peer-checked:shadow-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 transition-opacity ${exportFormat === 'xlsx' ? 'opacity-100' : 'opacity-40 grayscale group-hover:opacity-70'}`} viewBox="0 0 32 32"><defs><linearGradient id="SVGSuUii0pt" x1="4.494" x2="13.832" y1="-2092.086" y2="-2075.914" gradientTransform="translate(0 2100)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#18884f" /><stop offset=".5" stop-color="#117e43" /><stop offset="1" stop-color="#0b6631" /></linearGradient></defs><path fill="#185c37" d="M19.581 15.35L8.512 13.4v14.409A1.19 1.19 0 0 0 9.705 29h19.1A1.19 1.19 0 0 0 30 27.809V22.5Z" /><path fill="#21a366" d="M19.581 3H9.705a1.19 1.19 0 0 0-1.193 1.191V9.5L19.581 16l5.861 1.95L30 16V9.5Z" /><path fill="#107c41" d="M8.512 9.5h11.069V16H8.512Z" /><path d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2" opacity="0.1" /><path d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191" opacity="0.2" /><path d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191" opacity="0.2" /><path d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191" opacity="0.2" /><path fill="url(#SVGSuUii0pt)" d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.19 1.19 0 0 1 2 21.959V10.041A1.19 1.19 0 0 1 3.194 8.85" /><path fill="#fff" d="m5.7 19.873l2.511-3.884l-2.3-3.862h1.847L9.013 14.6c.116.234.2.408.238.524h.017q.123-.281.26-.546l1.342-2.447h1.7l-2.359 3.84l2.419 3.905h-1.809l-1.45-2.711A2.4 2.4 0 0 1 9.2 16.8h-.024a1.7 1.7 0 0 1-.168.351l-1.493 2.722Z" /><path fill="#33c481" d="M28.806 3h-9.225v6.5H30V4.191A1.19 1.19 0 0 0 28.806 3" /><path fill="#107c41" d="M19.581 16H30v6.5H19.581Z" /></svg>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${exportFormat === 'xlsx' ? 'text-primary' : 'text-muted-foreground'}`}>XLSX</span>
                                            </div>
                                        </label>
                                        <label className="flex-1 cursor-pointer">
                                            <input
                                                className="peer sr-only"
                                                name="export-format"
                                                type="radio"
                                                checked={exportFormat === "pdf"}
                                                onChange={() => setExportFormat("pdf")}
                                            />
                                            <div className="text-center py-3 px-2 rounded-lg transition-all flex flex-col items-center gap-2 group peer-checked:bg-card peer-checked:shadow-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 transition-opacity ${exportFormat === 'pdf' ? 'opacity-100' : 'opacity-40 grayscale group-hover:opacity-70'}`} viewBox="0 0 24 24"><path fill="#ef5350" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04l.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66c.03-.2-.02-.39-.12-.55c-.29-.47-1.04-.69-2.28-.69l-1.29.07l-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77c-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8l-.89.49c-1.2.75-1.77 1.59-1.88 2.12c-.04.19-.02.36.05.54l.03.05l.48.31l.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75c1.03.51 2.24.74 3 .74c.44 0 .74-.11.91-.3m-.41-.71l.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51c.09-.1.13-.1.23-.1c1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2c.05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12l.15.05c.17.24.19.56.09 1.1l-.03.16l-.16.82z" /></svg>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${exportFormat === 'pdf' ? 'text-primary' : 'text-muted-foreground'}`}>PDF</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">{t("admin.employees.exportModal.fileName", "File Name")}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background text-sm text-foreground transition-shadow placeholder:text-muted-foreground/50"
                                        placeholder={`leave-balance-report-${new Date().toISOString().split('T')[0]}`}
                                        value={customFileName}
                                        onChange={e => setCustomFileName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-[65%] p-6 flex flex-col overflow-hidden bg-card">
                                <label className="block text-sm font-bold text-foreground mb-3 flex-shrink-0">
                                    {t("admin.employees.exportModal.preview", "UI Preview")} ({exportDataOptions.length} {t("admin.employees.exportModal.records", "records")})
                                </label>
                                <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar bg-background border border-border rounded-xl relative shadow-inner">
                                    {(exportFormat === "pdf") && (
                                        <div className="absolute inset-0 z-20 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                            {isGeneratingPdf || !pdfPreviewUrl ? (
                                                <div className="flex flex-col items-center">
                                                    <span className="size-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-3"></span>
                                                    <span className="text-sm font-medium text-neutral-500">{t("admin.employees.exportModal.generatingPdf", "Generating PDF View...")}</span>
                                                </div>
                                            ) : (
                                                <iframe src={`${pdfPreviewUrl}#toolbar=0&navpanes=0`} className="w-full h-full border-0 absolute inset-0 z-30" />
                                            )}
                                        </div>
                                    )}
                                    <table id="export-preview-table" className="w-full text-xs text-left whitespace-nowrap">
                                        <thead className="bg-muted/50 text-muted-foreground uppercase pointer-events-none sticky top-0 z-10">
                                            <tr>
                                                {exportDataOptions.length > 0 && Object.keys(exportDataOptions[0]).map(key => (
                                                    <th key={key} className="px-4 py-3 border-b border-r border-border font-bold tracking-tight">{key}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exportDataOptions.map((row, idx) => (
                                                <tr key={idx} className="bg-card border-b border-border pointer-events-none hover:bg-muted/50 transition-colors">
                                                    {Object.values(row).map((val: any, vIdx) => (
                                                        <td key={vIdx} className="px-4 py-3 border-r border-border font-medium text-foreground">{String(val)}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                            {exportDataOptions.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">{t("admin.employees.exportModal.noData", "No data")}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* BẢNG ẨN CHO PDF TRÁNH LỖI OKLCH CỦA TAILWIND */}
                        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                            <div id="export-pdf-container" style={{ width: '1000px', backgroundColor: '#ffffff', padding: '40px', fontFamily: 'sans-serif' }}>
                                <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #e5e7eb', paddingBottom: '20px' }}>
                                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#111827', textTransform: 'uppercase', letterSpacing: '1px' }}>{t("admin.employees.exportModal.pdfTitle", "Leave Balance Report")}</h1>
                                    <p style={{ margin: 0, color: '#4b5563', fontSize: '15px' }}>
                                        <strong>{t("admin.employees.exportModal.exportDate", "Export Date:")}</strong> {new Date().toLocaleDateString('en-GB')}  &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <strong>{t("admin.employees.exportModal.totalRecords", "Total Records:")}</strong> {exportDataOptions.length}
                                    </p>
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif' }}>
                                    <thead style={{ backgroundColor: '#f3f4f6', color: '#374151', textTransform: 'uppercase', fontSize: '12px', textAlign: 'left' }}>
                                        <tr>
                                            {exportDataOptions.length > 0 && Object.keys(exportDataOptions[0]).map(key => (
                                                <th key={key} style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', fontWeight: 'bold' }}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody style={{ fontSize: '14px', color: '#1f2937' }}>
                                        {exportDataOptions.map((row, idx) => (
                                            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                                {Object.values(row).map((val: any, vIdx) => (
                                                    <td key={vIdx} style={{ padding: '8px 16px', borderRight: '1px solid #e5e7eb' }}>{String(val)}</td>
                                                ))}
                                            </tr>
                                        ))}
                                        {exportDataOptions.length === 0 && (
                                            <tr>
                                                <td colSpan={7} style={{ padding: '32px 16px', textAlign: 'center', color: '#6b7280' }}>{t("admin.employees.exportModal.noData", "No data")}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="px-6 py-5 border-t border-border flex justify-end gap-3 bg-muted/30">
                            <Button variant={"outline"} className="h-11 px-6 font-bold" onClick={() => setIsExportModalOpen(false)}>
                                {t("admin.common.cancel", "Cancel")}
                            </Button>
                            <Button onClick={executeExport} className="h-11 px-8 gap-2 font-bold shadow-lg shadow-primary/20">
                                <Download className="h-4 w-4" />
                                {t("admin.employees.exportModal.download", "Download")} {exportFormat.toUpperCase()}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
