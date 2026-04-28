import * as React from "react"
import { Trans, useTranslation } from "react-i18next"
import { CalendarIcon, HourglassIcon, OctagonAlertIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BulkApprovalDialog } from "../components/BulkApprovalDialog"
import { CheckCircle2, XCircle, HeartPulse } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PendingApprovalsListPage() {
    const { t } = useTranslation()
    const [selectedIds, setSelectedIds] = React.useState<number[]>([])
    const [isBulkApprovalOpen, setIsBulkApprovalOpen] = React.useState(false)

    const pendingRequests = [
        { id: 1, employee: "Sarah Jenkins", role: "UX Designer", type: "Annual Leave", typeColor: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300", range: "Oct 12 - Oct 15", requested: "Today, 9:41 AM", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbgR7WYTTY-1jbFRHtr36PpCSuhqDBoW1b_EBsRmZYOvQ0cJZtoGbRDW8E_8jcGP7f5HuHkylrMHQLVkXRyJbshpGkHh8_2eILeDmX3wDOuLIqP-v4kOVdar6h6sIyb-y3n0SnQKN2LK173lqkiODHH6DAnmxHvP9uCd2ZWipCsEjfd0wLYlU-BjbeW694e2Pf5HfPX0aWMSYmE6dl_7D21gLABGOVidSd8UtERFoMhQ8ApEs-NUja00mqFCVf1XeAjl5iz74_d9I" },
        { id: 2, employee: "Mike Ross", role: "Sales Associate", type: "Expense Claim", typeColor: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", range: "Oct 10", requested: "Yesterday", initials: "MR" },
        { id: 3, employee: "Davina Claire", role: "Marketing Lead", type: "Sick Leave", typeColor: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300", range: "Oct 11", requested: "Oct 11, 8:00 AM", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJdONOZKTHLkXkBOFJobTtIT4P6V3WoUHzCj9A9F8plZ-cPbnCRKVwnHu0YnngnoW5Mp1kxbmN734Bog-YM_ze6tmYCSVUzGkoEUQod1lbWLJECWZUNM6k42lFESvDS0fsZnlfwEOup24TgVOJruKe26M1wLFQNaHgBmYYBVN0YUl9gUm_XfxFLG9Ggt37l8VsriiWzVKXbx-jaa7r2J32-ZDMl0Kqead_-HOo1PCVx3vM67rktDCiFIJV7_Nh8YzLn5WYh2t3WeU" },
        { id: 4, employee: "James Wilson", role: "Backend Dev", type: "Equipment", typeColor: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300", range: "Oct 20", requested: "Oct 09, 2:30 PM", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVVkvX_u6wEptcCsMfNH66Fopg3QgYS-uI-Ua0J4-PEDA2s_xPCB_OlbOKhudXcU0SnXMHa5zsgdarUp8ezBR0-wSrsxPZZBxG3nVAYOkVI7uTcBrLWdVtlWWBLD163Y7MvhJz8FGet0_x3a7HMS9fx3girCn2O6GK2TkyEnGD77FIFIOcK5fA6fUGj2yLSiCQwt9WnsJGgm3fLeDHNNp5r_TtxSxdDSaj6YFKb1ZcQWaguAe4US4tN-fgoHNpJrz_VTzsgDK1wIs" },
        { id: 5, employee: "Anita Lee", role: "Product Manager", type: "Annual Leave", typeColor: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300", range: "Nov 24 - Nov 30", requested: "Oct 08, 11:15 AM", initials: "AL" },
    ]

    const toggleSelectAll = () => {
        if (selectedIds.length === pendingRequests.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(pendingRequests.map(r => r.id))
        }
    }

    const toggleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id))
        } else {
            setSelectedIds([...selectedIds, id])
        }
    }

    const dashboardData = [
        { id: 1, name: t("approvals.metrics.totalPending"), icon: HourglassIcon, value: 12, color: "text-orange-500", bgColor: "bg-orange-50" },
        { id: 2, name: t("approvals.metrics.dueThisWeek"), icon: CalendarIcon, value: 5, color: "text-primary", bgColor: "bg-primary/5" },
        { id: 3, name: t("approvals.metrics.urgentRequests"), icon: OctagonAlertIcon, value: 2, color: "text-red-500", bgColor: "bg-red-50" },
    ]
    return (
        <main className="">
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t("approvals.dashboard.title")}</h1>
                    <p className="text-sm text-slate-500 mt-1">{t("approvals.dashboard.desc")}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="material-icons absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
                        <input
                            className="pl-9 pr-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
                            placeholder={t("approvals.searchPlaceholder")}
                            type="text"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                        <span className="material-icons text-lg">filter_list</span>
                        {t("approvals.filterBtn")}
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {dashboardData.map((item) => (
                    <Card key={item.id} className="group hover:shadow-md transition-all duration-300 border-slate-200 dark:border-slate-800">
                        <CardContent className="flex justify-between items-center p-6">
                            <div className="">
                                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">{item.name}</p>
                                <h3 className={`text-3xl font-black text-slate-900 dark:text-white tracking-tight`}>{item.value}</h3>
                            </div>
                            <div className={`p-4 ${item.color} ${item.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mb-8">
                <Tabs defaultValue="humanitarian" className="w-full">
                    <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 h-12 rounded-xl border border-slate-200 dark:border-slate-800">
                        <TabsTrigger value="auto-approved" className="rounded-lg px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            {t("approvals.tabs.autoApproved", "Đã duyệt tự động")}
                        </TabsTrigger>
                        <TabsTrigger value="rejected" className="rounded-lg px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-rose-600 data-[state=active]:shadow-sm">
                            <XCircle className="w-4 h-4 mr-2" />
                            {t("approvals.tabs.rejected", "Bị từ chối")}
                        </TabsTrigger>
                        <TabsTrigger value="humanitarian" className="rounded-lg px-6 data-[state=active]:bg-rose-500 data-[state=active]:text-white animate-pulse-subtle border-2 border-transparent data-[state=active]:border-rose-300 shadow-lg shadow-rose-500/20">
                            <HeartPulse className="w-4 h-4 mr-2" />
                            {t("approvals.tabs.humanitarian", "Cảnh báo Nhân đạo do AI lọc")}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="auto-approved" className="mt-4 outline-none">
                        <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-900/20">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Tính năng Trực quan hóa</h4>
                            <p className="text-sm text-slate-500 mt-1 max-w-[400px]">Danh sách các đơn đã được hệ thống AI phê duyệt tự động dựa trên các tiêu chuẩn tối ưu.</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="rejected" className="mt-4 outline-none">
                        <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-900/20">
                            <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
                                <XCircle className="w-8 h-8 text-rose-600" />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Đơn bị từ chối</h4>
                            <p className="text-sm text-slate-500 mt-1 max-w-[400px]">Danh sách các đơn không đủ điều kiện hoặc bị AI đánh giá là không hợp lệ.</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="humanitarian" className="mt-4 outline-none">
                        <div className="p-6 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/50 rounded-2xl">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                                    <HeartPulse className="w-6 h-6 text-rose-600 animate-bounce" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-rose-900 dark:text-rose-400">Cảnh báo Nhân đạo cấp thiết</h4>
                                        <Badge className="bg-rose-600 hover:bg-rose-700">AI High Priority</Badge>
                                    </div>
                                    <p className="text-sm text-rose-800/70 dark:text-rose-400/70 mb-4">
                                        AI đã phát hiện các trường hợp nghỉ phép có yếu tố nhân đạo đặc biệt (tang gia, bệnh nặng người thân) cần sự can thiệp và đồng cảm từ quản lý trực tiếp thay vì duyệt máy móc.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[1, 2].map(i => (
                                            <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-100 dark:border-rose-800 shadow-sm flex flex-col gap-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">NV</div>
                                                        <div>
                                                            <p className="text-xs font-bold">Nhân viên {i}</p>
                                                            <p className="text-[10px] text-slate-500">Tang gia - Cấp thiết</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="text-[10px] border-rose-200 text-rose-600 uppercase">Cần ưu tiên</Badge>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button size="xs" variant="ghost" className="h-7 text-[10px] text-rose-600 hover:bg-rose-50 flex-1">Xem chi tiết</Button>
                                                    <Button size="xs" className="h-7 text-[10px] bg-rose-600 hover:bg-rose-700 text-white flex-1">Duyệt ngay</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-surface-dark">
                    <div className="flex items-center gap-4">
                        <h3 className="font-semibold text-slate-800 dark:text-white">{t("approvals.queue.title")}</h3>
                        {selectedIds.length > 0 && (
                            <button 
                                onClick={() => setIsBulkApprovalOpen(true)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-semibold transition-all border border-primary/20 shadow-xs"
                            >
                                <span className="material-icons text-sm">auto_awesome</span>
                                {t("approvals.bulkApproval.btn", "Duyệt nhiều đơn")}
                                <span className="flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full text-[10px]">
                                    {selectedIds.length}
                                </span>
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-icons text-xl">refresh</span>
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-icons text-xl">more_horiz</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 uppercase text-xs font-medium text-slate-500 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-3 tracking-wider w-10">
                                    <Checkbox 
                                        checked={selectedIds.length === pendingRequests.length && pendingRequests.length > 0}
                                        onCheckedChange={toggleSelectAll}
                                        className="border-slate-300"
                                    />
                                </th>
                                <th className="px-6 py-3 tracking-wider w-1/4">{t("approvals.queue.columns.employee")}</th>
                                <th className="px-6 py-3 tracking-wider">{t("approvals.queue.columns.requestType")}</th>
                                <th className="px-6 py-3 tracking-wider">{t("approvals.queue.columns.dateRange")}</th>
                                <th className="px-6 py-3 tracking-wider">{t("approvals.queue.columns.requestedOn")}</th>
                                <th className="px-6 py-3 tracking-wider">{t("approvals.queue.columns.status")}</th>
                                <th className="px-6 py-3 tracking-wider text-right">{t("approvals.queue.columns.action")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {pendingRequests.map((request) => (
                                <tr key={request.id} className={`transition-colors group ${selectedIds.includes(request.id) ? "bg-primary/5 dark:bg-primary/10" : "bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Checkbox 
                                            checked={selectedIds.includes(request.id)}
                                            onCheckedChange={() => toggleSelect(request.id)}
                                            className="border-slate-300"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            {request.avatar ? (
                                                <img
                                                    alt=""
                                                    className="h-8 w-8 rounded-full object-cover"
                                                    src={request.avatar}
                                                />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{request.initials}</div>
                                            )}
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">{request.employee}</div>
                                                <div className="text-xs text-slate-500">{request.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium ${request.typeColor}`}>
                                            {request.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-300">{request.range}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">{request.requested}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors focus:outline-none focus:underline decoration-2 underline-offset-2">
                                            {t("approvals.queue.actions.review")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-surface-dark">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                <Trans i18nKey="approvals.queue.pagination.showing" values={{from: 1, to: 5, total: 12}} components={{1: <span className="font-medium" />, 3: <span className="font-medium" />, 5: <span className="font-medium" />}} />
                            </p>
                        </div>
                        <div>
                            <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <a
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    href="#"
                                >
                                    <span className="material-icons text-base">chevron_left</span>
                                </a>
                                <a aria-current="page" className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                    1
                                </a>
                                <a
                                    className="bg-white dark:bg-surface-dark border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    href="#"
                                >
                                    2
                                </a>
                                <a
                                    className="bg-white dark:bg-surface-dark border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    href="#"
                                >
                                    3
                                </a>
                                <a
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    href="#"
                                >
                                    <span className="material-icons text-base">chevron_right</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <BulkApprovalDialog 
                isOpen={isBulkApprovalOpen}
                onOpenChange={setIsBulkApprovalOpen}
                selectedCount={selectedIds.length}
                onSubmit={(data) => {
                    console.log("Bulk approval data:", data)
                    // API endpoint will be added here later
                    setSelectedIds([])
                }}
            />
        </main>
    )
}
