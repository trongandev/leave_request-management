import { Outlet, useNavigate } from "react-router-dom"
import GeneralSidebar from "./GeneralSidebar"
import GeneralHeader from "./GeneralHeader"
import { useSidebarStore } from "@/store/useSidebarStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, useRef } from "react"
import { useWindowSize } from "@custom-react-hooks/use-window-size"
import { io } from "socket.io-client"
export default function GeneralLayout() {
    const { isSidebarOpen, setSidebarOpen } = useSidebarStore()
    const navigate = useNavigate()
    const { user, loadProfile, isAuthenticated, isLoading } = useAuthStore()
    const isLoadFirstTime = useRef(false)
    const socketRef = useRef<ReturnType<typeof io> | null>(null)

    const requestNotificationPermission = async () => {
        // Kiểm tra xem trình duyệt có hỗ trợ Notification không
        if (!("Notification" in window)) {
            console.log("Trình duyệt này không hỗ trợ thông báo.")
            return
        }

        // Nếu chưa được cấp quyền hoặc bị từ chối, hãy xin lại
        if (Notification.permission !== "granted") {
            const permission = await Notification.requestPermission()
            if (permission === "granted") {
                console.log("Đã được cấp quyền thông báo!")
            }
        }
    }

    useEffect(() => {
        // Khi app load, tự động load profile từ server
        requestNotificationPermission()
        loadProfile()
    }, [loadProfile])

    useEffect(() => {
        if (!user) return

        const socket = io("http://localhost:5050", {
            auth: { user: user },
        })
        socketRef.current = socket

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id)
        })

        socket.on("connect_error", (error) => {
            console.error("Socket connect_error:", error)
        })

        socket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason)
        })

        // Lắng nghe sự kiện thông báo
        socket.on("new_notification", (data) => {
            console.log("Thông báo mới:", data)
            // alert(`Bạn có thông báo mới: ${data.content}`)
            // Kiểm tra quyền một lần nữa trước khi hiển thị
            if (Notification.permission === "granted") {
                const options = {
                    body: data.content, // Nội dung thông báo
                    icon: data.avatar, // Đường dẫn ảnh icon (logo công ty An)
                    badge: data.avatar, // Icon nhỏ trên thanh trạng thái (Android)
                    vibrate: [200, 100, 200], // Rung máy (nếu là mobile)
                }

                const notification = new Notification(data.title, options)

                // Khi click vào thông báo thì mở App hoặc chuyển hướng
                notification.onclick = (event) => {
                    event.preventDefault()
                    window.focus()
                    // An có thể điều hướng tới trang chi tiết đơn:
                    window.location.href = data.link
                }
            }
        })

        return () => {
            socket.off("connect")
            socket.off("connect_error")
            socket.off("disconnect")
            socket.off("new_notification")
            socket.disconnect()
            if (socketRef.current === socket) {
                socketRef.current = null
            }
        }
    }, [user])

    const { width } = useWindowSize(100)
    useEffect(() => {
        if (isLoadFirstTime.current) return
        if (width < 768) {
            setSidebarOpen(false)
        } else {
            setSidebarOpen(true)
        }
        isLoadFirstTime.current = true
    }, [width, setSidebarOpen])

    // Hiển thị loading screen trong khi đang load profile
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-primary/5 to-blue-50 dark:from-slate-950 dark:to-slate-900">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">Đang tải...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        // Nếu không có token hoặc load profile thất bại, chuyển hướng về trang login
        navigate("/auth/login")
        return null
    }
    return (
        <div className="flex transition-all duration-300 bg-background">
            <div
                className={` font-display text-background antialiased shrink-0 flex flex-col h-screen fixed left-0 top-0 z-50  w-64  transition-all duration-300 border-r bg-card ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
                <GeneralSidebar />
            </div>
            <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} flex flex-col min-h-screen overflow-hidden transition-all duration-300  `}>
                <GeneralHeader />
                <div className="w-full p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
