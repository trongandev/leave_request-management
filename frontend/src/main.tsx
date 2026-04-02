import "./i18n"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import { BrowserRouter } from "react-router-dom"
import AuthSessionManager from "./features/auth/components/AuthSessionManager.tsx"

import { QueryClient, QueryCache, MutationCache, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner" // Hoặc thư viện toast bạn thích
import { Toaster } from "./components/ui/sonner.tsx"
import { ThemeProvider } from "./contexts/themeContext.tsx"
import { FontProvider } from "./contexts/fontContext.tsx"

export const queryClient = new QueryClient({
    // Cấu hình bắt lỗi cho Query (Lấy dữ liệu)
    queryCache: new QueryCache({
        onError: (error, query) => {
            // Chỉ hiện toast nếu query có định nghĩa meta.errorMessage
            // Tránh việc mọi API lỗi đều bắn toast lung tung
            console.log(error)
            if (query.meta?.errorMessage) {
                toast.error(query.meta.errorMessage as string)
            }
        },
    }),

    // Cấu hình bắt lỗi cho Mutation (Thêm/Sửa/Xóa)
    mutationCache: new MutationCache({
        onError: (error: any, _variables, _context, mutation) => {
            // Tự động lấy message lỗi từ API hoặc dùng message mặc định
            const message =
                mutation.meta?.errorMessage ||
                error?.response?.data?.message || // Lấy message từ API
                "Thao tác thất bại!"
            toast.error(message as string)
        },
    }),

    // Cấu hình mặc định cho các query
    defaultOptions: {
        queries: {
            retry: 1, // Thử lại 1 lần nếu lỗi mạng
            refetchOnWindowFocus: false, // Tắt tự động load lại khi đổi tab nếu muốn
        },
    },
})

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <ThemeProvider>
                        <FontProvider>
                            <AuthSessionManager />
                            <App />

                            <Toaster position="top-center" richColors />
                        </FontProvider>
                    </ThemeProvider>
                </TooltipProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)
