import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

import { Link } from "react-router-dom"

export default function NotFoundPage() {
    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -z-10"></div>
            <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
                <div className="relative inline-block">
                    <h1 className="text-[120px] md:text-[180px] font-extrabold leading-none tracking-tighter text-primary/10 select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl md:text-8xl font-bold text-primary drop-shadow-sm">404</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Không tìm thấy trang</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
                        Trang này không tồn tại hoặc bạn không có quyền truy cập vào tài nguyên này trong hệ thống.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link to="/">
                        <Button className="h-12">
                            <ChevronLeft /> Quay lại trang chủ
                        </Button>
                    </Link>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-slate-300 dark:border-slate-600 hover:border-primary text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-blue-50/50 dark:hover:bg-slate-800 font-medium rounded-lg transition-all duration-200 w-full sm:w-auto">
                        <span className="material-icons text-[20px]">support_agent</span>
                        Liên hệ hỗ trợ
                    </button>
                </div>
                <div className="pt-12 border-t border-slate-200 dark:border-slate-800 mt-12 max-w-md mx-auto">
                    <p className="text-sm text-slate-500 mb-4 uppercase tracking-wider font-semibold">Lối tắt nhanh</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <a
                            className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700 group"
                            href="#"
                        >
                            <span className="material-icons text-primary text-base group-hover:scale-110 transition-transform">dashboard</span>
                            <span className="text-slate-700 dark:text-slate-200">Bảng điều khiển</span>
                        </a>
                        <a
                            className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700 group"
                            href="#"
                        >
                            <span className="material-icons text-primary text-base group-hover:scale-110 transition-transform">event_note</span>
                            <span className="text-slate-700 dark:text-slate-200">Nghỉ phép của tôi</span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}
