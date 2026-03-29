/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useLayoutEffect, useState } from "react"

import { flushSync } from "react-dom"

interface ThemeContextType {
    theme: string
    setTheme: (theme: string) => void
}

const themeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setThemeState] = useState<string>(() => {
        return localStorage.getItem("theme") || "light"
    })

    const setTheme = (newTheme: string) => {
        const root = document.documentElement
        const media = window.matchMedia("(prefers-color-scheme: dark)")

        root.classList.add("[&_*]:!transition-none")

        const update = () => {
            flushSync(() => {
                setThemeState(newTheme)
            })

            if (newTheme === "dark") {
                root.classList.add("dark")
                localStorage.setItem("theme", "dark")
            } else if (newTheme === "system") {
                root.classList.toggle("dark", media.matches)
                localStorage.setItem("theme", "system")
            } else {
                root.classList.remove("dark")
                localStorage.setItem("theme", "light")
            }
        }

        if (!document.startViewTransition) {
            update()
            root.classList.remove("[&_*]:!transition-none")
            return
        }

        const transition = document.startViewTransition(update)

        transition.finished.finally(() => {
            root.classList.remove("[&_*]:!transition-none")
        })
    }

    useLayoutEffect(() => {
        const root = document.documentElement
        const media = window.matchMedia("(prefers-color-scheme: dark)")

        const applyTheme = () => {
            if (theme === "dark") {
                root.classList.add("dark")
                localStorage.setItem("theme", "dark")
            } else if (theme === "system") {
                root.classList.toggle("dark", media.matches)
                localStorage.setItem("theme", "system")
            } else {
                root.classList.remove("dark")
                localStorage.setItem("theme", "light")
            }
        }

        applyTheme()

        if (theme === "system") {
            const onChange = () => {
                if (document.startViewTransition) {
                    document.startViewTransition(() => applyTheme())
                } else {
                    applyTheme()
                }
            }
            media.addEventListener("change", onChange)
            return () => media.removeEventListener("change", onChange)
        }
    }, [theme])

    return <themeContext.Provider value={{ theme, setTheme }}>{children}</themeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(themeContext)
    if (!context) throw new Error("useTheme must be used within a ThemeProvider")
    return context
}
