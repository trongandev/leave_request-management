import "./i18n"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import { BrowserRouter } from "react-router-dom"

import { QueryClient, QueryCache, MutationCache, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner" // Hoặc thư viện toast bạn thích
import { Toaster } from "./components/ui/sonner.tsx"
import { ThemeProvider } from "./contexts/themeContext.tsx"
import { FontProvider } from "./contexts/fontContext.tsx"
import { ErrorBoundary } from "./features/general/pages/ErrorBoundary.tsx"

function getErrorMessage(error: any, fallback: string) {
    const responseMessage = error?.response?.data?.message

    if (Array.isArray(responseMessage)) {
        return responseMessage.filter(Boolean).join(", ")
    }

    if (typeof responseMessage === "string" && responseMessage.trim()) {
        return responseMessage
    }

    if (typeof error?.message === "string" && error.message.trim()) {
        return error.message
    }

    return fallback
}

export const queryClient = new QueryClient({
    // Cấu hình bắt lỗi cho Query (Lấy dữ liệu)
    queryCache: new QueryCache({
        onError: (error, query) => {
            const message = query.meta?.message || getErrorMessage(error, "Tải dữ liệu thất bại!")
            toast.error(message as string)
        },
    }),

    // Cấu hình bắt lỗi cho Mutation (Thêm/Sửa/Xóa)
    mutationCache: new MutationCache({
        onError: (error: any, _variables, _context, mutation) => {
            // Tự động lấy message lỗi từ API hoặc dùng message mặc định
            const message = mutation.meta?.message || getErrorMessage(error, "Thao tác thất bại!")
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
            <ErrorBoundary>
                <QueryClientProvider client={queryClient}>
                    <TooltipProvider>
                        <ThemeProvider>
                            <FontProvider>
                                <App />

                                <Toaster position="top-center" richColors />
                            </FontProvider>
                        </ThemeProvider>
                    </TooltipProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StrictMode>,
)
