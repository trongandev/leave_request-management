import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import {
    CalendarOffIcon,
    ChevronRightIcon,
    DoorClosedLockedIcon,
    ExternalLinkIcon,
    IdCardIcon,
    ListTodoIcon,
    MonitorCogIcon,
    NotebookPenIcon,
    ScrollTextIcon,
    SettingsIcon,
    ShieldUserIcon,
    UserCog2Icon,
    UserPenIcon,
    UserRoundIcon,
    WalletIcon,
} from "lucide-react"

export default function DashboardHomePage() {
    const { user } = useAuthStore()

    return (
        <main className="">
            <section className="mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl  tracking-tight text-slate-700 dark:text-white">
                        Chào buổi sáng, <span className="text-primary font-bold">{user?.fullName || "Người dùng"}</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">Hôm nay là Thứ Tư, ngày 24 tháng 5, 2024. Bạn có 3 phê duyệt đang chờ xử lý.</p>
                </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="flex flex-col  bg-white shadow rounded-xl overflow-hidden">
                    <div className="flex items-center gap-4 shadow p-5">
                        <UserPenIcon className="text-primary" />
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Công việc của tôi</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5">
                        <Card className="shadow-none border-gray-200">
                            <CardContent className="flex gap-5">
                                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-md">
                                    <CalendarOffIcon />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Tạo đơn nghỉ phép</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Đăng ký nghỉ phép năm hoặc việc riêng</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-none border-gray-200">
                            <CardContent className="flex gap-5">
                                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-md">
                                    <WalletIcon />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Xem số dư phép</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Bạn còn 12.5 ngày phép</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-2 shadow-none border-gray-200">
                            <CardContent className="flex gap-5">
                                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-md">
                                    <IdCardIcon />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Cập nhật hồ sơ</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Chỉnh sửa thông tin cá nhân và tài khoản ngân hàng</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                <section className="flex flex-col bg-white shadow rounded-xl overflow-hidden">
                    <div className="flex items-center gap-4 shadow p-5">
                        <UserRoundIcon className="text-green-600" />
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Quản lý đội ngũ</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-5">
                        <Card className="shadow-none border-gray-200">
                            <CardContent className="flex gap-5 items-center">
                                <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-md">
                                    <ListTodoIcon />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Duyệt đơn nhân viên</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Bạn có 3 yêu cầu đang chờ</p>
                                </div>
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold">3</div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-none border-gray-200">
                            <CardContent className="flex gap-5 items-center">
                                <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-md">
                                    <NotebookPenIcon />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Báo cáo vắng mặt team</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tổng quan lịch nghỉ phép trong tuần</p>
                                </div>
                                <ChevronRightIcon className="text-gray-400" />
                            </CardContent>
                        </Card>
                    </div>
                </section>
                <section className="flex flex-col  bg-white shadow rounded-xl overflow-hidden">
                    <div className="flex items-center gap-4 shadow p-5">
                        <UserCog2Icon className="text-amber-600" />
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Quản trị nhân sự</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5">
                        <Card className="shadow-none border-gray-200">
                            <CardContent className="flex gap-3 flex-col">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                                    <UserRoundIcon />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Danh sách nhân viên</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Quản lý 245 nhân sự trong hệ thống</p>
                                </div>
                                <div className="">
                                    <Button className="text-xs" variant={"link"}>
                                        Xem chi tiết <ExternalLinkIcon size={14} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-none border-gray-200">
                            <CardContent className="flex gap-3 flex-col">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                                    <ShieldUserIcon />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Cấu hình chính sách</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Thiết lập quy định nghỉ phép &amp; phúc lợi</p>
                                </div>
                                <div className="">
                                    <Button className="text-xs" variant={"link"}>
                                        Xem chi tiết <ExternalLinkIcon size={14} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                <section className="flex flex-col  bg-white shadow rounded-xl overflow-hidden">
                    <div className="flex items-center gap-4 shadow p-5">
                        <MonitorCogIcon />
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Hệ thống</h2>
                    </div>
                    <div className="">
                        <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                            <div className="flex justify-between items-center p-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <SettingsIcon />
                                    <span className="font-medium">Cài đặt hệ thống</span>
                                </div>
                                <ChevronRightIcon />
                            </div>
                            <div className="flex justify-between items-center p-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <ScrollTextIcon />
                                    <span className="font-medium">Audit Logs</span>
                                </div>
                                <ChevronRightIcon />
                            </div>
                            <div className="flex justify-between items-center p-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <DoorClosedLockedIcon />
                                    <span className="font-medium">Phân quyền RBAC</span>
                                </div>
                                <ChevronRightIcon />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className="mt-12">
                <div className="rounded-xl bg-primary/10 p-1">
                    <div className="rounded-lg bg-white dark:bg-slate-900 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h3 className="text-lg font-bold">Tình hình nhân sự tháng này</h3>
                            <div className="flex gap-2">
                                <Badge variant={"outline"} className="text-xs">
                                    +12 Nhân viên mới
                                </Badge>
                                <Badge variant={"outline"}>5 Vị trí đang tuyển</Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-semibold">Tổng nhân sự</span>
                                <span className="text-2xl font-black text-slate-900 dark:text-white">1,284</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-semibold">Nghỉ phép hôm nay</span>
                                <span className="text-2xl font-black text-slate-900 dark:text-white">18</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-semibold">Tỉ lệ biến động</span>
                                <span className="text-2xl font-black text-emerald">2.4%</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-semibold">Yêu cầu chờ duyệt</span>
                                <span className="text-2xl font-black text-amber">42</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
