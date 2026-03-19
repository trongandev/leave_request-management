/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
    theme: string
    setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<string>(() => {
        return localStorage.getItem("theme") || "light"
    })

    useEffect(() => {
        const root = document.documentElement
        if (theme === "dark") {
            root.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else if (theme === "system") {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            if (systemPrefersDark) {
                root.classList.add("dark")
            } else {
                root.classList.remove("dark")
            }
            localStorage.setItem("theme", "system")
        } else {
            root.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error("useTheme must be used within a ThemeProvider")
    return context
}
