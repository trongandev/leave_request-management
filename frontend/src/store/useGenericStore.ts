// sử dụng khi gặp một số tình huống như
// trạng thái đóng mở modal, giá trị search tạm thời, hay một cái toggle đơn giản
// mà không muốn tạo hàng chục file store riêng lẻ cho tốn công.

import { create } from "zustand"

interface GenericState {
    // Dùng Record để lưu trữ bất kỳ giá trị nào theo Key là String
    data: Record<string, any>

    // Hàm để lưu giá trị vào store
    setValue: (key: string, value: any) => void

    // Hàm để toggle một giá trị boolean
    toggleValue: (key: string) => void

    // Hàm để xóa một key nhất định
    clearValue: (key: string) => void

    // Hàm để reset toàn bộ store về rỗng
    resetStore: () => void
}

export const useGenericStore = create<GenericState>((set) => ({
    data: {
        isSidebarOpen: false,
    },

    setValue: (key, value) =>
        set((state) => ({
            data: {
                ...state.data,
                [key]: value,
            },
        })),

    toggleValue: (key: any) =>
        set((state) => ({
            data: {
                ...state.data,
                [key]: !state.data[key],
            },
        })),

    clearValue: (key) =>
        set((state) => {
            const newData = { ...state.data }
            delete newData[key]
            return { data: newData }
        }),

    resetStore: () => set({ data: {} }),
}))
