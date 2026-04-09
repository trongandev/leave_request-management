import { create } from "zustand"

interface SidebarState {
    isSidebarOpen: boolean
    setSidebarOpen: (isOpen: boolean) => void
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

    setSidebarOpen: (isOpen: boolean) => {
        localStorage.setItem("isSidebarOpen", JSON.stringify(isOpen))
        set({ isSidebarOpen: isOpen })
    },
}))
