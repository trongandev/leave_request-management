/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"

interface SidebarContextType {
    isOpen: boolean
    toggleSidebar: () => void
}
const sidebarContext = createContext<SidebarContextType | null>(null)

export default function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(() => {
        const savedState = localStorage.getItem("sidebarIsOpen")
        return savedState ? JSON.parse(savedState) : false
    })

    const toggleSidebar = () => {
        setIsOpen((prev) => {
            const newState = !prev
            localStorage.setItem("sidebarIsOpen", JSON.stringify(newState))
            return newState
        })
    }

    return <sidebarContext.Provider value={{ isOpen, toggleSidebar }}>{children}</sidebarContext.Provider>
}

export const useToggleSidebar = () => {
    const context = useContext(sidebarContext)
    if (!context) {
        throw new Error("useToggleSidebar must be used within a SidebarProvider")
    }
    return context
}
