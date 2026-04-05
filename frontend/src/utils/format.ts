export type StringFormat = "title" | "lower" | "upper"

/**
 * Chuyển đổi chuổi chữ sang viết hoa chữ cái đầu, viết thường toàn bộ, in hoa toàn bộ
 * @param text chuổi ký tự cần chuyển đổi
 * @param format định dạng muốn chuyển đổi: "title", "lower", or "upper"
 * @returns chuổi ký tự sau khi chuyển đổi
 */
export const formatString = (text: string, format: StringFormat): string => {
    const trimmed = text.trim()
    if (!trimmed) return ""
    
    if (format === "lower") return trimmed.toLowerCase()
    if (format === "upper") return trimmed.toUpperCase()
    if (format === "title") {
        return trimmed
            .split(/\s+/)
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")
    }
    return trimmed
}

/**
 * Lấy n số cuổi trong chuổi số
 * @param value chuổi số cần lấy
 * @param n số lượng số cần lấy (mặc định: 3)
 * @returns n số cuối trong chuổi số
 */
export const getLastDigits = (value: string, n: number = 3): string => {
    const clean = value.trim()
    if (clean.length <= n) return clean
    return clean.slice(-n)
}

/**
 * Lấy phần tên (từ cuối cùng) trong họ và tên
 * @param fullName họ và tên đầy đủ
 * @returns phần tên
 */
export const getFirstName = (fullName: string): string => {
    const parts = fullName.trim().split(/\s+/)
    if (parts.length === 0) return ""
    return parts[parts.length - 1]
}

/**
 * Chuyển đổi chuổi chữ sang viết thường, không dấu, không khoảng trắng
 * @param name chuổi chữ cần chuyển đổi
 * @returns chuổi chữ sau khi chuyển đổi
 */
export const normalizeForPassword = (name: string): string => {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
        .replace(/[đĐ]/g, "d")
        .replace(/\s+/g, "")
}
