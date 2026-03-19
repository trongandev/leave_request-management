import { create } from "zustand"

interface SidebarState {
    isSidebarOpen: boolean
    toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
    isSidebarOpen: JSON.parse(localStorage.getItem("isSidebarOpen") || "false"),

    toggleSidebar: () =>
        set((state) => {
            const newIsSidebarOpen = !state.isSidebarOpen
            localStorage.setItem("isSidebarOpen", JSON.stringify(newIsSidebarOpen))
            return { isSidebarOpen: newIsSidebarOpen }
        }),
}))
