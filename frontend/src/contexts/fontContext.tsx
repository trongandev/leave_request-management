/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react"

interface FontContextType {
    font: string
    setFont: (font: string) => void
}

const fontContext = createContext<FontContextType | undefined>(undefined)

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
    const [font, setFont] = useState<string>(() => {
        return localStorage.getItem("font") || "Inter"
    })

    useEffect(() => {
        const root = document.documentElement
        root.style.setProperty("--font-family", `'${font}', sans-serif`)
        localStorage.setItem("font", font)
    }, [font])

    return <fontContext.Provider value={{ font, setFont }}>{children}</fontContext.Provider>
}

export const useFont = () => {
    const context = useContext(fontContext)
    if (!context) throw new Error("useFont must be used within a FontProvider")
    return context
}
