import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

const resources = {
    en: {
        translation: {
            sidebar: {
                mainMenu: "Main Menu",
                home: "Home",
                dashboard: "Dashboard",
                teamCalendar: "Team Calendar",
                setting: "Settings",
                profile: "My Profile",
                preference: "Preferences",
                leaveBalances: "Leave Balances",
            },
            approvals: {
                dashboard: {
                    title: "Pending Approvals",
                    desc: "Review and manage requests from your team members.",
                },
            },
            preferences: {
                navbar: {
                    title: "Preferences",
                    desc: "Personalize your experience",
                },
                appearance: {
                    title: "Theme Engine",
                    desc: "Select how you want the system to look and feel.",
                    interface: {
                        title: "Interface",
                        desc: "Control the layout and density of the user interface.",
                        compact: {
                            title: "Compact Mode",
                            desc: "Display more information with less spacing.",
                        },
                        font: "Font System",
                        sidebar: "Sidebar Position",
                    },
                },
                localization: {
                    title: "Localization",
                    desc: "Set your regional preferences for language and formatting.",
                    language: "Language",
                    en: "English",
                    vi: "Vietnamese",
                    date: "Date Format",
                },
            },
        },
    },
    vi: {
        translation: {
            sidebar: {
                mainMenu: "Menu chính",
                home: "Trang chủ",
                dashboard: "Bảng điều khiển",
                teamCalendar: "Lịch nhóm",
                setting: "Cài đặt",
                profile: "Hồ sơ của tôi",
                preference: "Tùy chọn",
                leaveBalances: "Quản lý nghỉ phép",
            },
            approvals: {
                dashboard: {
                    title: "Đơn chờ phê duyệt",
                    desc: "Xem xét và quản lý các yêu cầu từ các thành viên nhóm của bạn.",
                },
            },
            preferences: {
                navbar: {
                    title: "Tùy chọn",
                    desc: "Tùy chỉnh trải nghiệm của bạn",
                },
                appearance: {
                    title: "Theme Engine",
                    desc: "Chọn cách bạn muốn hệ thống trông và cảm nhận.",
                    interface: {
                        title: "Giao diện",
                        desc: "Kiểm soát bố cục và mật độ của giao diện người dùng.",
                        compact: {
                            title: "Chế độ gọn gàng",
                            desc: "Hiển thị nhiều thông tin hơn với khoảng cách ít hơn.",
                        },
                        font: "Hệ thống phông chữ",
                        sidebar: "Vị trí thanh bên",
                    },
                },
                localization: {
                    title: "Bản địa hóa",
                    desc: "Đặt tùy chọn khu vực cho ngôn ngữ và định dạng.",
                    language: "Ngôn ngữ",
                    en: "Tiếng anh",
                    vi: "Tiếng Việt",
                    date: "Định dạng ngày",
                },
            },
        },
    },
}

i18n.use(LanguageDetector) // Tự động phát hiện ngôn ngữ người dùng
    .use(initReactI18next) // Gắn vào React
    .init({
        resources,
        fallbackLng: "vi", // Ngôn ngữ mặc định nếu không phát hiện được
        interpolation: {
            escapeValue: false, // React đã tự động chống XSS
        },
    })

export default i18n
